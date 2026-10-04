/**
 * TransactionService — CRUD + query for financial_transactions
 */

import { createAdminClient } from '@/lib/supabase/server';
import type { FinancialTransaction, FinancialTransactionStatus, FinancialTransactionType } from '@/types/accounting';

export interface TransactionFilters {
  userId: string;
  search?: string;
  transactionType?: FinancialTransactionType[];
  status?: FinancialTransactionStatus[];
  provider?: string;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  currency?: string;
  orderId?: string;
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export class TransactionService {
  static async list(filters: TransactionFilters): Promise<PaginatedResult<FinancialTransaction>> {
    const supabase = createAdminClient();
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 20;
    const offset = (page - 1) * pageSize;

    let query = supabase
      .from('financial_transactions')
      .select('*', { count: 'exact' })
      .eq('user_id', filters.userId)
      .order('occurred_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (filters.transactionType?.length) {
      query = query.in('transaction_type', filters.transactionType);
    }
    if (filters.status?.length) {
      query = query.in('transaction_status', filters.status);
    }
    if (filters.provider) {
      query = query.eq('source_provider', filters.provider);
    }
    if (filters.dateFrom) {
      query = query.gte('occurred_at', filters.dateFrom);
    }
    if (filters.dateTo) {
      query = query.lte('occurred_at', filters.dateTo);
    }
    if (filters.currency) {
      query = query.eq('original_currency', filters.currency);
    }
    if (filters.orderId) {
      query = query.eq('order_id', filters.orderId);
    }
    if (filters.minAmount !== undefined) {
      query = query.gte('gross_amount', filters.minAmount);
    }
    if (filters.maxAmount !== undefined) {
      query = query.lte('gross_amount', filters.maxAmount);
    }
    if (filters.search) {
      query = query.or(
        `human_id.ilike.%${filters.search}%,description.ilike.%${filters.search}%,external_transaction_id.ilike.%${filters.search}%`
      );
    }

    const { data, count, error } = await query;
    if (error) throw error;

    const total = count || 0;
    return {
      data: (data || []) as unknown as FinancialTransaction[],
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  static async getById(userId: string, id: string): Promise<FinancialTransaction | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('financial_transactions')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data as unknown as FinancialTransaction | null;
  }

  static async getByHumanId(userId: string, humanId: string): Promise<FinancialTransaction | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('financial_transactions')
      .select('*')
      .eq('human_id', humanId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data as unknown as FinancialTransaction | null;
  }

  /** Create a new financial transaction from an order payment */
  static async createFromOrder(params: {
    userId: string;
    orderId: string;
    amount: number;
    currency: string;
    provider: string;
    externalId?: string;
    transactionType?: FinancialTransactionType;
    serviceType?: string;
    categorySlug?: string;
    packageCode?: string;
    quantity?: number;
    paymentMethodType?: string;
    cardBrand?: string;
    cardLast4?: string;
    processorPaymentId?: string;
    processorChargeId?: string;
    description?: string;
  }): Promise<FinancialTransaction> {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('financial_transactions')
      .insert({
        user_id: params.userId,
        order_id: params.orderId,
        source_provider: params.provider,
        external_transaction_id: params.externalId,
        transaction_type: params.transactionType || 'sale',
        service_type: params.serviceType,
        category_slug: params.categorySlug,
        package_code: params.packageCode,
        quantity: params.quantity || 1,
        unit_amount: params.amount,
        gross_amount: params.amount,
        subtotal_amount: params.amount,
        net_amount: params.amount,
        original_amount: params.amount,
        original_currency: params.currency,
        base_reporting_currency: 'usd',
        payment_method_type: params.paymentMethodType,
        card_brand: params.cardBrand,
        card_last4: params.cardLast4,
        processor_payment_id: params.processorPaymentId,
        processor_charge_id: params.processorChargeId,
        payment_status: 'paid',
        transaction_status: 'completed',
        description: params.description,
      })
      .select()
      .single();

    if (error) throw error;
    return data as unknown as FinancialTransaction;
  }

  /** Get recent transactions for overview */
  static async getRecent(userId: string, limit = 5): Promise<FinancialTransaction[]> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('financial_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('occurred_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data || []) as unknown as FinancialTransaction[];
  }
}
