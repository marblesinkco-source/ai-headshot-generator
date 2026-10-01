'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type ConsentState = {
  essential: true; // always required
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

const CONSENT_KEY = 'tp_cookie_consent';

function getStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

function storeConsent(consent: ConsentState) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // silent fail
  }
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

  function acceptAll() {
    const consent: ConsentState = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    storeConsent(consent);
    setVisible(false);
    applyConsent(consent);
  }

  function rejectAll() {
    const consent: ConsentState = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    storeConsent(consent);
    setVisible(false);
    applyConsent(consent);
  }

  function savePreferences() {
    const consent: ConsentState = {
      essential: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    };
    storeConsent(consent);
    setVisible(false);
    setShowPreferences(false);
    applyConsent(consent);
  }

  function applyConsent(consent: ConsentState) {
    // Update Google consent mode if gtag is loaded
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        ad_storage: consent.marketing ? 'granted' : 'denied',
        ad_user_data: consent.marketing ? 'granted' : 'denied',
        ad_personalization: consent.marketing ? 'granted' : 'denied',
      });
    }
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-4"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-2xl rounded-2xl border border-tp-line/60 bg-white shadow-lg shadow-tp-black/8">
        {!showPreferences ? (
          /* ── Main banner ── */
          <div className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              {/* Cookie icon */}
              <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-tp-beige/40 text-lg" aria-hidden="true">
                🍪
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-tp-ink leading-relaxed">
                  We use cookies to improve your experience. Essential cookies are always active.
                  You can choose to accept analytics and marketing cookies or customize your preferences.{' '}
                  <Link href="/cookie-policy" className="underline text-tp-bronze-ink hover:text-tp-bronze transition-colors">
                    Cookie Policy
                  </Link>
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={acceptAll}
                className="rounded-tp-button bg-tp-black px-4 py-2 text-sm font-medium text-white hover:bg-tp-ink transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={rejectAll}
                className="rounded-tp-button border border-tp-line bg-white px-4 py-2 text-sm font-medium text-tp-ink hover:bg-tp-paper transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="px-3 py-2 text-sm font-medium text-tp-muted hover:text-tp-ink transition-colors underline"
              >
                Customize
              </button>
            </div>
          </div>
        ) : (
          /* ── Preferences panel ── */
          <div className="p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-tp-black mb-3">Cookie Preferences</h3>

            {/* Essential */}
            <label className="flex items-center justify-between py-2.5 border-b border-tp-line/40">
              <div>
                <span className="text-sm font-medium text-tp-ink">Essential</span>
                <p className="text-xs text-tp-muted mt-0.5">Required for the site to function.</p>
              </div>
              <span className="text-xs font-medium text-tp-muted bg-tp-paper px-2 py-0.5 rounded">Always on</span>
            </label>

            {/* Analytics */}
            <label className="flex items-center justify-between py-2.5 border-b border-tp-line/40 cursor-pointer">
              <div>
                <span className="text-sm font-medium text-tp-ink">Analytics</span>
                <p className="text-xs text-tp-muted mt-0.5">Help us understand how you use the site.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={analytics}
                onClick={() => setAnalytics(!analytics)}
                className={`relative h-6 w-10 rounded-full transition-colors ${analytics ? 'bg-tp-bronze' : 'bg-tp-line'}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${analytics ? 'translate-x-4' : 'translate-x-0'}`}
                />
              </button>
            </label>

            {/* Marketing */}
            <label className="flex items-center justify-between py-2.5 cursor-pointer">
              <div>
                <span className="text-sm font-medium text-tp-ink">Marketing</span>
                <p className="text-xs text-tp-muted mt-0.5">Personalized ads and remarketing.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={marketing}
                onClick={() => setMarketing(!marketing)}
                className={`relative h-6 w-10 rounded-full transition-colors ${marketing ? 'bg-tp-bronze' : 'bg-tp-line'}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${marketing ? 'translate-x-4' : 'translate-x-0'}`}
                />
              </button>
            </label>

            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={savePreferences}
                className="rounded-tp-button bg-tp-black px-4 py-2 text-sm font-medium text-white hover:bg-tp-ink transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setShowPreferences(false)}
                className="px-3 py-2 text-sm font-medium text-tp-muted hover:text-tp-ink transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
