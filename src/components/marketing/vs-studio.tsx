'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

/**
 * "TailorPic vs Traditional Studio" comparison section.
 * All facts are verifiable product features — no fabricated claims.
 */

const rows = [
  { feature: 'Cost', tailorpic: `From ${BASE_PRICE_DISPLAY}`, studio: '$150–$500+', highlight: true },
  { feature: 'Turnaround', tailorpic: 'Within hours', studio: '1–2 weeks' },
  { feature: 'Photos delivered', tailorpic: 'Up to 160', studio: '5–20 edited' },
  { feature: 'Scheduling', tailorpic: 'No appointment needed', studio: 'Book weeks ahead' },
  { feature: 'Location', tailorpic: 'From your phone', studio: 'Travel to studio' },
  { feature: 'Style variety', tailorpic: '12 categories', studio: '1–2 looks per session' },
  { feature: 'Retakes', tailorpic: 'Regenerate anytime', studio: 'Re-book & re-pay' },
  { feature: 'Privacy', tailorpic: 'Auto-deleted in 30 days', studio: 'Varies by studio' },
] as const;

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-tp-bronze" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

export function VsStudio() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="vs-heading"
      className="relative py-20 lg:py-24 overflow-hidden"
    >
      {/* Decorative blobs */}
      <div aria-hidden="true" className="tp-blob tp-blob-beige w-[500px] h-[500px] -top-40 -right-40" />
      <div aria-hidden="true" className="tp-blob tp-blob-bronze w-[400px] h-[400px] -bottom-32 -left-32" />

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
        {/* Header */}
        <div className="scroll-fade-in mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tp-bronze-ink">
            Why TailorPic
          </p>
          <h2
            id="vs-heading"
            className="font-display mt-4 text-[30px] font-normal leading-tight tracking-[-0.03em] text-tp-ink sm:text-[40px]"
          >
            Studio Quality, Without the Studio
          </h2>
          <p className="mt-4 text-[15px] text-tp-muted leading-relaxed max-w-lg mx-auto">
            Professional photography shouldn&apos;t require an appointment, travel, or a big budget. Here&apos;s how TailorPic compares.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-12 sm:mt-16 mx-auto max-w-3xl">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-0 mb-1">
            <div />
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-t-tp-button bg-tp-ink px-4 py-2.5 text-sm font-semibold text-tp-paper shadow-lg shadow-tp-black/20">
                <svg className="h-4 w-4 text-tp-bronze" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
                  <path d="m8.75 12 2.25 2.25L15.5 9.75" />
                </svg>
                TailorPic
              </span>
            </div>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-t-tp-button border border-tp-line border-b-0 bg-tp-paper px-4 py-2.5 text-sm font-semibold text-tp-muted">
                Traditional Studio
              </span>
            </div>
          </div>

          {/* Rows */}
          <div className="rounded-tp-card border border-tp-line overflow-hidden bg-white">
            {rows.map((row, i) => (
              <div
                key={row.feature}
                className={`tp-vs-row grid grid-cols-[1fr_1fr_1fr] gap-0 items-center border-b border-tp-line last:border-b-0 ${visible ? 'tp-vs-visible' : ''}`}
                style={{ '--vs-i': i } as React.CSSProperties}
              >
                <div className="px-4 py-4 sm:px-6">
                  <span className="text-sm font-semibold text-tp-ink">{row.feature}</span>
                </div>
                <div className="px-4 py-4 sm:px-6 text-center border-x border-tp-line/50 bg-tp-beige/15">
                  <span className="inline-flex items-center gap-1.5 text-sm text-tp-ink font-medium">
                    <CheckIcon />
                    <span>{row.tailorpic}</span>
                  </span>
                </div>
                <div className="px-4 py-4 sm:px-6 text-center">
                  <span className="text-sm text-tp-muted">{row.studio}</span>
                </div>
              </div>
            ))}
            <div className="border-t border-tp-line bg-gradient-to-r from-tp-beige/30 via-tp-bronze/5 to-transparent px-4 py-3 sm:px-6">
              <p className="text-center text-[13px] font-semibold text-tp-bronze-ink">
                Starting from a fraction of the cost — with more photos and zero scheduling
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center scroll-fade-in">
          <Link
            href="/auth/register?redirect=/dashboard/upload"
            className="inline-flex items-center gap-2 rounded-tp-button bg-tp-ink px-8 py-4 text-[15px] font-semibold text-tp-paper shadow-md transition-all hover:-translate-y-0.5 hover:bg-tp-black hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze cta-ring"
          >
            Try TailorPic — From {BASE_PRICE_DISPLAY}
            <span aria-hidden="true" className="text-[20px] leading-none">&#8599;</span>
          </Link>
        </div>
      </div>

      <style>{`
        .tp-vs-row {
          opacity: 0;
          transform: translateX(-12px);
        }
        .tp-vs-row.tp-vs-visible {
          animation: tp-vs-slide 0.5s ease-out forwards;
          animation-delay: calc(var(--vs-i) * 80ms + 200ms);
        }
        @keyframes tp-vs-slide {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tp-vs-row { opacity: 1; transform: none; }
          .tp-vs-row.tp-vs-visible { animation: none; }
        }
      `}</style>
    </section>
  );
}
