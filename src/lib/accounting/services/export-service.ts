/**
 * ExportService — export financial transactions as CSV / JSON
 */

import { createAdminClient } from '@/lib/supabase/server';
import type {
  ExportFilters,
  ExportFormat,
  FinancialTransaction,
  FinancialTransactionType,
} from '@/types/accounting';

const REFUND_TYPES: FinancialTransactionType[] = ['refund', 'partial_refund'];
const DISPUTE_TYPES: FinancialTransactionType[] = ['chargeback', 'dispute', 'chargeback_reversal'];

const BATCH_SIZE = 1000;

const CSV_COLUMNS: { header: string; key: keyof FinancialTransaction }[] = [
  { header: 'ID', key: 'human_id' },
  { header: 'Date', key: 'occurred_at' },
  { header: 'Type', key: 'transaction_type' },
  { header: 'Status', key: 'transaction_status' },
  { header: 'Payment Status', key: 'payment_status' },
  { header: 'Provider', key: 'source_provider' },
  { header: 'External ID', key: 'external_transaction_id' },
  { header: 'Order ID', key: 'order_id' },
  { header: 'Category', key: 'category_slug' },
  { header: 'Package', key: 'package_code' },
  { header: 'Quantity', key: 'quantity' },
  { header: 'Gross Amount (cents)', key: 'gross_amount' },
  { header: 'Discount (cents)', key: 'discount_amount' },
  { header: 'Tax (cents)', key: 'tax_amount' },
  { header: 'Processor Fee (cents)', key: 'payment_processor_fee' },
  { header: 'Platform Fee (cents)', key: 'platform_fee' },
  { header: 'Net Amount (cents)', key: 'net_amount' },
  { header: 'Currency', key: 'original_currency' },
  { header: 'Settlement Currency', key: 'settlement_currency' },
  { header: 'FX Rate', key: 'fx_rate' },
  { header: 'Payment Method', key: 'payment_method_type' },
  { header: 'Card Brand', key: 'card_brand' },
  { header: 'Card Last4', key: 'card_last4' },
  { header: 'Description', key: 'description' },
];

function escapeCsv(value: unknown): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export class ExportService {
  static async exportTransactions(
    userId: string,
    filters: ExportFilters,
    format: ExportFormat
  ): Promise<{ data: string; filename: string; contentType: string }> {
    const rows = await ExportService.fetchTransactions(userId, filters);
    const stamp = new Date().toISOString().slice(0, 10);

    switch (format) {
      case 'csv': {
        const header = CSV_COLUMNS.map((c) => escapeCsv(c.header)).join(',');
        const lines = rows.map((row) => CSV_COLUMNS.map((c) => escapeCsv(row[c.key])).join(','));
        return {
          data: [header, ...lines].join('\n'),
          filename: `tailorpic-transactions-${stamp}.csv`,
          contentType: 'text/csv; charset=utf-8',
        };
      }
      case 'json':
        return {
          data: JSON.stringify(rows, null, 2),
          filename: `tailorpic-transactions-${stamp}.json`,
          contentType: 'application/json',
        };
      case 'xlsx':
        return {
          data: 'XLSX export is not available yet: it requires an external spreadsheet library. Use CSV or JSON instead.',
          filename: `tailorpic-transactions-${stamp}.txt`,
          contentType: 'text/plain; charset=utf-8',
        };
      case 'pdf':
        return {
          data: 'PDF export is not available yet: it requires an external PDF library. Use CSV or JSON instead.',
          filename: `tailorpic-transactions-${stamp}.txt`,
          contentType: 'text/plain; charset=utf-8',
        };
      default:
        throw new Error(`Unsupported export format: ${String(format)}`);
    }
  }

  private static async fetchTransactions(
    userId: string,
    filters: ExportFilters
  ): Promise<FinancialTransaction[]> {
    const supabase = createAdminClient();
    const all: FinancialTransaction[] = [];

    const excluded: FinancialTransactionType[] = [];
    if (filters.includeRefunds === false) excluded.push(...REFUND_TYPES);
    if (filters.includeDisputes === false) excluded.push(...DISPUTE_TYPES);

    for (let offset = 0; ; offset += BATCH_SIZE) {
      let query = supabase
        .from('financial_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('occurred_at', { ascending: false })
        .order('id', { ascending: true })
        .range(offset, offset + BATCH_SIZE - 1);

      if (filters.dateFrom) query = query.gte('occurred_at', filters.dateFrom);
      if (filters.dateTo) query = query.lte('occurred_at', filters.dateTo);
      if (filters.transactionType?.length) query = query.in('transaction_type', filters.transactionType);
      if (filters.status?.length) query = query.in('transaction_status', filters.status);
      if (filters.category) query = query.eq('category_slug', filters.category);
      if (filters.provider) {
        query = query.eq('source_provider', filters.provider);
      } else if (filters.marketplace) {
        query = query.eq('source_provider', filters.marketplace);
      }
      if (filters.currency) query = query.eq('original_currency', filters.currency);
      if (excluded.length) {
        query = query.not('transaction_type', 'in', `(${excluded.join(',')})`);
      }

      const { data, error } = await query;
      if (error) throw error;

      const batch = (data || []) as unknown as FinancialTransaction[];
      all.push(...batch);
      if (batch.length < BATCH_SIZE) break;
    }

    return all;
  }
}
