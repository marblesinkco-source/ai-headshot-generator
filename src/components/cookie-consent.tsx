'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type ConsentState = {
  essential: true; // always required
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

// NOTE: key is shared with google-analytics.tsx, exit-intent-popup.tsx and the cookie policy page.
const CONSENT_KEY = 'tp_cookie_consent';
// Dispatch `window.dispatchEvent(new Event('tp:open-cookie-settings'))` to let users re-open
// the panel and withdraw/change consent at any time (GDPR Art. 7(3)).
export const OPEN_COOKIE_SETTINGS_EVENT = 'tp:open-cookie-settings';

function getStoredConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

function storeConsent(consent: ConsentState) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // storage unavailable: choice applies for this page view only
  }
}

function applyConsent(consent: ConsentState) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  const analytics = consent.analytics ? 'granted' : 'denied';
  const marketing = consent.marketing ? 'granted' : 'denied';
  window.gtag('consent', 'update', {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
  });
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-10 flex-shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2 ${
        checked ? 'bg-tp-bronze-ink' : 'bg-tp-line'
      }`}
    >
      <span
        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

/** Footer-friendly trigger so users can change/withdraw consent later. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
    >
      Cookie Settings
    </button>
  );
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      // Small delay so it doesn't flash on load
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  // Allow re-opening to change or withdraw consent
  useEffect(() => {
    const open = () => {
      const stored = getStoredConsent();
      setAnalytics(!!stored?.analytics);
      setMarketing(!!stored?.marketing);
      setShowPreferences(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
  }, []);

  const save = useCallback((a: boolean, m: boolean) => {
    const consent: ConsentState = {
      essential: true,
      analytics: a,
      marketing: m,
      timestamp: new Date().toISOString(),
    };
    storeConsent(consent);
    applyConsent(consent);
    setVisible(false);
    setShowPreferences(false);
  }, []);

  if (!visible) return null;

  const primaryBtn =
    'rounded-tp-button bg-tp-black px-3.5 py-1.5 text-xs font-medium text-tp-paper transition-colors hover:bg-tp-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2 sm:px-4 sm:py-2 sm:text-sm';
  const secondaryBtn =
    'rounded-tp-button border border-tp-line bg-white px-3.5 py-1.5 text-xs font-medium text-tp-ink transition-colors hover:bg-tp-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2 sm:px-4 sm:py-2 sm:text-sm';

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[9999]"
      role="dialog"
      aria-modal="false"
      aria-labelledby="tp-cookie-title"
    >
      {!showPreferences ? (
        /* ── Slim banner — single row on desktop, stacked on mobile ── */
        <div className="border-t border-tp-line bg-tp-paper/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:gap-4">
            <p className="min-w-0 flex-1 text-xs leading-relaxed text-tp-muted sm:text-sm">
              <span id="tp-cookie-title" className="font-medium text-tp-ink">We use cookies</span>
              {' '}to keep you signed in and improve the site.{' '}
              <Link
                href="/cookie-policy"
                className="font-medium text-tp-bronze-ink underline-offset-2 hover:underline"
              >
                Learn more
              </Link>
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const stored = getStoredConsent();
                  setAnalytics(!!stored?.analytics);
                  setMarketing(!!stored?.marketing);
                  setShowPreferences(true);
                }}
                className="rounded-tp-button px-3 py-1.5 text-xs font-medium text-tp-muted transition-colors hover:text-tp-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
              >
                Manage
              </button>
              <button type="button" onClick={() => save(false, false)} className={secondaryBtn}>
                Decline
              </button>
              <button type="button" onClick={() => save(true, true)} className={primaryBtn}>
                Accept
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ── Preference panel — compact card ── */
        <div className="p-3 sm:p-4">
          <div className="mx-auto max-w-lg rounded-tp-card border border-tp-line bg-tp-paper shadow-lg shadow-tp-black/10">
            <div className="p-4">
              <h2 id="tp-cookie-title" className="text-sm font-display font-normal text-tp-black">
                Cookie preferences
              </h2>
              <p className="mt-1 text-xs text-tp-muted">
                Choose which cookies you allow.{' '}
                <Link
                  href="/cookie-policy"
                  className="font-medium text-tp-bronze-ink underline underline-offset-2"
                >
                  Cookie Policy
                </Link>
              </p>

              <div className="mt-3 space-y-0 divide-y divide-tp-line">
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <div>
                    <span className="text-sm font-medium text-tp-ink">Essential</span>
                    <p className="text-xs text-tp-muted">Sign-in, security. Always required.</p>
                  </div>
                  <span className="shrink-0 rounded bg-tp-line/50 px-2 py-0.5 text-xs font-medium text-tp-muted">
                    Always on
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 py-2.5">
                  <div>
                    <span className="text-sm font-medium text-tp-ink">Analytics</span>
                    <p className="text-xs text-tp-muted">Helps us understand site usage.</p>
                  </div>
                  <Toggle checked={analytics} onChange={setAnalytics} label="Analytics cookies" />
                </div>

                <div className="flex items-center justify-between gap-4 py-2.5">
                  <div>
                    <span className="text-sm font-medium text-tp-ink">Marketing</span>
                    <p className="text-xs text-tp-muted">Ad measurement and remarketing.</p>
                  </div>
                  <Toggle checked={marketing} onChange={setMarketing} label="Marketing cookies" />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPreferences(false)}
                  className="px-3 py-1.5 text-xs font-medium text-tp-muted hover:text-tp-ink"
                >
                  Back
                </button>
                <button type="button" onClick={() => save(false, false)} className={secondaryBtn}>
                  Essential Only
                </button>
                <button type="button" onClick={() => save(analytics, marketing)} className={primaryBtn}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
