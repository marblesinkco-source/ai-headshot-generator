'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

export function StickyCTA({ href = '/auth/register' }: { href?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 bg-tp-ink px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out md:hidden',
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      )}
    >
      <div className="min-w-0">
        <p className="font-display text-sm font-medium leading-tight text-tp-paper">
          Skip the studio: <span className="text-tp-bronze">{BASE_PRICE_DISPLAY} one-time</span>
        </p>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-tp-beige/80">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0 text-tp-bronze" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 2l6 2.5v5c0 4-2.6 7-6 8.5-3.4-1.5-6-4.5-6-8.5v-5z" />
            <path d="M7 10l2 2 4-4" />
          </svg>
          <span className="truncate">14-day money-back guarantee</span>
        </p>
      </div>
      <Link
        href={href}
        tabIndex={visible ? 0 : -1}
        className="shrink-0 rounded-tp-button bg-tp-bronze px-4 py-2 text-sm font-semibold text-tp-black transition-colors hover:bg-tp-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-paper"
      >
        Get my headshots
      </Link>
    </div>
  );
}
