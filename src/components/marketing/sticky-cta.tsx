'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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
          Your best headshot, no studio needed
        </p>
        <p className="mt-0.5 text-xs text-tp-beige/80">Starting from $9.90 &middot; one-time payment</p>
      </div>
      <Link
        href={href}
        tabIndex={visible ? 0 : -1}
        className="shrink-0 rounded-tp-button bg-tp-bronze px-4 py-2 text-sm font-semibold text-tp-black transition-colors hover:bg-tp-beige"
      >
        Get my headshots
      </Link>
    </div>
  );
}
