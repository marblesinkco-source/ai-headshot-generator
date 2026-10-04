'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { formatDate, formatPrice } from '@/lib/utils';
import {
  TRANSACTION_STATUS_LABELS,
  TRANSACTION_TYPE_LABELS,
  getTransactionStatusColor,
  type FinancialTransaction,
  type FinancialTransactionStatus,
  type FinancialTransactionType,
} from '@/types/accounting';
import {
  Badge,
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeading,
  Pagination,
  fetchJson,
  inputClass,
  readPageInfo,
  readRows,
  tableCellClass,
  tableHeadClass,
  type PageInfo,
} from '../_components/ui';

const PAGE_SIZE = 20;

interface Filters {
  search: string;
  type: string;
  status: string;
  from: string;
  to: string;
}

const EMPTY_FILTERS: Filters = { search: '', type: '', status: '', from: '', to: '' };

export default function TransactionsPage() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [applied, setApplied] = useState<Filters>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<FinancialTransaction[]>([]);
  const [info, setInfo] = useState<PageInfo>({ total: 0, page: 1, pageSize: PAGE_SIZE, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE) });
      if (applied.search.trim()) params.set('search', applied.search.trim());
      if (applied.type) params.set('type', applied.type);
      if (applied.status) params.set('status', applied.status);
      if (applied.from) params.set('dateFrom', new Date(`${applied.from}T00:00:00`).toISOString());
      if (applied.to) params.set('dateTo', new Date(`${applied.to}T23:59:59.999`).toISOString());
      const body = await fetchJson<unknown>(`/api/accounting/transactions?${params.toString()}`);
      const data = readRows<FinancialTransaction>(body);
      setRows(data);
      setInfo(readPageInfo(body, data.length, PAGE_SIZE));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load transactions.');
    } finally {
      setLoading(false);
    }
  }, [applied, page]);

  useEffect(() => {
    void load();
  }, [load]);

  const hasFilters = Object.values(applied).some(Boolean);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setApplied(filters);
  }

  function reset() {
    setFilters(EMPTY_FILTERS);
    setApplied(EMPTY_FILTERS);
    setPage(1);
  }

  const label = 'mb-1 block text-xs font-medium text-tp-muted';

  return (
    <div>
      <PageHeading title="Transactions" description="Every payment, refund and adjustment on your account." />

      <form onSubmit={submit} className="mb-6 rounded-tp-card border border-tp-line/30 bg-white p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <label htmlFor="tx-search" className={label}>Search</label>
            <input
              id="tx-search"
              type="search"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="ID or description"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="tx-type" className={label}>Type</label>
            <select
              id="tx-type"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className={inputClass}
            >
              <option value="">All types</option>
              {(Object.keys(TRANSACTION_TYPE_LABELS) as FinancialTransactionType[]).map((t) => (
                <option key={t} value={t}>{TRANSACTION_TYPE_LABELS[t]}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tx-status" className={label}>Status</label>
            <select
              id="tx-status"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className={inputClass}
            >
              <option value="">All statuses</option>
              {(Object.keys(TRANSACTION_STATUS_LABELS) as FinancialTransactionStatus[]).map((s) => (
                <option key={s} value={s}>{TRANSACTION_STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:col-span-2 lg:col-span-1">
            <div>
              <label htmlFor="tx-from" className={label}>From</label>
              <input
                id="tx-from"
                type="date"
                value={filters.from}
                max={filters.to || undefined}
                onChange={(e) => setFilters({ ...filters, from: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="tx-to" className={label}>To</label>
              <input
                id="tx-to"
                type="date"
                value={filters.to}
                min={filters.from || undefined}
                onChange={(e) => setFilters({ ...filters, to: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button type="submit" className="rounded-tp-button bg-tp-black px-5 py-2 text-sm font-medium text-tp-bronze">
            Apply filters
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-tp-button border border-tp-line px-5 py-2 text-sm font-medium text-tp-ink hover:bg-tp-paper"
          >
            Reset
          </button>
        </div>
      </form>

      {loading ? (
        <LoadingState label="Loading transactions..." />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : rows.length === 0 ? (
        <EmptyState
          message={
            hasFilters
              ? 'No transactions match these filters.'
              : 'Your transactions will appear here after your first purchase.'
          }
        />
      ) : (
        <>
          <div className="hidden overflow-x-auto rounded-tp-card border border-tp-line/30 bg-white md:block">
            <table className="min-w-full divide-y divide-tp-line/40">
              <thead className="bg-tp-paper">
                <tr>
                  <th className={tableHeadClass}>ID</th>
                  <th className={tableHeadClass}>Description</th>
                  <th className={tableHeadClass}>Type</th>
                  <th className={tableHeadClass}>Amount</th>
                  <th className={tableHeadClass}>Status</th>
                  <th className={tableHeadClass}>Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tp-line/30">
                {rows.map((tx) => (
                  <tr key={tx.id}>
                    <td className={tableCellClass}>
                      <Link href={`/dashboard/accounting/transactions/${tx.id}`} className="font-medium text-tp-bronze-ink hover:underline">
                        {tx.human_id}
                      </Link>
                    </td>
                    <td className={`${tableCellClass} max-w-xs truncate`}>{tx.description ?? '-'}</td>
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
            {rows.map((tx) => (
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
                  {tx.description ? <p className="mt-2 text-sm text-tp-ink">{tx.description}</p> : null}
                  <p className="mt-1 text-xs text-tp-muted">{TRANSACTION_TYPE_LABELS[tx.transaction_type] ?? tx.transaction_type}</p>
                  <div className="mt-1 flex items-center justify-between text-sm text-tp-muted">
                    <span>{formatPrice(tx.gross_amount, tx.original_currency)}</span>
                    <span>{formatDate(tx.occurred_at)}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <Pagination page={info.page} totalPages={info.totalPages} total={info.total} onChange={setPage} />
        </>
      )}
    </div>
  );
}
