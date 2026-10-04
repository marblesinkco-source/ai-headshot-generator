/**
 * PayoutService — read access to payouts and their linked transactions
 */

import { createAdminClient } from '@/lib/supabase/server';
import type { Payout, PayoutTransaction } from '@/types/accounting';
import type { PaginatedResult } from './transaction-service';

export class PayoutService {
  static async list(userId: string, page = 1, pageSize = 20): Promise<PaginatedResult<Payout>> {
    const supabase = createAdminClient();
    const offset = (page - 1) * pageSize;

    const { data, count, error } = await supabase
      .from('payouts')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) throw error;

    const total = count || 0;
    return {
      data: (data || []) as unknown as Payout[],
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  static async getById(userId: string, id: string): Promise<Payout | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('payouts')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data as unknown as Payout | null;
  }

  static async getTransactions(payoutId: string): Promise<PayoutTransaction[]> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('payout_transactions')
      .select('*')
      .eq('payout_id', payoutId);

    if (error) throw error;
    return (data || []) as unknown as PayoutTransaction[];
  }
}
