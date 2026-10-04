/**
 * ReceiptService — payment receipts for the Accounting Center
 */

import { createAdminClient } from '@/lib/supabase/server';
import type { Receipt } from '@/types/accounting';
import type { PaginatedResult } from './transaction-service';

export class ReceiptService {
  static async list(userId: string, page = 1, pageSize = 20): Promise<PaginatedResult<Receipt>> {
    const supabase = createAdminClient();
    const offset = (page - 1) * pageSize;

    const { data, count, error } = await supabase
      .from('receipts')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('issued_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) throw error;

    const total = count || 0;
    return {
      data: (data || []) as unknown as Receipt[],
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  static async getById(userId: string, id: string): Promise<Receipt | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('receipts')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data as unknown as Receipt | null;
  }

  static async createFromTransaction(params: {
    userId: string;
    transactionId: string;
    total: number;
    currency: string;
  }): Promise<Receipt> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('receipts')
      .insert({
        user_id: params.userId,
        transaction_id: params.transactionId,
        total: params.total,
        currency: params.currency,
      })
      .select()
      .single();

    if (error) throw error;
    return data as unknown as Receipt;
  }
}
