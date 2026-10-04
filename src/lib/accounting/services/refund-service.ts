/**
 * RefundService — refund requests for the Accounting Center
 */

import { createAdminClient } from '@/lib/supabase/server';
import type { Refund } from '@/types/accounting';
import type { PaginatedResult } from './transaction-service';

export class RefundService {
  static async list(userId: string, page = 1, pageSize = 20): Promise<PaginatedResult<Refund>> {
    const supabase = createAdminClient();
    const offset = (page - 1) * pageSize;

    const { data, count, error } = await supabase
      .from('refunds')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('requested_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) throw error;

    const total = count || 0;
    return {
      data: (data || []) as unknown as Refund[],
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  static async getById(userId: string, id: string): Promise<Refund | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('refunds')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data as unknown as Refund | null;
  }

  /** Create a refund request (status 'requested'). */
  static async create(params: {
    userId: string;
    transactionId: string;
    orderId?: string;
    amount: number;
    currency: string;
    reason?: string;
  }): Promise<Refund> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('refunds')
      .insert({
        user_id: params.userId,
        transaction_id: params.transactionId,
        order_id: params.orderId ?? null,
        requested_amount: params.amount,
        currency: params.currency,
        reason: params.reason ?? null,
        status: 'requested',
      })
      .select()
      .single();

    if (error) throw error;
    return data as unknown as Refund;
  }
}
