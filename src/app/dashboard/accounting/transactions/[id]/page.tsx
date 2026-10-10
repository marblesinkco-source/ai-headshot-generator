'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { formatDate, formatPrice } from '@/lib/utils';
import {
  PAYMENT_STATUS_LABELS,
  TRANSACTION_STATUS_LABELS,
  TRANSACTION_TYPE_LABELS,
  getPaymentStatusColor,
  getTransactionStatusColor,
  type FinancialTransaction,
} from '@/types/accounting';
import { Badge, Card, ErrorState, LoadingState, fetchJson, humanize, unwrap } from '../../_components/ui';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card>
      <h2 className="mb-4 font-display text-xl font-normal text-tp-black">{title}</h2>
      <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">{children}</dl>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-sm text-tp-muted">{label}</dt>
      <dd className="mt-0.5 text-sm text-tp-ink">{children ?? '-'}</dd>
    </div>
  );
}

export default function TransactionDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [tx, setTx] = useState<FinancialTransaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const body = await fetchJson<unknown>(`/api/accounting/transactions/${encodeURIComponent(id)}`);
      const data = unwrap<FinancialTransaction | null>(body);
      if (!data) throw new Error('Transaction not found.');
      setTx(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load transaction.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  const back = (
    <Link href="/dashboard/accounting/transactions" className="mb-6 inline-block text-sm font-medium text-tp-bronze-ink hover:underline">
      &larr; Back to transactions
    </Link>
  );

  if (loading) {
    return (
      <div>
        {back}
        <LoadingState label="Loading transaction..." />
      </div>
    );
  }
  if (error || !tx) {
    return (
      <div>
        {back}
        <ErrorState message={error ?? 'Transaction not found.'} onRetry={load} />
      </div>
    );
  }

  const cur = tx.original_currency;
  const money = (cents: number | null | undefined, currency = cur) =>
    typeof cents === 'number' ? formatPrice(cents, currency) : '-';
  const fees =
    (tx.payment_processor_fee ?? 0) +
    (tx.marketplace_fee ?? 0) +
    (tx.platform_fee ?? 0) +
    (tx.fx_fee ?? 0) +
    (tx.dispute_fee ?? 0) +
    (tx.refund_fee ?? 0) +
    (tx.payout_fee ?? 0);

  return (
    <div>
      {back}
      <h2 className="mb-6 font-display text-3xl font-normal text-tp-black">Transaction {tx.human_id}</h2>

      <div className="space-y-6">
        <Section title="Overview">
          <Field label="ID">{tx.human_id}</Field>
          <Field label="Type">{TRANSACTION_TYPE_LABELS[tx.transaction_type] ?? tx.transaction_type}</Field>
          <Field label="Status">
            <Badge color={getTransactionStatusColor(tx.transaction_status)}>
              {TRANSACTION_STATUS_LABELS[tx.transaction_status] ?? tx.transaction_status}
            </Badge>
          </Field>
          <Field label="Payment status">
            <Badge color={getPaymentStatusColor(tx.payment_status)}>
              {PAYMENT_STATUS_LABELS[tx.payment_status] ?? tx.payment_status}
            </Badge>
          </Field>
          <Field label="Date">{formatDate(tx.occurred_at)}</Field>
          <Field label="Description">{tx.description}</Field>
        </Section>

        <Section title="Amounts">
          <Field label="Gross">{money(tx.gross_amount)}</Field>
          <Field label="Discount">{money(tx.discount_amount)}</Field>
          <Field label="Tax">{money(tx.tax_amount)}</Field>
          <Field label="Fees">{money(fees)}</Field>
          <Field label="Net">
            <span className="font-medium">{money(tx.net_amount)}</span>
          </Field>
        </Section>

        <Section title="Payment">
          <Field label="Method">{tx.payment_method_type ? humanize(tx.payment_method_type) : null}</Field>
          <Field label="Card brand">{tx.card_brand ? humanize(tx.card_brand) : null}</Field>
          <Field label="Last 4">{tx.card_last4 ? `**** ${tx.card_last4}` : null}</Field>
        </Section>

        <Section title="Currency">
          <Field label="Original">
            {money(tx.original_amount)} {cur.toUpperCase()}
          </Field>
          <Field label="Settlement">
            {tx.settlement_amount != null && tx.settlement_currency
              ? `${money(tx.settlement_amount, tx.settlement_currency)} ${tx.settlement_currency.toUpperCase()}`
              : null}
          </Field>
          <Field label="FX rate">{tx.fx_rate != null ? String(tx.fx_rate) : null}</Field>
        </Section>
      </div>
    </div>
  );
}
