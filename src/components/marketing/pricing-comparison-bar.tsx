'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

export function PricingComparisonBar() {
  const [scrolled, setScrolled] = useState(false);
  // Session-only dismissal: plain state, resets on reload (no localStorage).
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (dismissed) return null;

  const visible = scrolled;

  return (
    <div
      role="region"
      aria-label="Price comparison"
      aria-hidden={!visible}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 max-h-[60px] border-t border-tp-bronze/20 bg-tp-black transition-transform duration-300 ease-out',
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      )}
    >
      <div className="mx-auto flex h-[60px] max-w-5xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6">
        <p className="min-w-0 flex-1 text-xs leading-tight text-tp-paper sm:text-sm">
          <span className="font-semibold">
            <span className="hidden sm:inline">AI headshots from {BASE_PRICE_DISPLAY}</span>
            <span className="sm:hidden">From {BASE_PRICE_DISPLAY}</span>
          </span>
          <span className="mx-1.5 text-tp-bronze" aria-hidden="true">
            &middot;
          </span>
          <span className="text-tp-paper/70">
            Up to 160 photos · One-time payment
          </span>
        </p>
        <Link
          href="/auth/register?redirect=/dashboard/upload"
          tabIndex={visible ? 0 : -1}
          className="shrink-0 rounded-tp-button bg-tp-bronze px-3 py-2 text-xs font-semibold text-tp-black transition-colors hover:bg-tp-beige sm:px-4 sm:text-sm"
        >
          Get Started
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          tabIndex={visible ? 0 : -1}
          aria-label="Dismiss price comparison"
          className="shrink-0 rounded-full p-1.5 text-tp-paper/70 transition-colors hover:text-tp-paper"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
