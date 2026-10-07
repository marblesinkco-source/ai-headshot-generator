'use client';

import { useState } from 'react';

const departments = ['General', 'Sales / Enterprise', 'Support', 'Press / Media', 'Partnerships'];

const fieldClass =
  'mt-2 w-full rounded-tp-button border border-tp-line bg-white px-4 py-3 text-sm text-tp-ink focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/40 hover:border-tp-bronze/60 placeholder:text-tp-muted [&:user-invalid]:border-red-600 [&:user-invalid]:ring-red-600/20';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        setError(json.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      form.reset();
      setStatus('success');
    } catch {
      setError('Network error. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-tp-card border border-tp-bronze/30 bg-gradient-to-br from-tp-paper to-tp-beige/20 p-10 text-center shadow-sm">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tp-black text-tp-bronze">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
        </span>
        <h3 className="mt-4 font-display text-xl font-normal text-tp-ink">Message sent</h3>
        <p className="mt-2 text-sm text-tp-muted">Thanks for reaching out. We aim to reply by email within 1 business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} aria-busy={status === 'sending'} className="space-y-6 rounded-tp-card border border-tp-line bg-white p-6 shadow-sm sm:p-10">
      <label className="block text-sm font-medium text-tp-ink">
        Department *
        <select name="department" required defaultValue="General" className={fieldClass}>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </label>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-sm font-medium text-tp-ink">
          Name *
          <input name="name" type="text" required maxLength={100} autoComplete="name" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-tp-ink">
          Email *
          <input name="email" type="email" required placeholder="you@example.com" maxLength={254} autoComplete="email" className={fieldClass} />
        </label>
      </div>
      <label className="block text-sm font-medium text-tp-ink">
        Subject *
        <input name="subject" type="text" required maxLength={200} className={fieldClass} />
      </label>
      <label className="block text-sm font-medium text-tp-ink">
        Message *
        <textarea name="message" required maxLength={5000} rows={6} placeholder="How can we help?" className={fieldClass} />
      </label>
      {status === 'error' && (
        <p role="alert" className="rounded-tp-button border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex w-full sm:w-auto items-center justify-center rounded-tp-button bg-tp-black px-8 py-3.5 text-sm font-semibold text-tp-bronze shadow-sm transition-all hover:bg-tp-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
