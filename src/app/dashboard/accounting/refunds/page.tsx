'use client';

import { useCallback, useEffect, useState } from 'react';
import { formatDate, formatPrice } from '@/lib/utils';
import {
  REFUND_STATUS_LABELS,
  getRefundStatusColor,
  type Dispute,
  type Refund,
  type StatusColor,
} from '@/types/accounting';
import {
  Badge,
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeading,
  fetchJson,
  humanize,
  readRows,
  tableCellClass,
  tableHeadClass,
} from '../_components/ui';

function disputeColor(status: string): StatusColor {
  switch (status) {
    case 'won':
    case 'resolved':
      return 'green';
    case 'lost':
    case 'needs_response':
    case 'warning_needs_response':
      return 'red';
    case 'under_review':
    case 'warning_under_review':
    case 'open':
      return 'yellow';
    default:
      return 'gray';
  }
}

interface Column<T> {
  header: string;
  render: (row: T) => React.ReactNode;
}

function DataSection<T extends { id: string; human_id: string }>({
  title,
  empty,
  rows,
  columns,
}: {
  title: string;
  empty: string;
  rows: T[];
  columns: Column<T>[];
}) {
  return (
    <section aria-label={title}>
      <h2 className="mb-4 font-display text-2xl font-normal text-tp-black">{title}</h2>
      {rows.length === 0 ? (
        <EmptyState message={empty} />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-tp-card border border-tp-line/30 bg-white md:block">
            <table className="min-w-full divide-y divide-tp-line/40">
              <thead className="bg-tp-paper">
                <tr>
                  {columns.map((c) => (
                    <th key={c.header} className={tableHeadClass}>{c.header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-tp-line/30">
                {rows.map((row) => (
                  <tr key={row.id}>
                    {columns.map((c) => (
                      <td key={c.header} className={tableCellClass}>{c.render(row)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="space-y-3 md:hidden">
            {rows.map((row) => (
              <li key={row.id} className="space-y-1 rounded-tp-card border border-tp-line/30 bg-white p-4">
                {columns.map((c) => (
                  <div key={c.header} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-tp-muted">{c.header}</span>
                    <span className="text-tp-ink">{c.render(row)}</span>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default function RefundsPage() {
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [r, d] = await Promise.all([
        fetchJson<unknown>('/api/accounting/refunds'),
        fetchJson<unknown>('/api/accounting/disputes'),
      ]);
      setRefunds(readRows<Refund>(r));
      setDisputes(readRows<Dispute>(d));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load refunds and disputes.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div>
      <PageHeading title="Refunds & Disputes" description="Track refund requests and payment disputes." />
      {loading ? (
        <LoadingState label="Loading refunds and disputes..." />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : (
        <div className="space-y-10">
          <DataSection<Refund>
            title="Refunds"
            empty="You have no refunds."
            rows={refunds}
            columns={[
              { header: 'ID', render: (r) => <span className="font-medium">{r.human_id}</span> },
              { header: 'Requested', render: (r) => formatPrice(r.requested_amount, r.currency) },
              {
                header: 'Status',
                render: (r) => (
                  <Badge color={getRefundStatusColor(r.status)}>{REFUND_STATUS_LABELS[r.status] ?? r.status}</Badge>
                ),
              },
              { header: 'Date', render: (r) => formatDate(r.requested_at) },
            ]}
          />
          <DataSection<Dispute>
            title="Disputes"
            empty="You have no disputes."
            rows={disputes}
            columns={[
              { header: 'ID', render: (d) => <span className="font-medium">{d.human_id}</span> },
              { header: 'Amount', render: (d) => formatPrice(d.amount, d.currency) },
              { header: 'Status', render: (d) => <Badge color={disputeColor(d.status)}>{humanize(d.status)}</Badge> },
              { header: 'Opened', render: (d) => formatDate(d.opened_at) },
            ]}
          />
        </div>
      )}
    </div>
  );
}
