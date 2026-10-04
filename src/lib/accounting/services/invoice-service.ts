/**
 * InvoiceService — invoices for the Accounting Center
 */

import { createAdminClient } from '@/lib/supabase/server';
import type { BillingProfile, Invoice } from '@/types/accounting';
import type { PaginatedResult } from './transaction-service';

export class InvoiceService {
  static async list(userId: string, page = 1, pageSize = 20): Promise<PaginatedResult<Invoice>> {
    const supabase = createAdminClient();
    const offset = (page - 1) * pageSize;

    const { data, count, error } = await supabase
      .from('invoices')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('issued_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) throw error;

    const total = count || 0;
    return {
      data: (data || []) as unknown as Invoice[],
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  static async getById(userId: string, id: string): Promise<Invoice | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data as unknown as Invoice | null;
  }

  static async getByTransactionId(userId: string, transactionId: string): Promise<Invoice | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('transaction_id', transactionId)
      .eq('user_id', userId)
      .order('issued_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data as unknown as Invoice | null;
  }

  static async createFromTransaction(params: {
    userId: string;
    transactionId: string;
    orderId?: string;
    subtotal: number;
    discount?: number;
    tax?: number;
    total: number;
    currency: string;
    billingProfileId?: string;
  }): Promise<Invoice> {
    const supabase = createAdminClient();

    let billingProfileSnapshot: Record<string, unknown> | null = null;
    if (params.billingProfileId) {
      const { data: profile, error: profileError } = await supabase
        .from('billing_profiles')
        .select('*')
        .eq('id', params.billingProfileId)
        .eq('user_id', params.userId)
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profile) throw new Error('Billing profile not found');

      const p = profile as unknown as BillingProfile;
      billingProfileSnapshot = {
        profile_id: p.id,
        profile_type: p.profile_type,
        full_name: p.full_name,
        legal_name: p.legal_name,
        billing_email: p.billing_email,
        billing_address: p.billing_address,
        country: p.country,
        postal_code: p.postal_code,
        tax_id: p.tax_id,
        vat_id: p.vat_id,
        company_registration_number: p.company_registration_number,
        snapshot_at: new Date().toISOString(),
      };
    }

    const { data, error } = await supabase
      .from('invoices')
      .insert({
        user_id: params.userId,
        transaction_id: params.transactionId,
        order_id: params.orderId ?? null,
        billing_profile_snapshot: billingProfileSnapshot,
        subtotal: params.subtotal,
        discount: params.discount ?? 0,
        tax: params.tax ?? 0,
        total: params.total,
        currency: params.currency,
      })
      .select()
      .single();

    if (error) throw error;
    return data as unknown as Invoice;
  }
}
