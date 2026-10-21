'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { homeBeforeAfterPairs } from '@/config/category-visuals';
import { loadImageToCanvas, processPhoto, PRESETS } from '@/lib/canvas-photo-engine';

const IMAGE_SIZES = '(min-width: 768px) 30vw, 90vw';

/** Transformation tags shown under each before/after card */
function getTransformTags(label: string): string[] | null {
  switch (label) {
    case 'LinkedIn Profile': return ['Lighting', 'Color Grade', 'Sharpen'];
    case 'Corporate Team': return ['Contrast', 'Portrait Light', 'Vignette'];
    case 'Creative Portfolio': return ['Warmth', 'Skin Smooth', 'Clarity'];
    default: return null;
  }
}

/** Map card label to a canvas-engine preset key */
function presetKeyForLabel(label: string): keyof typeof PRESETS {
  switch (label) {
    case 'LinkedIn Profile': return 'linkedin';
    case 'Corporate Team': return 'corporate';
    default: return 'creative';
  }
}

/* ------------------------------------------------------------------ */
/*  Canvas-powered comparison slider                                   */
/* ------------------------------------------------------------------ */

function CanvasComparisonSlider({
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
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  const presetKey = presetKeyForLabel(label);

  // Process the "after" image through the canvas engine on mount
  useEffect(() => {
    let cancelled = false;

    async function enhance() {
      try {
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.src = after.src;

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error('load failed'));
        });

        if (cancelled) return;

        const { canvas, ctx } = loadImageToCanvas(img, 800, 1000);
        processPhoto(canvas, ctx, PRESETS[presetKey].adjustments);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

        if (!cancelled) {
          setProcessedUrl(dataUrl);
          setIsProcessing(false);
        }
      } catch {
        // Fallback: show original after image
        if (!cancelled) {
          setProcessedUrl(null);
          setIsProcessing(false);
        }
      }
    }

    enhance();
    return () => { cancelled = true; };
  }, [after.src, presetKey]);

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
      onPointerCancel={handlePointerUp}
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
      {/* After image (full background) — canvas-processed or original fallback */}
      {processedUrl ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={processedUrl}
          alt={after.alt}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      ) : (
        <Image
          src={after.src}
          alt={after.alt}
          fill
          sizes={IMAGE_SIZES}
          className="object-cover"
          draggable={false}
          priority={priority}
        />
      )}

      {/* Before image (clipped by slider position) — raw casual selfie look */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes={IMAGE_SIZES}
          className="object-cover"
          style={{ filter: 'brightness(0.88) contrast(0.85) saturate(0.78)' }}
          draggable={false}
          priority={priority}
        />
        {/* Subtle grain overlay on the before side */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px',
          }}
        />
      </div>

      {/* Processing shimmer — shown briefly while canvas works */}
      {isProcessing && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[5] flex items-center justify-center bg-tp-beige/30 backdrop-blur-[1px]"
        >
          <div className="flex items-center gap-2 rounded-tp-button bg-tp-black/70 px-3 py-1.5 text-[11px] font-medium text-tp-paper">
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-tp-bronze border-t-transparent" />
            Enhancing…
          </div>
        </div>
      )}

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
      <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-tp-button border border-tp-line bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-tp-muted">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        Selfie
      </span>
      <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-tp-button bg-tp-black px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-tp-bronze">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/></svg>
        AI Enhanced
      </span>

      {/* Disclosure */}
      <span className="absolute bottom-2 right-2 z-10 rounded-tp-button bg-tp-black/70 px-2 py-0.5 text-[11px] font-medium text-tp-paper">
        AI-enhanced photo
      </span>
    </div>
  );
}

export function BeforeAfterShowcase() {
  return (
    <section className="bg-tp-paper py-20 lg:py-24" aria-labelledby="before-after-heading">
      {/* Gold separator line */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="gold-line mb-16 lg:mb-20" aria-hidden="true" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="scroll-fade-in mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-tp-bronze-ink">
            AI Photo Enhancement
          </p>
          <h2
            id="before-after-heading"
            className="mt-3 font-display text-[30px] sm:text-[40px] font-normal tracking-[-0.03em] text-tp-ink leading-tight"
          >
            Real AI Transformations
          </h2>
          <p className="mt-4 text-[15px] text-tp-muted leading-relaxed max-w-lg mx-auto">
            Drag the slider to see the difference. Professional lighting, color grading,
            sharpening, and portrait enhancement — applied in real time by AI.
          </p>
        </div>

        <div className="mt-10 lg:mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {homeBeforeAfterPairs.map(({ label, detail, before, after }) => (
            <figure
              key={label}
              className="scroll-fade-in group overflow-hidden rounded-tp-card border border-tp-line bg-white tp-lift hover:border-tp-bronze/40 hover:shadow-lg hover:shadow-tp-bronze/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <CanvasComparisonSlider label={label} before={before} after={after} priority={false} />
              <figcaption className="border-t border-tp-line px-4 py-4 text-center transition-colors group-hover:border-tp-bronze/30">
                <span className="block text-sm font-medium text-tp-ink">{label}</span>
                <span className="mt-1 block text-xs text-tp-muted">{detail}</span>
                {getTransformTags(label) && (
                  <span className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
                    {getTransformTags(label)!.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full border border-tp-bronze/20 bg-tp-bronze/5 px-2 py-0.5 text-[10px] font-medium text-tp-bronze-ink"
                      >
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-tp-bronze">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {tag}
                      </span>
                    ))}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-tp-muted">
          Real selfies enhanced with AI canvas processing. Same person, same photo — just better lighting, color, and clarity.
        </p>

        <p className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <Link href="/before-after" className="inline-flex items-center gap-1 rounded-tp-button text-sm font-medium text-tp-bronze-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2">
            See more before &amp; after examples
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/samples" className="inline-flex items-center gap-1 rounded-tp-button text-sm font-medium text-tp-bronze-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2">
            Browse AI headshot samples
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </p>
      </div>
    </section>
  );
}

export default BeforeAfterShowcase;
