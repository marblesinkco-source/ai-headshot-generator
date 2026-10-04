'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Shuffle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const BACKDROPS = [
  { id: 'studio-gray', label: 'Studio Gray', gradient: 'from-[#E8E6E0] to-[#C8C6C0]' },
  { id: 'warm-beige', label: 'Warm Beige', gradient: 'from-[#F5F0E8] to-[#E0D5C5]' },
  { id: 'navy-pro', label: 'Navy Pro', gradient: 'from-[#1F3A5F] to-[#0F2240]' },
  { id: 'soft-white', label: 'Soft White', gradient: 'from-[#F8F8F6] to-[#EEECE8]' },
  { id: 'forest', label: 'Forest Green', gradient: 'from-[#2D5A3D] to-[#1A3A28]' },
  { id: 'modern-teal', label: 'Modern Teal', gradient: 'from-[#DDE5EE] to-[#B8CDE0]' },
] as const;

const OUTFITS = [
  { id: 'dark-suit', label: 'Dark Suit', color: '#1B2A4A' },
  { id: 'light-blazer', label: 'Light Blazer', color: '#D5D0C8' },
  { id: 'black-crew', label: 'Black Crew', color: '#16161A' },
  { id: 'navy-polo', label: 'Navy Polo', color: '#2C3E50' },
  { id: 'charcoal', label: 'Charcoal', color: '#3D3D3D' },
  { id: 'cream-knit', label: 'Cream Knit', color: '#E8E0D5' },
] as const;

export function StyleConfigurator() {
  const [backdrop, setBackdrop] = useState(0);
  const [outfit, setOutfit] = useState(0);

  const randomize = useCallback(() => {
    setBackdrop(Math.floor(Math.random() * BACKDROPS.length));
    setOutfit(Math.floor(Math.random() * OUTFITS.length));
  }, []);

  const bg = BACKDROPS[backdrop];
  const fit = OUTFITS[outfit];

  return (
    <section className="bg-tp-beige/25 py-tp-section" aria-labelledby="configurator-heading">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="uppercase text-[11px] font-semibold tracking-[0.25em] text-tp-bronze-ink mb-3">
            Customize Your Style
          </p>
          <h2
            id="configurator-heading"
            className="font-display text-[30px] sm:text-[40px] font-normal tracking-[-0.03em] text-tp-ink leading-tight"
          >
            Design Your Look
          </h2>
          <p className="mt-4 text-[15px] text-tp-muted leading-relaxed">
            Mix backdrops and outfits to preview your headshot style. Every plan includes multiple combinations.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_280px]">
          {/* Controls */}
          <div className="space-y-8">
            {/* Backdrops */}
            <div>
              <p className="mb-3 text-sm font-semibold text-tp-ink">Choose a Backdrop</p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {BACKDROPS.map((b, i) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBackdrop(i)}
                    className={cn(
                      'group flex flex-col items-center gap-2 rounded-tp-button border-2 p-2.5 transition-all',
                      backdrop === i
                        ? 'border-tp-bronze shadow-md'
                        : 'border-transparent hover:border-tp-line'
                    )}
                    aria-pressed={backdrop === i}
                  >
                    <div
                      className={cn(
                        'h-10 w-10 rounded-full bg-gradient-to-br shadow-inner',
                        b.gradient
                      )}
                    />
                    <span className="text-[11px] font-medium leading-tight text-tp-muted group-hover:text-tp-ink">
                      {b.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Outfits */}
            <div>
              <p className="mb-3 text-sm font-semibold text-tp-ink">Choose an Outfit</p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {OUTFITS.map((o, i) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setOutfit(i)}
                    className={cn(
                      'group flex flex-col items-center gap-2 rounded-tp-button border-2 p-2.5 transition-all',
                      outfit === i
                        ? 'border-tp-bronze shadow-md'
                        : 'border-transparent hover:border-tp-line'
                    )}
                    aria-pressed={outfit === i}
                  >
                    <div
                      className="h-10 w-10 rounded-full shadow-inner"
                      style={{ backgroundColor: o.color }}
                    />
                    <span className="text-[11px] font-medium leading-tight text-tp-muted group-hover:text-tp-ink">
                      {o.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Surprise me */}
            <button
              type="button"
              onClick={randomize}
              className="inline-flex items-center gap-2 rounded-tp-button border border-tp-line px-4 py-2.5 text-sm font-medium text-tp-muted transition-colors hover:border-tp-bronze/50 hover:text-tp-ink"
            >
              <Shuffle className="h-4 w-4" />
              Surprise Me
            </button>
          </div>

          {/* Preview */}
          <div className="mx-auto w-full max-w-[280px] lg:mx-0">
            <div
              className={cn(
                'relative aspect-[3/4] overflow-hidden rounded-tp-card bg-gradient-to-br shadow-lg transition-all duration-500',
                bg.gradient
              )}
            >
              {/* Shoulders */}
              <div
                className="absolute bottom-0 left-1/2 h-[35%] w-[75%] -translate-x-1/2 rounded-t-[45%] transition-colors duration-500"
                style={{ backgroundColor: fit.color }}
              />
              {/* Neck */}
              <div className="absolute bottom-[32%] left-1/2 h-[8%] w-[14%] -translate-x-1/2 rounded-md bg-tp-beige/70" />
              {/* Head */}
              <div className="absolute bottom-[37%] left-1/2 aspect-square w-[30%] -translate-x-1/2 rounded-full bg-tp-beige/70 shadow-inner" />
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />
              {/* Labels */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="rounded-tp-button bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-tp-ink backdrop-blur-sm">
                  {bg.label}
                </span>
                <span className="rounded-tp-button bg-tp-black/80 px-2 py-0.5 text-[10px] font-semibold text-tp-paper backdrop-blur-sm">
                  {fit.label}
                </span>
              </div>
              {/* Disclosure */}
              <span className="absolute right-2 top-2 rounded-tp-button bg-tp-black/60 px-1.5 py-0.5 text-[9px] text-tp-paper/80">
                Preview concept
              </span>
            </div>

            {/* CTA under preview */}
            <div className="mt-4 text-center">
              <Link
                href="/auth/register?redirect=/headshots"
                className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'w-full')}
              >
                Get This Look
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <p className="mt-2 text-[11px] text-tp-muted">
                From $1.99 · Your uploaded photo, your chosen style
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StyleConfigurator;
