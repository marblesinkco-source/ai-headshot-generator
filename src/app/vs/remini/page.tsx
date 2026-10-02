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
  Sparkles,
  LayoutGrid,
  BadgeDollarSign,
  Target,
} from 'lucide-react';
import { CellValue } from '@/components/shared/cell-value';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

export const metadata: Metadata = {
  title: { absolute: 'TailorPic vs Remini: AI Headshot Generator Comparison' },
  description:
    'Compare TailorPic vs Remini. Remini enhances and restores existing photos; TailorPic makes professional headshots from selfies, from $1.99.',
  alternates: { canonical: '/vs/remini' },
  openGraph: generateOGMetadata({ title: 'TailorPic vs Remini: AI Headshot Generator Comparison', description: 'Compare TailorPic and Remini. A purpose-built AI headshot generator versus a photo enhancer — see which fits your needs.', path: '/vs/remini', type: 'vs' }),
  twitter: generateTwitterMetadata({ title: 'TailorPic vs Remini: AI Headshot Generator Comparison', description: 'Compare TailorPic and Remini. A purpose-built AI headshot generator versus a photo enhancer — see which fits your needs.', type: 'vs' }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const quickBadges = [
  {
    icon: DollarSign,
    label: 'Starting Price',
    tailorpic: 'from $1.99',
    competitor: '~$9.99/month',
  },
  {
    icon: ImageIcon,
    label: 'Photos Included',
    tailorpic: '1 to 160',
    competitor: 'Varies by plan',
  },
  {
    icon: Sparkles,
    label: 'Main Purpose',
    tailorpic: 'AI headshots',
    competitor: 'Photo enhancement',
  },
];

type FeatureRow = {
  feature: string;
  tailorpic: string | boolean;
  competitor: string | boolean;
};

const comparisonRows: FeatureRow[] = [
  { feature: 'Starting Price', tailorpic: 'from $1.99', competitor: '~$9.99/month subscription' },
  { feature: 'Pricing Model', tailorpic: 'One-time payment', competitor: 'Subscription' },
  { feature: 'Primary Purpose', tailorpic: 'Generate AI headshots', competitor: 'Enhance and restore photos' },
  { feature: 'Creates New Headshots from Selfies', tailorpic: true, competitor: 'Limited' },
  { feature: 'Enhances / Upscales Existing Photos', tailorpic: 'Not the focus', competitor: true },
  { feature: 'Number of Photos', tailorpic: '1 to 160', competitor: 'Varies by plan' },
  { feature: 'Photo Categories', tailorpic: '11 categories', competitor: 'No dedicated categories' },
  { feature: 'Professional Headshot Styles', tailorpic: true, competitor: 'Limited' },
  { feature: 'Dating Photos', tailorpic: true, competitor: 'Limited' },
  { feature: 'Pet Portraits', tailorpic: true, competitor: false },
  { feature: 'E-Commerce Product Photos', tailorpic: true, competitor: false },
  { feature: 'Money-Back Guarantee', tailorpic: 'Yes (14 days)', competitor: 'Varies by platform' },
];

const whyCards = [
  {
    icon: BadgeDollarSign,
    title: 'One-Time Payment',
    description:
      'TailorPic packages are one-time payments starting at $1.99 with no recurring charges, while Remini is typically offered as a subscription starting around $9.99/month. Pricing may change, so check Remini for current rates.',
  },
  {
    icon: Target,
    title: 'Purpose-Built for Headshots',
    description:
      'Remini is a photo enhancer designed to sharpen and restore existing images. TailorPic is built from the ground up to create brand-new professional headshots from your selfies.',
  },
  {
    icon: LayoutGrid,
    title: '11 Photo Categories',
    description:
      'Choose from 11 distinct categories including business, dating, pet portraits, and e-commerce. Remini does not organize its output into professional style categories.',
  },
  {
    icon: Sparkles,
    title: 'Polished, Ready-to-Use Results',
    description:
      'Rather than improving a single photo you already have, TailorPic delivers up to 160 professional images in different looks, ready for LinkedIn, resumes, and more.',
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
    question: 'How does TailorPic\'s price compare to Remini?',
    answer:
      'TailorPic packages are one-time payments starting at $1.99. Remini is typically offered as a subscription starting around $9.99/month. Remini may change its pricing, so check their site for current pricing.',
  },
  {
    question: 'How many photos do I get with TailorPic compared to Remini?',
    answer:
      'TailorPic packages include from 1 to 160 new photos across 11 categories. Remini is a photo enhancer that improves images you already have, and what you get varies by plan.',
  },
  {
    question: 'How long does it take to get my headshots?',
    answer:
      'TailorPic delivers your full set in about 2 hours. Remini enhances individual photos, so the workflow and timing are different.',
  },
  {
    question: 'Is TailorPic a subscription like Remini?',
    answer:
      'No. TailorPic packages are one-time payments starting at $1.99 with no recurring charges and a 14-day money-back guarantee. Remini is typically sold as a subscription.',
  },
  {
    question: 'How does TailorPic work compared to Remini\'s enhancement?',
    answer:
      'TailorPic trains a personalized LoRA model on your own selfies, so the results are built around your actual face rather than a generic template. You upload your photos, pick your categories, and the generation runs automatically. Remini sharpens and restores existing photos, while TailorPic creates new professional headshots from your selfies. Upload a few selfies, choose from 11 categories, and your photos arrive without any design or editing work on your part. There is nothing to learn and no tools to configure.',
  },
];

export default function VsReminiPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="min-h-screen">
        <BreadcrumbSchema items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'TailorPic vs Remini', url: `${siteConfig.url}/vs/remini` },
        ]} />
        <FAQSchema items={faqs} />
        {/* ---- Hero ---- */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="font-display text-4xl font-normal tracking-tight text-tp-ink sm:text-5xl lg:text-6xl">
              TailorPic vs Remini
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-muted">
              See how TailorPic compares to Remini, the AI photo enhancer, for professional headshots.
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
                        <p className="text-xs font-medium text-tp-muted">Remini</p>
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

            <div className="overflow-x-auto rounded-tp-card border border-tp-line">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-b border-tp-line bg-tp-paper">
                    <th className="px-6 py-4 font-semibold text-tp-muted">Feature</th>
                    <th className="px-6 py-4 font-semibold text-tp-bronze-ink bg-tp-paper/80">
                      TailorPic
                    </th>
                    <th className="px-6 py-4 font-semibold text-tp-muted">Remini</th>
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
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-tp-card border border-tp-line bg-tp-paper p-6">
                  <h3 className="mb-2 font-semibold text-tp-ink">{faq.question}</h3>
                  <p className="text-sm leading-relaxed text-tp-muted">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- CTA ---- */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-display font-normal text-tp-ink">Ready to Switch?</h2>
            <p className="mx-auto mt-4 max-w-xl text-tp-muted">
              Get professional AI headshots starting at just $1.99. No subscriptions, no hidden fees
              — just great photos delivered in under 2 hours.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-tp-bronze-ink hover:bg-tp-bronze-ink/90 text-white">
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
