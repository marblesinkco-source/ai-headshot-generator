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
  Sparkles,
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
  title: { absolute: 'TailorPic vs Secta Labs: AI Headshot Generator Comparison' },
  description:
    `Compare TailorPic vs Secta Labs for AI headshots. TailorPic starts at ${BASE_PRICE_DISPLAY} for one photo, across 12 categories.`,
  alternates: { canonical: '/vs/secta' },
  openGraph: generateOGMetadata({ title: 'TailorPic vs Secta Labs: AI Headshot Generator Comparison', description: 'Compare TailorPic and Secta Labs for AI headshots. Pricing, categories, delivery, and quality commitment side by side.', path: '/vs/secta', type: 'vs' }),
  twitter: generateTwitterMetadata({ title: 'TailorPic vs Secta Labs: AI Headshot Generator Comparison', description: 'Compare TailorPic and Secta Labs for AI headshots. Pricing, categories, delivery, and quality commitment side by side.', type: 'vs' }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

// Competitor facts, checked on Secta Labs' own site on 2026-10-21:
//   https://secta.ai  "Professional Package": 7 styles, one-time payment,
//     "100+ HD Photos" (no price shown on the homepage); "Results in less than
//     2 hours"; "Refund guaranteed" badge (terms not shown); 90+ / 130+
//     styles; professional, LinkedIn, actor and corporate headshots plus fun
//     profile pictures, oil paintings and gift headshots; teams page linked
// Re-check this page before adding any Secta price below.

const quickBadges = [
  {
    icon: DollarSign,
    label: 'Starting Price',
    tailorpic: `From ${BASE_PRICE_DISPLAY}`,
    competitor: 'Not shown on homepage',
  },
  {
    icon: ImageIcon,
    label: 'Photos Included',
    tailorpic: '1 to 160',
    competitor: '100+',
  },
  {
    icon: Clock,
    label: 'Delivery Time',
    tailorpic: 'Within hours',
    competitor: 'Under 2 hours',
  },
];

type FeatureRow = {
  feature: string;
  tailorpic: string | boolean;
  competitor: string | boolean;
};

const comparisonRows: FeatureRow[] = [
  { feature: 'Starting Price', tailorpic: `From ${BASE_PRICE_DISPLAY}`, competitor: 'Not shown on their homepage' },
  { feature: 'Try a Single Photo First', tailorpic: `Yes, 1 photo for ${BASE_PRICE_DISPLAY}`, competitor: 'Not shown' },
  { feature: 'Number of Photos', tailorpic: '1 to 160', competitor: '100+ (Professional Package)' },
  { feature: 'Delivery Time', tailorpic: 'Within hours', competitor: 'Under 2 hours' },
  { feature: 'Styles', tailorpic: '11 styles, 15 backgrounds', competitor: '90+ to 130+ styles' },
  { feature: 'If You Are Not Happy', tailorpic: 'Free regeneration', competitor: 'Refund guaranteed (terms not shown)' },
  { feature: 'Professional Headshots', tailorpic: true, competitor: true },
];

const whyCards = [
  {
    icon: BadgeDollarSign,
    title: 'Start With One Photo',
    description:
      `TailorPic starts at ${BASE_PRICE_DISPLAY} for a single photo, so you can see your result before buying a larger package. Secta Labs sells a package of 100+ photos.`,
  },
  {
    icon: LayoutGrid,
    title: '12 Categories, Not Just Headshots',
    description:
      'Secta Labs centers on professional headshots, with extras like fun profile pictures and oil paintings. TailorPic covers 12 categories, including dating, pet portraits and e-commerce.',
  },
  {
    icon: Sparkles,
    title: 'Up to 160 Photos Within Hours',
    description:
      'Get photos delivered within hours so you can order with confidence.',
  },
  {
    icon: Target,
    title: 'Industry-Specific Solutions',
    description:
      'TailorPic offers tailored solutions for real estate agents, lawyers, e-commerce brands, and more — with style guidance specific to each industry.',
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
    question: 'How does TailorPic\'s price compare to Secta Labs?',
    answer:
      `TailorPic packages are one-time payments starting at ${BASE_PRICE_DISPLAY}. Secta Labs sells a one-time Professional Package with 100+ photos; its homepage did not show a price in October 2026.`,
  },
  {
    question: 'How many photos do I get with TailorPic?',
    answer:
      'TailorPic packages range from 1 to 160 photos across 12 categories. Secta Labs\' Professional Package includes 100+ photos.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'TailorPic delivers within hours. Secta Labs says results arrive in less than 2 hours.',
  },
  {
    question: 'Is TailorPic a subscription or a one-time purchase?',
    answer:
      `TailorPic packages are one-time payments starting at ${BASE_PRICE_DISPLAY} with no subscription.`,
  },
  {
    question: 'How does TailorPic train my photos, and is it easy to use?',
    answer:
      'TailorPic trains a personalized LoRA model on your own selfies, so the results are built around your actual face rather than a generic template. You upload your photos, pick your categories, and the generation runs automatically. Upload a few selfies, choose from 12 categories, and your photos arrive without any design or editing work on your part. There is nothing to learn and no tools to configure.',
  },
];

export default function VsSectaPage() {
  const relatedPages = getRelatedVsPages('secta');

  return (
    <>
      <Header />

      <main id="main-content" >
        <BreadcrumbSchema items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'TailorPic vs Secta Labs', url: `${siteConfig.url}/vs/secta` },
        ]} />
        <FAQSchema items={faqs} />
        {/* ---- Hero ---- */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="font-display text-4xl font-normal tracking-tight text-tp-ink sm:text-5xl lg:text-6xl">
              TailorPic vs Secta&nbsp;Labs
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-muted">
              See how TailorPic compares to Secta Labs, a headshot-focused AI generator, on price, variety, and speed.
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
                        <p className="text-xs font-medium text-tp-muted">Secta Labs</p>
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
                    <th className="px-6 py-4 font-semibold text-tp-muted">Secta Labs</th>
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
            <h2 className="text-3xl font-display font-normal text-tp-ink">Ready to Try TailorPic?</h2>
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
