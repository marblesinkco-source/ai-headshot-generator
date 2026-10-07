'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface SavedIntent {
  packageName: string;
  packagePrice: number;
  categorySlug: string;
  timestamp: number;
}

const STORAGE_KEY = 'tp_last_intent';
const DISMISS_KEY = 'tp_banner_dismissed';
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function ReturnVisitorBanner() {
  const [intent, setIntent] = useState<SavedIntent | null>(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      const dismissedAt = localStorage.getItem(DISMISS_KEY);
      if (dismissedAt && Date.now() - Number(dismissedAt) < MAX_AGE_MS) {
        return;
      }

      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const data = JSON.parse(raw) as SavedIntent;
      if (Date.now() - data.timestamp > MAX_AGE_MS) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }

      setIntent(data);
      setDismissed(false);
    } catch {
      // localStorage unavailable or corrupted
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      // ignore
    }
  };

  if (dismissed || !intent) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 mx-auto max-w-md sm:left-auto sm:right-6">
      <div className="relative overflow-hidden rounded-tp-card border border-tp-bronze/30 bg-white p-4 shadow-lg">
        <button
          onClick={handleDismiss}
          className="absolute right-2 top-2 rounded-full p-1 text-tp-muted hover:bg-tp-beige hover:text-tp-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze-ink"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="pr-6 text-sm font-medium text-tp-ink">
          Welcome back! Continue where you left off?
        </p>
        <p className="mt-1 text-xs text-tp-muted">
          {intent.packageName} — {formatPrice(intent.packagePrice)}
        </p>

        <Link
          href={`/dashboard/upload?category=${intent.categorySlug}`}
          className="mt-3 inline-flex items-center gap-1.5 rounded-tp-button bg-tp-bronze-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-tp-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze-ink"
        >
          Continue with {intent.packageName}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

/**
 * Call this when a user views or selects a package to save their intent.
 * Usage: savePackageIntent('Professional', 4990, 'headshots')
 */
export function savePackageIntent(
  packageName: string,
  packagePrice: number,
  categorySlug: string,
) {
  try {
    const data: SavedIntent = {
      packageName,
      packagePrice,
      categorySlug,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}
