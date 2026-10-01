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
    'rounded-tp-button bg-tp-black px-4 py-2.5 text-sm font-medium text-tp-paper transition-colors hover:bg-tp-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2';
  const secondaryBtn =
    'rounded-tp-button border border-tp-line bg-white px-4 py-2.5 text-sm font-medium text-tp-ink transition-colors hover:bg-tp-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2';

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[9999] p-3 sm:p-4"
      role="dialog"
      aria-modal="false"
      aria-labelledby="tp-cookie-title"
    >
      <div className="mx-auto max-w-3xl rounded-tp-card border border-tp-line bg-tp-paper shadow-lg shadow-tp-black/10">
        {!showPreferences ? (
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
            <div className="min-w-0 flex-1">
              <h2 id="tp-cookie-title" className="text-sm font-semibold text-tp-black">
                We use cookies
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-tp-muted">
                We use essential cookies to keep you signed in and the site working. With your
                consent we also use analytics and marketing cookies to understand usage and
                measure our ads. You can change or withdraw your choice at any time.{' '}
                <Link
                  href="/cookie-policy"
                  className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-ink"
                >
                  Cookie Policy
                </Link>
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-shrink-0 sm:flex-row">
              <button type="button" onClick={() => save(false, false)} className={secondaryBtn}>
                Essential Only
              </button>
              <button
                type="button"
                onClick={() => {
                  const stored = getStoredConsent();
                  setAnalytics(!!stored?.analytics);
                  setMarketing(!!stored?.marketing);
                  setShowPreferences(true);
                }}
                className={secondaryBtn}
              >
                Manage Preferences
              </button>
              <button type="button" onClick={() => save(true, true)} className={primaryBtn}>
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-5">
            <h2 id="tp-cookie-title" className="mb-1 text-sm font-semibold text-tp-black">
              Cookie preferences
            </h2>
            <p className="mb-2 text-xs text-tp-muted">
              Choose which cookies you allow. Nothing except essential cookies is set until you
              opt in.{' '}
              <Link
                href="/cookie-policy"
                className="font-medium text-tp-bronze-ink underline underline-offset-2"
              >
                Cookie Policy
              </Link>
            </p>

            <div className="flex items-center justify-between gap-4 border-b border-tp-line py-3">
              <div>
                <span className="text-sm font-medium text-tp-ink">Essential</span>
                <p className="mt-0.5 text-xs text-tp-muted">
                  Sign-in, security and your cookie choice. Required for the site to work.
                </p>
              </div>
              <span className="flex-shrink-0 rounded bg-tp-line/50 px-2 py-0.5 text-xs font-medium text-tp-muted">
                Always on
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-tp-line py-3">
              <div>
                <span className="text-sm font-medium text-tp-ink">Analytics</span>
                <p className="mt-0.5 text-xs text-tp-muted">
                  Google Analytics: helps us understand how the site is used.
                </p>
              </div>
              <Toggle checked={analytics} onChange={setAnalytics} label="Analytics cookies" />
            </div>

            <div className="flex items-center justify-between gap-4 py-3">
              <div>
                <span className="text-sm font-medium text-tp-ink">Marketing</span>
                <p className="mt-0.5 text-xs text-tp-muted">
                  Ad measurement, personalised ads and remarketing.
                </p>
              </div>
              <Toggle checked={marketing} onChange={setMarketing} label="Marketing cookies" />
            </div>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="px-3 py-2 text-sm font-medium text-tp-muted hover:text-tp-ink"
              >
                Back
              </button>
              <button type="button" onClick={() => save(false, false)} className={secondaryBtn}>
                Essential Only
              </button>
              <button type="button" onClick={() => save(analytics, marketing)} className={primaryBtn}>
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
