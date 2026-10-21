'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const BRAND_WEB = '/brand/tailorpic/web';

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const categories = ['All', 'Professional', 'Creative', 'Lifestyle', 'Academic', 'Family & Pets'] as const;

type Category = (typeof categories)[number];

const gradientPalettes = [
  'from-tp-bronze to-tp-bronze-ink',
  'from-tp-bronze-ink to-tp-black',
  'from-tp-beige to-tp-bronze',
  'from-tp-ink to-tp-bronze-ink',
  'from-tp-bronze to-tp-beige',
  'from-tp-muted to-tp-ink',
  'from-tp-line to-tp-bronze',
  'from-tp-bronze-ink to-tp-beige',
  'from-tp-black to-tp-muted',
  'from-tp-bronze to-tp-muted',
  'from-tp-beige to-tp-bronze-ink',
  'from-tp-ink to-tp-bronze',
];

interface SampleEntry {
  id: number;
  category: Exclude<Category, 'All'>;
  style: string;
  gradient: string;
}

const sampleEntries: SampleEntry[] = [
  { id: 1, category: 'Professional', style: 'Classic Studio', gradient: gradientPalettes[0] },
  { id: 2, category: 'Professional', style: 'Modern Minimal', gradient: gradientPalettes[1] },
  { id: 3, category: 'Professional', style: 'Executive Portrait', gradient: gradientPalettes[4] },
  { id: 4, category: 'Professional', style: 'Team Headshot', gradient: gradientPalettes[9] },
  { id: 5, category: 'Creative', style: 'Creative Professional', gradient: gradientPalettes[8] },
  { id: 6, category: 'Creative', style: 'Editorial Portrait', gradient: gradientPalettes[3] },
  { id: 7, category: 'Creative', style: 'Playful Studio', gradient: gradientPalettes[5] },
  { id: 8, category: 'Lifestyle', style: 'Outdoor Natural', gradient: gradientPalettes[2] },
  { id: 9, category: 'Lifestyle', style: 'Urban Lifestyle', gradient: gradientPalettes[10] },
  { id: 10, category: 'Lifestyle', style: 'Golden Hour', gradient: gradientPalettes[7] },
  { id: 11, category: 'Academic', style: 'Cap & Gown Classic', gradient: gradientPalettes[6] },
  { id: 12, category: 'Academic', style: 'Modern Academic', gradient: gradientPalettes[11] },
  { id: 13, category: 'Family & Pets', style: 'Warm & Candid', gradient: gradientPalettes[0] },
  { id: 14, category: 'Family & Pets', style: 'Pet Portrait Studio', gradient: gradientPalettes[8] },
];

type SampleImage = { src: string; alt: string };

const sampleImages: Record<number, SampleImage> = {
  1: { src: `${BRAND_WEB}/after-ozlem.jpg`, alt: 'AI-generated professional portrait — Classic Studio style example' },
  2: { src: `${BRAND_WEB}/after-murat.jpg`, alt: 'AI-generated corporate portrait — Modern Minimal style example' },
  3: { src: `${BRAND_WEB}/after-tarkan.jpg`, alt: 'AI-generated executive portrait — Executive Portrait style example' },
  4: { src: `${BRAND_WEB}/after-ahmet.jpg`, alt: 'AI-generated team portrait — Team Headshot style example' },
  5: { src: `${BRAND_WEB}/after-alpaslan.jpg`, alt: 'AI-generated creative portrait — Creative Professional style example' },
  6: { src: `${BRAND_WEB}/after-mert.jpg`, alt: 'AI-generated editorial portrait — Editorial Portrait style example' },
  7: { src: `${BRAND_WEB}/after-ozlem.jpg`, alt: 'AI-generated studio portrait — Playful Studio style example' },
  8: { src: `${BRAND_WEB}/after-ozan.jpg`, alt: 'AI-generated outdoor portrait — Outdoor Natural style example' },
  9: { src: `${BRAND_WEB}/after-halil.jpg`, alt: 'AI-generated lifestyle portrait — Urban Lifestyle style example' },
  10: { src: `${BRAND_WEB}/after-mustafa.jpg`, alt: 'AI-generated warm portrait — Golden Hour style example' },
  11: { src: `${BRAND_WEB}/after-ozan.jpg`, alt: 'AI-generated academic portrait — Cap & Gown Classic style example' },
  12: { src: `${BRAND_WEB}/after-tarkan.jpg`, alt: 'AI-generated academic portrait — Modern Academic style example' },
  13: { src: `${BRAND_WEB}/family-unver-group.jpg`, alt: 'Family portrait together — Warm & Candid style example' },
  14: { src: '/images/categories/pet-portraits.jpg', alt: 'Pet portrait — Pet Portrait Studio style example' },
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function SamplesGallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredEntries =
    activeCategory === 'All'
      ? sampleEntries
      : sampleEntries.filter((e) => e.category === activeCategory);

  return (
    <>
      {/* ── Category Filter Tabs ─────────────────────── */}
      <section className="border-b border-tp-line bg-white px-4 pb-6">
        <div className="mx-auto max-w-5xl">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-none sm:flex-wrap sm:justify-center">
            {categories.map((cat) => (
              <button
                type="button"
                aria-pressed={activeCategory === cat}
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'border-tp-bronze bg-tp-bronze text-tp-black'
                    : 'border-tp-line bg-tp-paper text-tp-muted hover:border-tp-bronze hover:text-tp-bronze-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Grid ─────────────────────────────── */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p role="note" className="mx-auto mb-8 max-w-2xl rounded-tp-button border border-tp-line bg-tp-paper px-4 py-3 text-center text-sm text-tp-muted">
            All photos shown are AI-generated concept images. They are illustrative placeholders, not real customers or verified results.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="group relative overflow-hidden rounded-tp-card border border-tp-line bg-tp-paper transition-shadow hover:shadow-md"
              >
                <div
                  className={`relative aspect-[3/4] overflow-hidden bg-gradient-to-br ${entry.gradient}`}
                >
                  <Image
                    src={sampleImages[entry.id].src}
                    alt={`${sampleImages[entry.id].alt} (${entry.style}, AI-generated concept)`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="rotate-[-20deg] select-none text-lg font-semibold tracking-widest text-tp-paper/30">
                      AI GENERATED
                    </span>
                  </div>
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-tp-paper/90 px-3 py-1 text-xs font-semibold text-tp-ink backdrop-blur-sm">
                      {entry.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-tp-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="w-full p-4">
                      <p className="text-sm font-medium text-tp-paper">
                        {entry.style}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-tp-ink">
                    {entry.style}
                  </p>
                  <p className="mt-1 text-xs text-tp-muted">
                    {entry.category} &middot; AI Generated
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredEntries.length === 0 && (
            <p className="py-20 text-center text-tp-muted">
              No samples available for this category yet.
            </p>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'rounded-tp-button bg-tp-bronze text-tp-black hover:bg-tp-black hover:text-tp-bronze'
              )}
            >
              Create yours
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <p className="mt-3 text-sm text-tp-muted">photos, one-time payment. Most orders ready within hours.</p>
          </div>
        </div>
      </section>
    </>
  );
}
