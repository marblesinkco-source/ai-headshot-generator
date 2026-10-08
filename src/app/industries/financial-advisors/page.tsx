import Image from 'next/image';
import { getIndustryVisual, portrait } from '@/config/stock-portraits';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { ContentPhoto } from '@/components/marketing/content-photo';
const pageTitle = 'AI Headshots for Financial Advisors & Planners | TailorPic';
const pageDescription =
  'Professional AI headshots for financial advisors, wealth managers and planners. Trustworthy portraits for LinkedIn, firm websites and client presentations.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/financial-advisors' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/industries/financial-advisors', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'industry' }),
};

const benefits = [
  {
    title: "Trust From the First Impression",
    description: "Clients hand you their financial future. A professional, confident headshot establishes credibility before the first meeting or call.",
  },
  {
    title: "Firm Website & Bio Pages",
    description: "Clean, well-lit portraits on neutral backgrounds that look polished on your firm's team page, RIA directory, and broker-dealer profiles.",
  },
  {
    title: "LinkedIn & Professional Networks",
    description: "Financial advisors with professional headshots on LinkedIn receive significantly more profile views and connection requests from prospects.",
  },
  {
    title: "Compliance-Friendly Photos",
    description: "Straightforward, professional portraits that meet the conservative visual standards expected in wealth management and financial services.",
  },
  {
    title: "Client Presentations & Reports",
    description: "Add your headshot to quarterly reports, financial plans, and client-facing documents to personalize the experience.",
  },
  {
    title: "Seminars & Speaking Events",
    description: "Use your headshot for event marketing, conference bios, and webinar promotions to build recognition across channels.",
  },
];

const steps = [
  {
    title: "Upload 6-10 Selfies",
    description: "Take clear photos in good light. Business attire or smart casual both work. Vary angles and expressions slightly.",
  },
  {
    title: "Choose Your Style",
    description: "Pick suit and tie, business professional, or a polished business casual look with a background that fits your brand.",
  },
  {
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots within hours, ready for your website, LinkedIn, and client materials.",
  },
];

const audiences = [
  {
    title: "Financial Advisors & CFPs",
    description: "Project competence and trustworthiness on your firm bio, LinkedIn, and marketing materials.",
  },
  {
    title: "Wealth Managers",
    description: "Give high-net-worth clients the polished image they expect from their advisory team.",
  },
  {
    title: "New Advisors",
    description: "Build your professional brand from day one with a headshot that conveys experience beyond your years.",
  },
  {
    title: "Advisory Firms & Teams",
    description: "Give your entire team consistent headshots for the firm website without scheduling a group photo day.",
  },
];

const faqs = [
  {
    question: "Will these headshots look formal enough for financial services?",
    answer: "Yes. You can choose suit-and-tie, business professional, or polished business casual styles. The results meet the conservative visual standards expected in wealth management and financial advisory.",
  },
  {
    question: "Can I use these on my firm's website?",
    answer: "Absolutely. You receive full commercial rights. Use your headshots on firm bios, RIA directories, client reports, and any marketing material.",
  },
  {
    question: "Can our whole advisory team get matching headshots?",
    answer: "Yes. Each team member uploads their own selfies and receives individual headshots. This is far easier than coordinating an office-wide photo session.",
  },
  {
    question: "Will the headshot match my current appearance?",
    answer: "Yes. We work from your real selfies, so your headshot looks like you. This is important for client meetings where your appearance should match your profile photo.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready within hours. Upload in the morning and have your new portraits before your afternoon client meetings.",
  },
];

export default function FinancialAdvisorsIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Financial Advisors"}
        description={"AI-generated professional headshots for financial advisors, wealth managers, CFPs, and financial planners for firm websites, LinkedIn, and client materials."}
        price={990}
        category="Professional Services"
        slug="industries/financial-advisors"
      />
      <FAQSchema items={faqs} />
      <Header />
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Industries', href: '/industries' }, { label: 'Financial Advisors' }]} currentPath="/industries/financial-advisors" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Image src={portrait(getIndustryVisual("financial-advisors").heroPortraitId)} alt={getIndustryVisual("financial-advisors").alt} width={20} height={20} className="h-5 w-5 rounded-full object-cover" />
              For Financial Advisors &amp; Wealth Managers
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Financial Advisors</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Clients trust you with their wealth. Your headshot is often the first thing they see on your website, LinkedIn, or a referral email. Make it count with a portrait that conveys competence and confidence.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Advisor Headshot
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
          
            {/* Hero portrait */}
            <div className="mx-auto mt-12 h-32 w-32 overflow-hidden rounded-full ring-4 ring-tp-bronze/20 sm:h-40 sm:w-40">
              <Image
                src={portrait(getIndustryVisual("financial-advisors").heroPortraitId)}
                alt={getIndustryVisual("financial-advisors").alt}
                width={320}
                height={427}
                sizes="160px"
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Suit &amp; Business Professional Styles
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Delivered Within Hours
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Full Commercial Rights
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Quality Commitment
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              Headshots That Build Client Confidence
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for your firm website, LinkedIn, and client-facing materials.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              return (
                <div
                  key={benefit.title}
                  className="tp-card rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <ContentPhoto slug="financial-advisors" seed={benefit.title} className="h-12 w-12 rounded-xl" />
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
            <p className="mt-4 text-lg text-tp-muted">Three simple steps from selfie to finished headshot.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {steps.map((step, index) => {
              return (
                <div key={step.title} className="text-center">
                  <ContentPhoto slug="financial-advisors" seed={step.title} className="mx-auto h-14 w-14 rounded-full" />
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
              Who Uses TailorPic
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Headshots for every role in financial services.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item) => {
              return (
                <div key={item.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                  <ContentPhoto slug="financial-advisors" seed={item.title} className="h-10 w-10 rounded-lg" />
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
            Look as Trusted as You Are
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get polished headshots for your firm website, LinkedIn, and client presentations from a few selfies.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Advisor Headshot
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

      <Footer />
    </main>
  );
}
