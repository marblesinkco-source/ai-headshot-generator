'use client';

import { useState } from 'react';

const teamSizes = ['1–5', '6–15', '16–50', '51–200', '200+'];

const fieldClass =
  'mt-2 w-full rounded-tp-button border border-tp-line bg-white px-4 py-3 text-sm text-tp-ink focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/40 hover:border-tp-bronze/60 placeholder:text-tp-muted [&:user-invalid]:border-red-500 [&:user-invalid]:ring-red-500/20';

interface EnterpriseLeadFormProps {
  /** Heading text above the form */
  heading?: string;
  /** Subtext below the heading */
  subtext?: string;
  /** Dark mode (for dark section backgrounds) */
  dark?: boolean;
}

export function EnterpriseLeadForm({
  heading = 'Get a Custom Quote for Your Team',
  subtext = 'Tell us about your team and we\'ll get back to you within 1 business day.',
  dark = false,
}: EnterpriseLeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, string> = {};
    fd.forEach((v, k) => {
      if (typeof v === 'string') data[k] = v;
    });
    // Always set department and auto-generate subject
    data.department = 'Sales / Enterprise';
    data.subject = `Enterprise inquiry — ${data.company || 'Unknown company'} (${data.teamSize || '?'} people)`;

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

  const textMain = dark ? 'text-white' : 'text-tp-ink';
  const textSub = dark ? 'text-tp-beige/70' : 'text-tp-muted';
  const cardBg = dark ? 'bg-white/5 border-white/10' : 'bg-white border-tp-line';

  if (status === 'success') {
    return (
      <div role="status" className={`rounded-tp-card border p-10 text-center ${cardBg}`}>
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tp-bronze text-tp-black">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
        </span>
        <h3 className={`mt-4 font-display text-xl font-normal ${textMain}`}>We&apos;ve received your request</h3>
        <p className={`mt-2 text-sm ${textSub}`}>Our team will get back to you within 1 business day with a custom quote.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className={`font-display font-normal text-3xl sm:text-4xl ${textMain}`}>{heading}</h2>
        <p className={`mt-3 text-base ${textSub}`}>{subtext}</p>
      </div>
      <form
        onSubmit={onSubmit}
        aria-busy={status === 'sending'}
        className={`space-y-5 rounded-tp-card border p-6 shadow-sm sm:p-8 ${cardBg}`}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={`block text-sm font-medium ${textMain}`}>
            Name *
            <input name="name" type="text" required maxLength={100} autoComplete="name" className={fieldClass} />
          </label>
          <label className={`block text-sm font-medium ${textMain}`}>
            Work Email *
            <input name="email" type="email" required placeholder="you@company.com" maxLength={254} autoComplete="email" className={fieldClass} />
          </label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={`block text-sm font-medium ${textMain}`}>
            Company
            <input name="company" type="text" maxLength={100} autoComplete="organization" className={fieldClass} />
          </label>
          <label className={`block text-sm font-medium ${textMain}`}>
            Team Size *
            <select name="teamSize" required defaultValue="" className={fieldClass}>
              <option value="" disabled>Select team size</option>
              {teamSizes.map((s) => (
                <option key={s} value={s}>{s} people</option>
              ))}
            </select>
          </label>
        </div>
        <label className={`block text-sm font-medium ${textMain}`}>
          How can we help?
          <textarea name="message" maxLength={2000} rows={3} placeholder="Tell us about your needs — branding requirements, timeline, questions..." className={fieldClass} />
        </label>

        {status === 'error' && (
          <p role="alert" className="rounded-tp-button border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-tp-button bg-tp-bronze px-8 py-3.5 text-sm font-semibold text-tp-black shadow-sm transition-all hover:-translate-y-0.5 hover:bg-tp-bronze/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending...' : 'Request a Quote'}
        </button>
      </form>
    </div>
  );
}
