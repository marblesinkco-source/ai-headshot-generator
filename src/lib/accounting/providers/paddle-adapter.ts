/**
 * Paddle Payment Provider Adapter
 * Implements PaymentProviderAdapter for Paddle Billing API.
 *
 * Paddle is a Merchant of Record: it handles tax, VAT, compliance, and invoicing.
 * Paddle amounts are in the smallest currency unit (cents) as strings in API responses.
 */

import { getPaddle, verifyPaddleWebhook } from '@/lib/paddle';
import type {
  PaymentProviderAdapter,
  SyncParams,
  NormalizedPayment,
  NormalizedRefund,
  NormalizedDispute,
  NormalizedPayout,
  NormalizedFee,
  NormalizedSettlement,
  VerifiedWebhook,
  FinancialEventInput,
  FinancialPaymentStatus,
} from '@/types/accounting';

function mapPaddleStatus(status: string): FinancialPaymentStatus {
  switch (status) {
    case 'completed':
    case 'billed':
      return 'paid';
    case 'past_due':
      return 'pending';
    case 'canceled':
      return 'failed';
    case 'draft':
    case 'ready':
      return 'pending';
    default:
      return 'pending';
  }
}

export class PaddleAdapter implements PaymentProviderAdapter {
  readonly providerName = 'paddle';

  async getPayment(id: string): Promise<NormalizedPayment> {
    const txn = await getPaddle().transactions.get(id);

    const payment = (txn as { payments?: Array<{ method_details?: { type?: string; card?: { type?: string; last4?: string } } }> }).payments?.[0];

    return {
      externalId: txn.id,
      amount: txn.details?.totals?.grandTotal
        ? parseInt(String(txn.details.totals.grandTotal), 10)
        : 0,
      currency: (txn.currencyCode || 'usd').toLowerCase(),
      status: mapPaddleStatus(txn.status || 'pending'),
      paymentMethod: payment?.method_details?.card
        ? {
            type: 'card',
            brand: payment.method_details.card.type ?? undefined,
            last4: payment.method_details.card.last4 ?? undefined,
          }
        : payment?.method_details?.type
          ? { type: payment.method_details.type }
          : undefined,
      fees: txn.details?.payoutTotals?.fee
        ? [{
            type: 'paddle_fee',
            amount: parseInt(String(txn.details.payoutTotals.fee), 10),
            currency: (txn.details.payoutTotals.currencyCode || 'usd').toLowerCase(),
          }]
        : undefined,
      metadata: (txn.customData || {}) as Record<string, string>,
      createdAt: txn.createdAt || new Date().toISOString(),
    };
  }

  async listPayments(params: SyncParams): Promise<NormalizedPayment[]> {
    // Paddle SDK list method
    const collection = getPaddle().transactions.list({
      ...(params.cursor ? { after: params.cursor } : {}),
    });

    const results: NormalizedPayment[] = [];
    let count = 0;
    const limit = params.limit || 100;

    for await (const txn of collection) {
      if (count >= limit) break;

      // Filter by date if provided
      const createdAt = txn.createdAt || '';
      if (params.startDate && createdAt < params.startDate) continue;
      if (params.endDate && createdAt > params.endDate) continue;

      results.push({
        externalId: txn.id,
        amount: txn.details?.totals?.grandTotal
          ? parseInt(String(txn.details.totals.grandTotal), 10)
          : 0,
        currency: (txn.currencyCode || 'usd').toLowerCase(),
        status: mapPaddleStatus(txn.status || 'pending'),
        metadata: (txn.customData || {}) as Record<string, string>,
        createdAt,
      });
      count++;
    }

    return results;
  }

  async getRefunds(params: SyncParams): Promise<NormalizedRefund[]> {
    // Paddle calls refunds "adjustments"
    const collection = getPaddle().adjustments.list({
      action: ['refund'] as unknown as string,
      ...(params.cursor ? { after: params.cursor } : {}),
    });

    const results: NormalizedRefund[] = [];
    let count = 0;
    const limit = params.limit || 100;

    for await (const adj of collection) {
      if (count >= limit) break;

      results.push({
        externalId: adj.id,
        paymentId: adj.transactionId || '',
        amount: adj.totals?.total
          ? parseInt(String(adj.totals.total), 10)
          : 0,
        currency: (adj.totals?.currencyCode || 'usd').toLowerCase(),
        reason: adj.reason ?? undefined,
        status: adj.status || 'pending',
        createdAt: adj.createdAt || new Date().toISOString(),
      });
      count++;
    }

    return results;
  }

  async getDisputes(_params: SyncParams): Promise<NormalizedDispute[]> {
    // Paddle handles disputes as adjustments with action 'chargeback'
    // The Paddle SDK doesn't have a dedicated disputes endpoint
    // Chargebacks come through adjustment webhooks
    return [];
  }

  async getPayouts(_params: SyncParams): Promise<NormalizedPayout[]> {
    // Paddle handles payouts internally as MoR
    // Payouts are managed by Paddle and reported via dashboard/reports
    // The SDK doesn't expose a payouts listing endpoint
    return [];
  }

  async getFees(params: SyncParams): Promise<NormalizedFee[]> {
    // Paddle fees are embedded in transaction payout_totals
    const payments = await this.listPayments(params);
    return payments
      .filter((p) => p.fees && p.fees.length > 0)
      .flatMap((p) =>
        (p.fees || []).map((f) => ({
          ...f,
          paymentId: p.externalId,
        }))
      );
  }

  async getSettlement(_id: string): Promise<NormalizedSettlement | null> {
    // Paddle manages settlements internally as MoR
    return null;
  }

  async verifyWebhook(request: Request): Promise<VerifiedWebhook> {
    const body = await request.text();
    const signature = request.headers.get('paddle-signature');

    const isValid = await verifyPaddleWebhook(body, signature);
    if (!isValid) {
      throw new Error('Invalid Paddle webhook signature');
    }

    const event = JSON.parse(body);

    return {
      eventId: event.event_id,
      eventType: event.event_type,
      payload: event.data,
    };
  }

  async normalizeEvent(event: unknown): Promise<FinancialEventInput> {
    const paddleEvent = event as {
      event_id: string;
      event_type: string;
      occurred_at: string;
      data: {
        id: string;
        status?: string;
        currency_code?: string;
        details?: {
          totals?: {
            grand_total?: string;
          };
        };
      };
    };

    const data = paddleEvent.data;

    return {
      provider: 'paddle',
      providerEventId: paddleEvent.event_id,
      eventType: paddleEvent.event_type,
      amount: data.details?.totals?.grand_total
        ? parseInt(data.details.totals.grand_total, 10)
        : undefined,
      currency: data.currency_code?.toLowerCase(),
      status: data.status,
      occurredAt: paddleEvent.occurred_at || new Date().toISOString(),
      rawReference: data.id,
    };
  }
}
