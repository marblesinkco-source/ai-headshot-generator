'use client';

import { useCallback, useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';
import type { ActivityLogEntry } from '@/types/accounting';
import {
  Badge,
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeading,
  Pagination,
  fetchJson,
  humanize,
  readPageInfo,
  readRows,
  type PageInfo,
} from '../_components/ui';

const PAGE_SIZE = 20;

export default function ActivityPage() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<ActivityLogEntry[]>([]);
  const [info, setInfo] = useState<PageInfo>({ total: 0, page: 1, pageSize: PAGE_SIZE, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const body = await fetchJson<unknown>(`/api/accounting/activity?page=${page}&pageSize=${PAGE_SIZE}`);
      const data = readRows<ActivityLogEntry>(body);
      setRows(data);
      setInfo(readPageInfo(body, data.length, PAGE_SIZE));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load activity.');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div>
      <PageHeading title="Activity" description="A record of changes to your accounting data." />

      {loading ? (
        <LoadingState label="Loading activity..." />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : rows.length === 0 ? (
        <EmptyState message="Your account activity will appear here after your first purchase." />
      ) : (
        <>
          <ol className="relative space-y-4 border-l border-tp-line pl-6">
            {rows.map((a) => (
              <li key={a.id} className="relative">
                <span className="absolute -left-[29px] top-2 h-2.5 w-2.5 rounded-full bg-tp-bronze" aria-hidden="true" />
                <div className="rounded-tp-card border border-tp-line/30 bg-white p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-tp-black">{humanize(a.action)}</span>
                      <Badge color="gray">{humanize(a.entity_type)}</Badge>
                    </div>
                    <time dateTime={a.occurred_at} className="text-sm text-tp-muted">
                      {formatDate(a.occurred_at)}
                    </time>
                  </div>
                  {a.description ? <p className="mt-2 text-sm text-tp-ink">{a.description}</p> : null}
                </div>
              </li>
            ))}
          </ol>
          <Pagination page={info.page} totalPages={info.totalPages} total={info.total} onChange={setPage} />
        </>
      )}
    </div>
  );
}
