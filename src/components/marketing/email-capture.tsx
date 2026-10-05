'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { X } from 'lucide-react';

const STORAGE_KEY = 'tp_newsletter_emails';
const DISMISS_KEY = 'tp_newsletter_banner_dismissed';

interface EmailCaptureProps {
  /** 'card' renders inline; 'banner' is compact and dismissable. */
  variant?: 'card' | 'banner';
  className?: string;
}

function saveEmailLocally(email: string) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: unknown = raw ? JSON.parse(raw) : [];
    const emails = Array.isArray(list) ? (list as string[]) : [];
    if (!emails.includes(email)) emails.push(email);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(emails));
  } catch {
    // localStorage unavailable; ignore
  }
}

export function EmailCapture({ variant = 'card', className = '' }: EmailCaptureProps) {
  const isBanner = variant === 'banner';
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [dismissed, setDismissed] = useState(false);

  // Read localStorage after mount so server and client first render match.
  useEffect(() => {
    if (!isBanner) return;
    try {
      if (localStorage.getItem(DISMISS_KEY) === '1') setDismissed(true);
    } catch {
      // ignore
    }
  }, [isBanner]);

  if (dismissed) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!value || status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });
      if (!res.ok) {
        setStatus('error');
        return;
      }
      saveEmailLocally(value);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // ignore
    }
    setDismissed(true);
  }

  return (
    <section
      aria-label="Newsletter signup"
      className={`relative rounded-tp-card border border-tp-line bg-tp-paper ${
        isBanner ? 'p-5 sm:p-6' : 'p-6 sm:p-8'
      } ${className}`}
    >
      {isBanner && (
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss newsletter banner"
          className="absolute right-3 top-3 rounded-lg p-1.5 text-tp-muted transition-colors hover:text-tp-bronze-ink"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className={`max-w-xl ${isBanner ? 'pr-6' : ''}`}>
          <h2 className="font-display text-xl text-tp-ink sm:text-2xl font-normal">
            Get Photo Tips &amp; Exclusive Deals
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-tp-muted">
            Join our newsletter for AI photography tips, style guides, and member-only discounts.
          </p>
        </div>

        <div className="w-full lg:max-w-md">
          {status === 'success' ? (
            <p
              role="status"
              className="rounded-tp-button border border-tp-bronze/50 bg-white px-4 py-3 text-sm font-medium text-tp-bronze-ink"
            >
              You&apos;re in! Check your inbox for a welcome gift.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
              <label htmlFor={`tp-newsletter-${variant}`} className="sr-only">
                Email address
              </label>
              <input
                id={`tp-newsletter-${variant}`}
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-tp-button border border-tp-line bg-white px-4 py-3 text-sm text-tp-ink placeholder:text-tp-muted/80 focus:border-tp-bronze focus:outline-none focus:ring-2 focus:ring-tp-bronze/30"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="rounded-tp-button bg-tp-black px-6 py-3 text-sm font-semibold text-tp-bronze transition-colors hover:bg-tp-black/90 disabled:opacity-60"
              >
                {status === 'loading' ? 'Joining...' : 'Subscribe'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p role="alert" className="mt-2 text-sm text-red-700">
              Something went wrong. Please check your email and try again.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
