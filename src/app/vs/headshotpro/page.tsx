import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  Check,
  X,
  DollarSign,
  Image,
  Layers,
  Zap,
  Shield,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'TailorPic vs HeadshotPro — Compare AI Headshot Generators (2026)',
  description:
    'Compare TailorPic and HeadshotPro side by side. See pricing, photo quality, category variety, and features to find the best AI headshot generator for you.',
  alternates: { canonical: '/vs/headshotpro' },
  openGraph: {
    title: 'TailorPic vs HeadshotPro — AI Headshot Generator Comparison',
    description:
      'Detailed comparison of TailorPic and HeadshotPro. Compare pricing from $9.90 vs $29, photo categories, delivery speed, and more.',
    url: `${siteConfig.url}/vs/headshotpro`,
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const quickBadges = [
  {
    label: 'Starting Price',
    ours: '$9.90',
    theirs: '$29',
    icon: DollarSign,
  },
  {
    label: 'Photos per Session',
    ours: '40+',
    theirs: '40+',
    icon: Image,
  },
  {
    label: 'Photo Categories',
    ours: '11',
    theirs: 'Limited',
    icon: Layers,
  },
];

type RowValue = string | boolean;

interface ComparisonRow {
  feature: string;
  tailorpic: RowValue;
  headshotpro: RowValue;
}

const comparisonRows: ComparisonRow[] = [
  { feature: 'Starting Price', tailorpic: '$9.90', headshotpro: '$29' },
  { feature: 'Photos per Session', tailorpic: '40+', headshotpro: '40+' },
  { feature: 'Delivery', tailorpic: 'Under 2 hours', headshotpro: 'Under 2 hours' },
  { feature: 'Photo Categories', tailorpic: '11', headshotpro: 'Professional only' },
  { feature: 'Pet Portraits', tailorpic: true, headshotpro: false },
  { feature: 'Dating Photos', tailorpic: true, headshotpro: false },
  { feature: 'E-Commerce Photos', tailorpic: true, headshotpro: false },
  { feature: 'Family Portraits', tailorpic: true, headshotpro: false },
  { feature: 'Team Plans', tailorpic: true, headshotpro: true },
  { feature: 'Money-Back Guarantee', tailorpic: '14 days', headshotpro: 'Yes' },
];

const advantages = [
  {
    icon: DollarSign,
    title: '3x Lower Price',
    description:
      'Get the same quality AI headshots starting at $9.90 instead of $29. No subscription needed — just a simple one-time payment.',
  },
  {
    icon: Layers,
    title: '11 Photo Categories',
    description:
      'Go beyond professional headshots. TailorPic offers dating photos, pet portraits, e-commerce product shots, family portraits, and more.',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description:
      'Your AI-generated photos are delivered in under 2 hours. Upload your selfies, pick a style, and get studio-quality results fast.',
  },
  {
    icon: Shield,
    title: '14-Day Money-Back Guarantee',
    description:
      'Not satisfied? Get a full refund within 14 days. We stand behind the quality of every photo we deliver.',
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function CellValue({ value, highlight }: { value: RowValue; highlight?: boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <span className="inline-flex items-center justify-center rounded-full bg-tp-bronze/10 p-1 text-tp-bronze-ink">
        <Check className="h-4 w-4" />
      </span>
    ) : (
      <span className="inline-flex items-center justify-center rounded-full bg-tp-paper p-1 text-tp-muted">
        <X className="h-4 w-4" />
      </span>
    );
  }

  return (
    <span className={highlight ? 'font-semibold text-tp-bronze-ink' : 'text-tp-muted'}>
      {value}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function VsHeadshotProPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'TailorPic vs HeadshotPro', url: `${siteConfig.url}/vs/headshotpro` },
      ]} />
      <Header />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-tp-line bg-tp-paper px-4 py-1.5 text-sm font-medium text-tp-muted">
            <Sparkles className="h-4 w-4 text-tp-bronze" />
            Competitor Comparison
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-tp-black sm:text-5xl lg:text-6xl">
            TailorPic vs{' '}
            <span className="bg-gradient-to-r from-tp-bronze-ink to-tp-bronze bg-clip-text text-transparent">
              HeadshotPro
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-muted">
            Both platforms deliver AI-generated headshots, but TailorPic gives you more
            categories, lower prices, and creative flexibility that HeadshotPro
            doesn&apos;t offer.
          </p>
        </div>
      </section>

      {/* ── Quick Comparison Badges ───────────────────────────────── */}
      <section className="pb-16">
        <div className="mx-auto grid max-w-4xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {quickBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className="rounded-2xl border border-tp-line bg-tp-paper p-6 text-center"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-tp-bronze/10">
                  <Icon className="h-5 w-5 text-tp-bronze-ink" />
                </div>
                <p className="text-sm font-medium text-tp-muted">{badge.label}</p>
                <div className="mt-3 flex items-center justify-center gap-3">
                  <span className="rounded-full bg-tp-bronze-ink px-3 py-1 text-sm font-bold text-white">
                    {badge.ours}
                  </span>
                  <span className="text-xs font-medium text-tp-muted">vs</span>
                  <span className="rounded-full border border-tp-line bg-white px-3 py-1 text-sm font-semibold text-tp-muted">
                    {badge.theirs}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Detailed Comparison Table ─────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold tracking-tight text-tp-black sm:text-4xl">
            Feature-by-Feature Comparison
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-tp-muted">
            See exactly how TailorPic and HeadshotPro stack up across pricing,
            features, and flexibility.
          </p>

          <div className="overflow-hidden rounded-2xl border border-tp-line">
            {/* Header row */}
            <div className="grid grid-cols-3 bg-tp-paper px-4 py-4 text-sm font-semibold sm:px-6">
              <span className="text-tp-muted">Feature</span>
              <span className="text-center text-tp-bronze-ink">TailorPic</span>
              <span className="text-center text-tp-muted">HeadshotPro</span>
            </div>

            {/* Data rows */}
            {comparisonRows.map((row, i) => {
              const isWinner =
                row.tailorpic !== row.headshotpro &&
                (typeof row.tailorpic === 'boolean'
                  ? row.tailorpic === true
                  : true);

              return (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 items-center px-4 py-4 text-sm sm:px-6 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-tp-paper/50'
                  }`}
                >
                  <span className="font-medium text-tp-ink">{row.feature}</span>
                  <span className="text-center">
                    <CellValue value={row.tailorpic} highlight={isWinner} />
                  </span>
                  <span className="text-center">
                    <CellValue value={row.headshotpro} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why TailorPic ─────────────────────────────────────────── */}
      <section className="bg-tp-paper py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-tp-black sm:text-4xl">
            Why Choose TailorPic
          </h2>
          <p className="mx-auto mb-14 max-w-xl text-center text-tp-muted">
            TailorPic is built for everyone who needs more than just corporate
            headshots — at a fraction of the price.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {advantages.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-2xl border border-tp-line bg-white p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-tp-bronze/10">
                    <Icon className="h-6 w-6 text-tp-bronze-ink" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-tp-ink">{card.title}</h3>
                  <p className="leading-relaxed text-tp-muted">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-tp-black sm:text-4xl">
            Ready to Make the Switch?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-tp-muted">
            Get better variety, lower prices, and studio-quality AI photos
            delivered in hours with TailorPic.
          </p>
          <Link
            href="/pricing"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-tp-bronze-ink px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-tp-ink hover:shadow-xl"
          >
            Make the Switch
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="mt-4 text-sm text-tp-muted">
            Starting at $9.90 &middot; No subscription &middot; 14-day money-back guarantee
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
