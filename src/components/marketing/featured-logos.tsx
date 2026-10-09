'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * "Trust & Security" marquee strip.
 *
 * Honesty rules (CLAUDE.md section 4): generic trust/security badges only. No
 * platform listings, press logos, user counts, or ratings.
 */

type Item = { key: string; label: string; color?: string; icon: ReactNode };

const svgProps = {
  className: 'h-6 w-6 shrink-0',
  'aria-hidden': true,
  focusable: false,
} as const;

const ITEMS: readonly Item[] = [
  {
    key: 'gdpr',
    label: 'GDPR compliant',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...svgProps}>
        <path d="M12 3l7.5 3v5.5c0 4.5-3.1 8.2-7.5 9.5-4.4-1.3-7.5-5-7.5-9.5V6L12 3z" />
        <path d="M9 12l2.2 2.2L15.5 10" />
      </svg>
    ),
  },
  {
    key: 'paddle',
    label: 'Secure payments via Paddle',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...svgProps}>
        <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
        <path d="M2.5 10h19M6.5 15h4" />
      </svg>
    ),
  },
  {
    key: 'privacy',
    label: 'Privacy-first',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...svgProps}>
        <path d="M12 3l7.5 3v5.5c0 4.5-3.1 8.2-7.5 9.5-4.4-1.3-7.5-5-7.5-9.5V6L12 3z" />
        <path d="M9 12l2.2 2.2L15.5 10" />
      </svg>
    ),
  },
  {
    key: 'ssl',
    label: 'SSL encrypted',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...svgProps}>
        <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
        <path d="M8 10.5V8a4 4 0 018 0v2.5" />
        <circle cx="12" cy="15.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: 'auto-delete',
    label: 'Photos auto-deleted',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...svgProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
];

const css = `
.tp-fl-wrap { opacity: 0; transform: translateY(6px); transition: opacity .6s ease-out, transform .6s ease-out; }
.tp-fl-visible .tp-fl-wrap { opacity: 1; transform: none; }
.tp-fl-viewport {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
}
.tp-fl-viewport .tp-marquee-track { animation-play-state: paused; }
.tp-fl-visible .tp-fl-viewport .tp-marquee-track { animation-play-state: running; }
.tp-fl-viewport .tp-marquee-track:hover { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .tp-fl-wrap { opacity: 1; transform: none; transition: none; }
  .tp-fl-viewport { -webkit-mask-image: none; mask-image: none; }
  .tp-fl-viewport .tp-marquee-track,
  .tp-fl-visible .tp-fl-viewport .tp-marquee-track {
    animation: none;
    width: auto;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 12px;
  }
  .tp-fl-dup { display: none !important; }
}
`;

function Row({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className={`flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4 ${duplicate ? 'tp-fl-dup' : ''}`}
      aria-hidden={duplicate ? true : undefined}
    >
      {ITEMS.map((item) => (
        <li
          key={item.key}
          style={item.color ? ({ color: item.color } as CSSProperties) : undefined}
          className="group inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-tp-button border border-tp-line/60 bg-white/80 backdrop-blur-sm px-5 py-3 shadow-sm transition-all duration-200 hover:border-tp-bronze/30 hover:shadow-md hover:shadow-tp-bronze/5 motion-reduce:transition-none font-sans text-sm font-medium text-tp-ink"
        >
          <span className={`transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${item.color ? '' : 'text-tp-bronze-ink'}`}>{item.icon}</span>
          <span className="text-tp-ink">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function FeaturedLogos() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Trust and security"
      className={`relative overflow-hidden bg-tp-paper py-10 sm:py-12 ${visible ? 'tp-fl-visible' : ''}`}
    >
      <style>{css}</style>
      <div aria-hidden="true" className="tp-blob tp-blob-beige w-[400px] h-[400px] -top-32 -left-32" />
      <div className="tp-fl-wrap relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-tp-bronze-ink">
            Trust &amp; Security
          </p>
          <h2 className="mt-2 font-display text-2xl font-normal text-tp-ink sm:text-3xl">
            Your photos are in safe hands
          </h2>
        </div>
        <div className="tp-fl-viewport mt-6">
          <div className="tp-marquee-track">
            <Row />
            <Row duplicate />
          </div>
        </div>
      </div>
    </section>
  );
}
