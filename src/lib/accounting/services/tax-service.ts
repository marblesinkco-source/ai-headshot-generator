/**
 * TaxService — tax records attached to financial transactions
 */

import { createAdminClient } from '@/lib/supabase/server';
import type { TaxRecord } from '@/types/accounting';

export class TaxService {
  static async getByTransactionId(transactionId: string): Promise<TaxRecord[]> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('tax_records')
      .select('*')
      .eq('transaction_id', transactionId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return (data || []) as unknown as TaxRecord[];
  }

  static async create(params: {
    transactionId: string;
    taxJurisdiction?: string;
    buyerCountry?: string;
    sellerCountry?: string;
    taxType?: string;
    rate?: number;
    taxableBase: number;
    taxAmount: number;
    reverseCharge?: boolean;
    taxIdUsed?: string;
    taxProvider?: string;
    taxReference?: string;
  }): Promise<TaxRecord> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('tax_records')
      .insert({
        transaction_id: params.transactionId,
        tax_jurisdiction: params.taxJurisdiction ?? null,
        buyer_country: params.buyerCountry ?? null,
        seller_country: params.sellerCountry ?? null,
        tax_type: params.taxType ?? null,
        rate: params.rate ?? null,
        taxable_base: params.taxableBase,
        tax_amount: params.taxAmount,
        reverse_charge: params.reverseCharge ?? false,
        tax_id_used: params.taxIdUsed ?? null,
        tax_provider: params.taxProvider ?? null,
        tax_reference: params.taxReference ?? null,
      })
      .select()
      .single();

    if (error) throw error;
    return data as unknown as TaxRecord;
  }
}
