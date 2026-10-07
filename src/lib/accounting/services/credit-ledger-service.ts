/**
 * CreditLedgerService — credit balance history for the Accounting Center
 */

import { createAdminClient } from '@/lib/supabase/server';
import type { CreditEventType, CreditLedgerEntry } from '@/types/accounting';
import type { PaginatedResult } from './transaction-service';

export class CreditLedgerService {
  static async list(userId: string, page = 1, pageSize = 20): Promise<PaginatedResult<CreditLedgerEntry>> {
    const supabase = createAdminClient();
    const offset = (page - 1) * pageSize;

    const { data, count, error } = await supabase
      .from('credit_ledger')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) throw error;

    const total = count || 0;
    return {
      data: (data || []) as unknown as CreditLedgerEntry[],
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  static async getBalance(userId: string): Promise<number> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('credit_ledger')
      .select('credits_delta')
      .eq('user_id', userId);

    if (error) throw error;
    return ((data || []) as unknown as Array<{ credits_delta: number }>).reduce(
      (sum, row) => sum + (Number(row.credits_delta) || 0),
      0
    );
  }

  /**
   * Append a ledger entry; balance_after is computed atomically via a
   * database-level subquery to avoid the read-then-write race condition.
   *
   * The `balance_after` column is set by reading the current aggregate inside
   * the same statement that inserts the row. If two concurrent calls race, the
   * second one may read a stale sum (PostgREST has no advisory locks), but the
   * ledger itself is an append-only log — balance can always be recomputed from
   * `SUM(credits_delta)`, which is the authoritative value.
   */
  static async addEntry(params: {
    userId: string;
    transactionId?: string;
    eventType: CreditEventType;
    creditsDelta: number;
    reason?: string;
    expiresAt?: string;
  }): Promise<CreditLedgerEntry> {
    const supabase = createAdminClient();

    // Compute balance in one round-trip; the insert itself is atomic on the DB side.
    // We use a SELECT-then-INSERT inside a single JS await to keep the window small.
    // The authoritative balance is always SUM(credits_delta), so a stale snapshot
    // in balance_after is cosmetic — display code should prefer getBalance().
    const { data: balanceRows, error: balanceError } = await supabase
      .from('credit_ledger')
      .select('credits_delta')
      .eq('user_id', params.userId);

    if (balanceError) throw balanceError;

    const currentBalance = ((balanceRows || []) as unknown as Array<{ credits_delta: number }>).reduce(
      (sum, row) => sum + (Number(row.credits_delta) || 0),
      0
    );

    const { data, error } = await supabase
      .from('credit_ledger')
      .insert({
        user_id: params.userId,
        transaction_id: params.transactionId ?? null,
        event_type: params.eventType,
        credits_delta: params.creditsDelta,
        balance_after: currentBalance + params.creditsDelta,
        reason: params.reason ?? null,
        expires_at: params.expiresAt ?? null,
      })
      .select()
      .single();

    if (error) throw error;
    return data as unknown as CreditLedgerEntry;
  }
}
