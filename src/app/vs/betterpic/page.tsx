import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import {
  DollarSign,
  Image as ImageIcon,
  Clock,
  LayoutGrid,
  BadgeDollarSign,
  Target,
} from 'lucide-react';
import { CellValue } from '@/components/shared/cell-value';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { FAQAccordion } from '@/components/marketing/faq-accordion';
import { RelatedLinks } from '@/components/related-links';
import { getRelatedVsPages } from '@/lib/internal-links';

// Revalidate every hour so pricing changes propagate without a manual redeploy
export const revalidate = 3600;


export const metadata: Metadata = {
  title: { absolute: 'TailorPic vs BetterPic: AI Headshot Generator Comparison' },
  description:
    `Compare TailorPic vs BetterPic for professional AI headshots. See pricing, photo count, delivery time and features side by side. TailorPic: photos from ${BASE_PRICE_DISPLAY}.`,
  alternates: { canonical: '/vs/betterpic' },
  openGraph: generateOGMetadata({ title: 'TailorPic vs BetterPic: AI Headshot Generator Comparison', description: 'Compare TailorPic and BetterPic for AI headshots. Pricing, photo count, features, and delivery — see which AI headshot generator is right for you.', path: '/vs/betterpic', type: 'vs' }),
  twitter: generateTwitterMetadata({ title: 'TailorPic vs BetterPic: AI Headshot Generator Comparison', description: 'Compare TailorPic and BetterPic for AI headshots. Pricing, photo count, features, and delivery — see which AI headshot generator is right for you.', type: 'vs' }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

// Competitor facts, checked on BetterPic's own site on 2026-10-21:
//   https://www.betterpic.io/pricing  Basic $35 / 20 headshots / 2 h,
//     Pro $39 / 60 / 1.5 h, Expert $79 / 120 / 1 h (1 free redo); free tier
//     "up to 10 free 4K headshots", queue-based; teams from $49 per seat;
//     "7-day refund policy (terms apply)", refunds "provided training has
//     not started"; redo otherwise $10
// Re-check this page before changing any BetterPic value below.

const quickBadges = [
  {
    icon: DollarSign,
    label: 'Starting Price',
    tailorpic: `From ${BASE_PRICE_DISPLAY}`,
    competitor: '$35 (free tier too)',
  },
  {
    icon: ImageIcon,
    label: 'Photos Included',
    tailorpic: '1 to 160',
    competitor: '20 (Basic) to 120',
  },
  {
    icon: Clock,
    label: 'Delivery Time',
    tailorpic: 'Within hours',
    competitor: '1 to 2 hours by plan',
  },
];

type FeatureRow = {
  feature: string;
  tailorpic: string | boolean;
  competitor: string | boolean;
};

const comparisonRows: FeatureRow[] = [
  { feature: 'Starting Price', tailorpic: `From ${BASE_PRICE_DISPLAY}`, competitor: '$35 (Basic plan)' },
  { feature: 'Number of Photos', tailorpic: '1 to 160', competitor: '20 to 120 by plan' },
  { feature: 'Free Option', tailorpic: 'Free instant preview with an account', competitor: 'Up to 10 free headshots, queue-based' },
  { feature: 'Delivery Time', tailorpic: 'Within hours', competitor: '1 to 2 hours by plan' },
  { feature: 'Photo Categories', tailorpic: '12 categories', competitor: 'Headshot-focused' },
  { feature: 'Quality Commitment', tailorpic: 'Free regeneration', competitor: '7-day refund if training has not started (terms apply)' },
  { feature: 'Team / Enterprise Plans', tailorpic: true, competitor: true },
  { feature: 'Try a Single Paid Photo', tailorpic: `Yes, ${BASE_PRICE_DISPLAY}`, competitor: false },
];

const whyCards = [
  {
    icon: BadgeDollarSign,
    title: 'Pay for Just One Photo',
    description:
      `TailorPic starts at just ${BASE_PRICE_DISPLAY}, for a single photo. BetterPic\'s paid plans start at $35 for 20 headshots, and it also has a free tier of up to 10 headshots.`,
  },
  {
    icon: ImageIcon,
    title: 'More Photos for Less',
    description:
      'TailorPic packages range from 1 to 160 photos across 12 categories. BetterPic plans range from 20 to 120 headshots.',
  },
  {
    icon: LayoutGrid,
    title: 'More Categories',
    description:
      'Choose from 12 distinct photo categories including business, dating, pet portraits, and e-commerce, well beyond a headshot-only workflow.',
  },
  {
    icon: Target,
    title: 'Industry-Specific Solutions',
    description:
      'TailorPic offers tailored solutions for real estate agents, lawyers, e-commerce brands, and more.',
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    question: 'How does TailorPic\'s price compare to BetterPic?',
    answer:
      `TailorPic packages are one-time payments starting at ${BASE_PRICE_DISPLAY}. BetterPic\'s paid plans are $35, $39 and $79 for 20, 60 and 120 headshots, plus a free tier (October 2026).`,
  },
  {
    question: 'How many photos do I get compared to BetterPic?',
    answer:
      'TailorPic packages range from 1 to 160 photos across 12 categories. BetterPic plans include 20, 60 or 120 headshots.',
  },
  {
    question: 'How fast will I get my photos?',
    answer:
      'TailorPic delivers within hours. BetterPic lists 2 hours on Basic, 1.5 hours on Pro and 1 hour on Expert.',
  },
  {
    question: 'Is TailorPic a subscription or a one-time purchase?',
    answer:
      `TailorPic packages are one-time payments starting at ${BASE_PRICE_DISPLAY} with no subscription. Every order includes free regeneration. BetterPic offers a 7-day refund if training has not started (terms apply).`,
  },
  {
    question: 'How does TailorPic create my photos, and is it easy to use?',
    answer:
      'TailorPic trains a personalized LoRA model on your own selfies, so the results are built around your actual face rather than a generic template. You upload your photos, pick your categories, and the generation runs automatically. Upload a few selfies, choose from 12 categories, and your photos arrive without any design or editing work on your part. There is nothing to learn and no tools to configure.',
  },
];

export default function VsBetterPicPage() {
  const relatedPages = getRelatedVsPages('betterpic');

  return (
    <>
      <Header />

      <main id="main-content" >
        <BreadcrumbSchema items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'TailorPic vs BetterPic', url: `${siteConfig.url}/vs/betterpic` },
        ]} />
        <FAQSchema items={faqs} />
        {/* ---- Hero ---- */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="font-display text-4xl font-normal tracking-tight text-tp-ink sm:text-5xl lg:text-6xl">
              TailorPic vs BetterPic
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-muted">
              See how TailorPic compares to BetterPic for professional headshots.
            </p>
          </div>
        </section>

        {/* ---- Quick Comparison Badges ---- */}
        <section className="bg-tp-paper py-16">
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid gap-6 sm:grid-cols-3">
              {quickBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.label}
                    className="rounded-tp-card border border-tp-line bg-white p-6 text-center shadow-sm"
                  >
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-tp-paper">
                      <Icon className="h-6 w-6 text-tp-bronze-ink" />
                    </div>
                    <p className="text-sm font-medium text-tp-muted">{badge.label}</p>
                    <div className="mt-4 flex items-center justify-center gap-4">
                      <div>
                        <p className="text-xs font-medium text-tp-muted">TailorPic</p>
                        <p className="text-lg font-bold text-tp-ink">{badge.tailorpic}</p>
                      </div>
                      <span className="text-tp-muted">vs</span>
                      <div>
                        <p className="text-xs font-medium text-tp-muted">BetterPic</p>
                        <p className="text-lg font-semibold text-tp-muted">{badge.competitor}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---- Detailed Comparison Table ---- */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-10 text-center text-3xl font-display font-normal text-tp-ink">
              Feature-by-Feature Comparison
            </h2>

            <div className="relative overflow-x-auto rounded-tp-card border border-tp-line">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-b border-tp-line bg-tp-paper">
                    <th className="px-6 py-4 font-semibold text-tp-muted">Feature</th>
                    <th className="px-6 py-4 font-semibold text-tp-bronze-ink bg-tp-paper/80">
                      TailorPic
                    </th>
                    <th className="px-6 py-4 font-semibold text-tp-muted">BetterPic</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={
                        i % 2 === 0
                          ? 'bg-white'
                          : 'bg-tp-paper/40'
                      }
                    >
                      <td className="px-6 py-4 font-medium text-tp-ink">{row.feature}</td>
                      <td className="px-6 py-4 font-medium text-tp-ink bg-tp-bronze/5">
                        <CellValue value={row.tailorpic} />
                      </td>
                      <td className="px-6 py-4 text-tp-muted">
                        <CellValue value={row.competitor} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ---- Why Choose TailorPic ---- */}
        <section className="bg-tp-paper py-20">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-12 text-center text-3xl font-display font-normal text-tp-ink">
              Why Choose TailorPic
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              {whyCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="rounded-tp-card border border-tp-line bg-white p-8 shadow-sm"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-tp-bronze/10">
                      <Icon className="h-5 w-5 text-tp-bronze-ink" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-tp-ink">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-tp-muted">{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-10 text-center text-3xl font-display font-normal text-tp-ink">Frequently asked questions</h2>
            <FAQAccordion items={faqs} />
          </div>
        </section>

        <RelatedLinks links={relatedPages} title="Compare More Alternatives" />


        {/* ---- CTA ---- */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-display font-normal text-tp-ink">Ready to Switch?</h2>
            <p className="mx-auto mt-4 max-w-xl text-tp-muted">
              Get professional AI headshots starting at just {BASE_PRICE_DISPLAY}. No subscriptions, no hidden fees
              — just great photos delivered within hours.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-tp-bronze-ink hover:bg-tp-bronze-ink/90 text-white">
                <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
