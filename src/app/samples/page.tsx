import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { portrait } from '@/config/stock-portraits';

// Below-the-fold client components: lazy load for performance
const VideoTestimonials = dynamic(
  () => import('@/components/marketing/video-testimonials').then((m) => m.VideoTestimonials)
);
const SamplesGallery = dynamic(
  () => import('@/components/marketing/samples-gallery').then((m) => m.SamplesGallery)
);
const BeforeAfterGallery = dynamic(
  () => import('@/components/marketing/before-after-gallery').then((m) => m.BeforeAfterGallery)
);
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
/*  Metadata (SSR)                                                    */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: { absolute: 'AI Headshot Samples & Styles | TailorPic' },
  description:
    'Browse AI-generated professional headshot samples across Corporate, Creative, Lifestyle, Academic and more styles. See what TailorPic can create for you.',
  alternates: {
    canonical: '/samples',
  },
  openGraph: generateOGMetadata({
    title: 'AI Headshot Samples & Styles | TailorPic',
    description:
      'Browse AI-generated professional headshot samples across Corporate, Creative, Lifestyle, Academic and more styles.',
    path: '/samples',
  }),
  twitter: generateTwitterMetadata({
    title: 'AI Headshot Samples & Styles | TailorPic',
    description:
      'Browse AI-generated professional headshot samples across Corporate, Creative, Lifestyle, Academic and more styles.',
  }),
};

/* ------------------------------------------------------------------ */
/*  Data (server-side only — not shipped to the client)               */
/* ------------------------------------------------------------------ */

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

type SampleImage = { src: string; alt: string };

const qualityBadges = [
  { icon: Monitor, label: '4K Resolution' },
  { icon: Palette, label: '40+ Styles' },
  { icon: Clock, label: 'Fast Delivery' },
  { icon: ShieldCheck, label: 'Commercial License' },
];

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
      <main id="main-content" className="bg-white">
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

        {/* ── Interactive Gallery (client component) ──── */}
        <SamplesGallery />

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
