'use client';

import { useState } from 'react';

const fieldClass =
  'mt-1 w-full rounded-xl border border-tp-line bg-white px-4 py-2.5 text-sm text-tp-ink focus:border-tp-bronze focus:outline-none focus:ring-2 focus:ring-tp-bronze/30';

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
      <div role="status" className="rounded-2xl border border-tp-line bg-white p-8 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-tp-ink">Message sent</h3>
        <p className="mt-2 text-sm text-tp-muted">Thanks for reaching out. We will get back to you by email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-tp-line bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-tp-ink">
          Name
          <input name="name" type="text" required maxLength={100} autoComplete="name" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-tp-ink">
          Email
          <input name="email" type="email" required maxLength={254} autoComplete="email" className={fieldClass} />
        </label>
      </div>
      <label className="block text-sm font-medium text-tp-ink">
        Subject
        <input name="subject" type="text" required maxLength={200} className={fieldClass} />
      </label>
      <label className="block text-sm font-medium text-tp-ink">
        Message
        <textarea name="message" required maxLength={5000} rows={6} className={fieldClass} />
      </label>
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-600">{error}</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center rounded-xl bg-tp-black px-8 py-3 text-sm font-semibold text-tp-bronze shadow-sm transition-all hover:bg-tp-black/90 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
