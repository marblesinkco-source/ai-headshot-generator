'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { homeBeforeAfterPairs } from '@/config/category-visuals';

const IMAGE_SIZES = '(min-width: 768px) 30vw, 90vw';

/* ------------------------------------------------------------------ */
/*  Interactive drag slider — pure React, no dependencies              */
/* ------------------------------------------------------------------ */

function ComparisonSlider({
  label,
  before,
  after,
  priority = false,
}: {
  label: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  priority?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[3/4] w-full cursor-col-resize select-none overflow-hidden rounded-t-tp-card bg-tp-beige touch-pan-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      role="slider"
      aria-label={`Before and after comparison: ${label}. Use left and right arrow keys to compare.`}
      aria-orientation="horizontal"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${Math.round(position)}% selfie shown, ${100 - Math.round(position)}% AI headshot shown`}
      tabIndex={0}
      onKeyDown={(e) => {
        const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
        if (!keys.includes(e.key)) return;
        e.preventDefault();
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') setPosition((p) => Math.max(0, p - 2));
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') setPosition((p) => Math.min(100, p + 2));
        if (e.key === 'Home') setPosition(0);
        if (e.key === 'End') setPosition(100);
      }}
    >
      {/* After image (full background) */}
      <Image
        src={after.src}
        alt={after.alt}
        fill
        sizes={IMAGE_SIZES}
        className="object-cover"
        draggable={false}
        priority={priority}
      />

      {/* Before image (clipped by slider position) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes={IMAGE_SIZES}
          className="object-cover grayscale"
          draggable={false}
          priority={priority}
        />
      </div>

      {/* Divider line */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 z-10 w-[2px] bg-white shadow-[0_0_6px_rgba(0,0,0,0.4)]"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      />

      {/* Drag handle */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-tp-black shadow-lg"
        style={{ left: `${position}%` }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className="text-tp-bronze"
          aria-hidden="true"
        >
          <path
            d="M5.5 4L1.5 9L5.5 14M12.5 4L16.5 9L12.5 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Labels */}
      <span className="absolute left-3 top-3 z-10 rounded-tp-button border border-tp-line bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-tp-muted">
        Selfie
      </span>
      <span className="absolute right-3 top-3 z-10 rounded-tp-button bg-tp-black px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-tp-bronze">
        AI Headshot
      </span>

      {/* Disclosure */}
      <span className="absolute bottom-2 right-2 z-10 rounded-tp-button bg-tp-black/70 px-2 py-0.5 text-[11px] font-medium text-tp-paper">
        AI-generated concept image
      </span>
    </div>
  );
}

export function BeforeAfterShowcase() {
  return (
    <section className="bg-tp-paper py-20 lg:py-24" aria-labelledby="before-after-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-tp-bronze-ink">
            Before &amp; After
          </p>
          <h2
            id="before-after-heading"
            className="mt-3 font-display text-[30px] sm:text-[40px] font-normal tracking-[-0.03em] text-tp-ink leading-tight"
          >
            See the Transformation
          </h2>
          <p className="mt-4 text-[15px] text-tp-muted leading-relaxed">
            Drag the slider to compare. From an everyday selfie to a polished,
            professional headshot.
          </p>
        </div>

        <div className="mt-10 lg:mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {homeBeforeAfterPairs.map(({ label, detail, before, after }, idx) => (
            <figure
              key={label}
              className="overflow-hidden rounded-tp-card border border-tp-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-tp-bronze/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <ComparisonSlider label={label} before={before} after={after} priority={idx === 0} />
              <figcaption className="border-t border-tp-line px-4 py-4 text-center">
                <span className="block text-sm font-medium text-tp-ink">{label}</span>
                <span className="mt-1 block text-xs text-tp-muted">{detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-tp-muted">
          Results based on AI-generated concept images. Individual results vary.
        </p>

        <p className="mt-3 text-center">
          <Link href="/samples" className="rounded-tp-button text-sm text-tp-bronze-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2">
            See more examples →
          </Link>
        </p>
      </div>
    </section>
  );
}

export default BeforeAfterShowcase;
