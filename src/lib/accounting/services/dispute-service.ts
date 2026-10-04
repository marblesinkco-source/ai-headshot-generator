/**
 * DisputeService — read access to disputes for the Accounting Center
 */

import { createAdminClient } from '@/lib/supabase/server';
import type { Dispute } from '@/types/accounting';
import type { PaginatedResult } from './transaction-service';

export class DisputeService {
  static async list(userId: string, page = 1, pageSize = 20): Promise<PaginatedResult<Dispute>> {
    const supabase = createAdminClient();
    const offset = (page - 1) * pageSize;

    const { data, count, error } = await supabase
      .from('disputes')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('opened_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) throw error;

    const total = count || 0;
    return {
      data: (data || []) as unknown as Dispute[],
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  static async getById(userId: string, id: string): Promise<Dispute | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('disputes')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data as unknown as Dispute | null;
  }
}
