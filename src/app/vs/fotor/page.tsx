import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import {
  Check,
  X,
  DollarSign,
  Image as ImageIcon,
  Clock,
  Sparkles,
  LayoutGrid,
  BadgeDollarSign,
  Target,
} from 'lucide-react';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

export const metadata: Metadata = {
  title: 'TailorPic vs Fotor AI — AI Headshot Generator vs Photo Editor',
  description:
    'Compare TailorPic vs Fotor AI. Fotor is a broad photo editor with AI tools; TailorPic specializes in professional AI headshots. See pricing, features, and quality side by side. TailorPic starts at $9.90 one-time.',
  alternates: { canonical: '/vs/fotor' },
  openGraph: generateOGMetadata({ title: 'TailorPic vs Fotor AI — AI Headshot Generator vs Photo Editor', description: 'Compare TailorPic and Fotor AI. A specialized AI headshot generator versus a general photo editor — see which fits your needs.', path: '/vs/fotor', type: 'vs' }),
  twitter: generateTwitterMetadata({ title: 'TailorPic vs Fotor AI — AI Headshot Generator vs Photo Editor', description: 'Compare TailorPic and Fotor AI. A specialized AI headshot generator versus a general photo editor — see which fits your needs.', type: 'vs' }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const quickBadges = [
  {
    icon: DollarSign,
    label: 'Starting Price',
    tailorpic: '$9.90 one-time',
    competitor: '~$8.99/month',
  },
  {
    icon: ImageIcon,
    label: 'Photos Included',
    tailorpic: '40+',
    competitor: 'Varies by plan',
  },
  {
    icon: Sparkles,
    label: 'Main Purpose',
    tailorpic: 'AI headshots',
    competitor: 'General photo editing',
  },
];

type FeatureRow = {
  feature: string;
  tailorpic: string | boolean;
  competitor: string | boolean;
};

const comparisonRows: FeatureRow[] = [
  { feature: 'Starting Price', tailorpic: '$9.90 one-time', competitor: '~$8.99/month subscription' },
  { feature: 'Pricing Model', tailorpic: 'One-time payment', competitor: 'Subscription' },
  { feature: 'Primary Purpose', tailorpic: 'Specialized AI headshots', competitor: 'General photo editing with AI tools' },
  { feature: 'Broad Editing Toolset', tailorpic: 'Not the focus', competitor: true },
  { feature: 'Dedicated AI Headshot Generation', tailorpic: true, competitor: 'Limited' },
  { feature: 'Number of Photos', tailorpic: '40+', competitor: 'Varies by plan' },
  { feature: 'Photo Categories', tailorpic: '11 categories', competitor: 'No dedicated headshot categories' },
  { feature: 'Professional Headshot Styles', tailorpic: true, competitor: 'Limited' },
  { feature: 'Dating Photos', tailorpic: true, competitor: 'Limited' },
  { feature: 'Pet Portraits', tailorpic: true, competitor: false },
  { feature: 'E-Commerce Product Photos', tailorpic: true, competitor: 'Via general editing tools' },
  { feature: 'Money-Back Guarantee', tailorpic: 'Yes (14 days)', competitor: 'Varies by plan' },
];

const whyCards = [
  {
    icon: BadgeDollarSign,
    title: 'One-Time Price',
    description:
      'TailorPic costs a single $9.90 with no renewals. Fotor is generally offered as a monthly or annual subscription starting around $8.99/month, so costs add up over time. Check Fotor for current pricing.',
  },
  {
    icon: Target,
    title: 'Specialized, Not General-Purpose',
    description:
      'Fotor offers a wide range of editing tools, with AI headshots as one feature among many. TailorPic focuses on one job, professional headshots, and is tuned for it.',
  },
  {
    icon: Sparkles,
    title: 'Better Fit for Professional Use',
    description:
      'Because every part of TailorPic is designed for headshots, results are geared toward LinkedIn, resumes, and company profiles rather than general-purpose edits.',
  },
  {
    icon: LayoutGrid,
    title: '11 Categories, 40+ Photos',
    description:
      'Get a full set of photos across 11 categories including business, dating, pet portraits, and e-commerce, with no editing skills required.',
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5 text-tp-bronze-ink">
        <Check className="h-5 w-5" />
        <span className="sr-only">Yes</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-1.5 text-tp-muted">
        <X className="h-5 w-5" />
        <span className="sr-only">No</span>
      </span>
    );
  }
  return <span>{value}</span>;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    question: 'How does TailorPic\'s price compare to Fotor?',
    answer:
      'TailorPic is a $9.90 one-time payment. Fotor is generally sold as a subscription starting around $8.99/month. Fotor may change its pricing, so check their site for current pricing.',
  },
  {
    question: 'How many photos do I get with TailorPic compared to Fotor?',
    answer:
      'Every TailorPic order includes 40+ photos across 11 categories. With Fotor the number of results varies by plan, since AI headshots are one tool among many in a general photo editor.',
  },
  {
    question: 'How quickly will I receive my photos?',
    answer:
      'TailorPic delivers your set in about 2 hours. Check Fotor\'s site for current generation times for its AI tools.',
  },
  {
    question: 'Is TailorPic a subscription like Fotor?',
    answer:
      'No. TailorPic is a one-time $9.90 payment with no renewals and a 14-day money-back guarantee. Fotor is typically offered as a monthly or annual subscription.',
  },
  {
    question: 'How does TailorPic train its AI, and do I need editing skills?',
    answer:
      'TailorPic trains a personalized LoRA model on your own selfies, so the results are built around your actual face rather than a generic template. You upload your photos, pick your categories, and the generation runs automatically. You do not need any editing skills, unlike a full photo editor with a broad toolset.',
  },
];

export default function VsFotorPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="min-h-screen">
        <BreadcrumbSchema items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'TailorPic vs Fotor AI', url: `${siteConfig.url}/vs/fotor` },
        ]} />
        <FAQSchema items={faqs} />
        {/* ---- Hero ---- */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="font-display text-4xl font-normal tracking-tight text-tp-ink sm:text-5xl lg:text-6xl">
              TailorPic vs Fotor&nbsp;AI
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-muted">
              See how TailorPic compares to Fotor AI, the all-in-one photo editor, for professional headshots.
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
                        <p className="text-xs font-medium text-tp-muted">Fotor AI</p>
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
                    <th className="px-6 py-4 font-semibold text-tp-muted">Fotor AI</th>
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
              Get professional AI headshots starting at just $9.90. No subscriptions, no hidden fees
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
