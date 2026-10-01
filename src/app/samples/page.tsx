'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { VideoTestimonials } from '@/components/marketing/video-testimonials';
import { Testimonials } from '@/components/marketing/testimonials';
import { BreadcrumbSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
  Sun,
  Brush,
  Check,
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

const styleGroups = [
  {
    name: 'Corporate',
    blurb: 'Clean, confident looks for company sites, teams and executive profiles.',
    styles: [
      { label: 'Modern Minimal', gradient: gradientPalettes[1] },
      { label: 'Executive Portrait', gradient: gradientPalettes[4] },
      { label: 'Team Headshot', gradient: gradientPalettes[9] },
    ],
  },
  {
    name: 'Creative',
    blurb: 'Expressive styles for portfolios, personal brands and playful profiles.',
    styles: [
      { label: 'Creative Professional', gradient: gradientPalettes[8] },
      { label: 'Playful Studio', gradient: gradientPalettes[5] },
    ],
  },
  {
    name: 'Casual',
    blurb: 'Relaxed, natural looks for dating apps, social profiles and family photos.',
    styles: [
      { label: 'Outdoor Natural', gradient: gradientPalettes[2] },
      { label: 'Urban Lifestyle', gradient: gradientPalettes[10] },
      { label: 'Warm & Candid', gradient: gradientPalettes[7] },
    ],
  },
  {
    name: 'Academic',
    blurb: 'Graduation and campus portraits for announcements and applications.',
    styles: [
      { label: 'Cap & Gown Classic', gradient: gradientPalettes[6] },
      { label: 'Modern Academic', gradient: gradientPalettes[11] },
    ],
  },
];

const qualityFeatures = [
  { icon: Monitor, title: '4K Resolution', body: 'High-resolution output suited to web profiles and print.' },
  { icon: ImageIcon, title: 'Multiple Backgrounds', body: 'Choose from studio, office, outdoor and other backdrops.' },
  { icon: Sun, title: 'Various Lighting', body: 'Soft studio, natural and dramatic lighting options.' },
  { icon: Brush, title: 'Professional Retouching', body: 'Polished, natural-looking results without heavy editing.' },
];

const comparisonRows = [
  { feature: '40+ styles', ours: 'Every order includes 40+ photos across multiple style categories.', check: 'How many distinct styles are included?' },
  { feature: 'Hours, not days', ours: 'Results are delivered in hours rather than days.', check: 'What is the stated turnaround time?' },
  { feature: 'One-time payment', ours: 'Pay once, from $9.90. No subscription.', check: 'Is it a one-time fee or a recurring plan?' },
  { feature: '14-day guarantee', ours: '14-day money-back guarantee.', check: 'What is the refund window and are there conditions?' },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `AI Headshot Samples | ${siteConfig.name}`,
            description:
              'Browse sample AI-generated professional headshots across LinkedIn, Corporate, Dating, Real Estate, and more styles.',
            url: `${siteConfig.url}/samples`,
            isPartOf: {
              '@type': 'WebSite',
              name: siteConfig.name,
              url: siteConfig.url,
            },
          }),
        }}
      />
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
              Browse AI-generated example portraits across all categories.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-base font-medium text-tp-bronze-ink">
              Get 40+ photos starting at $9.90, one-time, no subscription.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <Link
                href="/auth/register"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'rounded-tp-button bg-tp-bronze text-white hover:bg-tp-bronze-ink'
                )}
              >
                Get Your Headshots
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <p className="text-sm text-tp-muted">14-day money-back guarantee</p>
            </div>
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
                  className="group relative overflow-hidden rounded-tp-card border border-tp-line bg-white shadow-sm transition-shadow hover:shadow-md"
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

            <div className="mt-12 text-center">
              <Link
                href="/auth/register"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'rounded-tp-button bg-tp-bronze text-white hover:bg-tp-bronze-ink'
                )}
              >
                Create Yours from $9.90
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <p className="mt-3 text-sm text-tp-muted">40+ photos, one-time payment. Most orders ready within 2 hours.</p>
            </div>
          </div>
        </section>

        {/* ── Popular Styles ───────────────────────────── */}
        <section className="border-t border-tp-line bg-tp-paper px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
                Popular Styles
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-tp-muted">
                Pick a look that fits where your photo will be used. Placeholders below are illustrative, not real results.
              </p>
            </div>
            <div className="mt-12 space-y-12">
              {styleGroups.map((group) => (
                <div key={group.name}>
                  <h3 className="font-display text-2xl font-normal text-tp-ink">{group.name}</h3>
                  <p className="mt-1 text-sm text-tp-muted">{group.blurb}</p>
                  <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {group.styles.map((s) => (
                      <div key={s.label} className="overflow-hidden rounded-tp-card border border-tp-line bg-white">
                        <div className={`relative aspect-[4/3] bg-gradient-to-br ${s.gradient}`}>
                          <span className="absolute left-3 top-3 rounded-tp-button bg-white/90 px-2.5 py-1 text-xs font-semibold text-tp-ink">
                            {group.name}
                          </span>
                          <span className="absolute bottom-3 right-3 text-xs font-medium tracking-widest text-white/60">
                            PLACEHOLDER
                          </span>
                        </div>
                        <p className="p-3 text-sm font-semibold text-tp-ink">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/auth/register"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'rounded-tp-button bg-tp-bronze text-white hover:bg-tp-bronze-ink'
                )}
              >
                Try These Styles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
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
                        className={`relative aspect-square overflow-hidden rounded-tp-button bg-gradient-to-br ${card.gradientBefore}`}
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
                        className={`relative aspect-square overflow-hidden rounded-tp-button bg-gradient-to-br ${card.gradientAfter}`}
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

        {/* ── Quality Features ─────────────────────────── */}
        <section className="border-t border-tp-line bg-white px-4 py-16 md:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
              Built for Quality
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {qualityFeatures.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-tp-card border border-tp-line bg-tp-paper p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-white">
                    <Icon className="h-5 w-5 text-tp-bronze-ink" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-normal text-tp-ink">{title}</h3>
                  <p className="mt-2 text-sm text-tp-muted">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Comparison ───────────────────────────────── */}
        <section className="border-t border-tp-line bg-tp-paper px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
                Our Quality vs Competitors
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-tp-muted">
                What you get with TailorPic, and what to check with any AI headshot service.
              </p>
            </div>
            <div className="mt-10 overflow-hidden rounded-tp-card border border-tp-line bg-white">
              <div className="hidden grid-cols-[1fr_1.5fr_1.5fr] gap-4 border-b border-tp-line bg-tp-ink px-6 py-3 text-sm font-semibold text-tp-paper sm:grid">
                <span>Feature</span>
                <span>TailorPic</span>
                <span>Ask any provider</span>
              </div>
              {comparisonRows.map((row) => (
                <div
                  key={row.feature}
                  className="grid gap-2 border-b border-tp-line px-6 py-5 last:border-b-0 sm:grid-cols-[1fr_1.5fr_1.5fr] sm:gap-4"
                >
                  <span className="font-display text-lg text-tp-ink">{row.feature}</span>
                  <span className="flex items-start gap-2 text-sm text-tp-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" />
                    {row.ours}
                  </span>
                  <span className="text-sm text-tp-muted">{row.check}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/auth/register"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'rounded-tp-button bg-tp-bronze text-white hover:bg-tp-bronze-ink'
                )}
              >
                Get Your Headshots
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Video Testimonials ───────────────────────── */}
        <VideoTestimonials />

        {/* ── Use-case Testimonials (illustrative, labeled) ── */}
        <Testimonials />

        {/* ── CTA ──────────────────────────────────────── */}
        <section className="border-t border-tp-line bg-tp-ink px-4 py-20 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-normal tracking-tight text-tp-paper sm:text-4xl">
              Ready to create yours?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-tp-beige/80">
              Upload your photos and get 40+ studio-quality AI portraits, starting at $9.90.
            </p>
            <div className="mt-8">
              <Link
                href="/auth/register"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'rounded-tp-button bg-tp-bronze text-white hover:bg-tp-bronze-ink'
                )}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
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
