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
  Camera,
} from 'lucide-react';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

export const metadata: Metadata = {
  title: 'TailorPic vs Canva AI — AI Headshot Generator vs Design Platform',
  description:
    'Compare TailorPic vs Canva AI. Canva is a design platform with AI image tools; TailorPic creates photorealistic professional AI headshots. See pricing and features side by side. TailorPic starts at $9.90 one-time.',
  alternates: { canonical: '/vs/canva-ai' },
  openGraph: generateOGMetadata({ title: 'TailorPic vs Canva AI — AI Headshot Generator vs Design Platform', description: 'Compare TailorPic and Canva AI. Photorealistic AI headshots versus a general design platform — see which fits your needs.', path: '/vs/canva-ai', type: 'vs' }),
  twitter: generateTwitterMetadata({ title: 'TailorPic vs Canva AI — AI Headshot Generator vs Design Platform', description: 'Compare TailorPic and Canva AI. Photorealistic AI headshots versus a general design platform — see which fits your needs.', type: 'vs' }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const quickBadges = [
  {
    icon: DollarSign,
    label: 'Starting Price',
    tailorpic: '$9.90 one-time',
    competitor: '~$12.99/month (Pro)',
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
    competitor: 'Graphic design',
  },
];

type FeatureRow = {
  feature: string;
  tailorpic: string | boolean;
  competitor: string | boolean;
};

const comparisonRows: FeatureRow[] = [
  { feature: 'Starting Price', tailorpic: '$9.90 one-time', competitor: '~$12.99/month (Canva Pro)' },
  { feature: 'Pricing Model', tailorpic: 'One-time payment', competitor: 'Subscription (free tier available)' },
  { feature: 'Primary Purpose', tailorpic: 'Photorealistic AI headshots', competitor: 'Design platform with AI features' },
  { feature: 'Photorealistic Headshots from Selfies', tailorpic: true, competitor: 'Limited' },
  { feature: 'Design Templates and Layouts', tailorpic: 'Not the focus', competitor: true },
  { feature: 'Number of Photos', tailorpic: '40+', competitor: 'Varies by use' },
  { feature: 'Photo Categories', tailorpic: '11 categories', competitor: 'No dedicated headshot categories' },
  { feature: 'Professional Headshot Styles', tailorpic: true, competitor: 'Limited' },
  { feature: 'Dating Photos', tailorpic: true, competitor: false },
  { feature: 'Pet Portraits', tailorpic: true, competitor: 'Illustrated styles' },
  { feature: 'E-Commerce Product Photos', tailorpic: true, competitor: 'Via design templates' },
  { feature: 'Free Tier', tailorpic: 'Coming Soon', competitor: 'Yes' },
];

const whyCards = [
  {
    icon: BadgeDollarSign,
    title: 'Lower Cost, No Subscription',
    description:
      'TailorPic is a one-time $9.90 payment. Canva Pro is a subscription starting around $12.99/month. Canva also has a free tier, and pricing may change, so check Canva for current rates.',
  },
  {
    icon: Camera,
    title: 'Photorealistic Results',
    description:
      'Canva AI image tools are great for illustrations and graphics, but are not built to produce realistic headshots of you. TailorPic is trained to generate photorealistic portraits.',
  },
  {
    icon: Target,
    title: 'Dedicated to Professional Photography',
    description:
      'Canva covers presentations, social posts, and much more. TailorPic does one thing, professional headshots, so every style and feature serves that goal.',
  },
  {
    icon: LayoutGrid,
    title: '11 Categories for Every Use',
    description:
      'From business and dating to pet portraits and e-commerce, get 40+ photos in styles that suit each purpose without designing anything yourself.',
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
    question: 'How does TailorPic\'s price compare to Canva AI?',
    answer:
      'TailorPic is a $9.90 one-time payment. Canva Pro is a subscription starting around $12.99/month, and Canva also has a free tier. Canva may change its pricing, so check their site for current rates.',
  },
  {
    question: 'How many photos do I get with TailorPic?',
    answer:
      'Every TailorPic order includes 40+ photos across 11 categories. With Canva, the number of images depends on your plan and how you use its AI tools, as it is a general design platform rather than a headshot service.',
  },
  {
    question: 'How long does it take to get my headshots?',
    answer:
      'TailorPic delivers your full set in about 2 hours. Canva generates images on demand, but it is not designed to produce a complete set of photorealistic headshots of you.',
  },
  {
    question: 'Is TailorPic a subscription like Canva Pro?',
    answer:
      'No. TailorPic is a one-time $9.90 payment with no recurring charges, plus a 14-day money-back guarantee. Canva Pro is billed as a subscription.',
  },
  {
    question: 'How is TailorPic different from Canva\'s AI tools in how it works?',
    answer:
      'TailorPic trains a personalized LoRA model on your own selfies, so the results are built around your actual face rather than a generic template. You upload your photos, pick your categories, and the generation runs automatically. Canva is a design platform with AI features, while TailorPic is built only for realistic headshots. Upload a few selfies, choose from 11 categories, and your photos arrive without any design or editing work on your part. There is nothing to learn and no tools to configure.',
  },
];

export default function VsCanvaAIPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="min-h-screen">
        <BreadcrumbSchema items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'TailorPic vs Canva AI', url: `${siteConfig.url}/vs/canva-ai` },
        ]} />
        <FAQSchema items={faqs} />
        {/* ---- Hero ---- */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="font-display text-4xl font-normal tracking-tight text-tp-ink sm:text-5xl lg:text-6xl">
              TailorPic vs Canva&nbsp;AI
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-muted">
              See how TailorPic compares to Canva AI, the design platform, for professional headshots.
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
                        <p className="text-xs font-medium text-tp-muted">Canva AI</p>
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
                    <th className="px-6 py-4 font-semibold text-tp-muted">Canva AI</th>
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
