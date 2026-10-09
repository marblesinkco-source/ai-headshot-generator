import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Building2, Check, Clock, FileText, Printer, Shield, Sparkles, Upload, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { FAQSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const pageTitle = 'AI Headshots for Annual Reports & Documents | TailorPic';
const pageDescription =
  `Consistent executive and board headshots for annual reports, investor decks and corporate documents. Delivered within hours. Starting at ${BASE_PRICE_DISPLAY}.`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/annual-report' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/annual-report', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: "AI Headshots for Annual Reports & Corporate Docs",
  description: "Consistent executive headshots for annual reports and corporate documents",
  url: 'https://www.tailorpic.com/use-cases/annual-report',
  brand: { '@type': 'Brand', name: 'TailorPic' },
  category: 'Professional Services',
  offers: {
    '@type': 'Offer',
    price: '1.99',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://www.tailorpic.com/use-cases/annual-report',
  },
};

const benefits = [
  {
    icon: Users,
    title: "Consistent Across the Whole Team",
    description: "Matching backgrounds and styles make your leadership page look unified, even when executives live in different cities.",
  },
  {
    icon: Printer,
    title: "High-Resolution for Print and PDF",
    description: "Receive large files suited to printed reports, PDF layouts, and investor materials.",
  },
  {
    icon: Building2,
    title: "Polished, Credible Tone",
    description: "Formal, business-ready looks help leadership profiles feel trustworthy and professional.",
  },
  {
    icon: Sparkles,
    title: "No Coordinated Photo Shoot",
    description: "Skip scheduling busy executives for a studio day. Everyone uploads selfies from wherever they are.",
  },
  {
    icon: Shield,
    title: "Your Photos, Your Rights",
    description: "You own every image with no watermarks. Reuse them in reports, websites, and press materials.",
  },
  {
    icon: Clock,
    title: "Ready Before Your Publication Deadline",
    description: "Selfies in, portraits out within hours, in time for your final layout.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload a Few Selfies",
    description: "Each leader shares 6-10 clear phone photos with different expressions and angles.",
  },
  {
    icon: Users,
    title: "Choose One Consistent Style",
    description: "Pick the same business look and background for everyone so pages match.",
  },
  {
    icon: Check,
    title: "Download and Drop into Layout",
    description: "Get high-resolution photos within hours, ready for your report design.",
  },
];

const features = [
  {
    icon: Building2,
    title: "Corporate Communications",
    description: "Keep leadership pages consistent across reports and the website.",
  },
  {
    icon: Briefcase,
    title: "Executives & Board Members",
    description: "Get a polished portrait without a studio appointment.",
  },
  {
    icon: FileText,
    title: "Investor Relations Teams",
    description: "Prepare decks and annual reports with matching portraits.",
  },
  {
    icon: Users,
    title: "Nonprofits & Associations",
    description: "Present staff and trustees professionally within a tight budget.",
  },
];

const faqs = [
  {
    question: "Can we get matching photos for the whole leadership team?",
    answer: "Yes. Each person uploads their own selfies, and you can choose the same style and background for consistency.",
  },
  {
    question: "Will the photos look like each person?",
    answer: "Yes. TailorPic is trained on each person's own selfies, so results keep real features and natural expression.",
  },
  {
    question: "Are the files suitable for print?",
    answer: "Yes. You receive high-resolution files suited to printed reports and PDF layouts.",
  },
  {
    question: "Can we use the photos elsewhere?",
    answer: "Yes. You own every image, so you can reuse them on your website, press releases, and investor materials.",
  },
  {
    question: "How much does it cost?",
    answer: `TailorPic starts at ${BASE_PRICE_DISPLAY} per pack per person. For larger teams, see our enterprise options.`,
  },
  {
    question: "How long does delivery take?",
    answer: "Most orders arrive within hours after you upload your selfies.",
  },
];

export default function AnnualReportUseCasePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <FAQSchema items={faqs} />
      <Header />
      <main id="main-content">
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Use Cases', href: '/use-cases' }, { label: 'Annual Reports' }]} currentPath="/use-cases/annual-report" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <FileText className="h-4 w-4" />
              {"Annual Reports & Corporate Docs"}
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              {"AI Headshots for "}
              <span className="not-italic text-tp-bronze">{"Annual Reports & Corporate Docs"}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              {`Leadership pages set the tone of a corporate report. Get consistent, professional headshots for executives and board members from a handful of selfies, delivered within hours, starting at just ${BASE_PRICE_DISPLAY}.`}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                {"Get Your Report Headshot"}
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-tp-beige/30 text-tp-beige hover:bg-tp-beige/10'
                )}
              >
                View Pricing
              </Link>
            </div>
              ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Print-Ready Resolution"}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Delivered Within Hours"}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {`Starting at ${BASE_PRICE_DISPLAY}`}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Quality Commitment"}
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              {"Why Report Photos Matter"}
            </h2>
            <p className="mt-4 text-lg text-tp-muted">{"Leadership pages are some of the most-read sections of a corporate report."}</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="tp-card rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black">
                    <Icon className="h-6 w-6 text-tp-bronze" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-tp-paper py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-tp-muted">{"From selfie to report-ready portrait in three steps."}</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tp-black">
                    <Icon className="h-6 w-6 text-tp-bronze" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-tp-bronze-ink">Step {index + 1}</p>
                  <h3 className="mt-1 text-lg font-semibold text-tp-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              {"Who Uses TailorPic for Corporate Documents"}
            </h2>
            <p className="mt-4 text-lg text-tp-muted">{"Great photos for teams that publish leadership profiles."}</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                  <Icon className="h-6 w-6 text-tp-bronze" />
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-tp-paper py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-tp-card border border-tp-line bg-white p-6">
                <h3 className="text-lg font-semibold text-tp-ink">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
            {"Make Your Leadership Pages Look Their Best"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            {`Consistent, professional portraits for every report. Starting at just ${BASE_PRICE_DISPLAY}.`}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              {"Get Your Report Headshot"}
            </Link>
            <Link href="/pricing" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              View Pricing
            </Link>
          </div>
          <p className="mt-6 text-sm text-tp-muted">
            No subscription required. One-time payment.
          </p>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
