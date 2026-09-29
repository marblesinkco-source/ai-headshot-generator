import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import Stripe from 'stripe';
import { nanoid } from 'nanoid';
import { createClient } from '@/lib/supabase/server';
import { PACKAGES, type PackageId } from '@/config/packages';
import { siteConfig } from '@/config/site';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
});

const checkoutSchema = z.object({
  packageId: z.enum(['starter', 'professional', 'executive'] as const),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

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

    const pkg = PACKAGES[packageId as PackageId];
    if (!pkg) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      );
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
        amount: pkg.price,
        currency: pkg.currency,
        headshot_count: pkg.headshots,
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

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: pkg.currency,
            product_data: {
              name: `${siteConfig.name} - ${pkg.name} Package`,
              description: `${pkg.headshots} AI headshots, ${pkg.backgrounds} backgrounds, ${pkg.styles} styles`,
            },
            unit_amount: pkg.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderId: order.id,
        packageId,
        userId: user.id,
      },
      success_url: successUrl || `${baseUrl}/dashboard/orders/${order.id}?status=success`,
      cancel_url: cancelUrl || `${baseUrl}/pricing?status=cancelled`,
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
