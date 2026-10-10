'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BASE_PRICE_LABEL } from '@/config/pricing';

export function StickyCTA({ href = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots' }: { href?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      // Show after scrolling past hero, hide when near footer
      const footer = document.querySelector('footer');
      const footerTop = footer ? footer.getBoundingClientRect().top + scrollY : Infinity;
      const nearFooter = scrollY + window.innerHeight > footerTop - 80;
      setVisible(scrollY > 500 && !nearFooter);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 bg-tp-ink px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out md:justify-center md:gap-6',
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      )}
    >
      <div className="min-w-0">
        <p className="font-display font-normal text-sm leading-tight text-tp-paper">
          Skip the studio: <span className="text-tp-bronze">{BASE_PRICE_LABEL}</span>
        </p>
      </div>
      <Link
        href={href}
        tabIndex={visible ? 0 : -1}
        className="shrink-0 rounded-tp-button bg-tp-bronze px-4 py-2 min-h-[44px] inline-flex items-center text-sm font-semibold text-tp-black transition-colors hover:bg-tp-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-paper"
      >
        Start now &#8599;
      </Link>
    </div>
  );
}
