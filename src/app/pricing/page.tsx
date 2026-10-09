import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Pricing } from '@/components/marketing/pricing';
import { PricingVisualIllustration } from '@/components/marketing/illustrations';
import { CreditPackages } from '@/components/marketing/credit-packages';
import { CostCalculator } from '@/components/marketing/cost-calculator';
import { PricingPsychology } from '@/components/marketing/pricing-psychology';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BASE_PRICE_DISPLAY, TEAM_PRICES, PAYMENT_PROVIDER } from '@/config/pricing';
import { formatPrice } from '@/lib/utils';
import { CATEGORIES } from '@/config/categories';
import { BreadcrumbSchema, FAQSchema, PricingProductSchema } from '@/components/structured-data';
import { ChevronDown, Check, CreditCard, BadgeCheck, Minus, ArrowRight } from 'lucide-react';
import { PricingViewToggle } from '@/components/marketing/pricing-view-toggle';
import { PricingComparisonBar } from '@/components/marketing/pricing-comparison-bar';
import { GuaranteeSection } from '@/components/marketing/guarantee-section';
import { TrustBadgesInline } from '@/components/marketing/trust-badges-inline';
import dynamic from 'next/dynamic';

const PackageQuiz = dynamic(() => import('@/components/marketing/package-quiz'), { ssr: false });
const PriceReceipt = dynamic(() => import('@/components/marketing/price-receipt'), { ssr: false });

const TEAM_SMALL = formatPrice(TEAM_PRICES.small.perPersonCents, 'usd', true);
const TEAM_LARGE = formatPrice(TEAM_PRICES.large.perPersonCents, 'usd', true);

// The "Most Popular" headshots package (flagged `recommended` in config).
const HEADSHOT_PACKAGES = CATEGORIES.headshots.packages;
const POPULAR_PACKAGE =
  HEADSHOT_PACKAGES.find((p) => p.recommended) ?? HEADSHOT_PACKAGES[HEADSHOT_PACKAGES.length - 1];
const MIN_OUTPUTS = Math.min(...HEADSHOT_PACKAGES.map((p) => p.outputCount));
const MAX_OUTPUTS = Math.max(...HEADSHOT_PACKAGES.map((p) => p.outputCount));

const pricingFaqs = [
  {
    question: 'Is there a subscription?',
    answer:
      'No. You pay once for the package you choose. There are no recurring charges and nothing to cancel.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      `We accept all major credit cards. Payments are processed securely through ${PAYMENT_PROVIDER.name}.`,
  },
  {
    question: 'How many photos do I get?',
    answer:
      `Depending on your plan, you receive ${MIN_OUTPUTS} to ${MAX_OUTPUTS} professional headshots in a variety of styles from a single upload.`,
  },
  {
    question: 'Do I need to upload many selfies?',
    answer:
      'Upload 4 to 10 clear selfies from different angles. More variety gives the AI more to work with, so use the full 10 if you have good shots.',
  },
  {
    question: 'Can I use the headshots commercially?',
    answer:
      'Yes. You get full commercial rights to your headshots, so you can use them on LinkedIn, your website, print materials and advertising.',
  },
  {
    question: 'How does team pricing work?',
    answer:
      `Team pricing is per person and one-time: ${TEAM_SMALL} per person for ${TEAM_PRICES.small.min}-${TEAM_PRICES.small.max} people and ${TEAM_LARGE} per person for ${TEAM_PRICES.large.min}-${TEAM_PRICES.large.max} people. For ${TEAM_PRICES.large.max}+ people we offer custom pricing, so get in touch with us.`,
  },
  {
    question: 'How does this compare with a studio photoshoot?',
    answer:
      `A traditional studio headshot session varies widely by photographer and location. A TailorPic package starts at ${BASE_PRICE_DISPLAY} with no studio visit or scheduling needed.`,
  },
  {
    question: 'What do credit packages save me?',
    answer:
      'Credit packages offer a lower per-photo cost compared with buying single packages. The more credits you buy, the more you save. Credits are a one-time purchase, not a subscription, and are valid for 12 months.',
  },
  {
    question: 'Are there any hidden fees?',
    answer:
      'No. The price you see at checkout is the price you pay. There are no extra charges for downloads, resolution or commercial use.',
  },
  {
    question: 'What if I\'m not satisfied with the results?',
    answer:
      'We want you to be happy with your headshots, and free regeneration is included in your package. Monetary refunds are not available once processing begins. If you are still not satisfied, contact us and we\'ll work with you. See tailorpic.com/refund-policy for full details.',
  },
];

const comparisonRows: { label: string; individual: boolean | string; team: boolean | string; studio: boolean | string }[] = [
  { label: 'Starting price', individual: BASE_PRICE_DISPLAY, team: `${TEAM_LARGE}-${TEAM_SMALL} per person`, studio: 'Varies by photographer' },
  { label: 'Payment model', individual: 'One-time', team: 'One-time', studio: 'Per session' },
  { label: 'No studio visit or scheduling', individual: true, team: true, studio: false },
  { label: 'Typically delivered within hours', individual: true, team: true, studio: false },
  { label: 'Consistent look across a team', individual: false, team: true, studio: 'Extra coordination' },
  { label: 'Full commercial rights', individual: true, team: true, studio: 'Varies' },
];

const includedFeatures = [
  {
    title: 'Photos',
    items: [
      `${MIN_OUTPUTS} to ${MAX_OUTPUTS} professional headshots from a single upload`,
      'A variety of styles, backgrounds and outfits',
      'High-resolution downloads',
    ],
  },
  {
    title: 'Process',
    items: [
      'Upload 4-10 selfies from your phone',
      'No studio visit, no scheduling',
      'Typically delivered within hours',
    ],
  },
  {
    title: 'Payment & protection',
    items: [
      'One-time payment, no subscription',
      PAYMENT_PROVIDER.checkoutBadge,
    ],
  },
];

const OG_DESCRIPTION =
  'Affordable AI photo packages for every need. Professional headshots, dating photos, pet portraits and more.';

export const metadata: Metadata = {
  title: { absolute: `TailorPic Pricing: AI Headshots from ${BASE_PRICE_DISPLAY}` },
  description: `${siteConfig.name} pricing: AI photos from ${BASE_PRICE_DISPLAY}, no subscription. Choose a single package across 12 categories or save with credit packs.`,
  alternates: { canonical: '/pricing' },
  openGraph: generateOGMetadata({
    title: `Pricing | ${siteConfig.name}`,
    description: OG_DESCRIPTION,
    path: '/pricing',
  }),
  twitter: generateTwitterMetadata({
    title: `Pricing | ${siteConfig.name}`,
    description: OG_DESCRIPTION,
  }),
};


export default function PricingPage() {
  return (
    <>
    <Header />
    <main id="main-content" >
      <PricingProductSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: `TailorPic Pricing: AI Headshots from ${BASE_PRICE_DISPLAY}`, url: `${siteConfig.url}/pricing` },
        ]}
      />
      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-4xl font-display font-normal tracking-tight text-tp-black sm:text-5xl">
            Simple,{' '}
            <span className="bg-gradient-to-r from-tp-bronze-ink to-tp-bronze bg-clip-text text-transparent">
              Transparent
            </span>{' '}
            Pricing
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-muted">
            One-time payment, no subscriptions. Choose your category, pick a package,
            and get studio-quality AI photos typically delivered within hours. Individual packages start at {BASE_PRICE_DISPLAY};
            teams pay {TEAM_SMALL} or {TEAM_LARGE} per person.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              Get your headshots from {BASE_PRICE_DISPLAY}
            </Link>
            <Link href="/team-headshots" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              See team pricing
            </Link>
          </div>
          <TrustBadgesInline className="mt-5" />
          <div className="mx-auto mt-10 max-w-xs">
            <PricingVisualIllustration className="w-full h-auto" />
          </div>
        </div>
      </section>

      <PricingViewToggle individual={<Pricing />} />

      <PackageQuiz />

      <GuaranteeSection />

      {/* Headshot package ladder */}
      <section className="py-16" aria-labelledby="ladder-heading">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="ladder-heading" className="text-center font-display text-3xl font-normal text-tp-black sm:text-4xl">
            Headshot packages side by side
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-tp-muted">
            One-time prices. The cost per photo falls as the package grows.
          </p>
          <div className="mt-10 overflow-x-auto rounded-tp-card border border-tp-line bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Headshot packages compared by price, photo count and features</caption>
              <thead>
                <tr className="border-b border-tp-line bg-tp-paper text-tp-ink">
                  <th scope="col" className="px-5 py-4 font-semibold">Package</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Price</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Photos</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Per photo</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Delivery</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Included</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tp-line">
                {HEADSHOT_PACKAGES.map((p) => {
                  const delivery = 'Within hours';
                  return (
                  <tr
                    key={p.id}
                    className={
                      p.recommended
                        ? 'bg-tp-bronze/10 transition-colors'
                        : 'transition-colors hover:bg-tp-paper/60'
                    }
                  >
                    <th scope="row" className="px-5 py-4 font-medium text-tp-ink">
                      <span className="flex items-center gap-2 flex-wrap">
                        {p.name}
                        {p.recommended && (
                          <span className="rounded-full bg-tp-black px-2 py-0.5 text-xs font-semibold text-tp-bronze">
                            Most Popular
                          </span>
                        )}
                      </span>
                    </th>
                    <td className="px-5 py-4 font-semibold text-tp-ink">{formatPrice(p.price, 'usd')}</td>
                    <td className="px-5 py-4 text-tp-muted">{p.outputCount}</td>
                    <td className="px-5 py-4 text-tp-muted">{formatPrice(Math.round(p.price / p.outputCount), 'usd')}</td>
                    <td className="px-5 py-4 text-tp-muted">{delivery}</td>
                    <td className="px-5 py-4 text-tp-muted">{p.features.join(', ')}</td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Feature comparison */}
      <section className="py-16" aria-labelledby="compare-heading">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="compare-heading" className="text-center font-display text-3xl font-normal text-tp-black sm:text-4xl">
            Compare your options
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-tp-muted">
            Studio price range reflects typical market estimates and varies by location.
          </p>
          <div className="mt-10 overflow-x-auto rounded-tp-card border border-tp-line bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-tp-line bg-tp-paper text-tp-ink">
                  <th scope="col" className="px-5 py-4 font-semibold">Feature</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Individual</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Team</th>
                  <th scope="col" className="px-5 py-4 font-semibold text-tp-muted">Photo studio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tp-line">
                {comparisonRows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="px-5 py-4 font-medium text-tp-ink">{r.label}</th>
                    {([r.individual, r.team, r.studio] as const).map((v, i) => (
                      <td key={i} className="px-5 py-4 text-tp-muted">
                        {v === true ? (
                          <>
                            <Check className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
                            <span className="sr-only">Included</span>
                          </>
                        ) : v === false ? (
                          <>
                            <Minus className="h-4 w-4 text-tp-muted" aria-hidden="true" />
                            <span className="sr-only">Not included</span>
                          </>
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16" aria-labelledby="included-heading">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2
            id="included-heading"
            className="text-center font-display text-3xl font-normal text-tp-black sm:text-4xl"
          >
            What&apos;s included
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {includedFeatures.map((g) => (
              <div key={g.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <h3 className="text-lg font-semibold text-tp-ink">{g.title}</h3>
                <ul className="mt-4 space-y-3">
                  {g.items.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-tp-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              Get your headshots from {BASE_PRICE_DISPLAY}
            </Link>
            <TrustBadgesInline className="mt-4" />
          </div>
        </div>
      </section>

      {/* Credits explainer */}
      <section className="py-16 sm:py-20" aria-labelledby="credits-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="uppercase text-[11px] font-semibold tracking-[0.25em] text-tp-bronze-ink">
              Bulk Savings
            </p>
            <h2 id="credits-heading" className="mt-3 font-display text-[30px] sm:text-[40px] font-normal tracking-[-0.03em] text-tp-ink leading-tight">
              Save More with Credit Packs
            </h2>
          </div>

          {/* Package vs Credits explanation */}
          <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="rounded-tp-card border border-tp-line bg-white p-5">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tp-paper">
                  <CreditCard className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-tp-ink">Single Package</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                Pick a package above, pay once, and receive your photos. Ideal when you need one set of headshots right now.
              </p>
            </div>
            <div className="rounded-tp-card border border-tp-bronze/30 bg-tp-bronze/5 p-5">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tp-bronze/20">
                  <BadgeCheck className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-tp-ink">Credit Pack</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                Buy credits in bulk at a lower per-photo cost. Use them across multiple orders and categories — credits are valid for 12 months.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CreditPackages />

      <CostCalculator />

      <PriceReceipt />

      <section className="pb-8">
        <div className="mx-auto max-w-sm px-4 sm:px-6 lg:px-8">
          <PricingPsychology
            priceCents={POPULAR_PACKAGE.price}
            outputs={POPULAR_PACKAGE.outputCount}
            planName={POPULAR_PACKAGE.name}
            mostPopular={true}
          />
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="py-16 sm:py-20" aria-labelledby="pricing-faq-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2
            id="pricing-faq-heading"
            className="text-center font-display text-3xl font-normal text-tp-ink sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-tp-muted">
            Quick answers about pricing and payment.
          </p>
          <div className="mt-10 divide-y divide-tp-line rounded-tp-card border border-tp-line bg-white px-6">
            {pricingFaqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between text-left">
                  <span className="text-base font-medium text-tp-ink group-hover:text-tp-bronze-ink">
                    {faq.question}
                  </span>
                  <ChevronDown className="ml-4 h-5 w-5 shrink-0 text-tp-muted transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <FAQSchema items={pricingFaqs} />

      <PricingComparisonBar />

      {/* Individual CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-normal text-tp-ink sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-tp-muted">
            Upload your selfies and get studio-quality AI headshots from {BASE_PRICE_DISPLAY}. No subscription, no studio appointment needed.
          </p>
          <div className="mt-8">
            <Link
              href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
              className={buttonVariants({ variant: 'primary', size: 'lg', className: 'gap-2' })}
            >
              Get Your Headshots
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="bg-tp-paper py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-normal text-tp-ink sm:text-3xl">
            Need more than 50 headshots?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-tp-muted">
            Enterprise plans include custom volume pricing, dedicated onboarding, and priority support for large teams.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/enterprise" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              Learn about Enterprise
            </Link>
            <Link href="/contact" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              Request a Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
