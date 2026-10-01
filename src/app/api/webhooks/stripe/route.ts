import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/server';
import { Resend } from 'resend';
import { stripe } from '@/lib/stripe';
import { PACKAGES, type PackageId } from '@/config/packages';
import { getCategoryById, getPackageById, type CategoryId } from '@/config/categories';
import { CREDIT_PACKAGES } from '@/config/credits';
import { siteConfig } from '@/config/site';
import {
  buildOrderConfirmationEmail,
  buildPaymentFailedEmail,
  buildRefundConfirmationEmail,
} from '@/lib/emails';
import { nanoid } from 'nanoid';

// Resend throws on construction without a key — only create it when configured.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/** Send an email without ever throwing. Silently skips when RESEND_API_KEY is not set. */
async function sendEmailSafe(to: string, subject: string, html: string): Promise<void> {
  if (!resend) return;
  try {
    await resend.emails.send({
      from: `${siteConfig.name} <noreply@${new URL(siteConfig.url).hostname}>`,
      to,
      subject,
      html,
    });
  } catch (emailError) {
    console.error('[stripe-webhook] Failed to send email:', emailError);
  }
}
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

              await resend?.emails.send({
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

            await resend?.emails.send({
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
          const { data: failedOrder } = await supabase
            .from('orders')
            .select('user_id, status, amount, currency, category_id, order_type')
            .eq('id', orderId)
            .single();

          // Idempotency: Stripe may redeliver or retry — only act when not already failed,
          // and never downgrade an order that has already been paid/processed/refunded.
          // Only a pending order moves to 'failed' (also makes duplicate deliveries no-ops).
          if (failedOrder && failedOrder.status !== 'pending') {
            break;
          }

          const { error: updateError } = await supabase
            .from('orders')
            .update({
              status: 'failed',
            })
            .eq('id', orderId)
            .eq('status', 'pending');

          if (updateError) {
            console.error('Failed to update order status:', updateError);
          } else if (failedOrder) {
            // Notify the customer (best-effort; never fails the webhook)
            try {
              let recipient: string | null | undefined = paymentIntent.receipt_email;
              if (!recipient) {
                const { data: orderUser } = await supabase.auth.admin.getUserById(failedOrder.user_id);
                recipient = orderUser?.user?.email;
              }

              if (recipient) {
                const categoryName =
                  failedOrder.order_type === 'credits'
                    ? 'Credit Pack'
                    : getCategoryById(failedOrder.category_id as CategoryId)?.name || 'AI Photos';
                const { subject, html } = buildPaymentFailedEmail({
                  orderId,
                  categoryName,
                  amount: failedOrder.amount,
                  currency: failedOrder.currency,
                });
                await sendEmailSafe(recipient, subject, html);
              }
            } catch (emailError) {
              console.error('Failed to send payment failed email:', emailError);
            }
          }
        }

        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        const paymentIntentId =
          typeof charge.payment_intent === 'string'
            ? charge.payment_intent
            : charge.payment_intent?.id;

        if (!paymentIntentId) {
          console.warn('[stripe-webhook] charge.refunded without payment_intent:', charge.id);
          break;
        }

        // Only full refunds revoke the order/credits; partial refunds are logged only.
        if (!charge.refunded) {
          console.warn(
            `[stripe-webhook] Partial refund on charge ${charge.id} (${charge.amount_refunded}/${charge.amount}) — no action taken`
          );
          break;
        }

        const { data: refundOrder } = await supabase
          .from('orders')
          .select('id, user_id, status, order_type, category_id')
          .eq('stripe_payment_intent', paymentIntentId)
          .maybeSingle();

        if (!refundOrder) {
          console.warn('[stripe-webhook] No order found for refunded payment intent:', paymentIntentId);
          break;
        }

        // Idempotent claim: only the first delivery flips the status to 'refunded'
        const { data: claimed, error: refundUpdateError } = await supabase
          .from('orders')
          .update({ status: 'refunded' })
          .eq('id', refundOrder.id)
          .neq('status', 'refunded')
          .select('id');

        if (refundUpdateError) {
          console.error('Failed to mark order refunded:', refundUpdateError);
          return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
        }

        const firstDelivery = (claimed?.length ?? 0) > 0;

        // Deactivate credits (idempotent: only touches rows that still have a balance)
        if (refundOrder.order_type === 'credits') {
          const { data: creditRows, error: creditFetchError } = await supabase
            .from('user_credits')
            .select('id, total_credits, used_credits')
            .eq('order_id', refundOrder.id);

          if (creditFetchError) {
            console.error('Failed to fetch credits for refund:', creditFetchError);
            return NextResponse.json({ error: 'Failed to deactivate credits' }, { status: 500 });
          }

          for (const row of creditRows || []) {
            const remaining = row.total_credits - row.used_credits;
            if (remaining <= 0) continue;

            const { error: deactivateError } = await supabase
              .from('user_credits')
              .update({ used_credits: row.total_credits })
              .eq('id', row.id);

            if (deactivateError) {
              console.error(`Failed to deactivate credit ${row.id}:`, deactivateError);
              return NextResponse.json({ error: 'Failed to deactivate credits' }, { status: 500 });
            }

            const { error: txError } = await supabase.from('credit_transactions').insert({
              id: nanoid(),
              user_id: refundOrder.user_id,
              credit_id: row.id,
              order_id: refundOrder.id,
              type: 'refund',
              amount: -remaining,
              balance_after: 0,
              description: 'Credits revoked due to refund',
            });

            if (txError) {
              console.error('Failed to record credit refund transaction:', txError);
            }
          }
        }

        // Send confirmation only once, best-effort
        if (firstDelivery) {
          try {
            let recipient: string | null | undefined =
              charge.billing_details?.email || charge.receipt_email;
            if (!recipient) {
              const { data: orderUser } = await supabase.auth.admin.getUserById(refundOrder.user_id);
              recipient = orderUser?.user?.email;
            }

            if (recipient) {
              const categoryName =
                refundOrder.order_type === 'credits'
                  ? 'Credit Pack'
                  : getCategoryById(refundOrder.category_id as CategoryId)?.name || 'AI Photos';
              const { subject, html } = buildRefundConfirmationEmail({
                customerName: charge.billing_details?.name || undefined,
                orderId: refundOrder.id,
                amount: charge.amount_refunded,
                currency: charge.currency,
                categoryName,
              });
              await sendEmailSafe(recipient, subject, html);
            }
          } catch (emailError) {
            console.error('Failed to send refund confirmation email:', emailError);
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
