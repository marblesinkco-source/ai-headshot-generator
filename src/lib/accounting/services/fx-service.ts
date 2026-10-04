/**
 * FxService — currency conversion records attached to financial transactions
 */

import { createAdminClient } from '@/lib/supabase/server';
import type { FxRecord } from '@/types/accounting';

export class FxService {
  static async getByTransactionId(transactionId: string): Promise<FxRecord[]> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('fx_records')
      .select('*')
      .eq('transaction_id', transactionId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return (data || []) as unknown as FxRecord[];
  }

  static async create(params: {
    transactionId: string;
    originalCurrency: string;
    settlementCurrency: string;
    baseReportingCurrency: string;
    fxRate: number;
    fxProvider?: string;
    fxRateTimestamp?: string;
  }): Promise<FxRecord> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('fx_records')
      .insert({
        transaction_id: params.transactionId,
        original_currency: params.originalCurrency,
        settlement_currency: params.settlementCurrency,
        base_reporting_currency: params.baseReportingCurrency,
        fx_rate: params.fxRate,
        fx_provider: params.fxProvider ?? null,
        fx_rate_timestamp: params.fxRateTimestamp ?? null,
      })
      .select()
      .single();

    if (error) throw error;
    return data as unknown as FxRecord;
  }
}
