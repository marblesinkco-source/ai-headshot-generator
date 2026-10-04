'use client';

import { useCallback, useEffect, useState } from 'react';
import type { BillingProfile, BillingProfileType } from '@/types/accounting';
import { ErrorState, LoadingState, PageHeading, fetchJson, inputClass, unwrap } from '../_components/ui';

interface FormState {
  profile_type: BillingProfileType;
  full_name: string;
  legal_name: string;
  billing_email: string;
  country: string;
  postal_code: string;
  tax_id: string;
  vat_id: string;
}

const EMPTY_FORM: FormState = {
  profile_type: 'individual',
  full_name: '',
  legal_name: '',
  billing_email: '',
  country: '',
  postal_code: '',
  tax_id: '',
  vat_id: '',
};

function toForm(p: Partial<BillingProfile> | null): FormState {
  if (!p) return EMPTY_FORM;
  return {
    profile_type: p.profile_type === 'business' ? 'business' : 'individual',
    full_name: p.full_name ?? '',
    legal_name: p.legal_name ?? '',
    billing_email: p.billing_email ?? '',
    country: p.country ?? '',
    postal_code: p.postal_code ?? '',
    tax_id: p.tax_id ?? '',
    vat_id: p.vat_id ?? '',
  };
}

export default function BillingPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const body = await fetchJson<unknown>('/api/accounting/billing-profile');
      setForm(toForm(unwrap<BillingProfile | null>(body) ?? null));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load billing profile.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);
    setSaved(false);
    try {
      const payload = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, typeof v === 'string' && v.trim() === '' ? null : v]),
      );
      const body = await fetchJson<unknown>('/api/accounting/billing-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const updated = unwrap<BillingProfile | null>(body);
      if (updated && typeof updated === 'object' && 'profile_type' in updated) setForm(toForm(updated));
      setSaved(true);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Could not save billing profile.');
    } finally {
      setSaving(false);
    }
  }

  const label = 'mb-1 block text-sm font-medium text-tp-ink';

  if (loading) {
    return (
      <div>
        <PageHeading title="Billing profile" />
        <LoadingState label="Loading billing profile..." />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <PageHeading title="Billing profile" />
        <ErrorState message={error} onRetry={load} />
      </div>
    );
  }

  return (
    <div>
      <PageHeading title="Billing profile" description="These details appear on your invoices." />

      <form onSubmit={submit} className="max-w-2xl rounded-tp-card border border-tp-line/30 bg-white p-6">
        <fieldset className="mb-6">
          <legend className={label}>Profile type</legend>
          <div className="flex gap-6">
            {(['individual', 'business'] as const).map((t) => (
              <label key={t} className="flex items-center gap-2 text-sm text-tp-ink">
                <input
                  type="radio"
                  name="profile_type"
                  value={t}
                  checked={form.profile_type === t}
                  onChange={() => update('profile_type', t)}
                  className="accent-tp-bronze-ink"
                />
                {t === 'individual' ? 'Individual' : 'Business'}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="full_name" className={label}>Full name</label>
            <input id="full_name" className={inputClass} value={form.full_name} onChange={(e) => update('full_name', e.target.value)} autoComplete="name" />
          </div>
          <div>
            <label htmlFor="legal_name" className={label}>Legal name</label>
            <input id="legal_name" className={inputClass} value={form.legal_name} onChange={(e) => update('legal_name', e.target.value)} autoComplete="organization" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="billing_email" className={label}>Billing email</label>
            <input id="billing_email" type="email" className={inputClass} value={form.billing_email} onChange={(e) => update('billing_email', e.target.value)} autoComplete="email" />
          </div>
          <div>
            <label htmlFor="country" className={label}>Country</label>
            <input id="country" className={inputClass} value={form.country} onChange={(e) => update('country', e.target.value)} autoComplete="country" placeholder="US" />
          </div>
          <div>
            <label htmlFor="postal_code" className={label}>Postal code</label>
            <input id="postal_code" className={inputClass} value={form.postal_code} onChange={(e) => update('postal_code', e.target.value)} autoComplete="postal-code" />
          </div>
          <div>
            <label htmlFor="tax_id" className={label}>Tax ID</label>
            <input id="tax_id" className={inputClass} value={form.tax_id} onChange={(e) => update('tax_id', e.target.value)} />
          </div>
          <div>
            <label htmlFor="vat_id" className={label}>VAT ID</label>
            <input id="vat_id" className={inputClass} value={form.vat_id} onChange={(e) => update('vat_id', e.target.value)} />
          </div>
        </div>

        {saveError ? (
          <p className="mt-4 text-sm text-tp-error" role="alert">{saveError}</p>
        ) : null}
        {saved ? (
          <p className="mt-4 text-sm text-tp-success" role="status">Billing profile saved.</p>
        ) : null}

        <button
          type="submit"
          disabled={saving}
          className="mt-6 rounded-tp-button bg-tp-black px-6 py-2.5 text-sm font-medium text-tp-bronze disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save billing profile'}
        </button>
      </form>
    </div>
  );
}
