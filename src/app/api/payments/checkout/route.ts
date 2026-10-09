import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { createClient } from '@/lib/supabase/server';
import { PACKAGES, type PackageId } from '@/config/packages';
import { getCategoryById, getPackageById, type CategoryId } from '@/config/categories';
import { CREDIT_PACKAGES } from '@/config/credits';
import { siteConfig } from '@/config/site';
import { rateLimit } from '@/lib/rate-limit';
import { csrfGuard } from '@/lib/security';
import { logger } from '@/lib/logger';

export const maxDuration = 30;

/**
 * Known discount codes mapped to Paddle discount IDs.
 * Create these in Paddle Dashboard: Catalog → Discounts
 * The values here are Paddle discount IDs (e.g., "dsc_...").
 * Set them once the Paddle account is configured.
 */
const DISCOUNT_MAP: Record<string, string | undefined> = {
  UPGRADE25: process.env.PADDLE_DISCOUNT_UPGRADE25,
  AVATARBUNDLE: process.env.PADDLE_DISCOUNT_AVATARBUNDLE,
  AVATAR20: process.env.PADDLE_DISCOUNT_AVATAR20,
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

/**
 * Paddle checkout flow:
 *
 * Paddle uses a client-side
 * overlay checkout via Paddle.js. This route creates the order record in our
 * DB and returns the data needed for Paddle.js to open the checkout overlay.
 *
 * The client will call Paddle.Checkout.open({ ... }) with the returned data.
 *
 * Flow:
 * 1. Client POST /api/payments/checkout with package info
 * 2. This route creates a pending order in Supabase
 * 3. Returns { orderId, items, customData, discountId, settings }
 * 4. Client opens Paddle.Checkout.open() with this data
 * 5. Paddle handles the payment (overlay on our site)
 * 6. Paddle webhook fires → /api/webhooks/paddle handles fulfillment
 */
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

      const discountId = creditCoupon ? DISCOUNT_MAP[creditCoupon.toUpperCase()] : undefined;

      // Return data for Paddle.js checkout overlay
      return NextResponse.json({
        orderId,
        checkout: {
          items: [
            {
              // Paddle price ID — must be created in Paddle Dashboard for each credit package
              // Format: pri_... (Paddle price IDs)
              // Until Paddle prices are created, use the package ID as a reference
              priceId: creditPkg.paddlePriceId || creditPkg.id,
              quantity: 1,
            },
          ],
          customData: {
            orderId,
            packageId: creditPkg.id,
            categoryId: 'credits',
            userId: user.id,
            orderType: 'credits',
            creditCount: String(creditPkg.credits),
            validityDays: String(creditPkg.validityDays),
          },
          settings: {
            successUrl: successUrl || `${baseUrl}/dashboard/credits?status=success&orderId=${orderId}`,
            ...(discountId ? { discountId } : {}),
          },
          customer: {
            email: user.email,
          },
        },
      });
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
    let paddlePriceId: string | undefined;

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
      paddlePriceId = catPkg.paddlePriceId;
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
      paddlePriceId = (legacyPkg as { paddlePriceId?: string }).paddlePriceId;
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

    const discountId = couponCode ? DISCOUNT_MAP[couponCode.toUpperCase()] : undefined;

    // Return data for Paddle.js checkout overlay
    return NextResponse.json({
      orderId: order.id,
      checkout: {
        items: [
          {
            priceId: paddlePriceId || packageId,
            quantity: 1,
          },
        ],
        customData: {
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
        settings: {
          successUrl: successUrl || `${baseUrl}/dashboard/orders/${order.id}?status=success`,
          ...(discountId ? { discountId } : {}),
        },
        customer: {
          email: user.email,
        },
      },
    });
  } catch (error) {
    logger.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
