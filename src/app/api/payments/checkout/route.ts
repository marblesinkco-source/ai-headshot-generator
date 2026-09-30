import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe';
import { PACKAGES, type PackageId } from '@/config/packages';
import { getCategoryById, getPackageById, type CategoryId } from '@/config/categories';
import { CREDIT_PACKAGES } from '@/config/credits';
import { siteConfig } from '@/config/site';

// Support category checkout, legacy checkout, and credit package checkout
const checkoutSchema = z.union([
  // Credit package checkout
  z.object({
    type: z.literal('credits'),
    creditPackageId: z.string(),
    successUrl: z.string().url().optional(),
    cancelUrl: z.string().url().optional(),
  }),
  // New category-based checkout
  z.object({
    categoryId: z.string(),
    packageId: z.string(),
    successUrl: z.string().url().optional(),
    cancelUrl: z.string().url().optional(),
  }),
  // Legacy checkout (backward compatible)
  z.object({
    packageId: z.enum(['starter', 'professional', 'executive'] as const),
    successUrl: z.string().url().optional(),
    cancelUrl: z.string().url().optional(),
  }),
]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Auth check
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const baseUrl = siteConfig.url;

    // ─── Credit package checkout ───────────────────────────────────────
    if ('type' in parsed.data && parsed.data.type === 'credits') {
      const { creditPackageId, successUrl, cancelUrl } = parsed.data;

      const creditPkg = CREDIT_PACKAGES.find((p) => p.id === creditPackageId);
      if (!creditPkg) {
        return NextResponse.json(
          { error: 'Credit package not found' },
          { status: 404 }
        );
      }

      const orderId = nanoid();
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          id: orderId,
          user_id: user.id,
          package_id: creditPkg.id,
          category_id: 'credits',
          order_type: 'credits',
          amount: creditPkg.price,
          currency: creditPkg.currency,
          headshot_count: creditPkg.credits,
          output_count: creditPkg.credits,
          status: 'pending',
        })
        .select('id')
        .single();

      if (orderError) {
        console.error('Failed to create credit order:', orderError);
        return NextResponse.json(
          { error: 'Failed to create order' },
          { status: 500 }
        );
      }

      const checkoutSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        customer_email: user.email,
        line_items: [
          {
            price_data: {
              currency: creditPkg.currency,
              product_data: {
                name: `${siteConfig.name} — ${creditPkg.name}`,
                description: `${creditPkg.credits} credits — use across all categories. Valid for 12 months.`,
              },
              unit_amount: creditPkg.price,
            },
            quantity: 1,
          },
        ],
        metadata: {
          orderId,
          packageId: creditPkg.id,
          categoryId: 'credits',
          userId: user.id,
          orderType: 'credits',
          creditCount: String(creditPkg.credits),
          validityDays: String(creditPkg.validityDays),
        },
        success_url: successUrl || `${baseUrl}/dashboard/credits?status=success&orderId=${orderId}`,
        cancel_url: cancelUrl || `${baseUrl}/pricing?status=cancelled`,
      });

      return NextResponse.json({ url: checkoutSession.url });
    }

    // ─── Category / Legacy checkout ────────────────────────────────────
    const { packageId, successUrl, cancelUrl } = parsed.data as {
      packageId: string;
      successUrl?: string;
      cancelUrl?: string;
      categoryId?: string;
    };
    const categoryId = 'categoryId' in parsed.data ? (parsed.data as { categoryId: string }).categoryId : 'headshots';

    let pkgName: string;
    let pkgPrice: number;
    let pkgCurrency: string;
    let outputCount: number;
    let productDescription: string;

    const category = getCategoryById(categoryId as CategoryId);

    if (category) {
      const catPkg = getPackageById(categoryId as CategoryId, packageId);
      if (!catPkg) {
        return NextResponse.json(
          { error: 'Package not found for this category' },
          { status: 404 }
        );
      }
      pkgName = catPkg.name;
      pkgPrice = catPkg.price;
      pkgCurrency = catPkg.currency;
      outputCount = catPkg.outputCount;
      productDescription = `${catPkg.outputCount} ${category.outputLabel} — ${catPkg.features.slice(0, 3).join(', ')}`;
    } else {
      const legacyPkg = PACKAGES[packageId as PackageId];
      if (!legacyPkg) {
        return NextResponse.json(
          { error: 'Package not found' },
          { status: 404 }
        );
      }
      pkgName = legacyPkg.name;
      pkgPrice = legacyPkg.price;
      pkgCurrency = legacyPkg.currency;
      outputCount = legacyPkg.headshots;
      productDescription = `${legacyPkg.headshots} AI headshots, ${legacyPkg.backgrounds} backgrounds, ${legacyPkg.styles} styles`;
    }

    const orderId = nanoid();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        id: orderId,
        user_id: user.id,
        package_id: packageId,
        category_id: categoryId as CategoryId,
        amount: pkgPrice,
        currency: pkgCurrency,
        headshot_count: outputCount,
        output_count: outputCount,
        status: 'pending',
      })
      .select('id')
      .single();

    if (orderError || !order) {
      console.error('Failed to create order:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    const categoryLabel = category ? category.name : 'AI Headshots';

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: pkgCurrency,
            product_data: {
              name: `${siteConfig.name} — ${categoryLabel} — ${pkgName}`,
              description: productDescription,
            },
            unit_amount: pkgPrice,
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderId: order.id,
        packageId,
        categoryId,
        userId: user.id,
      },
      success_url: successUrl || `${baseUrl}/dashboard/orders/${order.id}?status=success`,
      cancel_url: cancelUrl || `${baseUrl}/dashboard/upload?category=${categoryId}&status=cancelled`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
