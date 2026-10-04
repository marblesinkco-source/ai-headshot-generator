'use client';

import { useCallback, useEffect, useState } from 'react';
import { cn, formatDate, formatPrice } from '@/lib/utils';
import type { Invoice, Receipt } from '@/types/accounting';
import {
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeading,
  Pagination,
  fetchJson,
  readPageInfo,
  readRows,
  tableCellClass,
  tableHeadClass,
  type PageInfo,
} from '../_components/ui';

type DocTab = 'invoices' | 'receipts';
type DocRow = Invoice | Receipt;

const PAGE_SIZE = 20;

const TABS: { key: DocTab; label: string; empty: string }[] = [
  { key: 'invoices', label: 'Invoices', empty: 'Your invoices will appear here after your first purchase.' },
  { key: 'receipts', label: 'Receipts', empty: 'Your receipts will appear here after your first purchase.' },
];

export default function DocumentsPage() {
  const [tab, setTab] = useState<DocTab>('invoices');
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<DocRow[]>([]);
  const [info, setInfo] = useState<PageInfo>({ total: 0, page: 1, pageSize: PAGE_SIZE, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const body = await fetchJson<unknown>(
        `/api/accounting/documents?type=${tab}&page=${page}&pageSize=${PAGE_SIZE}`,
      );
      const data = readRows<DocRow>(body);
      setRows(data);
      setInfo(readPageInfo(body, data.length, PAGE_SIZE));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load documents.');
    } finally {
      setLoading(false);
    }
  }, [tab, page]);

  useEffect(() => {
    void load();
  }, [load]);

  function switchTab(next: DocTab) {
    if (next === tab) return;
    setTab(next);
    setPage(1);
  }

  const current = TABS.find((t) => t.key === tab) ?? TABS[0];

  return (
    <div>
      <PageHeading title="Documents" description="Download invoices and receipts for your purchases." />

      <div role="tablist" aria-label="Document type" className="mb-6 inline-flex rounded-tp-button border border-tp-line bg-white p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => switchTab(t.key)}
            className={cn(
              'rounded-tp-button px-5 py-2 text-sm font-medium transition-colors',
              tab === t.key ? 'bg-tp-black text-tp-bronze' : 'text-tp-muted hover:text-tp-ink',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingState label={`Loading ${current.label.toLowerCase()}...`} />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : rows.length === 0 ? (
        <EmptyState message={current.empty} />
      ) : (
        <>
          <div className="hidden overflow-x-auto rounded-tp-card border border-tp-line/30 bg-white md:block">
            <table className="min-w-full divide-y divide-tp-line/40">
              <thead className="bg-tp-paper">
                <tr>
                  <th className={tableHeadClass}>ID</th>
                  <th className={tableHeadClass}>Amount</th>
                  <th className={tableHeadClass}>Currency</th>
                  <th className={tableHeadClass}>Date</th>
                  <th className={tableHeadClass}>
                    <span className="sr-only">Download</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tp-line/30">
                {rows.map((doc) => (
                  <tr key={doc.id}>
                    <td className={`${tableCellClass} font-medium`}>{doc.human_id}</td>
                    <td className={tableCellClass}>{formatPrice(doc.total, doc.currency)}</td>
                    <td className={tableCellClass}>{doc.currency.toUpperCase()}</td>
                    <td className={tableCellClass}>{formatDate(doc.issued_at)}</td>
                    <td className={`${tableCellClass} text-right`}>
                      {doc.pdf_url ? (
                        <a href={doc.pdf_url} target="_blank" rel="noopener noreferrer" className="font-medium text-tp-bronze-ink hover:underline">
                          PDF
                        </a>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="space-y-3 md:hidden">
            {rows.map((doc) => (
              <li key={doc.id} className="rounded-tp-card border border-tp-line/30 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-tp-ink">{doc.human_id}</span>
                  <span className="text-sm text-tp-ink">{formatPrice(doc.total, doc.currency)}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-sm text-tp-muted">
                  <span>
                    {doc.currency.toUpperCase()} &middot; {formatDate(doc.issued_at)}
                  </span>
                  {doc.pdf_url ? (
                    <a href={doc.pdf_url} target="_blank" rel="noopener noreferrer" className="font-medium text-tp-bronze-ink hover:underline">
                      PDF
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>

          <Pagination page={info.page} totalPages={info.totalPages} total={info.total} onChange={setPage} />
        </>
      )}
    </div>
  );
}
