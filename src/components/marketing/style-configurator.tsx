'use client';

import { useState } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Backdrop {
  name: string;
  color: string;
}

const BACKDROPS: Backdrop[] = [
  { name: 'Studio White', color: '#F5F5F5' },
  { name: 'Studio Gray', color: '#D4D4D4' },
  { name: 'Navy Blue', color: '#1E3A5F' },
  { name: 'Charcoal', color: '#2D2D2D' },
  { name: 'Warm Beige', color: '#E8DCC8' },
  { name: 'Forest Green', color: '#2D4A3E' },
  { name: 'Burgundy', color: '#5C1A1A' },
  { name: 'Light Blue', color: '#B8D4E3' },
];

const STYLES = ['Professional', 'Creative', 'Corporate', 'Casual', 'Executive', 'Academic'];

/** Perceived luminance (0-1) so the silhouette contrasts with any backdrop. */
function isLight(hex: string): boolean {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

export function StyleConfigurator() {
  const [backdropIndex, setBackdropIndex] = useState(2);
  const [styleIndex, setStyleIndex] = useState(0);

  const backdrop = BACKDROPS[backdropIndex] ?? BACKDROPS[0];
  const style = STYLES[styleIndex] ?? STYLES[0];
  const silhouette = isLight(backdrop.color) ? '#2D2D2D' : '#FFFFFF';

  return (
    <section className="border-t border-tp-line/40 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-2xl font-normal text-tp-black sm:text-3xl">
            Design Your Perfect Headshot
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-tp-muted">
            Pick a backdrop and a style to preview the look you want before you start.
          </p>
        </div>

        {/* Preview (first on mobile, centered between/above on desktop) */}
        <div className="mt-10 flex flex-col items-center">
          <div
            role="img"
            aria-label={`Preview: ${style} style on ${backdrop.name}`}
            className="relative h-[350px] w-[280px] overflow-hidden rounded-tp-card border border-tp-line shadow-md transition-colors duration-300"
            style={{ backgroundColor: backdrop.color }}
          >
            <svg
              viewBox="0 0 280 350"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
              focusable="false"
            >
              <g fill={silhouette} fillOpacity="0.85">
                <ellipse cx="140" cy="125" rx="52" ry="62" />
                <path d="M30 350 C30 262 78 226 140 226 C202 226 250 262 250 350 Z" />
              </g>
            </svg>
          </div>
          <p className="mt-4 text-center text-base font-medium text-tp-ink" aria-live="polite">
            {style} style on {backdrop.name}
          </p>
          <p className="mt-1 text-center text-xs italic text-tp-muted">
            Illustrative concept — actual results use AI generation
          </p>
        </div>

        {/* Selectors */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div className="rounded-tp-card border border-tp-line bg-tp-beige p-5 sm:p-6">
            <h3 className="font-display text-xl font-normal text-tp-black">Background</h3>
            <div className="mt-4 grid grid-cols-4 gap-3" role="radiogroup" aria-label="Background">
              {BACKDROPS.map((b, i) => {
                const active = i === backdropIndex;
                return (
                  <button
                    key={b.name}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    aria-label={b.name}
                    onClick={() => setBackdropIndex(i)}
                    className="group flex flex-col items-center gap-1.5 focus-visible:outline-none"
                  >
                    <span
                      className={cn(
                        'block h-12 w-12 rounded-tp-button border border-tp-line transition-all group-focus-visible:ring-2 group-focus-visible:ring-tp-bronze group-focus-visible:ring-offset-2 sm:h-14 sm:w-14',
                        active
                          ? 'ring-2 ring-tp-bronze ring-offset-2 ring-offset-tp-beige'
                          : 'group-hover:ring-2 group-hover:ring-tp-line group-hover:ring-offset-2 group-hover:ring-offset-tp-beige'
                      )}
                      style={{ backgroundColor: b.color }}
                    />
                    <span
                      className={cn(
                        'text-center text-[11px] leading-tight sm:text-xs',
                        active ? 'font-medium text-tp-ink' : 'text-tp-muted'
                      )}
                    >
                      {b.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-tp-card border border-tp-line bg-tp-beige p-5 sm:p-6">
            <h3 className="font-display text-xl font-normal text-tp-black">Style</h3>
            <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Style">
              {STYLES.map((s, i) => {
                const active = i === styleIndex;
                return (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    aria-label={`${s} style`}
                    onClick={() => setStyleIndex(i)}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-tp-beige',
                      active
                        ? 'bg-tp-paper font-medium text-tp-ink ring-2 ring-tp-bronze'
                        : 'bg-tp-paper/60 text-tp-muted hover:bg-tp-paper hover:text-tp-ink'
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
            className={cn(buttonVariants({ size: 'lg' }))}
          >
            Create This Look →
          </Link>
        </div>
      </div>
    </section>
  );
}
