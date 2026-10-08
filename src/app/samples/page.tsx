'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { VideoTestimonials } from '@/components/marketing/video-testimonials';
import { BreadcrumbSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { portrait, contentPhoto } from '@/config/stock-portraits';
import { BeforeAfterGallery } from '@/components/marketing/before-after-gallery';
import {
  ArrowRight,
  Sparkles,
  Monitor,
  Clock,
  Palette,
  ShieldCheck,
  Image as ImageIcon,
  Sun,
  Brush,
  Check,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  NOTE: Sample photos on this page are stock portraits from         */
/*  Unsplash, used as illustrative examples. They do NOT represent    */
/*  real customers or verified results.                               */
/* ------------------------------------------------------------------ */

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

/**
 * Category-appropriate image mappings — each sample card gets
 * an image matching its category (professional, pet, lifestyle, etc.)
 * instead of sequential indexing from the corporate portrait pool.
 */
const sampleImages: Record<number, SampleImage> = {
  // Professional — corporate headshots
  1: { src: portrait('photo-1573496359142-b8d87734a5a2'), alt: 'Professional woman in navy blazer — Classic Studio style example' },
  2: { src: portrait('photo-1560250097-0b93528c311a'), alt: 'Businessman in dark suit — Modern Minimal style example' },
  3: { src: portrait('photo-1566492031773-4f4e44671857'), alt: 'Distinguished man in suit — Executive Portrait style example' },
  4: { src: portrait('photo-1522075469751-3a6694fb2f61'), alt: 'Professional in team environment — Team Headshot style example' },
  // Creative — artistic, expressive portraits
  5: { src: portrait('photo-1531746020798-e6953c6e8e04'), alt: 'Creative professional with artistic style — style example' },
  6: { src: portrait('photo-1524504388940-b1c1722653e1'), alt: 'Man with creative casual look — Editorial Portrait style example' },
  7: { src: portrait('photo-1488426862026-3ee34a7d66df'), alt: 'Woman with bright creative expression — Playful Studio style example' },
  // Lifestyle — outdoor, casual, warm
  8: { src: portrait('photo-1506863530036-1efeddceb993'), alt: 'Woman enjoying golden hour outdoors — Outdoor Natural style example' },
  9: { src: portrait('photo-1529626455594-4ff0802cfb7e'), alt: 'Man with relaxed confident smile outdoors — Urban Lifestyle style example' },
  10: { src: portrait('photo-1519345182560-3f2917c472ef'), alt: 'Professional outdoors in warm light — Golden Hour style example' },
  // Academic — education, campus portraits
  11: { src: portrait('photo-1544005313-94ddf0286df2'), alt: 'Educator with warm expression — Cap & Gown Classic style example' },
  12: { src: portrait('photo-1568602471122-7832951cc4c5'), alt: 'Male educator in smart casual — Modern Academic style example' },
  // Family & Pets — warm family scenes and actual pet photos
  13: { src: portrait('photo-1609220136736-443140cffec6'), alt: 'Happy family portrait together — Warm & Candid style example' },
  14: { src: contentPhoto('photo-1587300003388-59208cc962cb'), alt: 'Golden retriever with friendly expression — Pet Portrait style example' },
};

/* Style group images — each group uses category-appropriate portraits */
const styleGroupImages: Record<string, SampleImage[]> = {
  Corporate: [
    { src: portrait('photo-1580489944761-15a19d654956'), alt: 'Confident woman in professional attire' },
    { src: portrait('photo-1507003211169-0a1dd7228f2d'), alt: 'Man with warm smile in casual business wear' },
    { src: portrait('photo-1500648767791-00dcc994a43e'), alt: 'Man with confident expression' },
  ],
  Creative: [
    { src: portrait('photo-1552374196-c4e7ffc6e126'), alt: 'Man with relaxed confident pose' },
    { src: portrait('photo-1517841905240-472988babdf9'), alt: 'Creative professional woman' },
  ],
  Casual: [
    { src: portrait('photo-1573496799652-408c2ac9fe98'), alt: 'Professional woman in natural setting' },
    { src: portrait('photo-1539571696357-5a69c17a67c6'), alt: 'Casual professional in relaxed wear' },
    { src: portrait('photo-1511895426328-dc8714191300'), alt: 'Joyful family moment outdoors' },
  ],
  Academic: [
    { src: portrait('photo-1545167622-3a6ac756afa4'), alt: 'Young professional with modern style' },
    { src: portrait('photo-1508214751196-bcfd4ca60f91'), alt: 'Elegant professional woman' },
  ],
};

const qualityBadges = [
  { icon: Monitor, label: '4K Resolution' },
  { icon: Palette, label: '40+ Styles' },
  { icon: Clock, label: 'Fast Delivery' },
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
  { feature: '40+ styles', ours: 'Every order includes photos across multiple style categories.', check: 'How many distinct styles are included?' },
  { feature: 'Hours, not days', ours: 'Results are delivered in hours rather than days.', check: 'What is the stated turnaround time?' },
  { feature: 'One-time payment', ours: `Pay once, from ${BASE_PRICE_DISPLAY}. No subscription.`, check: 'Is it a one-time fee or a recurring plan?' },
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
              Browse AI-generated concept portraits by category. All photos shown are AI-generated concept images.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-base font-medium text-tp-bronze-ink">
              Get photos starting at {BASE_PRICE_DISPLAY}, one-time, no subscription.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <Link
                href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'rounded-tp-button bg-tp-bronze text-white hover:bg-tp-bronze-ink'
                )}
              >
                Get Your Headshots
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <p className="text-sm text-tp-muted">No subscription required</p>
            </div>
          </div>
        </section>

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
                  {/* Sample image (AI-generated concept) */}
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
                    {/* AI Generated watermark */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="rotate-[-20deg] select-none text-lg font-semibold tracking-widest text-tp-paper/30">
                        AI GENERATED
                      </span>
                    </div>
                    {/* Category badge */}
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-tp-paper/90 px-3 py-1 text-xs font-semibold text-tp-ink backdrop-blur-sm">
                        {entry.category}
                      </span>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-tp-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="w-full p-4">
                        <p className="text-sm font-medium text-tp-paper">
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

        {/* ── Popular Styles ───────────────────────────── */}
        <section className="border-t border-tp-line bg-tp-paper px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
                Popular Styles
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-tp-muted">
                Pick a look that fits where your photo will be used. Images below are AI-generated concepts, not real results.
              </p>
            </div>
            <div className="mt-12 space-y-12">
              {styleGroups.map((group) => (
                <div key={group.name}>
                  <h3 className="font-display text-2xl font-normal text-tp-ink">{group.name}</h3>
                  <p className="mt-1 text-sm text-tp-muted">{group.blurb}</p>
                  <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {group.styles.map((s, idx) => (
                      <div key={s.label} className="overflow-hidden rounded-tp-card border border-tp-line bg-white">
                        <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${s.gradient}`}>
                          {styleGroupImages[group.name]?.[idx] && (
                            <Image
                              src={styleGroupImages[group.name][idx].src}
                              alt={`${styleGroupImages[group.name][idx].alt} (${s.label}, AI-generated concept)`}
                              fill
                              sizes="(min-width: 640px) 33vw, 50vw"
                              className="object-cover"
                            />
                          )}
                          <span className="absolute left-3 top-3 rounded-tp-button bg-white/90 px-2.5 py-1 text-xs font-semibold text-tp-ink">
                            {group.name}
                          </span>
                          <span className="absolute bottom-3 right-3 rounded-tp-button bg-tp-black/50 px-2 py-0.5 text-xs font-medium tracking-widest text-white">
                            AI GENERATED CONCEPT
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
                href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
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

        {/* ── Before / After (interactive drag sliders) ── */}
        <BeforeAfterGallery />

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
                  <span className="font-display font-normal text-lg text-tp-ink">{row.feature}</span>
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
                href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
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

        {/* ── Use cases (illustrative, not testimonials) ── */}
        <VideoTestimonials />

        {/* ── CTA ──────────────────────────────────────── */}
        <section className="border-t border-tp-line bg-tp-ink px-4 py-20 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-normal tracking-tight text-tp-paper sm:text-4xl">
              Ready to create yours?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-tp-beige/80">
              Upload your photos and get studio-quality AI portraits &mdash; from a single photo to a set of 160 &mdash; starting at {BASE_PRICE_DISPLAY}.
            </p>
            <div className="mt-8">
              <Link
                href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
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
