'use client';

import { useState } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StyleCard {
  name: string;
  desc: string;
  backdrop: string;
  accent: string;
  attire: 'formal' | 'smart' | 'casual' | 'creative';
}

const STYLES: StyleCard[] = [
  {
    name: 'Corporate',
    desc: 'Clean, polished look for company profiles and team pages',
    backdrop: '#E8E8E8',
    accent: '#1E3A5F',
    attire: 'formal',
  },
  {
    name: 'LinkedIn Pro',
    desc: 'Optimized for professional networking and recruiter appeal',
    backdrop: '#1E3A5F',
    accent: '#C9A98A',
    attire: 'smart',
  },
  {
    name: 'Studio Classic',
    desc: 'Timeless studio portrait with soft lighting and neutral tones',
    backdrop: '#D4D4D4',
    accent: '#2D2D2D',
    attire: 'formal',
  },
  {
    name: 'Executive',
    desc: 'Commanding presence for C-suite and senior leadership',
    backdrop: '#2D2D2D',
    accent: '#C9A98A',
    attire: 'formal',
  },
  {
    name: 'Natural Light',
    desc: 'Warm, approachable look with soft natural window lighting',
    backdrop: '#E8DCC8',
    accent: '#5C3A1A',
    attire: 'smart',
  },
  {
    name: 'Creative',
    desc: 'Bold, expressive style for artists, designers and creators',
    backdrop: '#2D4A3E',
    accent: '#E8DCC8',
    attire: 'creative',
  },
  {
    name: 'Outdoor',
    desc: 'Natural backdrop with bokeh greenery for a relaxed feel',
    backdrop: '#4A6741',
    accent: '#F5F5F5',
    attire: 'casual',
  },
  {
    name: 'Modern Minimal',
    desc: 'Clean white background with sharp, contemporary lighting',
    backdrop: '#F5F5F5',
    accent: '#2D2D2D',
    attire: 'smart',
  },
];

function isLight(hex: string): boolean {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55;
}

/** Silhouette: shoulders get a collar/neckline hint depending on attire */
function SilhouetteSVG({ attire, fill }: { attire: StyleCard['attire']; fill: string }) {
  return (
    <svg viewBox="0 0 200 260" className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
      <g fill={fill} fillOpacity="0.82">
        {/* Head */}
        <ellipse cx="100" cy="88" rx="38" ry="45" />
        {/* Shoulders/torso */}
        {attire === 'formal' ? (
          <>
            <path d="M20 260 C20 195 55 168 100 168 C145 168 180 195 180 260 Z" />
            {/* Lapel hint */}
            <path d="M80 168 L90 200 L100 180 L110 200 L120 168" fill={fill} fillOpacity="0.3" />
          </>
        ) : attire === 'creative' ? (
          <>
            <path d="M25 260 C25 198 58 170 100 170 C142 170 175 198 175 260 Z" />
            {/* Crew neck */}
            <ellipse cx="100" cy="170" rx="18" ry="6" fill={fill} fillOpacity="0.25" />
          </>
        ) : (
          <path d="M22 260 C22 196 56 168 100 168 C144 168 178 196 178 260 Z" />
        )}
      </g>
    </svg>
  );
}

export function HeadshotStyleGallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="border-t border-tp-line/40 bg-white py-16 sm:py-20" aria-labelledby="style-gallery-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-tp-bronze-ink">
            Style Gallery
          </p>
          <h2
            id="style-gallery-heading"
            className="mt-3 font-display text-2xl font-normal text-tp-black sm:text-3xl"
          >
            Explore Headshot Styles
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-tp-muted">
            Preview the range of professional looks available. Each style is designed for a specific context —
            from corporate profiles to creative portfolios.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
          {STYLES.map((style, i) => {
            const silhouetteColor = isLight(style.backdrop) ? '#2D2D2D' : '#FFFFFF';
            const isActive = hovered === i;
            return (
              <div
                key={style.name}
                className="group relative"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
                role="figure"
                aria-label={`${style.name}: ${style.desc}`}
              >
                <div
                  className={cn(
                    'relative aspect-[3/4] overflow-hidden rounded-tp-card border transition-all duration-300',
                    isActive
                      ? 'border-tp-bronze shadow-lg shadow-tp-bronze/10 -translate-y-1'
                      : 'border-tp-line shadow-sm'
                  )}
                  style={{ backgroundColor: style.backdrop }}
                >
                  <SilhouetteSVG attire={style.attire} fill={silhouetteColor} />

                  {/* Style name badge */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-3 pt-8">
                    <p className="text-sm font-semibold text-white">{style.name}</p>
                  </div>
                </div>

                {/* Description (shows on hover/focus) */}
                <div
                  className={cn(
                    'mt-2 overflow-hidden transition-all duration-300',
                    isActive ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <p className="text-xs text-tp-muted leading-relaxed">{style.desc}</p>
                </div>

                {/* Always-visible style name below card */}
                <p
                  className={cn(
                    'mt-1.5 text-center text-xs font-medium transition-colors',
                    isActive ? 'text-tp-bronze-ink' : 'text-tp-ink'
                  )}
                >
                  {style.name}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs italic text-tp-muted">
          Illustrative concepts — actual results use AI generation based on your own photos
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/auth/register?redirect=/dashboard/upload?category=headshots"
            className={cn(buttonVariants({ size: 'lg' }))}
          >
            Try These Styles →
          </Link>
        </div>
      </div>
    </section>
  );
}
