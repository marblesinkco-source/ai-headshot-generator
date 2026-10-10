import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { Resend } from 'resend';
import { verifyPaddleWebhook, type PaddleTransactionCustomData } from '@/lib/paddle';
import { PACKAGES, type PackageId } from '@/config/packages';
import { getCategoryById, getPackageById, type CategoryId } from '@/config/categories';
import { CREDIT_PACKAGES } from '@/config/credits';
import { getPaddlePriceId } from '@/config/paddle-prices';
import { siteConfig } from '@/config/site';
import {
  buildOrderConfirmationEmail,
  buildPaymentFailedEmail,
  buildRefundConfirmationEmail,
} from '@/lib/emails';
import { nanoid } from 'nanoid';
import { logger } from '@/lib/logger';
import { TransactionService, InvoiceService, ReceiptService } from '@/lib/accounting';

export const maxDuration = 30;

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
    logger.error('[paddle-webhook] Failed to send email:', emailError);
  }
}

/**
 * Paddle webhook types we handle.
 * See: https://developer.paddle.com/webhooks/overview
 */
type PaddleEventType =
  | 'transaction.completed'
  | 'transaction.payment_failed'
  | 'transaction.updated'
  | 'adjustment.created'   // refunds in Paddle
  | 'adjustment.updated';

interface PaddleWebhookEvent {
  event_id: string;
  event_type: PaddleEventType;
  occurred_at: string;
  data: PaddleTransactionData | PaddleAdjustmentData;
}

interface PaddleTransactionData {
  id: string; // txn_...
  status: 'completed' | 'billed' | 'past_due' | 'canceled' | 'draft' | 'ready';
  customer_id?: string;
  currency_code: string;
  details?: {
    totals?: {
      total: string;
      subtotal: string;
      tax: string;
      discount: string;
      grand_total: string;
      fee?: string;
      earnings?: string;
    };
    line_items?: Array<{
      price_id: string;
      quantity: number;
      totals: {
        total: string;
        subtotal: string;
        tax: string;
      };
    }>;
    payout_totals?: {
      total: string;
      fee: string;
      earnings: string;
      currency_code: string;
    };
  };
  payments?: Array<{
    payment_method_id?: string;
    method_details?: {
      type?: string;
      card?: {
        type?: string;
        last4?: string;
      };
    };
    amount: string;
    status: string;
  }>;
  custom_data?: PaddleTransactionCustomData;
  checkout?: {
    url?: string;
  };
  receipt_data?: {
    receipt_url?: string;
  };
  invoice_id?: string;
  invoice_number?: string;
  billing_details?: {
    email?: string;
    name?: string;
  };
  /** Paddle v2 customer object (present on transaction.completed). */
  customer?: {
    id?: string;
    email?: string;
    name?: string;
  };
  created_at: string;
  updated_at: string;
}

interface PaddleAdjustmentData {
  id: string; // adj_...
  transaction_id: string;
  action: 'refund' | 'credit' | 'chargeback' | 'chargeback_warning' | 'chargeback_reverse';
  status: 'pending_approval' | 'approved' | 'rejected' | 'reversed';
  reason: string;
  totals: {
    total: string;
    subtotal: string;
    tax: string;
    currency_code: string;
  };
  payout_totals?: {
    total: string;
    fee: string;
    earnings: string;
    currency_code: string;
  };
  custom_data?: PaddleTransactionCustomData;
  created_at: string;
  updated_at: string;
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('paddle-signature');

    // Verify webhook signature
    const isValid = verifyPaddleWebhook(rawBody, signature);
    if (!isValid) {
      logger.error('[paddle-webhook] Invalid signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const event: PaddleWebhookEvent = JSON.parse(rawBody);

    // ── Event deduplication ────────────────────────────────────────────
    const supabase = createAdminClient();

    const { data: existingEvent } = await supabase
      .from('processed_paddle_events')
      .select('event_id')
      .eq('event_id', event.event_id)
      .maybeSingle();

    if (existingEvent) {
      logger.info(`[paddle-webhook] Duplicate event ${event.event_id} (${event.event_type}) — skipping`);
      return NextResponse.json({ received: true, duplicate: true }, { status: 200 });
    }

    // Claim the event (insert before processing; delete on failure so Paddle can retry)
    const { error: dedupeError } = await supabase
      .from('processed_paddle_events')
      .insert({
        event_id: event.event_id,
        event_type: event.event_type,
      });

    if (dedupeError) {
      if (dedupeError.code === '23505') {
        logger.info(`[paddle-webhook] Race: event ${event.event_id} already claimed`);
        return NextResponse.json({ received: true, duplicate: true }, { status: 200 });
      }
      logger.error('[paddle-webhook] Failed to record event:', dedupeError);
    }

    /** Release the dedupe claim so Paddle can retry on next attempt. */
    async function releaseDedupe() {
      await supabase
        .from('processed_paddle_events')
        .delete()
        .eq('event_id', event.event_id);
    }

    switch (event.event_type) {
      case 'transaction.completed': {
        const txnData = event.data as PaddleTransactionData;
        const customData = txnData.custom_data;

        if (!customData?.orderId || !customData?.packageId || !customData?.userId) {
          logger.error('[paddle-webhook] Missing custom_data in transaction:', txnData.id);
          return NextResponse.json({ received: true }, { status: 200 });
        }

        const { orderId, packageId, userId, orderType, categoryId: catId } = customData;
        const categoryId = (catId || 'headshots') as CategoryId;

        // ── Security: verify that the paid price_id matches the expected one ──
        // custom_data is user-controlled; an attacker could send a lower-priced
        // transaction with a higher-tier packageId in custom_data. We verify
        // the actual Paddle price ID from line_items matches what we expect.
        const paidPriceId = txnData.details?.line_items?.[0]?.price_id;
        const expectedPriceId = getPaddlePriceId(packageId);

        if (expectedPriceId && paidPriceId && paidPriceId !== expectedPriceId) {
          logger.error('[paddle-webhook] Price ID mismatch — possible fraud attempt', {
            orderId,
            packageId,
            paidPriceId,
            expectedPriceId,
            transactionId: txnData.id,
          });
          await releaseDedupe();
          return NextResponse.json(
            { error: 'Price verification failed' },
            { status: 400 }
          );
        }

        // Idempotency: skip if already paid
        const { data: existingOrder } = await supabase
          .from('orders')
          .select('status')
          .eq('id', orderId)
          .single();

        if (existingOrder?.status === 'paid' || existingOrder?.status === 'uploading' || existingOrder?.status === 'processing' || existingOrder?.status === 'completed') {
          return NextResponse.json({ received: true }, { status: 200 });
        }

        // Parse amounts from Paddle (string in minor units)
        const totalAmount = txnData.details?.totals?.grand_total
          ? parseInt(txnData.details.totals.grand_total, 10)
          : 0;

        // Extract payment method info
        const payment = txnData.payments?.[0];
        const paymentMethodType = payment?.method_details?.type || 'card';
        const cardBrand = payment?.method_details?.card?.type;
        const cardLast4 = payment?.method_details?.card?.last4;

        // Update order to paid
        const { error: updateError } = await supabase
          .from('orders')
          .update({
            status: 'paid',
            paddle_transaction_id: txnData.id,
          })
          .eq('id', orderId)
          .eq('user_id', userId);

        if (updateError) {
          logger.error('[paddle-webhook] Failed to update order:', updateError);
          await releaseDedupe();
          return NextResponse.json(
            { error: 'Failed to update order' },
            { status: 500 }
          );
        }

        // Paddle v2: customer.email is the reliable field; billing_details.email
        // may be absent depending on checkout settings.
        const customerEmail =
          txnData.customer?.email || txnData.billing_details?.email;

        // ── Credit package purchase ──────────────────────────────────
        if (orderType === 'credits') {
          const creditCount = parseInt(customData.creditCount || '0', 10);
          const validityDays = parseInt(customData.validityDays || '365', 10);
          const creditPkg = CREDIT_PACKAGES.find((p) => p.id === packageId);

          if (creditCount > 0) {
            const creditId = nanoid();
            const expiresAt = new Date(Date.now() + validityDays * 24 * 60 * 60 * 1000).toISOString();

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
              logger.error('[paddle-webhook] Failed to create credits:', creditError);
              await releaseDedupe();
              return NextResponse.json(
                { error: 'Failed to create credits' },
                { status: 500 }
              );
            }

            await supabase.from('credit_transactions').insert({
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
              await sendEmailSafe(customerEmail, subject, html);
            } catch (emailError) {
              logger.error('[paddle-webhook] Failed to send credit confirmation email:', emailError);
            }
          }

          // Record financial transaction + invoice + receipt (best-effort)
          try {
            const paddleFee = txnData.details?.payout_totals?.fee
              ? parseInt(txnData.details.payout_totals.fee, 10)
              : 0;

            const tx = await TransactionService.createFromOrder({
              userId,
              orderId,
              amount: totalAmount,
              currency: txnData.currency_code.toLowerCase(),
              provider: 'paddle',
              externalId: txnData.id,
              transactionType: 'credit_purchase',
              serviceType: 'credit_purchase',
              categorySlug: categoryId,
              packageCode: packageId,
              quantity: 1,
              paymentMethodType,
              cardBrand,
              cardLast4,
              processorPaymentId: txnData.id,
              processorChargeId: paddleFee > 0 ? `fee:${paddleFee}` : undefined,
              description: `Payment for ${creditPkg?.name || packageId}`,
            });

            const currency = txnData.currency_code.toLowerCase();
            try {
              await InvoiceService.createFromTransaction({
                userId,
                transactionId: tx.id,
                orderId,
                subtotal: totalAmount,
                total: totalAmount,
                currency,
                externalInvoiceId: txnData.invoice_id || undefined,
              });
            } catch (invErr) {
              logger.error('[paddle-webhook] Failed to create invoice:', invErr);
            }
            try {
              await ReceiptService.createFromTransaction({
                userId,
                transactionId: tx.id,
                total: totalAmount,
                currency,
              });
            } catch (rcptErr) {
              logger.error('[paddle-webhook] Failed to create receipt:', rcptErr);
            }
          } catch (txError) {
            logger.error('[paddle-webhook] Failed to record financial transaction:', txError);
          }

          break;
        }

        // ── Category / legacy package purchase ────────────────────────
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
            await sendEmailSafe(customerEmail, subject, html);
          } catch (emailError) {
            logger.error('[paddle-webhook] Failed to send confirmation email:', emailError);
          }
        }

        // Record financial transaction + invoice + receipt (best-effort)
        try {
          const paddleFee = txnData.details?.payout_totals?.fee
            ? parseInt(txnData.details.payout_totals.fee, 10)
            : 0;

          const tx = await TransactionService.createFromOrder({
            userId,
            orderId,
            amount: totalAmount,
            currency: txnData.currency_code.toLowerCase(),
            provider: 'paddle',
            externalId: txnData.id,
            transactionType: 'sale',
            serviceType: 'headshot_generation',
            categorySlug: categoryId,
            packageCode: packageId,
            quantity: 1,
            paymentMethodType,
            cardBrand,
            cardLast4,
            processorPaymentId: txnData.id,
            processorChargeId: paddleFee > 0 ? `fee:${paddleFee}` : undefined,
            description: `Payment for ${pkgName}`,
          });

          const currency = txnData.currency_code.toLowerCase();
          try {
            await InvoiceService.createFromTransaction({
              userId,
              transactionId: tx.id,
              orderId,
              subtotal: totalAmount,
              total: totalAmount,
              currency,
              externalInvoiceId: txnData.invoice_id || undefined,
            });
          } catch (invErr) {
            logger.error('[paddle-webhook] Failed to create invoice:', invErr);
          }
          try {
            await ReceiptService.createFromTransaction({
              userId,
              transactionId: tx.id,
              total: totalAmount,
              currency,
            });
          } catch (rcptErr) {
            logger.error('[paddle-webhook] Failed to create receipt:', rcptErr);
          }
        } catch (txError) {
          logger.error('[paddle-webhook] Failed to record financial transaction:', txError);
        }

        break;
      }

      case 'transaction.payment_failed': {
        const txnData = event.data as PaddleTransactionData;
        const customData = txnData.custom_data;
        const orderId = customData?.orderId;

        if (orderId) {
          const { data: failedOrder } = await supabase
            .from('orders')
            .select('user_id, status, amount, currency, category_id, order_type')
            .eq('id', orderId)
            .single();

          // Only a pending order moves to 'failed'
          if (failedOrder && failedOrder.status !== 'pending') {
            break;
          }

          const { error: updateError } = await supabase
            .from('orders')
            .update({ status: 'failed' })
            .eq('id', orderId)
            .eq('status', 'pending');

          if (updateError) {
            logger.error('[paddle-webhook] Failed to update order status:', updateError);
          } else if (failedOrder) {
            try {
              const customerEmail =
                txnData.customer?.email || txnData.billing_details?.email;
              let recipient = customerEmail;
              if (!recipient) {
                const { data: orderUser } = await supabase.auth.admin.getUserById(failedOrder.user_id);
                recipient = orderUser?.user?.email || undefined;
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
              logger.error('[paddle-webhook] Failed to send payment failed email:', emailError);
            }
          }
        }

        break;
      }

      case 'adjustment.created':
      case 'adjustment.updated': {
        const adjData = event.data as PaddleAdjustmentData;

        // We only handle completed refunds and chargebacks
        if (adjData.status !== 'approved' || (adjData.action !== 'refund' && adjData.action !== 'chargeback')) {
          break;
        }

        // Find order by the transaction_id from the adjustment
        const { data: refundOrder } = await supabase
          .from('orders')
          .select('id, user_id, status, order_type, category_id, amount')
          .eq('paddle_transaction_id', adjData.transaction_id)
          .maybeSingle();

        if (!refundOrder) {
          logger.warn('[paddle-webhook] No order found for adjusted transaction:', adjData.transaction_id);
          break;
        }

        // Determine full vs partial refund
        const refundTotal = adjData.totals?.total
          ? Math.abs(parseInt(adjData.totals.total, 10))
          : 0;
        const isFullRefund = refundTotal >= (refundOrder.amount || 0);
        const refundStatus = isFullRefund ? 'refunded' : 'partial_refund';

        // Idempotent claim: only the first delivery flips the status
        const { data: claimed, error: refundUpdateError } = await supabase
          .from('orders')
          .update({ status: refundStatus })
          .eq('id', refundOrder.id)
          .not('status', 'in', '(refunded)')
          .select('id');

        if (refundUpdateError) {
          logger.error('[paddle-webhook] Failed to mark order refunded:', refundUpdateError);
          await releaseDedupe();
          return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
        }

        const firstDelivery = (claimed?.length ?? 0) > 0;

        // Deactivate credits for fully refunded credit orders
        if (refundOrder.order_type === 'credits' && isFullRefund) {
          const { data: creditRows, error: creditFetchError } = await supabase
            .from('user_credits')
            .select('id, total_credits, used_credits')
            .eq('order_id', refundOrder.id);

          if (creditFetchError) {
            logger.error('[paddle-webhook] Failed to fetch credits for refund:', creditFetchError);
            await releaseDedupe();
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
              logger.error(`[paddle-webhook] Failed to deactivate credit ${row.id}:`, deactivateError);
              await releaseDedupe();
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
              description: `Credits revoked due to ${adjData.action}`,
            });

            if (txError) {
              logger.error('[paddle-webhook] Failed to record credit refund transaction:', txError);
            }
          }
        }

        // Send refund email and record transaction once
        if (firstDelivery) {
          const refundAmount = adjData.totals?.total
            ? parseInt(adjData.totals.total, 10)
            : 0;
          const refundCurrency = adjData.totals?.currency_code?.toLowerCase() || 'usd';

          try {
            // Look up customer email from the original transaction
            const { data: profile } = await supabase
              .from('profiles')
              .select('email')
              .eq('id', refundOrder.user_id)
              .single();

            let recipient = profile?.email;
            if (!recipient) {
              const { data: orderUser } = await supabase.auth.admin.getUserById(refundOrder.user_id);
              recipient = orderUser?.user?.email || undefined;
            }

            if (recipient) {
              const categoryName =
                refundOrder.order_type === 'credits'
                  ? 'Credit Pack'
                  : getCategoryById(refundOrder.category_id as CategoryId)?.name || 'AI Photos';
              const { subject, html } = buildRefundConfirmationEmail({
                orderId: refundOrder.id,
                amount: Math.abs(refundAmount),
                currency: refundCurrency,
                categoryName,
              });
              await sendEmailSafe(recipient, subject, html);
            }
          } catch (emailError) {
            logger.error('[paddle-webhook] Failed to send refund confirmation email:', emailError);
          }

          // Record refund transaction (best-effort)
          try {
            await TransactionService.createFromOrder({
              userId: refundOrder.user_id,
              orderId: refundOrder.id,
              amount: -Math.abs(refundAmount),
              currency: refundCurrency,
              provider: 'paddle',
              externalId: adjData.id,
              transactionType: adjData.action === 'chargeback' ? 'chargeback' : 'refund',
              description: `${adjData.action === 'chargeback' ? 'Chargeback' : 'Refund'} for order ${refundOrder.id}`,
            });
          } catch (txError) {
            logger.error('[paddle-webhook] Failed to record refund transaction:', txError);
          }
        }

        break;
      }

      default:
        logger.warn(`[paddle-webhook] Unhandled event type: ${event.event_type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    logger.error('[paddle-webhook] Webhook handler failed:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
