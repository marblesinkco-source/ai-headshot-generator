'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { formatDate, formatPrice } from '@/lib/utils';
import {
  TRANSACTION_STATUS_LABELS,
  TRANSACTION_TYPE_LABELS,
  getTransactionStatusColor,
  type AccountingSummary,
  type FinancialTransaction,
} from '@/types/accounting';
import {
  Badge,
  Card,
  EmptyState,
  ErrorState,
  LoadingState,
  fetchJson,
  readRows,
  tableCellClass,
  tableHeadClass,
  unwrap,
} from '../_components/ui';

export default function AccountingOverviewPage() {
  const [summary, setSummary] = useState<AccountingSummary | null>(null);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [summaryBody, txBody] = await Promise.all([
        fetchJson<unknown>('/api/accounting/summary'),
        fetchJson<unknown>('/api/accounting/transactions?pageSize=5'),
      ]);
      setSummary(unwrap<AccountingSummary>(summaryBody));
      setTransactions(readRows<FinancialTransaction>(txBody));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load accounting overview.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) return <LoadingState label="Loading overview..." />;
  if (error) return <ErrorState message={error} onRetry={load} />;

  const currency = summary?.currency ?? 'usd';
  const cards = [
    { label: 'Total Spent', value: formatPrice(summary?.totalSpent ?? 0, currency) },
    { label: 'Net Spend', value: formatPrice(summary?.netSpend ?? 0, currency) },
    { label: 'Available Credits', value: String(summary?.availableCredits ?? 0) },
    { label: 'Pending Transactions', value: String(summary?.pendingTransactions ?? 0) },
  ];

  return (
    <div className="space-y-10">
      <section aria-label="Summary" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <p className="text-sm text-tp-muted">{card.label}</p>
            <p className="mt-2 text-2xl font-display font-normal text-tp-black">{card.value}</p>
          </Card>
        ))}
      </section>

      <section aria-labelledby="recent-tx">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="recent-tx" className="font-display text-2xl font-normal text-tp-black">
            Recent Transactions
          </h2>
          <Link href="/dashboard/accounting/transactions" className="text-sm font-medium text-tp-bronze-ink hover:underline">
            View all
          </Link>
        </div>

        {transactions.length === 0 ? (
          <EmptyState message="Your transactions will appear here after your first purchase." />
        ) : (
          <>
            <div className="hidden overflow-hidden rounded-tp-card border border-tp-line/30 bg-white md:block">
              <table className="min-w-full divide-y divide-tp-line/40">
                <thead className="bg-tp-paper">
                  <tr>
                    <th className={tableHeadClass}>ID</th>
                    <th className={tableHeadClass}>Type</th>
                    <th className={tableHeadClass}>Amount</th>
                    <th className={tableHeadClass}>Status</th>
                    <th className={tableHeadClass}>Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-tp-line/30">
                  {transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className={tableCellClass}>
                        <Link href={`/dashboard/accounting/transactions/${tx.id}`} className="font-medium text-tp-bronze-ink hover:underline">
                          {tx.human_id}
                        </Link>
                      </td>
                      <td className={tableCellClass}>{TRANSACTION_TYPE_LABELS[tx.transaction_type] ?? tx.transaction_type}</td>
                      <td className={tableCellClass}>{formatPrice(tx.gross_amount, tx.original_currency)}</td>
                      <td className={tableCellClass}>
                        <Badge color={getTransactionStatusColor(tx.transaction_status)}>
                          {TRANSACTION_STATUS_LABELS[tx.transaction_status] ?? tx.transaction_status}
                        </Badge>
                      </td>
                      <td className={tableCellClass}>{formatDate(tx.occurred_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="space-y-3 md:hidden">
              {transactions.map((tx) => (
                <li key={tx.id}>
                  <Link
                    href={`/dashboard/accounting/transactions/${tx.id}`}
                    className="block rounded-tp-card border border-tp-line/30 bg-white p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-tp-bronze-ink">{tx.human_id}</span>
                      <Badge color={getTransactionStatusColor(tx.transaction_status)}>
                        {TRANSACTION_STATUS_LABELS[tx.transaction_status] ?? tx.transaction_status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-tp-ink">{TRANSACTION_TYPE_LABELS[tx.transaction_type] ?? tx.transaction_type}</p>
                    <div className="mt-1 flex items-center justify-between text-sm text-tp-muted">
                      <span>{formatPrice(tx.gross_amount, tx.original_currency)}</span>
                      <span>{formatDate(tx.occurred_at)}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
