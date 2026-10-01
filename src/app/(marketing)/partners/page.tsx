import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  ArrowRight,
  ChevronDown,
  Users,
  Code2,
  Store,
  DollarSign,
  Megaphone,
  UserCheck,
  Handshake,
  FileText,
  CheckCircle2,
  Rocket,
} from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'TailorPic Partner Program: Referral, Integration, Reseller' },
  description: `Partner with ${siteConfig.name} as a referral, integration, or reseller partner. Earn commission, access our API, or white-label AI headshots under your brand.`,
  alternates: { canonical: '/partners' },
  openGraph: generateOGMetadata({
    title: `Partner With ${siteConfig.name}`,
    description: `Referral, integration, and reseller partnerships. Grow your business with ${siteConfig.name}.`,
    path: '/partners',
  }),
  twitter: generateTwitterMetadata({
    title: `Partner With ${siteConfig.name}`,
    description: `Referral, integration, and reseller partnerships. Grow your business with ${siteConfig.name}.`,
  }),
};

/* ------------------------------------------------------------------ */
/*  Partner Types                                                      */
/* ------------------------------------------------------------------ */

const partnerTypes = [
  {
    icon: Users,
    title: 'Referral Partners',
    subtitle: 'Earn commission',
    description:
      'Recommend TailorPic to your network and earn a commission on every paying customer you refer. No technical work required — just share your unique link.',
    highlights: [
      'Recurring commission on referrals',
      'Unique tracking link and dashboard',
      'No minimum referral threshold',
    ],
  },
  {
    icon: Code2,
    title: 'Integration Partners',
    subtitle: 'API access',
    description:
      'Embed AI headshot generation directly into your platform using our API. Give your users a seamless experience without them ever leaving your product.',
    highlights: [
      'Full REST API with documentation',
      'Sandbox environment for testing',
      'Priority technical support',
    ],
  },
  {
    icon: Store,
    title: 'Reseller Partners',
    subtitle: 'White-label',
    description:
      'Deliver AI headshots under your own brand. We handle the technology and infrastructure while you own the customer relationship and pricing.',
    highlights: [
      'Custom branding and domain',
      'Volume-based pricing tiers',
      'Dedicated account manager',
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Benefits                                                           */
/* ------------------------------------------------------------------ */

const benefits = [
  {
    icon: DollarSign,
    title: 'Revenue Share',
    description:
      'Add a high-demand product to your lineup and earn ongoing revenue from every customer you bring in.',
  },
  {
    icon: Megaphone,
    title: 'Marketing Support',
    description:
      'Access co-branded materials, landing page templates, and campaign guidance to help you tell the story.',
  },
  {
    icon: UserCheck,
    title: 'Dedicated Partner Manager',
    description:
      'Work directly with a partner manager who helps you plan, launch, and grow your program.',
  },
  {
    icon: Handshake,
    title: 'Co-Marketing Opportunities',
    description:
      'Get featured in our partner directory, joint case studies, and co-hosted webinars to expand your reach.',
  },
];

/* ------------------------------------------------------------------ */
/*  Steps                                                              */
/* ------------------------------------------------------------------ */

const steps = [
  {
    number: '1',
    icon: FileText,
    title: 'Apply',
    description:
      'Fill out a short application telling us about your business and the partnership type that interests you.',
  },
  {
    number: '2',
    icon: CheckCircle2,
    title: 'Get Approved',
    description:
      'Our team reviews your application and, once approved, walks you through onboarding and setup.',
  },
  {
    number: '3',
    icon: Rocket,
    title: 'Start Earning',
    description:
      'Go live with your customers and start earning revenue from day one. We are with you every step of the way.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqItems = [
  {
    q: 'Who can become a partner?',
    a: 'Anyone whose audience or customer base could benefit from professional AI headshots — agencies, HR platforms, SaaS companies, freelancers, and more. We review every application individually.',
  },
  {
    q: 'Is there a cost to join the partner program?',
    a: 'No. The partner program is free to join. There are no upfront fees, monthly charges, or minimum commitments.',
  },
  {
    q: 'How does the commission structure work?',
    a: 'Referral partners earn a percentage of revenue from each customer they bring in. The exact rate depends on volume and partnership tier. Details are shared during the onboarding process.',
  },
  {
    q: 'What kind of support do partners receive?',
    a: 'Every partner gets access to a dedicated partner manager, co-marketing materials, and priority support. Integration and reseller partners also receive API documentation, sandbox access, and technical onboarding.',
  },
  {
    q: 'How long does the application process take?',
    a: 'We review applications within a few business days. Once approved, onboarding typically takes less than a week depending on the partnership type.',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PartnersPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Partners', url: `${siteConfig.url}/partners` },
        ]}
      />
      <FAQSchema
        items={faqItems.map((item) => ({
          question: item.q,
          answer: item.a,
        }))}
      />
      <Header />
      <main id="main-content">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-tp-black py-24 sm:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-tp-bronze/10 blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 h-[400px] w-[400px] rounded-full bg-tp-bronze/5 blur-[100px]"
          />
          <div className="relative mx-auto max-w-4xl px-4 text-center">
            <span className="mb-4 inline-block rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium tracking-wide text-tp-bronze">
              Partner Program
            </span>
            <h1 className="font-display text-4xl italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Partner with{' '}
              <span className="text-tp-bronze">TailorPic</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/80">
              Grow your business alongside ours. Whether you refer customers,
              integrate our API, or resell under your own brand, we have a
              partnership model built for you.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-8 py-3.5 text-base font-semibold text-tp-black transition hover:bg-tp-bronze/90"
              >
                Apply to Partner Program
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#partner-types"
                className="inline-flex items-center gap-2 rounded-tp-button border border-tp-beige/20 px-8 py-3.5 text-base font-semibold text-tp-beige transition hover:border-tp-beige/40 hover:text-tp-paper"
              >
                Explore Partnership Types
              </a>
            </div>
          </div>
        </section>

        {/* ── Partner Types ── */}
        <section
          id="partner-types"
          className="bg-tp-paper py-20 sm:py-28"
        >
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="font-display text-center text-3xl italic text-tp-ink sm:text-4xl">
              Choose Your Partnership
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-tp-muted">
              Three ways to work with us, each designed for a different kind of
              business.
            </p>
            <div className="mt-14 grid gap-8 lg:grid-cols-3">
              {partnerTypes.map((type) => (
                <div
                  key={type.title}
                  className="group relative rounded-tp-card border border-tp-line bg-white p-7 transition-shadow hover:shadow-lg hover:shadow-tp-black/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-bronze/10">
                      <type.icon className="h-5 w-5 text-tp-bronze-ink" />
                    </div>
                    <span className="rounded-full bg-tp-beige/60 px-3 py-1 text-xs font-medium text-tp-ink">
                      {type.subtitle}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-tp-ink">
                    {type.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {type.description}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {type.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-tp-ink"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-tp-bronze-ink" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="border-y border-tp-line bg-tp-beige/20 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="font-display text-center text-3xl italic text-tp-ink sm:text-4xl">
              Why Partner With Us
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-tp-muted">
              Everything you need to succeed, from revenue share to hands-on
              support.
            </p>
            <div className="mt-14 grid gap-8 sm:grid-cols-2">
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="rounded-tp-card border border-tp-line bg-white p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-bronze/10">
                    <item.icon className="h-5 w-5 text-tp-bronze-ink" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="bg-tp-paper py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="font-display text-center text-3xl italic text-tp-ink sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-tp-muted">
              From application to earning, in three simple steps.
            </p>
            <div className="relative mt-14 grid gap-10 sm:grid-cols-3">
              {/* Connector line (desktop) */}
              <div
                aria-hidden="true"
                className="absolute left-[16.66%] right-[16.66%] top-8 hidden h-px bg-tp-line sm:block"
              />
              {steps.map((step) => (
                <div key={step.title} className="relative text-center">
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-tp-card bg-tp-bronze/10">
                    <step.icon className="h-7 w-7 text-tp-bronze-ink" />
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-tp-bronze text-xs font-bold text-tp-black">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-tp-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-t border-tp-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4">
            <div className="mb-12 text-center">
              <h2 className="font-display text-3xl italic text-tp-ink sm:text-4xl">
                Partner Program FAQ
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-tp-muted">
                Common questions about working with us.
              </p>
            </div>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-tp-card border border-tp-line bg-tp-paper"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-semibold text-tp-ink">
                    {item.q}
                    <ChevronDown className="h-4 w-4 flex-shrink-0 text-tp-muted transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-5 text-sm leading-relaxed text-tp-muted">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-tp-black py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-3xl italic text-tp-paper sm:text-4xl">
              Apply to the Partner Program
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-tp-beige/70">
              Tell us about your business and how you would like to work with{' '}
              {siteConfig.name}. We review every application and respond within
              a few business days.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-8 py-3.5 text-base font-semibold text-tp-black transition hover:bg-tp-bronze/90"
            >
              Apply to Partner Program
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
