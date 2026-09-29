import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import Stripe from 'stripe';
import { nanoid } from 'nanoid';
import { createClient } from '@/lib/supabase/server';
import { PACKAGES, type PackageId } from '@/config/packages';
import { getCategoryById, getPackageById, type CategoryId } from '@/config/categories';
import { siteConfig } from '@/config/site';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
});

// Support both legacy package-only checkout and new category+package checkout
const checkoutSchema = z.union([
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

    const { packageId, successUrl, cancelUrl } = parsed.data;
    const categoryId = 'categoryId' in parsed.data ? parsed.data.categoryId : 'headshots';

    // Resolve package — try new category system first, fall back to legacy
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
      // Legacy fallback for old headshot packages
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

    const baseUrl = siteConfig.url;
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
