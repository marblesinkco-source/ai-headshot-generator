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

  /** Append a ledger entry; balance_after is computed from the current balance. */
  static async addEntry(params: {
    userId: string;
    transactionId?: string;
    eventType: CreditEventType;
    creditsDelta: number;
    reason?: string;
    expiresAt?: string;
  }): Promise<CreditLedgerEntry> {
    const supabase = createAdminClient();
    const currentBalance = await CreditLedgerService.getBalance(params.userId);

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
