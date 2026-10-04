'use client';

import { useState } from 'react';
import { TRANSACTION_TYPE_LABELS, type ExportFormat, type FinancialTransactionType } from '@/types/accounting';
import { PageHeading, inputClass } from '../_components/ui';

const FORMATS: { value: Extract<ExportFormat, 'csv' | 'json'>; label: string }[] = [
  { value: 'csv', label: 'CSV' },
  { value: 'json', label: 'JSON' },
];

const TYPES = Object.keys(TRANSACTION_TYPE_LABELS) as FinancialTransactionType[];

export default function ExportPage() {
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [types, setTypes] = useState<FinancialTransactionType[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function toggleType(t: FinancialTransactionType) {
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setDone(false);
    try {
      const filters: Record<string, unknown> = {};
      if (from) filters.dateFrom = new Date(`${from}T00:00:00`).toISOString();
      if (to) filters.dateTo = new Date(`${to}T23:59:59.999`).toISOString();
      if (types.length > 0) filters.transactionType = types;

      const res = await fetch('/api/accounting/export', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format, filters }),
      });
      if (!res.ok) {
        let message = `Export failed (${res.status})`;
        try {
          const body = (await res.json()) as { error?: unknown };
          if (typeof body.error === 'string') message = body.error;
        } catch {
          /* keep default message */
        }
        throw new Error(message);
      }

      const blob = await res.blob();
      const disposition = res.headers.get('Content-Disposition') ?? '';
      const match = /filename="?([^";]+)"?/i.exec(disposition);
      const filename = match?.[1] ?? `tailorpic-transactions.${format}`;

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed.');
    } finally {
      setBusy(false);
    }
  }

  const label = 'mb-1 block text-sm font-medium text-tp-ink';

  return (
    <div>
      <PageHeading title="Export" description="Download your transactions for bookkeeping or tax filing." />

      <form onSubmit={submit} className="max-w-2xl space-y-6 rounded-tp-card border border-tp-line/30 bg-white p-6">
        <fieldset>
          <legend className={label}>Format</legend>
          <div className="flex gap-6">
            {FORMATS.map((f) => (
              <label key={f.value} className="flex items-center gap-2 text-sm text-tp-ink">
                <input
                  type="radio"
                  name="format"
                  value={f.value}
                  checked={format === f.value}
                  onChange={() => setFormat(f.value)}
                  className="accent-tp-bronze-ink"
                />
                {f.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className={label}>Date range</legend>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="export-from" className="mb-1 block text-xs text-tp-muted">From</label>
              <input id="export-from" type="date" className={inputClass} value={from} max={to || undefined} onChange={(e) => setFrom(e.target.value)} />
            </div>
            <div>
              <label htmlFor="export-to" className="mb-1 block text-xs text-tp-muted">To</label>
              <input id="export-to" type="date" className={inputClass} value={to} min={from || undefined} onChange={(e) => setTo(e.target.value)} />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className={label}>Transaction types</legend>
          <p className="mb-3 text-xs text-tp-muted">Leave all unchecked to include every type.</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {TYPES.map((t) => (
              <label key={t} className="flex items-center gap-2 text-sm text-tp-ink">
                <input
                  type="checkbox"
                  checked={types.includes(t)}
                  onChange={() => toggleType(t)}
                  className="accent-tp-bronze-ink"
                />
                {TRANSACTION_TYPE_LABELS[t]}
              </label>
            ))}
          </div>
        </fieldset>

        {error ? <p className="text-sm text-tp-error" role="alert">{error}</p> : null}
        {done ? <p className="text-sm text-tp-success" role="status">Your export has been downloaded.</p> : null}

        <button
          type="submit"
          disabled={busy}
          className="rounded-tp-button bg-tp-black px-6 py-2.5 text-sm font-medium text-tp-bronze disabled:opacity-60"
        >
          {busy ? 'Preparing export...' : 'Download export'}
        </button>
      </form>
    </div>
  );
}
