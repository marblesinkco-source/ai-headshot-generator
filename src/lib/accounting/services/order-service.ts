/**
 * OrderService — financial view of an order
 */

import { createAdminClient } from '@/lib/supabase/server';
import type { FinancialTransaction, Invoice, Receipt } from '@/types/accounting';

export interface OrderWithFinancials {
  order: Record<string, unknown>;
  transactions: FinancialTransaction[];
  invoices: Invoice[];
  receipts: Receipt[];
}

export class OrderService {
  static async getOrderTransactions(userId: string, orderId: string): Promise<FinancialTransaction[]> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('financial_transactions')
      .select('*')
      .eq('user_id', userId)
      .eq('order_id', orderId)
      .order('occurred_at', { ascending: false });

    if (error) throw error;
    return (data || []) as unknown as FinancialTransaction[];
  }

  static async getOrderWithFinancials(userId: string, orderId: string): Promise<OrderWithFinancials | null> {
    const supabase = createAdminClient();

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', userId)
      .maybeSingle();

    if (orderError) throw orderError;
    if (!order) return null;

    const transactions = await OrderService.getOrderTransactions(userId, orderId);
    const transactionIds = transactions.map((t) => t.id);

    const invoicesQuery = supabase
      .from('invoices')
      .select('*')
      .eq('user_id', userId)
      .eq('order_id', orderId)
      .order('issued_at', { ascending: false });

    const receiptsPromise = transactionIds.length
      ? supabase
          .from('receipts')
          .select('*')
          .eq('user_id', userId)
          .in('transaction_id', transactionIds)
          .order('issued_at', { ascending: false })
      : Promise.resolve({ data: [], error: null });

    const [invoicesRes, receiptsRes] = await Promise.all([invoicesQuery, receiptsPromise]);
    if (invoicesRes.error) throw invoicesRes.error;
    if (receiptsRes.error) throw receiptsRes.error;

    return {
      order: order as unknown as Record<string, unknown>,
      transactions,
      invoices: (invoicesRes.data || []) as unknown as Invoice[],
      receipts: (receiptsRes.data || []) as unknown as Receipt[],
    };
  }
}
