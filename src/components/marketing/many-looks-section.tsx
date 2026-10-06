'use client';

import { useState } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LookCard {
  name: string;
  backdrop: string;
  /** Optional override for silhouette/label color (defaults to contrast-based). */
  ink?: string;
}

interface Occasion {
  id: string;
  label: string;
  uses: string;
  cards: LookCard[];
}

const OCCASIONS: Occasion[] = [
  {
    id: 'professional',
    label: 'Professional',
    uses: 'LinkedIn, business cards, company pages',
    cards: [
      { name: 'Corporate Blue', backdrop: '#1E3A5F' },
      { name: 'Executive Dark', backdrop: '#2D2D2D' },
      { name: 'Modern Gray', backdrop: '#D4D4D4' },
    ],
  },
  {
    id: 'social',
    label: 'Social & Dating',
    uses: 'Dating apps, social media profiles',
    cards: [
      { name: 'Warm Sunset', backdrop: '#E8926B' },
      { name: 'Soft Pink', backdrop: '#E8B4B4' },
      { name: 'Garden Green', backdrop: '#4A6741' },
    ],
  },
  {
    id: 'creative',
    label: 'Creative & Portfolio',
    uses: 'Artist portfolios, creative agencies',
    cards: [
      { name: 'Bold Teal', backdrop: '#2D4A3E' },
      { name: 'Studio Purple', backdrop: '#4A3D6B' },
      { name: 'Artistic Red', backdrop: '#8B3A3A' },
    ],
  },
  {
    id: 'academic',
    label: 'Academic & Medical',
    uses: 'University profiles, medical directories',
    cards: [
      { name: 'Clean White', backdrop: '#F5F5F5' },
      { name: 'Lab Coat Blue', backdrop: '#3D5A80' },
      { name: 'Classic Navy', backdrop: '#1E3A5F' },
    ],
  },
  {
    id: 'events',
    label: 'Events & Conferences',
    uses: 'Speaking engagements, conference bios',
    cards: [
      { name: 'Stage Dark', backdrop: '#1A1A2E' },
      { name: 'Spotlight Gold', backdrop: '#C9A98A', ink: '#1A1A2E' },
      { name: 'Event Gray', backdrop: '#4A4A4A' },
    ],
  },
];

function isLight(hex: string): boolean {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55;
}

function Silhouette({ fill }: { fill: string }) {
  return (
    <svg
      viewBox="0 0 200 260"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <g fill={fill} fillOpacity="0.82">
        {/* Head */}
        <ellipse cx="100" cy="88" rx="38" ry="45" />
        {/* Shoulders */}
        <path d="M20 260 C20 195 55 168 100 168 C145 168 180 195 180 260 Z" />
        {/* Collar hint */}
        <path d="M80 168 L90 200 L100 180 L110 200 L120 168" fill={fill} fillOpacity="0.3" />
      </g>
    </svg>
  );
}

export function ManyLooksSection() {
  const [activeId, setActiveId] = useState<string>(OCCASIONS[0].id);
  const active = OCCASIONS.find((o) => o.id === activeId) ?? OCCASIONS[0];

  return (
    <section
      className="border-t border-tp-line/40 bg-tp-paper py-16 sm:py-20"
      aria-labelledby="many-looks-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-tp-bronze-ink">
            Versatility
          </p>
          <h2
            id="many-looks-heading"
            className="mt-3 font-display text-2xl font-normal text-tp-black sm:text-3xl"
          >
            One Photo, Many Looks
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-tp-muted">
            Upload once, get headshots tailored for every occasion — from boardroom to social media.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Occasions"
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {OCCASIONS.map((o) => {
            const selected = o.id === active.id;
            return (
              <button
                key={o.id}
                type="button"
                role="tab"
                id={`many-looks-tab-${o.id}`}
                aria-selected={selected}
                aria-controls={`many-looks-panel-${o.id}`}
                onClick={() => setActiveId(o.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  selected
                    ? 'bg-tp-bronze text-tp-black'
                    : 'border border-tp-line text-tp-ink hover:border-tp-bronze/50'
                )}
              >
                {o.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`many-looks-panel-${active.id}`}
          aria-labelledby={`many-looks-tab-${active.id}`}
          className="mt-8"
        >
          <p className="text-center text-sm text-tp-muted">{active.uses}</p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5">
            {active.cards.map((card) => {
              const light = isLight(card.backdrop);
              const silhouette = card.ink ?? (light ? '#2D2D2D' : '#FFFFFF');
              const labelDark = card.ink ? true : light;
              return (
                <figure
                  key={`${active.id}-${card.name}`}
                  aria-label={card.name}
                  className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-tp-card border border-tp-line shadow-sm sm:max-w-none"
                  style={{ backgroundColor: card.backdrop }}
                >
                  <Silhouette fill={silhouette} />
                  <figcaption
                    className={cn(
                      'absolute inset-x-0 bottom-0 bg-gradient-to-t p-3 pt-8',
                      labelDark
                        ? 'from-white/60 via-white/30 to-transparent'
                        : 'from-black/60 via-black/30 to-transparent'
                    )}
                  >
                    <span
                      className={cn(
                        'text-sm font-semibold',
                        labelDark ? 'text-tp-black' : 'text-white'
                      )}
                    >
                      {card.name}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-center text-xs italic text-tp-muted">
          Illustrative concepts — actual results use AI generation based on your own photos
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/auth/register?redirect=/dashboard/upload?category=headshots"
            className={cn(buttonVariants({ size: 'lg' }))}
          >
            Start Creating →
          </Link>
        </div>
      </div>
    </section>
  );
}
