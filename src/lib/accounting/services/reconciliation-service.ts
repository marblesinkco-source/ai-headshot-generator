/**
 * ReconciliationService — admin-level reconciliation records (not user-scoped)
 */

import { createAdminClient } from '@/lib/supabase/server';
import type { ReconciliationRecord, ReconciliationStatus } from '@/types/accounting';
import type { PaginatedResult } from './transaction-service';

export class ReconciliationService {
  static async list(page = 1, pageSize = 20): Promise<PaginatedResult<ReconciliationRecord>> {
    const supabase = createAdminClient();
    const offset = (page - 1) * pageSize;

    const { data, count, error } = await supabase
      .from('reconciliation_records')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) throw error;

    const total = count || 0;
    return {
      data: (data || []) as unknown as ReconciliationRecord[],
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  static async getByTransactionId(transactionId: string): Promise<ReconciliationRecord | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('reconciliation_records')
      .select('*')
      .eq('transaction_id', transactionId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data as unknown as ReconciliationRecord | null;
  }

  static async create(params: {
    transactionId: string;
    expectedNet: number;
    providerSettlementAmount: number;
    differenceAmount: number;
    status: ReconciliationStatus;
    notes?: string;
  }): Promise<ReconciliationRecord> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('reconciliation_records')
      .insert({
        transaction_id: params.transactionId,
        expected_net: params.expectedNet,
        provider_settlement_amount: params.providerSettlementAmount,
        difference_amount: params.differenceAmount,
        status: params.status,
        reconciled_at: params.status === 'matched' ? new Date().toISOString() : null,
        notes: params.notes ?? null,
      })
      .select()
      .single();

    if (error) throw error;
    return data as unknown as ReconciliationRecord;
  }
}
