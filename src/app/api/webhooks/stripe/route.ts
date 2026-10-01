import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/server';
import { Resend } from 'resend';
import { stripe } from '@/lib/stripe';
import { PACKAGES, type PackageId } from '@/config/packages';
import { getCategoryById, getPackageById, type CategoryId } from '@/config/categories';
import { CREDIT_PACKAGES } from '@/config/credits';
import { siteConfig } from '@/config/site';
import { buildOrderConfirmationEmail } from '@/lib/emails';
import { nanoid } from 'nanoid';

const resend = new Resend(process.env.RESEND_API_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const { orderId, packageId, userId } = session.metadata || {};

        if (!orderId || !packageId || !userId) {
          console.error('Missing metadata in checkout session:', session.id);
          return NextResponse.json({ received: true }, { status: 200 });
        }

        // Check current order status for idempotency — skip if already paid
        const { data: existingOrder } = await supabase
          .from('orders')
          .select('status')
          .eq('id', orderId)
          .single();

        if (existingOrder?.status === 'paid' || existingOrder?.status === 'uploading' || existingOrder?.status === 'processing' || existingOrder?.status === 'completed') {
          // Already processed — don't update or send duplicate email
          return NextResponse.json({ received: true }, { status: 200 });
        }

        const { error: updateError } = await supabase
          .from('orders')
          .update({
            status: 'paid',
            stripe_session_id: session.id,
            stripe_payment_intent: session.payment_intent as string,
          })
          .eq('id', orderId)
          .eq('user_id', userId);

        if (updateError) {
          console.error('Failed to update order:', updateError);
          return NextResponse.json(
            { error: 'Failed to update order' },
            { status: 500 }
          );
        }

        const orderType = session.metadata?.orderType;
        const categoryId = (session.metadata?.categoryId || 'headshots') as CategoryId;
        const customerEmail = session.customer_email || session.customer_details?.email;

        // ── Credit package purchase ──────────────────────────────────
        if (orderType === 'credits') {
          const creditCount = parseInt(session.metadata?.creditCount || '0', 10);
          const validityDays = parseInt(session.metadata?.validityDays || '365', 10);
          const creditPkg = CREDIT_PACKAGES.find((p) => p.id === packageId);

          if (creditCount > 0) {
            const creditId = nanoid();
            const expiresAt = new Date(Date.now() + validityDays * 24 * 60 * 60 * 1000).toISOString();

            // Create credit balance
            const { error: creditError } = await supabase
              .from('user_credits')
              .insert({
                id: creditId,
                user_id: userId,
                order_id: orderId,
                package_id: packageId,
                total_credits: creditCount,
                used_credits: 0,
                purchased_at: new Date().toISOString(),
                expires_at: expiresAt,
              });

            if (creditError) {
              console.error('Failed to create credits:', creditError);
            }

            // Record purchase transaction
            await supabase
              .from('credit_transactions')
              .insert({
                id: nanoid(),
                user_id: userId,
                credit_id: creditId,
                order_id: orderId,
                type: 'purchase',
                amount: creditCount,
                balance_after: creditCount,
                description: `Purchased ${creditPkg?.name || packageId}`,
              });
          }

          // Send confirmation email for credits
          if (customerEmail) {
            try {
              const pkgName = creditPkg?.name || 'Credit Pack';
              const { subject, html } = buildOrderConfirmationEmail({
                categoryName: 'Credit Pack',
                packageName: pkgName,
                outputCount: creditCount,
                outputLabel: 'credits',
                features: creditPkg?.features || [`${creditCount} credits`, 'All categories', '12 months validity'],
                orderId,
              });

              await resend.emails.send({
                from: `${siteConfig.name} <noreply@${new URL(siteConfig.url).hostname}>`,
                to: customerEmail,
                subject,
                html,
              });
            } catch (emailError) {
              console.error('Failed to send credit confirmation email:', emailError);
            }
          }

          break;
        }

        // ── Category package purchase ────────────────────────────────
        const category = getCategoryById(categoryId);
        const catPkg = category ? getPackageById(categoryId, packageId) : null;
        const legacyPkg = PACKAGES[packageId as PackageId];

        const pkgName = catPkg?.name || legacyPkg?.name || packageId;
        const categoryName = category?.name || 'AI Photos';
        const outputLabel = category?.outputLabel || 'AI photos';
        const outputCount = catPkg?.outputCount || legacyPkg?.headshots || 0;
        const features = catPkg?.features || [];

        if (customerEmail) {
          try {
            const { subject, html } = buildOrderConfirmationEmail({
              categoryName,
              packageName: pkgName,
              outputCount,
              outputLabel,
              features,
              orderId,
            });

            await resend.emails.send({
              from: `${siteConfig.name} <noreply@${new URL(siteConfig.url).hostname}>`,
              to: customerEmail,
              subject,
              html,
            });
          } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
            // Don't fail the webhook for email errors
          }
        }

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata?.orderId;

        if (orderId) {
          const { error: updateError } = await supabase
            .from('orders')
            .update({
              status: 'failed',
            })
            .eq('id', orderId);

          if (updateError) {
            console.error('Failed to update order status:', updateError);
          }
        }

        break;
      }

      case 'checkout.session.expired': {
        // Mark abandoned checkout sessions so pending orders don't stay forever
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        const expiredOrderId = expiredSession.metadata?.orderId;

        if (expiredOrderId) {
          // Only mark as expired if still pending — never downgrade a paid order
          const { error: updateError } = await supabase
            .from('orders')
            .update({ status: 'failed' })
            .eq('id', expiredOrderId)
            .eq('status', 'pending');

          if (updateError) {
            console.error('Failed to expire abandoned order:', updateError);
          }
        }

        break;
      }

      default:
        console.warn(`[stripe-webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
