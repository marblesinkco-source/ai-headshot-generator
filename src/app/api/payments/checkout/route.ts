import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe';
import { PACKAGES, type PackageId } from '@/config/packages';
import { getCategoryById, getPackageById, type CategoryId } from '@/config/categories';
import { CREDIT_PACKAGES } from '@/config/credits';
import { siteConfig } from '@/config/site';
import { rateLimit } from '@/lib/rate-limit';
import { csrfGuard } from '@/lib/security';
import { logger } from '@/lib/logger';

export const maxDuration = 30;

// Known coupon codes mapped to Stripe coupon IDs
// Create these in Stripe Dashboard: Dashboard → Products → Coupons
const COUPON_MAP: Record<string, string> = {
  UPGRADE25: 'UPGRADE25', // 25% off — Stripe coupon ID must match
  AVATARBUNDLE: 'AVATARBUNDLE', // Avatar bundle discount — Stripe coupon ID must match
  AVATAR20: 'AVATAR20', // 20% off avatars when added to cart — Stripe coupon ID must match
};

// Support category checkout, legacy checkout, and credit package checkout
const checkoutSchema = z.union([
  // Credit package checkout
  z.object({
    type: z.literal('credits'),
    creditPackageId: z.string(),
    couponCode: z.string().optional(),
    successUrl: z.string().url().optional(),
    cancelUrl: z.string().url().optional(),
  }),
  // New category-based checkout
  z.object({
    categoryId: z.string(),
    packageId: z.string(),
    couponCode: z.string().optional(),
    successUrl: z.string().url().optional(),
    cancelUrl: z.string().url().optional(),
    withdrawalConsentGiven: z.boolean().optional(),
    consentTimestamp: z.string().optional(),
  }),
  // Legacy checkout (backward compatible)
  z.object({
    packageId: z.enum(['starter', 'professional', 'executive'] as const),
    couponCode: z.string().optional(),
    successUrl: z.string().url().optional(),
    cancelUrl: z.string().url().optional(),
  }),
]);

export async function POST(request: NextRequest) {
  const csrf = csrfGuard(request);
  if (csrf) return csrf;
  try {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request' },
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

    // Rate limit: 15 requests per hour per user
    const rl = await rateLimit({
      key: `payments-checkout:${user.id}`,
      limit: 15,
      windowMs: 60 * 60 * 1000,
    });
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '3600' } },
      );
    }

    const baseUrl = siteConfig.url;

    // ─── Credit package checkout ───────────────────────────────────────
    if ('type' in parsed.data && parsed.data.type === 'credits') {
      const { creditPackageId, couponCode: creditCoupon, successUrl, cancelUrl } = parsed.data;

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
        logger.error('Failed to create credit order:', orderError);
        return NextResponse.json(
          { error: 'Failed to create order' },
          { status: 500 }
        );
      }

      const creditStripeCoupon = creditCoupon ? COUPON_MAP[creditCoupon.toUpperCase()] : undefined;

      const checkoutSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        customer_email: user.email,
        // Automatic payment methods: card, Apple Pay, Google Pay, Link (one-click checkout)
        // Stripe automatically shows the best methods based on customer's device and location
        payment_method_types: ['card', 'link'],
        billing_address_collection: 'auto',
        phone_number_collection: { enabled: true },
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
        ...(creditStripeCoupon ? { discounts: [{ coupon: creditStripeCoupon }] } : {}),
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
      couponCode?: string;
      withdrawalConsentGiven?: boolean;
      consentTimestamp?: string;
    };
    const couponCode = 'couponCode' in parsed.data ? (parsed.data as { couponCode?: string }).couponCode : undefined;
    const categoryId = 'categoryId' in parsed.data ? (parsed.data as { categoryId: string }).categoryId : 'headshots';
    const withdrawalConsent = 'withdrawalConsentGiven' in parsed.data ? (parsed.data as { withdrawalConsentGiven?: boolean }).withdrawalConsentGiven : undefined;
    const consentTs = 'consentTimestamp' in parsed.data ? (parsed.data as { consentTimestamp?: string }).consentTimestamp : undefined;

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
      logger.error('Failed to create order:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    const categoryLabel = category ? category.name : 'AI Headshots';
    const stripeCoupon = couponCode ? COUPON_MAP[couponCode.toUpperCase()] : undefined;

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: user.email,
      // Automatic payment methods: card, Apple Pay, Google Pay, Link (one-click checkout)
      payment_method_types: ['card', 'link'],
      billing_address_collection: 'auto',
      phone_number_collection: { enabled: true },
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
      ...(stripeCoupon ? { discounts: [{ coupon: stripeCoupon }] } : {}),
      metadata: {
        orderId: order.id,
        packageId,
        categoryId,
        userId: user.id,
        ...(withdrawalConsent ? {
          withdrawalConsentGiven: 'true',
          consentTimestamp: consentTs || new Date().toISOString(),
          consentText: 'Customer expressly requested immediate AI processing and waived right of withdrawal per EU Directive 2011/83/EU Art.16(a)',
        } : {}),
      },
      success_url: successUrl || `${baseUrl}/dashboard/orders/${order.id}?status=success`,
      cancel_url: cancelUrl || `${baseUrl}/dashboard/upload?category=${categoryId}&status=cancelled`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    logger.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
