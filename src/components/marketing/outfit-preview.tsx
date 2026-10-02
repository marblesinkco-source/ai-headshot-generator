'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const BACKDROPS = [
  { id: 'studio-white', name: 'Studio White', background: 'linear-gradient(160deg, #FFFFFF 0%, #EFEDE8 100%)' },
  { id: 'studio-gray', name: 'Studio Gray', background: 'linear-gradient(160deg, #D5D6D8 0%, #A9ABAF 100%)' },
  { id: 'navy-blue', name: 'Navy Blue', background: 'linear-gradient(160deg, #1F3A5F 0%, #0F2240 100%)' },
  { id: 'forest-green', name: 'Forest Green', background: 'linear-gradient(160deg, #2F5D45 0%, #173626 100%)' },
  { id: 'warm-beige', name: 'Warm Beige', background: 'linear-gradient(160deg, #EADCC6 0%, #CDB896 100%)' },
  {
    id: 'city-skyline',
    name: 'City Skyline',
    background:
      'linear-gradient(to top, #2B3445 0%, #2B3445 18%, transparent 18%), linear-gradient(90deg, transparent 8%, #3A4558 8%, #3A4558 18%, transparent 18%, transparent 24%, #475268 24%, #475268 38%, transparent 38%, transparent 70%, #3A4558 70%, #3A4558 82%, transparent 82%), linear-gradient(180deg, #F2C9A0 0%, #8FA6C4 100%)',
  },
  {
    id: 'bookshelf',
    name: 'Bookshelf',
    background:
      'repeating-linear-gradient(90deg, #6B4A32 0px, #6B4A32 14px, #8C6446 14px, #8C6446 22px, #4F3523 22px, #4F3523 34px, #A27B58 34px, #A27B58 40px), #5A3E2A',
  },
  { id: 'gradient', name: 'Gradient', background: 'linear-gradient(135deg, #C8A97E 0%, #7A5C3A 50%, #1A1A1A 100%)' },
] as const;

const OUTFITS = [
  { id: 'navy-suit', name: 'Navy Suit', color: '#1B2A4A', accent: '#F5F5F0', style: 'suit' },
  { id: 'black-blazer', name: 'Black Blazer', color: '#16161A', accent: '#F5F5F0', style: 'suit' },
  { id: 'white-shirt', name: 'White Shirt', color: '#F7F6F2', accent: '#D9D5CB', style: 'shirt' },
  { id: 'casual-polo', name: 'Casual Polo', color: '#3F6B8C', accent: '#2E5069', style: 'polo' },
  { id: 'turtleneck', name: 'Turtleneck', color: '#3A3A3F', accent: '#2A2A2E', style: 'turtleneck' },
  { id: 'dress-shirt', name: 'Dress Shirt', color: '#A9C4DE', accent: '#8FAECB', style: 'shirt' },
  { id: 'blazer-tee', name: 'Blazer & Tee', color: '#6B5A48', accent: '#EFEAE0', style: 'suit' },
  { id: 'lab-coat', name: 'Lab Coat', color: '#FBFBFA', accent: '#CFCBC0', style: 'coat' },
] as const;

export function OutfitPreview() {
  const [backdropIdx, setBackdropIdx] = useState(0);
  const [outfitIdx, setOutfitIdx] = useState(0);

  const backdrop = BACKDROPS[backdropIdx];
  const outfit = OUTFITS[outfitIdx];

  return (
    <section id="outfit-preview-heading" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl lg:text-5xl">
            Customize Your Look
          </h2>
          <p className="mt-4 text-base text-tp-muted sm:text-lg">
            Choose your perfect backdrop and outfit combination. Every plan includes all options.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_minmax(0,360px)_1fr] lg:gap-10">
          {/* Backdrop selector */}
          <div className="order-2 lg:order-1">
            <h3 className="mb-3 text-sm font-medium text-tp-ink">Backdrop</h3>
            <div role="radiogroup" aria-label="Backdrop" className="grid grid-cols-4 gap-3">
              {BACKDROPS.map((b, i) => {
                const selected = i === backdropIdx;
                return (
                  <button
                    key={b.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={b.name}
                    title={b.name}
                    onClick={() => setBackdropIdx(i)}
                    className={cn(
                      'relative aspect-square rounded-tp-button border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2',
                      selected ? 'border-tp-bronze shadow-md' : 'border-tp-line hover:border-tp-bronze/60'
                    )}
                    style={{ background: b.background }}
                  >
                    {selected && (
                      <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-tp-black text-tp-bronze">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-sm text-tp-muted">{backdrop.name}</p>
          </div>

          {/* Preview */}
          <div className="order-1 lg:order-2">
            <div
              className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-tp-card border border-tp-line shadow-lg transition-[background] duration-300"
              style={{ background: backdrop.background }}
              role="img"
              aria-label={`Preview: ${outfit.name} on ${backdrop.name} backdrop`}
            >
              {/* Shoulders */}
              <div
                className="absolute bottom-0 left-1/2 h-[38%] w-[78%] -translate-x-1/2 rounded-t-[45%] border border-black/10 transition-colors duration-300"
                style={{ backgroundColor: outfit.color }}
              >
                {outfit.style === 'suit' && (
                  <>
                    <div
                      className="absolute left-1/2 top-0 h-[55%] w-[26%] -translate-x-1/2"
                      style={{
                        backgroundColor: outfit.accent,
                        clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      }}
                    />
                  </>
                )}
                {outfit.style === 'shirt' && (
                  <div
                    className="absolute left-1/2 top-0 h-[40%] w-[24%] -translate-x-1/2"
                    style={{
                      backgroundColor: outfit.accent,
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    }}
                  />
                )}
                {outfit.style === 'polo' && (
                  <div
                    className="absolute left-1/2 top-0 h-[32%] w-[22%] -translate-x-1/2 rounded-b-md"
                    style={{ backgroundColor: outfit.accent }}
                  />
                )}
                {outfit.style === 'coat' && (
                  <div
                    className="absolute left-1/2 top-0 h-[70%] w-[3px] -translate-x-1/2"
                    style={{ backgroundColor: outfit.accent }}
                  />
                )}
              </div>
              {/* Neck (turtleneck gets outfit colour) */}
              <div
                className="absolute bottom-[34%] left-1/2 h-[10%] w-[16%] -translate-x-1/2 rounded-md bg-tp-beige transition-colors duration-300"
                style={outfit.style === 'turtleneck' ? { backgroundColor: outfit.accent } : undefined}
              />
              {/* Head */}
              <div className="absolute bottom-[40%] left-1/2 aspect-square w-[34%] -translate-x-1/2 rounded-full bg-tp-beige shadow-inner" />

              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-tp-ink">
                Illustrative preview
              </span>
            </div>
            <p className="mt-4 text-center text-sm font-medium text-tp-ink">
              {outfit.name} <span className="text-tp-muted">on</span> {backdrop.name}
            </p>
          </div>

          {/* Outfit selector */}
          <div className="order-3">
            <h3 className="mb-3 text-sm font-medium text-tp-ink">Outfit</h3>
            <div role="radiogroup" aria-label="Outfit" className="grid grid-cols-2 gap-3">
              {OUTFITS.map((o, i) => {
                const selected = i === outfitIdx;
                return (
                  <button
                    key={o.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setOutfitIdx(i)}
                    className={cn(
                      'flex items-center gap-2 rounded-tp-button border px-3 py-3 text-left text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2',
                      selected
                        ? 'border-tp-bronze bg-tp-paper text-tp-ink font-medium'
                        : 'border-tp-line bg-white text-tp-muted hover:border-tp-bronze/60 hover:text-tp-ink'
                    )}
                  >
                    <span
                      className="h-3 w-3 shrink-0 rounded-full border border-tp-line"
                      style={{ backgroundColor: o.color }}
                      aria-hidden="true"
                    />
                    {o.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/auth/register?redirect=/headshots" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}>
            Start Creating
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OutfitPreview;
