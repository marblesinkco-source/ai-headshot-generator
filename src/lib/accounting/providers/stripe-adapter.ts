/**
 * Legacy Stripe Payment Provider Adapter
 *
 * Retained ONLY for historical transaction lookups (orders placed before
 * the Paddle migration). All new payments go through PaddleAdapter.
 *
 * The adapter guards every API call behind getStripe() — if STRIPE_SECRET_KEY
 * is not configured the methods throw a clear error instead of crashing.
 *
 * @deprecated Use PaddleAdapter for all new payment operations.
 */

import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';

function requireStripe(): import('stripe').default {
  const client = getStripe();
  if (!client) {
    throw new Error(
      'StripeAdapter called but STRIPE_SECRET_KEY is not configured. ' +
      'This adapter is for historical lookups only.'
    );
  }
  return client;
}
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

function mapStripeStatus(status: string | null): FinancialPaymentStatus {
  switch (status) {
    case 'succeeded':
      return 'paid';
    case 'requires_payment_method':
    case 'requires_confirmation':
    case 'requires_action':
      return 'pending';
    case 'processing':
      return 'pending';
    case 'canceled':
      return 'failed';
    default:
      return 'pending';
  }
}

function mapChargeToPayment(charge: Stripe.Charge): NormalizedPayment {
  const pm = charge.payment_method_details;
  return {
    externalId: charge.id,
    amount: charge.amount,
    currency: charge.currency,
    status: charge.refunded
      ? 'refunded'
      : charge.disputed
        ? 'disputed'
        : charge.paid
          ? 'paid'
          : 'pending',
    paymentMethod: pm?.card
      ? {
          type: 'card',
          brand: pm.card.brand ?? undefined,
          last4: pm.card.last4 ?? undefined,
        }
      : pm?.type
        ? { type: pm.type }
        : undefined,
    fees: charge.balance_transaction && typeof charge.balance_transaction === 'object'
      ? (charge.balance_transaction as Stripe.BalanceTransaction).fee_details?.map((f) => ({
          type: f.type,
          amount: f.amount,
          currency: f.currency,
        }))
      : undefined,
    metadata: charge.metadata as Record<string, string>,
    createdAt: new Date(charge.created * 1000).toISOString(),
  };
}

export class StripeAdapter implements PaymentProviderAdapter {
  readonly providerName = 'stripe';

  async getPayment(id: string): Promise<NormalizedPayment> {
    // Try charge first, then payment intent
    if (id.startsWith('ch_')) {
      const charge = await requireStripe().charges.retrieve(id, {
        expand: ['balance_transaction'],
      });
      return mapChargeToPayment(charge);
    }

    const pi = await requireStripe().paymentIntents.retrieve(id, {
      expand: ['latest_charge.balance_transaction'],
    });
    const charge = pi.latest_charge as Stripe.Charge | null;
    if (charge) {
      return mapChargeToPayment(charge);
    }

    return {
      externalId: pi.id,
      amount: pi.amount,
      currency: pi.currency,
      status: mapStripeStatus(pi.status),
      metadata: pi.metadata as Record<string, string>,
      createdAt: new Date(pi.created * 1000).toISOString(),
    };
  }

  async listPayments(params: SyncParams): Promise<NormalizedPayment[]> {
    const listParams: Stripe.ChargeListParams = {
      limit: params.limit || 100,
    };

    if (params.startDate) {
      listParams.created = {
        ...(listParams.created as Stripe.RangeQueryParam || {}),
        gte: Math.floor(new Date(params.startDate).getTime() / 1000),
      };
    }
    if (params.endDate) {
      listParams.created = {
        ...(listParams.created as Stripe.RangeQueryParam || {}),
        lte: Math.floor(new Date(params.endDate).getTime() / 1000),
      };
    }
    if (params.cursor) {
      listParams.starting_after = params.cursor;
    }

    const charges = await requireStripe().charges.list(listParams);
    return charges.data.map(mapChargeToPayment);
  }

  async getRefunds(params: SyncParams): Promise<NormalizedRefund[]> {
    const listParams: Stripe.RefundListParams = {
      limit: params.limit || 100,
    };
    if (params.cursor) {
      listParams.starting_after = params.cursor;
    }

    const refunds = await requireStripe().refunds.list(listParams);
    return refunds.data.map((r) => ({
      externalId: r.id,
      paymentId: typeof r.charge === 'string' ? r.charge : r.charge?.id || '',
      amount: r.amount,
      currency: r.currency,
      reason: r.reason ?? undefined,
      status: r.status || 'pending',
      createdAt: new Date(r.created * 1000).toISOString(),
    }));
  }

  async getDisputes(params: SyncParams): Promise<NormalizedDispute[]> {
    const listParams: Stripe.DisputeListParams = {
      limit: params.limit || 100,
    };
    if (params.cursor) {
      listParams.starting_after = params.cursor;
    }

    const disputes = await requireStripe().disputes.list(listParams);
    return disputes.data.map((d) => ({
      externalId: d.id,
      paymentId: typeof d.charge === 'string' ? d.charge : d.charge?.id || '',
      amount: d.amount,
      currency: d.currency,
      reason: d.reason ?? undefined,
      status: d.status,
      dueDate: d.evidence_details?.due_by
        ? new Date(d.evidence_details.due_by * 1000).toISOString()
        : undefined,
      createdAt: new Date(d.created * 1000).toISOString(),
    }));
  }

  async getPayouts(params: SyncParams): Promise<NormalizedPayout[]> {
    const listParams: Stripe.PayoutListParams = {
      limit: params.limit || 100,
    };
    if (params.cursor) {
      listParams.starting_after = params.cursor;
    }

    const payouts = await requireStripe().payouts.list(listParams);
    return payouts.data.map((p) => ({
      externalId: p.id,
      amount: p.amount,
      currency: p.currency,
      status: p.status,
      arrivalDate: p.arrival_date
        ? new Date(p.arrival_date * 1000).toISOString()
        : undefined,
      destination: typeof p.destination === 'string'
        ? p.destination
        : undefined,
      createdAt: new Date(p.created * 1000).toISOString(),
    }));
  }

  async getFees(params: SyncParams): Promise<NormalizedFee[]> {
    const listParams: Stripe.BalanceTransactionListParams = {
      limit: params.limit || 100,
    };
    if (params.cursor) {
      listParams.starting_after = params.cursor;
    }

    const txns = await requireStripe().balanceTransactions.list(listParams);
    const fees: NormalizedFee[] = [];
    for (const bt of txns.data) {
      for (const fd of bt.fee_details || []) {
        fees.push({
          type: fd.type,
          amount: fd.amount,
          currency: fd.currency,
          paymentId: bt.source ?? undefined,
        });
      }
    }
    return fees;
  }

  async getSettlement(id: string): Promise<NormalizedSettlement | null> {
    try {
      const payout = await requireStripe().payouts.retrieve(id);
      // Stripe doesn't directly expose which transactions are in a payout
      // via the basic API — would need balance_transactions with payout filter
      return {
        externalId: payout.id,
        amount: payout.amount,
        currency: payout.currency,
        transactionIds: [],
      };
    } catch {
      return null;
    }
  }

  async verifyWebhook(request: Request): Promise<VerifiedWebhook> {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    if (!signature) {
      throw new Error('Missing stripe-signature header');
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    const event = requireStripe().webhooks.constructEvent(body, signature, webhookSecret);

    return {
      eventId: event.id,
      eventType: event.type,
      payload: event.data.object,
    };
  }

  async normalizeEvent(event: unknown): Promise<FinancialEventInput> {
    const stripeEvent = event as Stripe.Event;
    const obj = stripeEvent.data.object as Record<string, unknown>;

    return {
      provider: 'stripe',
      providerEventId: stripeEvent.id,
      eventType: stripeEvent.type,
      amount: typeof obj.amount === 'number' ? obj.amount : undefined,
      currency: typeof obj.currency === 'string' ? obj.currency : undefined,
      status: typeof obj.status === 'string' ? obj.status : undefined,
      occurredAt: new Date(stripeEvent.created * 1000).toISOString(),
      rawReference: typeof obj.id === 'string' ? obj.id : undefined,
    };
  }
}
