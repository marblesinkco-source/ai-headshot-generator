import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
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

export const metadata: Metadata = {
  title: 'TailorPic vs BetterPic — AI Headshot Generator Comparison',
  description:
    'Compare TailorPic vs BetterPic for AI-generated professional headshots. See pricing, photo count, delivery time, and features side by side. TailorPic starts at $9.90 with 40+ photos.',
  alternates: { canonical: '/vs/betterpic' },
  openGraph: {
    title: 'TailorPic vs BetterPic — AI Headshot Generator Comparison',
    description:
      'Compare TailorPic and BetterPic for AI headshots. Pricing, photo count, features, and delivery — see which AI headshot generator is right for you.',
    url: `${siteConfig.url}/vs/betterpic`,
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const quickBadges = [
  {
    icon: DollarSign,
    label: 'Starting Price',
    tailorpic: '$9.90',
    competitor: '$35+',
  },
  {
    icon: ImageIcon,
    label: 'Photos Included',
    tailorpic: '40+',
    competitor: '20 (Basic) to 120',
  },
  {
    icon: Clock,
    label: 'Delivery Time',
    tailorpic: 'Under 2 hours',
    competitor: '1 to 2 hours',
  },
];

type FeatureRow = {
  feature: string;
  tailorpic: string | boolean;
  competitor: string | boolean;
};

const comparisonRows: FeatureRow[] = [
  { feature: 'Starting Price', tailorpic: '$9.90', competitor: '$35 (Basic plan)' },
  { feature: 'Number of Photos', tailorpic: '40+', competitor: '20 on Basic plan' },
  { feature: 'Delivery Time', tailorpic: 'Under 2 hours', competitor: '1 to 2 hours by plan' },
  { feature: 'Photo Categories', tailorpic: '11 categories', competitor: 'Headshot-focused' },
  { feature: 'Money-Back Guarantee', tailorpic: 'Yes (14 days)', competitor: 'Yes (7 days, terms apply)' },
  { feature: 'Team / Enterprise Plans', tailorpic: true, competitor: true },
  { feature: 'Pet Portraits', tailorpic: true, competitor: false },
  { feature: 'Dating Photos', tailorpic: true, competitor: 'Limited' },
  { feature: 'E-Commerce Product Photos', tailorpic: true, competitor: false },
  { feature: 'Industry-Specific Solutions', tailorpic: true, competitor: 'Limited' },
];

const whyCards = [
  {
    icon: BadgeDollarSign,
    title: 'Much More Affordable',
    description:
      'TailorPic starts at just $9.90, while BetterPic\'s entry-level Basic plan starts at $35. Get professional headshots at a fraction of the price.',
  },
  {
    icon: ImageIcon,
    title: 'More Photos for Less',
    description:
      'Every TailorPic order includes 40+ photos, compared with 20 photos on BetterPic\'s Basic plan, so you have more to choose from.',
  },
  {
    icon: LayoutGrid,
    title: 'More Categories',
    description:
      'Choose from 11 distinct photo categories including business, dating, pet portraits, and e-commerce, well beyond a headshot-only workflow.',
  },
  {
    icon: Target,
    title: 'Industry-Specific Solutions',
    description:
      'TailorPic offers tailored solutions for real estate agents, lawyers, e-commerce brands, and more, plus a 14-day money-back guarantee.',
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5 text-green-600">
        <Check className="h-5 w-5" />
        <span className="sr-only">Yes</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-1.5 text-red-500">
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

export default function VsBetterPicPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="min-h-screen">
        <BreadcrumbSchema items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'TailorPic vs BetterPic', url: `${siteConfig.url}/vs/betterpic` },
        ]} />
        {/* ---- Hero ---- */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-tp-ink sm:text-5xl lg:text-6xl">
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
                    className="rounded-2xl border border-tp-line bg-white p-6 text-center shadow-sm"
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
            <h2 className="mb-10 text-center text-3xl font-bold text-tp-ink">
              Feature-by-Feature Comparison
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-tp-line">
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
            <h2 className="mb-12 text-center text-3xl font-bold text-tp-ink">
              Why Choose TailorPic
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              {whyCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-tp-line bg-white p-8 shadow-sm"
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

        {/* ---- CTA ---- */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-bold text-tp-ink">Ready to Switch?</h2>
            <p className="mx-auto mt-4 max-w-xl text-tp-muted">
              Get professional AI headshots starting at just $9.90 with a 14-day money-back guarantee. No subscriptions, no hidden fees
              — just 40+ great photos delivered in under 2 hours.
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
