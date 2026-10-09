'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { portrait, contentPhoto } from '@/config/stock-portraits';
import { ArrowRight } from 'lucide-react';

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
  1: { src: portrait('photo-1573496359142-b8d87734a5a2'), alt: 'Professional woman in navy blazer — Classic Studio style example' },
  2: { src: portrait('photo-1560250097-0b93528c311a'), alt: 'Businessman in dark suit — Modern Minimal style example' },
  3: { src: portrait('photo-1566492031773-4f4e44671857'), alt: 'Distinguished man in suit — Executive Portrait style example' },
  4: { src: portrait('photo-1522075469751-3a6694fb2f61'), alt: 'Professional in team environment — Team Headshot style example' },
  5: { src: portrait('photo-1531746020798-e6953c6e8e04'), alt: 'Creative professional with artistic style — style example' },
  6: { src: portrait('photo-1524504388940-b1c1722653e1'), alt: 'Man with creative casual look — Editorial Portrait style example' },
  7: { src: portrait('photo-1488426862026-3ee34a7d66df'), alt: 'Woman with bright creative expression — Playful Studio style example' },
  8: { src: portrait('photo-1506863530036-1efeddceb993'), alt: 'Woman enjoying golden hour outdoors — Outdoor Natural style example' },
  9: { src: portrait('photo-1529626455594-4ff0802cfb7e'), alt: 'Man with relaxed confident smile outdoors — Urban Lifestyle style example' },
  10: { src: portrait('photo-1519345182560-3f2917c472ef'), alt: 'Professional outdoors in warm light — Golden Hour style example' },
  11: { src: portrait('photo-1544005313-94ddf0286df2'), alt: 'Educator with warm expression — Cap & Gown Classic style example' },
  12: { src: portrait('photo-1568602471122-7832951cc4c5'), alt: 'Male educator in smart casual — Modern Academic style example' },
  13: { src: portrait('photo-1609220136736-443140cffec6'), alt: 'Happy family portrait together — Warm & Candid style example' },
  14: { src: contentPhoto('photo-1587300003388-59208cc962cb'), alt: 'Golden retriever with friendly expression — Pet Portrait style example' },
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
                'rounded-tp-button bg-tp-bronze text-white hover:bg-tp-bronze-ink'
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
