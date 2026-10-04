/**
 * AccountingService — overview summary and recent activity for the Accounting Center
 */

import { createAdminClient } from '@/lib/supabase/server';
import type { AccountingSummary, ActivityLogEntry, FinancialTransactionType } from '@/types/accounting';

const GROSS_PURCHASE_TYPES: FinancialTransactionType[] = ['sale', 'one_time_payment'];
const REFUND_TYPES: FinancialTransactionType[] = ['refund', 'partial_refund'];
const SPEND_TYPES: FinancialTransactionType[] = [
  'sale',
  'one_time_payment',
  'subscription_charge',
  'credit_purchase',
  'api_usage_charge',
];
const EXCLUDED_STATUSES = ['failed', 'cancelled'];
const PENDING_TRANSACTION_STATUSES = ['pending', 'authorized', 'processing'];
const PENDING_REFUND_STATUSES = ['requested', 'under_review', 'approved', 'processing'];
const FETCH_PAGE_SIZE = 1000;

interface TxRow {
  transaction_type: FinancialTransactionType;
  transaction_status: string;
  gross_amount: number | string | null;
  occurred_at: string;
}

const toNumber = (value: number | string | null | undefined): number => Number(value ?? 0) || 0;

function humanizeAction(action: string): string {
  const text = action.replace(/[._]+/g, ' ').trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export class AccountingService {
  static async getSummary(userId: string): Promise<AccountingSummary> {
    const supabase = createAdminClient();
    const yearStart = new Date(Date.UTC(new Date().getUTCFullYear(), 0, 1)).getTime();

    // Fetch every transaction row (PostgREST caps a single response, so page through).
    const rows: TxRow[] = [];
    for (let from = 0; ; from += FETCH_PAGE_SIZE) {
      const { data, error } = await supabase
        .from('financial_transactions')
        .select('transaction_type, transaction_status, gross_amount, occurred_at')
        .eq('user_id', userId)
        .order('occurred_at', { ascending: false })
        .range(from, from + FETCH_PAGE_SIZE - 1);
      if (error) throw error;
      const batch = (data || []) as unknown as TxRow[];
      rows.push(...batch);
      if (batch.length < FETCH_PAGE_SIZE) break;
    }

    let totalSpent = 0;
    let totalSpentThisYear = 0;
    let grossPurchases = 0;
    let totalRefunds = 0;
    let pendingTransactions = 0;

    for (const row of rows) {
      const amount = toNumber(row.gross_amount);
      const status = row.transaction_status;

      if (PENDING_TRANSACTION_STATUSES.includes(status)) pendingTransactions += 1;
      if (EXCLUDED_STATUSES.includes(status)) continue;

      if (SPEND_TYPES.includes(row.transaction_type) && !PENDING_TRANSACTION_STATUSES.includes(status)) {
        totalSpent += amount;
        if (new Date(row.occurred_at).getTime() >= yearStart) totalSpentThisYear += amount;
      }
      if (GROSS_PURCHASE_TYPES.includes(row.transaction_type) && !PENDING_TRANSACTION_STATUSES.includes(status)) {
        grossPurchases += amount;
      }
      if (REFUND_TYPES.includes(row.transaction_type)) {
        totalRefunds += Math.abs(amount);
      }
    }

    const [creditsRes, pendingRefundsRes, invoicesRes] = await Promise.all([
      supabase.from('credit_ledger').select('credits_delta').eq('user_id', userId),
      supabase
        .from('refunds')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId)
        .in('status', PENDING_REFUND_STATUSES),
      supabase.from('invoices').select('id', { count: 'exact', head: true }).eq('user_id', userId),
    ]);

    if (creditsRes.error) throw creditsRes.error;
    if (pendingRefundsRes.error) throw pendingRefundsRes.error;
    if (invoicesRes.error) throw invoicesRes.error;

    const availableCredits = ((creditsRes.data || []) as unknown as Array<{ credits_delta: number }>).reduce(
      (sum, row) => sum + toNumber(row.credits_delta),
      0
    );

    return {
      totalSpent,
      totalSpentThisYear,
      grossPurchases,
      totalRefunds,
      netSpend: grossPurchases - totalRefunds,
      availableCredits,
      pendingTransactions,
      pendingRefunds: pendingRefundsRes.count || 0,
      invoiceCount: invoicesRes.count || 0,
      currency: 'usd',
    };
  }

  /** User-facing activity feed built from the audit log, enriched with human IDs from related tables. */
  static async getRecentActivity(userId: string, limit = 10): Promise<ActivityLogEntry[]> {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('financial_audit_log')
      .select('id, action, entity_type, entity_id, created_at')
      .eq('actor_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;

    const entries = (data || []) as unknown as Array<{
      id: string;
      action: string;
      entity_type: string;
      entity_id: string;
      created_at: string;
    }>;

    const tableByEntity: Record<string, string> = {
      transaction: 'financial_transactions',
      financial_transaction: 'financial_transactions',
      invoice: 'invoices',
      receipt: 'receipts',
      refund: 'refunds',
      dispute: 'disputes',
    };

    const idsByTable = new Map<string, string[]>();
    for (const entry of entries) {
      const table = tableByEntity[entry.entity_type];
      if (!table) continue;
      const list = idsByTable.get(table) || [];
      list.push(entry.entity_id);
      idsByTable.set(table, list);
    }

    const humanIds = new Map<string, string>();
    await Promise.all(
      Array.from(idsByTable.entries()).map(async ([table, ids]) => {
        const { data: related, error: relatedError } = await supabase
          .from(table)
          .select('id, human_id')
          .eq('user_id', userId)
          .in('id', ids);
        if (relatedError) throw relatedError;
        for (const row of (related || []) as unknown as Array<{ id: string; human_id: string }>) {
          humanIds.set(`${table}:${row.id}`, row.human_id);
        }
      })
    );

    return entries.map((entry) => {
      const table = tableByEntity[entry.entity_type];
      const humanId = table ? humanIds.get(`${table}:${entry.entity_id}`) : undefined;
      const label = humanizeAction(entry.action);
      return {
        id: entry.id,
        action: entry.action,
        entity_type: entry.entity_type,
        entity_id: entry.entity_id,
        description: humanId ? `${label} — ${humanId}` : label,
        occurred_at: entry.created_at,
      };
    });
  }
}
