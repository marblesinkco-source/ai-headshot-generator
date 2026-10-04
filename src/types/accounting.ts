/**
 * TailorPic — Accounting & Transaction Center type definitions.
 * Maps to migration 007_accounting_center.sql
 */

// ── Enums ────────────────────────────────────────────────────────────────────

export type FinancialTransactionType =
  | 'sale'
  | 'one_time_payment'
  | 'subscription_charge'
  | 'credit_purchase'
  | 'credit_usage'
  | 'api_usage_charge'
  | 'refund'
  | 'partial_refund'
  | 'chargeback'
  | 'dispute'
  | 'chargeback_reversal'
  | 'discount'
  | 'tax'
  | 'payment_fee'
  | 'marketplace_fee'
  | 'affiliate_commission'
  | 'fx_fee'
  | 'adjustment'
  | 'payout'
  | 'bank_settlement';

export type FinancialTransactionStatus =
  | 'pending'
  | 'authorized'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'partially_refunded'
  | 'disputed'
  | 'chargeback'
  | 'reversed'
  | 'payout_pending'
  | 'paid_out';

export type FinancialPaymentStatus =
  | 'unpaid'
  | 'pending'
  | 'authorized'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'partially_refunded'
  | 'disputed';

export type FinancialRefundStatus =
  | 'requested'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'processing'
  | 'completed'
  | 'failed';

export type ReconciliationStatus =
  | 'matched'
  | 'partially_matched'
  | 'unmatched'
  | 'investigation_required';

export type ProviderConnectionStatus =
  | 'active'
  | 'inactive'
  | 'error'
  | 'disconnected';

export type WebhookEventStatus =
  | 'received'
  | 'processing'
  | 'processed'
  | 'failed'
  | 'duplicate';

export type BillingProfileType = 'individual' | 'business';

export type PayoutStatus =
  | 'pending'
  | 'in_transit'
  | 'paid'
  | 'failed'
  | 'cancelled';

export type CreditEventType =
  | 'purchase'
  | 'usage'
  | 'refund'
  | 'expiry'
  | 'adjustment'
  | 'transfer';

export type AuditActorType = 'user' | 'system' | 'webhook' | 'admin';

// ── Human-readable ID prefixes ───────────────────────────────────────────────

export const HUMAN_ID_PREFIXES = {
  order: 'ORD',
  transaction: 'TXN',
  invoice: 'INV',
  receipt: 'RCP',
  refund: 'REF',
  dispute: 'DSP',
  payout: 'PAY',
} as const;

export type HumanIdPrefix = typeof HUMAN_ID_PREFIXES[keyof typeof HUMAN_ID_PREFIXES];

/** Generate a human-readable ID on the client side (server uses the DB function). */
export function generateHumanId(prefix: HumanIdPrefix): string {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${year}-${rand}`;
}

// ── Row types (mirrors DB schema) ────────────────────────────────────────────

export interface FinancialTransaction {
  id: string;
  human_id: string;
  user_id: string;
  order_id: string | null;

  // Source
  source_type: string;
  source_provider: string;
  source_account_id: string | null;
  external_transaction_id: string | null;

  // Classification
  transaction_type: FinancialTransactionType;
  service_type: string | null;
  category_slug: string | null;
  package_code: string | null;

  // Amounts (cents)
  quantity: number;
  unit_amount: number;
  gross_amount: number;
  discount_amount: number;
  subtotal_amount: number;
  tax_amount: number;
  withholding_amount: number;
  payment_processor_fee: number;
  marketplace_fee: number;
  platform_fee: number;
  affiliate_commission: number;
  partner_commission: number;
  fx_fee: number;
  dispute_fee: number;
  refund_fee: number;
  payout_fee: number;
  other_adjustment: number;
  net_amount: number;

  // Currency
  original_amount: number;
  original_currency: string;
  settlement_amount: number | null;
  settlement_currency: string | null;
  base_reporting_amount: number | null;
  base_reporting_currency: string;
  fx_rate: number | null;
  fx_rate_timestamp: string | null;
  fx_provider: string | null;

  // Payment method
  payment_method_type: string | null;
  card_brand: string | null;
  card_last4: string | null;
  processor_payment_id: string | null;
  processor_charge_id: string | null;

  // Statuses
  payment_status: FinancialPaymentStatus;
  transaction_status: FinancialTransactionStatus;
  settlement_status: string;

  // Meta
  description: string | null;
  occurred_at: string;
  created_at: string;
  updated_at: string;
}

export interface FinancialEvent {
  id: string;
  transaction_id: string | null;
  provider: string;
  provider_event_id: string | null;
  event_type: string;
  amount: number | null;
  currency: string | null;
  status: string | null;
  occurred_at: string;
  payload_hash: string | null;
  raw_reference: string | null;
  created_at: string;
}

export interface PaymentFee {
  id: string;
  transaction_id: string;
  fee_type: string;
  amount: number;
  currency: string;
  provider_reference: string | null;
  created_at: string;
}

export interface Refund {
  id: string;
  human_id: string;
  user_id: string;
  transaction_id: string | null;
  order_id: string | null;
  external_refund_id: string | null;
  requested_amount: number;
  approved_amount: number;
  refunded_amount: number;
  currency: string;
  reason: string | null;
  status: FinancialRefundStatus;
  requested_at: string;
  approved_at: string | null;
  processed_at: string | null;
  failure_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface Dispute {
  id: string;
  human_id: string;
  user_id: string;
  transaction_id: string | null;
  external_dispute_id: string | null;
  amount: number;
  currency: string;
  reason: string | null;
  status: string;
  opened_at: string;
  due_at: string | null;
  resolved_at: string | null;
  provider: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreditLedgerEntry {
  id: string;
  user_id: string;
  transaction_id: string | null;
  event_type: CreditEventType;
  credits_delta: number;
  balance_after: number;
  reason: string | null;
  expires_at: string | null;
  created_at: string;
}

export interface Invoice {
  id: string;
  human_id: string;
  user_id: string;
  transaction_id: string | null;
  order_id: string | null;
  billing_profile_snapshot: Record<string, unknown> | null;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  currency: string;
  issued_at: string;
  pdf_url: string | null;
  external_invoice_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Receipt {
  id: string;
  human_id: string;
  user_id: string;
  transaction_id: string | null;
  total: number;
  currency: string;
  issued_at: string;
  pdf_url: string | null;
  created_at: string;
}

export interface Payout {
  id: string;
  human_id: string;
  user_id: string;
  provider: string;
  external_payout_id: string | null;
  payout_date: string | null;
  gross_amount: number;
  fees_amount: number;
  adjustments_amount: number;
  net_amount: number;
  currency: string;
  destination_masked: string | null;
  bank_reference: string | null;
  status: PayoutStatus;
  arrival_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface PayoutTransaction {
  payout_id: string;
  transaction_id: string;
  allocated_amount: number;
}

export interface BillingAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
}

export interface BillingProfile {
  id: string;
  user_id: string;
  profile_type: BillingProfileType;
  full_name: string | null;
  legal_name: string | null;
  billing_email: string | null;
  billing_address: BillingAddress | null;
  country: string | null;
  postal_code: string | null;
  tax_id: string | null;
  vat_id: string | null;
  company_registration_number: string | null;
  is_default: boolean;
  valid_from: string;
  valid_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface TaxRecord {
  id: string;
  transaction_id: string;
  tax_jurisdiction: string | null;
  buyer_country: string | null;
  seller_country: string | null;
  tax_type: string | null;
  rate: number | null;
  taxable_base: number;
  tax_amount: number;
  reverse_charge: boolean;
  tax_id_used: string | null;
  tax_provider: string | null;
  tax_reference: string | null;
  created_at: string;
}

export interface FxRecord {
  id: string;
  transaction_id: string;
  original_currency: string;
  settlement_currency: string;
  base_reporting_currency: string;
  fx_rate: number;
  fx_provider: string | null;
  fx_rate_timestamp: string | null;
  created_at: string;
}

export interface ReconciliationRecord {
  id: string;
  transaction_id: string;
  expected_net: number;
  provider_settlement_amount: number;
  difference_amount: number;
  status: ReconciliationStatus;
  reconciled_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProviderConnection {
  id: string;
  user_id: string;
  provider: string;
  account_label: string | null;
  status: ProviderConnectionStatus;
  connected_at: string | null;
  last_sync_at: string | null;
  sync_cursor: string | null;
  sync_error: string | null;
  retry_count: number;
  created_at: string;
  updated_at: string;
}

export interface WebhookEvent {
  id: string;
  provider: string;
  external_event_id: string;
  event_type: string;
  received_at: string;
  processed_at: string | null;
  status: WebhookEventStatus;
  payload_hash: string | null;
  error: string | null;
  created_at: string;
}

export interface FinancialAuditLogEntry {
  id: string;
  actor_id: string | null;
  actor_type: AuditActorType;
  action: string;
  entity_type: string;
  entity_id: string;
  source: string | null;
  request_id: string | null;
  before_hash: string | null;
  after_hash: string | null;
  created_at: string;
}

// ── Overview / Summary types ─────────────────────────────────────────────────

export interface AccountingSummary {
  totalSpent: number;
  totalSpentThisYear: number;
  grossPurchases: number;
  totalRefunds: number;
  netSpend: number;
  availableCredits: number;
  pendingTransactions: number;
  pendingRefunds: number;
  invoiceCount: number;
  currency: string;
}

export interface ActivityLogEntry {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  description: string;
  occurred_at: string;
}

// ── Provider adapter types (Section 18) ──────────────────────────────────────

export interface SyncParams {
  cursor?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export interface NormalizedPayment {
  externalId: string;
  amount: number;
  currency: string;
  status: FinancialPaymentStatus;
  paymentMethod?: {
    type: string;
    brand?: string;
    last4?: string;
  };
  fees?: Array<{ type: string; amount: number; currency: string }>;
  metadata?: Record<string, string>;
  createdAt: string;
}

export interface NormalizedRefund {
  externalId: string;
  paymentId: string;
  amount: number;
  currency: string;
  reason?: string;
  status: string;
  createdAt: string;
}

export interface NormalizedDispute {
  externalId: string;
  paymentId: string;
  amount: number;
  currency: string;
  reason?: string;
  status: string;
  dueDate?: string;
  createdAt: string;
}

export interface NormalizedPayout {
  externalId: string;
  amount: number;
  currency: string;
  status: string;
  arrivalDate?: string;
  destination?: string;
  createdAt: string;
}

export interface NormalizedFee {
  type: string;
  amount: number;
  currency: string;
  paymentId?: string;
}

export interface NormalizedSettlement {
  externalId: string;
  amount: number;
  currency: string;
  transactionIds: string[];
}

export interface VerifiedWebhook {
  eventId: string;
  eventType: string;
  payload: unknown;
}

export interface FinancialEventInput {
  provider: string;
  providerEventId: string;
  eventType: string;
  amount?: number;
  currency?: string;
  status?: string;
  occurredAt: string;
  payloadHash?: string;
  rawReference?: string;
}

/** Payment provider adapter interface — Section 18 */
export interface PaymentProviderAdapter {
  readonly providerName: string;
  getPayment(id: string): Promise<NormalizedPayment>;
  listPayments(params: SyncParams): Promise<NormalizedPayment[]>;
  getRefunds(params: SyncParams): Promise<NormalizedRefund[]>;
  getDisputes(params: SyncParams): Promise<NormalizedDispute[]>;
  getPayouts(params: SyncParams): Promise<NormalizedPayout[]>;
  getFees(params: SyncParams): Promise<NormalizedFee[]>;
  getSettlement(id: string): Promise<NormalizedSettlement | null>;
  verifyWebhook(request: Request): Promise<VerifiedWebhook>;
  normalizeEvent(event: unknown): Promise<FinancialEventInput>;
}

// ── Export types (Section 16) ────────────────────────────────────────────────

export type ExportFormat = 'csv' | 'xlsx' | 'pdf' | 'json';

export interface ExportFilters {
  dateFrom?: string;
  dateTo?: string;
  transactionType?: FinancialTransactionType[];
  status?: FinancialTransactionStatus[];
  category?: string;
  provider?: string;
  currency?: string;
  marketplace?: string;
  includeRefunds?: boolean;
  includeDisputes?: boolean;
}

// ── Status label helpers ─────────────────────────────────────────────────────

export const TRANSACTION_STATUS_LABELS: Record<FinancialTransactionStatus, string> = {
  pending: 'Pending',
  authorized: 'Authorized',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
  partially_refunded: 'Partially Refunded',
  disputed: 'Disputed',
  chargeback: 'Chargeback',
  reversed: 'Reversed',
  payout_pending: 'Payout Pending',
  paid_out: 'Paid Out',
};

export const PAYMENT_STATUS_LABELS: Record<FinancialPaymentStatus, string> = {
  unpaid: 'Unpaid',
  pending: 'Pending',
  authorized: 'Authorized',
  paid: 'Paid',
  failed: 'Failed',
  refunded: 'Refunded',
  partially_refunded: 'Partially Refunded',
  disputed: 'Disputed',
};

export const REFUND_STATUS_LABELS: Record<FinancialRefundStatus, string> = {
  requested: 'Requested',
  under_review: 'Under Review',
  approved: 'Approved',
  rejected: 'Rejected',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
};

export const TRANSACTION_TYPE_LABELS: Record<FinancialTransactionType, string> = {
  sale: 'Sale',
  one_time_payment: 'One-time Payment',
  subscription_charge: 'Subscription',
  credit_purchase: 'Credit Purchase',
  credit_usage: 'Credit Usage',
  api_usage_charge: 'API Usage',
  refund: 'Refund',
  partial_refund: 'Partial Refund',
  chargeback: 'Chargeback',
  dispute: 'Dispute',
  chargeback_reversal: 'Chargeback Reversal',
  discount: 'Discount',
  tax: 'Tax',
  payment_fee: 'Payment Fee',
  marketplace_fee: 'Marketplace Fee',
  affiliate_commission: 'Affiliate Commission',
  fx_fee: 'FX Fee',
  adjustment: 'Adjustment',
  payout: 'Payout',
  bank_settlement: 'Bank Settlement',
};

// ── Status color helpers (for badges) ────────────────────────────────────────

export type StatusColor = 'green' | 'yellow' | 'red' | 'blue' | 'gray';

export function getTransactionStatusColor(status: FinancialTransactionStatus): StatusColor {
  switch (status) {
    case 'completed':
    case 'paid_out':
      return 'green';
    case 'pending':
    case 'authorized':
    case 'processing':
    case 'payout_pending':
      return 'yellow';
    case 'failed':
    case 'cancelled':
    case 'chargeback':
      return 'red';
    case 'refunded':
    case 'partially_refunded':
    case 'reversed':
      return 'blue';
    case 'disputed':
      return 'red';
    default:
      return 'gray';
  }
}

export function getPaymentStatusColor(status: FinancialPaymentStatus): StatusColor {
  switch (status) {
    case 'paid':
      return 'green';
    case 'pending':
    case 'authorized':
      return 'yellow';
    case 'failed':
    case 'disputed':
      return 'red';
    case 'refunded':
    case 'partially_refunded':
      return 'blue';
    case 'unpaid':
    default:
      return 'gray';
  }
}

export function getRefundStatusColor(status: FinancialRefundStatus): StatusColor {
  switch (status) {
    case 'completed':
      return 'green';
    case 'requested':
    case 'under_review':
    case 'processing':
      return 'yellow';
    case 'approved':
      return 'blue';
    case 'rejected':
    case 'failed':
      return 'red';
    default:
      return 'gray';
  }
}
