'use client';

import { useCallback, useEffect, useState } from 'react';
import { cn, formatDate } from '@/lib/utils';
import type { CreditLedgerEntry } from '@/types/accounting';
import {
  Badge,
  Card,
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeading,
  Pagination,
  fetchJson,
  humanize,
  readPageInfo,
  readRows,
  tableCellClass,
  tableHeadClass,
  type PageInfo,
} from '../_components/ui';

const PAGE_SIZE = 20;

function formatDelta(delta: number): string {
  return delta > 0 ? `+${delta}` : String(delta);
}

export default function CreditsPage() {
  const [page, setPage] = useState(1);
  const [balance, setBalance] = useState<number | null>(null);
  const [rows, setRows] = useState<CreditLedgerEntry[]>([]);
  const [info, setInfo] = useState<PageInfo>({ total: 0, page: 1, pageSize: PAGE_SIZE, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const body = await fetchJson<unknown>(`/api/accounting/credits?page=${page}&pageSize=${PAGE_SIZE}`);
      const data = readRows<CreditLedgerEntry>(body);
      setRows(data);
      setInfo(readPageInfo(body, data.length, PAGE_SIZE));
      const b = (body && typeof body === 'object' ? body : {}) as { balance?: unknown };
      setBalance(typeof b.balance === 'number' ? b.balance : data[0]?.balance_after ?? 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load credits.');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    void load();
  }, [load]);

  if (error) {
    return (
      <div>
        <PageHeading title="Credits" />
        <ErrorState message={error} onRetry={load} />
      </div>
    );
  }

  return (
    <div>
      <PageHeading title="Credits" description="Your balance and every change to it." />

      {loading ? (
        <LoadingState label="Loading credits..." />
      ) : (
        <>
          <Card className="mb-8">
            <p className="text-sm text-tp-muted">Current balance</p>
            <p className="mt-2 font-display text-5xl font-normal text-tp-black">{balance ?? 0}</p>
            <p className="mt-1 text-sm text-tp-muted">credits</p>
          </Card>

          {rows.length === 0 ? (
            <EmptyState message="Your credit activity will appear here after your first purchase." />
          ) : (
            <>
              <div className="hidden overflow-hidden rounded-tp-card border border-tp-line/30 bg-white md:block">
                <table className="min-w-full divide-y divide-tp-line/40">
                  <thead className="bg-tp-paper">
                    <tr>
                      <th className={tableHeadClass}>Event</th>
                      <th className={tableHeadClass}>Change</th>
                      <th className={tableHeadClass}>Balance after</th>
                      <th className={tableHeadClass}>Reason</th>
                      <th className={tableHeadClass}>Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-tp-line/30">
                    {rows.map((e) => (
                      <tr key={e.id}>
                        <td className={tableCellClass}>
                          <Badge color="gray">{humanize(e.event_type)}</Badge>
                        </td>
                        <td
                          className={cn(
                            tableCellClass,
                            'font-medium',
                            e.credits_delta >= 0 ? 'text-tp-success' : 'text-tp-error',
                          )}
                        >
                          {formatDelta(e.credits_delta)}
                        </td>
                        <td className={tableCellClass}>{e.balance_after}</td>
                        <td className={tableCellClass}>{e.reason ?? '-'}</td>
                        <td className={tableCellClass}>{formatDate(e.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="space-y-3 md:hidden">
                {rows.map((e) => (
                  <li key={e.id} className="rounded-tp-card border border-tp-line/30 bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <Badge color="gray">{humanize(e.event_type)}</Badge>
                      <span className={cn('text-sm font-medium', e.credits_delta >= 0 ? 'text-tp-success' : 'text-tp-error')}>
                        {formatDelta(e.credits_delta)}
                      </span>
                    </div>
                    {e.reason ? <p className="mt-2 text-sm text-tp-ink">{e.reason}</p> : null}
                    <div className="mt-1 flex justify-between text-sm text-tp-muted">
                      <span>Balance {e.balance_after}</span>
                      <span>{formatDate(e.created_at)}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <Pagination page={info.page} totalPages={info.totalPages} total={info.total} onChange={setPage} />
            </>
          )}
        </>
      )}
    </div>
  );
}
