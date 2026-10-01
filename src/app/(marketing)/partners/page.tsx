import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  ArrowRight,
  Code2,
  Briefcase,
  Store,
  TrendingUp,
  Plug,
  LifeBuoy,
  Megaphone,
  FileText,
  Rocket,
  Coins,
} from 'lucide-react';

export const metadata: Metadata = {
  title: `Partner Program | ${siteConfig.name}`,
  description: `Partner with ${siteConfig.name} as a technology, agency, or reseller partner. Integrate AI headshots, offer them to your clients, or white-label our technology.`,
  alternates: { canonical: '/partners' },
  openGraph: generateOGMetadata({ title: `Partner With ${siteConfig.name}`, description: `Technology, agency, and reseller partnerships. Grow together with ${siteConfig.name}.`, path: '/partners' }),
  twitter: generateTwitterMetadata({ title: `Partner With ${siteConfig.name}`, description: `Technology, agency, and reseller partnerships. Grow together with ${siteConfig.name}.` }),
};

const partnerTypes = [
  {
    icon: Code2,
    title: 'Technology Partners',
    description:
      'Integrate AI headshots directly into your platform, app, or workflow so your users can create professional photos without leaving your product.',
  },
  {
    icon: Briefcase,
    title: 'Agency Partners',
    description:
      'Offer professional AI headshots to your clients as part of your service lineup, from HR and recruiting firms to branding and marketing studios.',
  },
  {
    icon: Store,
    title: 'Reseller Partners',
    description:
      'White-label our technology and deliver AI headshots under your own brand, with the quality and reliability of the TailorPic engine behind it.',
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: 'Revenue Opportunity',
    description:
      'Add a new revenue stream to your business by bringing a high-demand product to the customers you already serve.',
  },
  {
    icon: Plug,
    title: 'Easy Integration',
    description:
      'Get up and running quickly with a straightforward setup that fits the way your team and platform already work.',
  },
  {
    icon: LifeBuoy,
    title: 'Dedicated Support',
    description:
      'Work with our team directly. We help you plan, launch, and troubleshoot so you are never left on your own.',
  },
  {
    icon: Megaphone,
    title: 'Marketing Resources',
    description:
      'Access co-marketing materials and guidance that help you tell the story to your audience with confidence.',
  },
];

const steps = [
  {
    icon: FileText,
    number: '1',
    title: 'Apply',
    description:
      'Tell us about your business and the type of partnership you have in mind through our contact form.',
  },
  {
    icon: Rocket,
    number: '2',
    title: 'Get Onboarded',
    description:
      'Our team walks you through setup, integration options, and the resources you need to launch.',
  },
  {
    icon: Coins,
    number: '3',
    title: 'Start Earning',
    description:
      'Go live with your customers and grow revenue alongside TailorPic as your program takes off.',
  },
];

export default function PartnersPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Partners', url: `${siteConfig.url}/partners` },
        ]}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden bg-tp-black py-24 sm:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-tp-bronze/10 blur-[120px]"
          />
          <div className="relative mx-auto max-w-4xl px-4 text-center">
            <span className="mb-4 inline-block rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium tracking-wide text-tp-bronze">
              Partner Program
            </span>
            <h1 className="font-display text-4xl italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Partner With <span className="text-tp-bronze">TailorPic</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-beige/80">
              Let&apos;s grow together. Whether you build software, serve
              clients, or sell to businesses, we would love to explore how
              AI headshots can become part of what you offer.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-8 py-3.5 text-base font-semibold text-tp-black transition hover:bg-tp-bronze/90"
              >
                Become a Partner
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Partner Types */}
        <section className="bg-tp-paper py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="font-display text-center text-3xl italic text-tp-ink sm:text-4xl">
              Find the Right Partnership
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-tp-muted">
              Three ways to work with us, depending on how you serve your
              customers.
            </p>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {partnerTypes.map((type) => (
                <div
                  key={type.title}
                  className="rounded-tp-card border border-tp-line bg-tp-paper p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-bronze/10">
                    <type.icon className="h-5 w-5 text-tp-bronze-ink" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">
                    {type.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Partner */}
        <section className="border-y border-tp-line bg-tp-beige/20 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="font-display text-center text-3xl italic text-tp-ink sm:text-4xl">
              Why Partner With Us
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-tp-muted">
              Built to make the partnership simple and worthwhile for you.
            </p>
            <div className="mt-14 grid gap-8 sm:grid-cols-2">
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="rounded-tp-card border border-tp-line bg-tp-paper p-6"
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

        {/* How to Get Started */}
        <section className="bg-tp-paper py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="font-display text-center text-3xl italic text-tp-ink sm:text-4xl">
              How to Get Started
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-tp-muted">
              Three simple steps from first conversation to launch.
            </p>
            <div className="mt-14 grid gap-10 sm:grid-cols-3">
              {steps.map((step) => (
                <div key={step.title} className="text-center">
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

        {/* CTA */}
        <section className="bg-tp-black py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-3xl italic text-tp-paper sm:text-4xl">
              Become a Partner
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-tp-beige/70">
              Tell us about your business and how you would like to work with{' '}
              {siteConfig.name}. We will get back to you.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-8 py-3.5 text-base font-semibold text-tp-black transition hover:bg-tp-bronze/90"
            >
              Become a Partner
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
