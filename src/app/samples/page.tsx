'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import {
  ArrowRight,
  Sparkles,
  Monitor,
  Clock,
  Palette,
  ShieldCheck,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  NOTE: All sample photos shown on this page are AI-generated       */
/*  examples created for demonstration purposes. They do NOT          */
/*  represent real customers or verified results.                     */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const categories = [
  'All',
  'LinkedIn',
  'Corporate',
  'Dating',
  'Real Estate',
  'Legal',
  'Pet Portraits',
  'Graduation',
  'Family',
] as const;

type Category = (typeof categories)[number];

const gradientPalettes = [
  'from-[#C9A98A] to-[#76563D]',
  'from-[#76563D] to-[#0B0B0B]',
  'from-[#DCCDBB] to-[#C9A98A]',
  'from-[#171613] to-[#76563D]',
  'from-[#C9A98A] to-[#DCCDBB]',
  'from-[#5F5A54] to-[#171613]',
  'from-[#DFD6CC] to-[#C9A98A]',
  'from-[#76563D] to-[#DCCDBB]',
  'from-[#0B0B0B] to-[#5F5A54]',
  'from-[#C9A98A] to-[#5F5A54]',
  'from-[#DCCDBB] to-[#76563D]',
  'from-[#171613] to-[#C9A98A]',
];

interface SampleEntry {
  id: number;
  category: Exclude<Category, 'All'>;
  style: string;
  gradient: string;
}

const sampleEntries: SampleEntry[] = [
  { id: 1, category: 'LinkedIn', style: 'Classic Studio', gradient: gradientPalettes[0] },
  { id: 2, category: 'Corporate', style: 'Modern Minimal', gradient: gradientPalettes[1] },
  { id: 3, category: 'Dating', style: 'Outdoor Natural', gradient: gradientPalettes[2] },
  { id: 4, category: 'Real Estate', style: 'Professional Trust', gradient: gradientPalettes[3] },
  { id: 5, category: 'Legal', style: 'Executive Portrait', gradient: gradientPalettes[4] },
  { id: 6, category: 'Pet Portraits', style: 'Playful Studio', gradient: gradientPalettes[5] },
  { id: 7, category: 'Graduation', style: 'Cap & Gown Classic', gradient: gradientPalettes[6] },
  { id: 8, category: 'Family', style: 'Warm & Candid', gradient: gradientPalettes[7] },
  { id: 9, category: 'LinkedIn', style: 'Creative Professional', gradient: gradientPalettes[8] },
  { id: 10, category: 'Corporate', style: 'Team Headshot', gradient: gradientPalettes[9] },
  { id: 11, category: 'Dating', style: 'Urban Lifestyle', gradient: gradientPalettes[10] },
  { id: 12, category: 'Graduation', style: 'Modern Academic', gradient: gradientPalettes[11] },
];

const qualityBadges = [
  { icon: Monitor, label: '4K Resolution' },
  { icon: Palette, label: '40+ Styles' },
  { icon: Clock, label: '2-Hour Delivery' },
  { icon: ShieldCheck, label: 'Commercial License' },
];

const beforeAfterCards = [
  { style: 'LinkedIn Headshot', gradientBefore: 'from-[#DFD6CC] to-[#DCCDBB]', gradientAfter: 'from-[#C9A98A] to-[#76563D]' },
  { style: 'Corporate Team', gradientBefore: 'from-[#DFD6CC] to-[#DCCDBB]', gradientAfter: 'from-[#171613] to-[#76563D]' },
  { style: 'Dating Profile', gradientBefore: 'from-[#DFD6CC] to-[#DCCDBB]', gradientAfter: 'from-[#DCCDBB] to-[#C9A98A]' },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function SamplesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredEntries =
    activeCategory === 'All'
      ? sampleEntries
      : sampleEntries.filter((e) => e.category === activeCategory);

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Samples', url: `${siteConfig.url}/samples` },
      ]} />
      <Header />
      <main id="main-content" className="min-h-screen bg-white">
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="px-4 pb-16 pt-28 text-center sm:pt-32 md:pt-36">
          <div className="mx-auto max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-tp-line bg-tp-paper px-4 py-1.5 text-sm font-medium text-tp-bronze-ink">
              <Sparkles className="h-4 w-4" />
              Sample Gallery
            </span>
            <h1 className="mt-6 font-display text-4xl font-normal tracking-tight text-tp-ink sm:text-5xl md:text-6xl">
              See What AI Can Create
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-tp-muted">
              Browse real examples of TailorPic AI-generated photos across all categories.
            </p>
          </div>
        </section>

        {/* ── Category Filter Tabs ─────────────────────── */}
        <section className="border-b border-tp-line bg-white px-4 pb-6">
          <div className="mx-auto max-w-5xl">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-none sm:flex-wrap sm:justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'border-tp-bronze bg-tp-bronze text-white'
                      : 'border-tp-line bg-white text-tp-muted hover:border-tp-bronze hover:text-tp-bronze-ink'
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="group relative overflow-hidden rounded-2xl border border-tp-line bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Gradient placeholder */}
                  <div
                    className={`relative aspect-[3/4] bg-gradient-to-br ${entry.gradient}`}
                  >
                    {/* AI Generated watermark */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="rotate-[-20deg] select-none text-lg font-semibold tracking-widest text-white/20">
                        AI GENERATED
                      </span>
                    </div>
                    {/* Category badge */}
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-tp-ink backdrop-blur-sm">
                        {entry.category}
                      </span>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="w-full p-4">
                        <p className="text-sm font-medium text-white">
                          {entry.style}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Card footer */}
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
          </div>
        </section>

        {/* ── Before / After ───────────────────────────── */}
        <section className="border-t border-tp-line bg-tp-paper px-4 py-16 md:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
              From Selfie to Studio Quality
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-tp-muted">
              Upload your everyday photos and receive polished, professional results powered by AI.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {beforeAfterCards.map((card, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div className="flex w-full items-center gap-3">
                    {/* Before */}
                    <div className="flex-1">
                      <div
                        className={`relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br ${card.gradientBefore}`}
                      >
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                          <Upload className="h-6 w-6 text-tp-muted/60" />
                          <span className="text-xs font-medium text-tp-muted/60">
                            Upload
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="h-5 w-5 shrink-0 text-tp-bronze" />

                    {/* After */}
                    <div className="flex-1">
                      <div
                        className={`relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br ${card.gradientAfter}`}
                      >
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                          <ImageIcon className="h-6 w-6 text-white/40" />
                          <span className="text-xs font-medium text-white/40">
                            Result
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-tp-ink">{card.style}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quality Badges ───────────────────────────── */}
        <section className="border-t border-tp-line bg-white px-4 py-14">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
            {qualityBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-tp-paper">
                  <Icon className="h-5 w-5 text-tp-bronze-ink" />
                </div>
                <span className="text-sm font-semibold text-tp-ink">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────── */}
        <section className="border-t border-tp-line bg-tp-ink px-4 py-20 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-normal tracking-tight text-tp-paper sm:text-4xl">
              Ready to Create Your Photos?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-tp-beige/80">
              Join thousands of professionals who trust TailorPic for studio-quality AI photos.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-tp-bronze text-white hover:bg-tp-bronze-ink">
                <Link href="/auth/register">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Disclaimer ───────────────────────────────── */}
        <div className="border-t border-tp-line bg-white px-4 py-4 text-center">
          <p className="text-xs text-tp-muted">
            Sample photos shown are AI-generated examples. Portraits are AI-generated concepts, not testimonial evidence.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
