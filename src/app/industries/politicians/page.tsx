import Image from 'next/image';
import { getIndustryVisual, portrait } from '@/config/stock-portraits';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Star } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { ContentPhoto } from '@/components/marketing/content-photo';
const pageTitle = "AI Headshots for Politicians & Candidates | TailorPic";
const pageDescription =
  'Professional AI headshots for politicians, candidates and public officials. Portraits for campaign sites, official profiles, press kits and social media.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/politicians' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/industries/politicians', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'industry' }),
};

const benefits = [
  {
    title: "Campaign Website & Materials",
    description: "High-resolution portraits sized for your homepage, mailers, yard signs, and donation pages.",
  },
  {
    title: "Credible & Trustworthy Look",
    description: "Choose styles that convey steadiness and integrity, helping voters feel confident in who you are.",
  },
  {
    title: "Official & Government Profiles",
    description: "Keep a polished image ready for council pages, legislative directories, and agency websites.",
  },
  {
    title: "Press Kit & Media Ready",
    description: "Reporters and event hosts ask for a headshot on short notice. Have a professional image on hand at all times.",
  },
  {
    title: "Consistent Across Platforms",
    description: "Use matching portraits on social media, newsletters, and endorsement pages so your public image looks cohesive.",
  },
  {
    title: "Save Campaign Budget",
    description: "Every dollar counts in a race. Skip the photographer and get a professional result for a fraction of the cost.",
  },
];

const steps = [
  {
    title: "Upload 6-10 Selfies",
    description: "Take clear, well-lit photos of yourself. Vary your angles and expressions so the AI captures your natural look.",
  },
  {
    title: "Choose Your Style",
    description: "Pick backgrounds and looks that suit public service, from classic formal to warm and approachable.",
  },
  {
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for your website, press kit, and social profiles.",
  },
];

const audiences = [
  {
    title: "Candidates & Campaigns",
    description: "Launch your website and materials quickly with a professional portrait.",
  },
  {
    title: "Elected Officials",
    description: "Refresh your official portrait for directories and constituent communications.",
  },
  {
    title: "Staffers & Communications Teams",
    description: "Keep team and leadership headshots consistent across the office.",
  },
  {
    title: "Advocates & Local Leaders",
    description: "Present yourself credibly for boards, commissions, and community campaigns.",
  },
];

const faqs = [
  {
    question: "Will my headshot look trustworthy and approachable?",
    answer: "Yes. You can choose styles that balance authority and warmth, which is ideal for anyone asking for public support.",
  },
  {
    question: "Can I use the headshots on campaign materials?",
    answer: "Yes. You receive full commercial rights, so you can use your headshots on websites, mailers, ads, and promotional materials.",
  },
  {
    question: "What should I wear in my selfies?",
    answer: "Wear something you would wear at a public event. Solid colors usually work best, and the AI adapts attire to the style you choose.",
  },
  {
    question: "Is this suitable for official government profiles?",
    answer: "Many officials use AI-generated portraits for directories and social media. Check any specific photo requirements from your office or agency before submitting.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours, so you can update your materials the same day.",
  },
  {
    question: "How many headshots do I get?",
    answer: "Each package delivers multiple variations across backgrounds and styles, giving you options for different platforms.",
  },
];

export default function PoliticiansIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Politicians & Candidates"}
        description={"AI-generated professional headshots for politicians, candidates, and public officials for campaign websites, press kits, and official profiles."}
        price={990}
        category="Public Service"
        slug="industries/politicians"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Industries', url: `${siteConfig.url}/industries` },
          { name: "Politicians", url: `${siteConfig.url}/industries/politicians` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Image src={portrait(getIndustryVisual("politicians").heroPortraitId)} alt={getIndustryVisual("politicians").alt} width={20} height={20} className="h-5 w-5 rounded-full object-cover" />
              For Politicians &amp; Candidates
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Politicians &amp; Candidates</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Voters form an impression in seconds. Get a confident, approachable portrait for your campaign site, official page, and press materials, without the cost and scheduling of a studio session.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=/headshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Campaign Headshot
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
            <div className="mt-8 flex items-center justify-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-tp-bronze text-tp-bronze" />
              ))}
            </div>
          
            {/* Hero portrait */}
            <div className="mx-auto mt-12 h-32 w-32 overflow-hidden rounded-full ring-4 ring-tp-bronze/20 sm:h-40 sm:w-40">
              <Image
                src={portrait(getIndustryVisual("politicians").heroPortraitId)}
                alt={getIndustryVisual("politicians").alt}
                width={320}
                height={427}
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
            Campaign-Ready Portraits
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Delivered in About 2 Hours
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Full Commercial Rights
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Satisfaction Guaranteed
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              Make a Strong First Impression
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for your campaign, your office, and every public platform.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              return (
                <div
                  key={benefit.title}
                  className="tp-card rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <ContentPhoto slug="politicians" seed={benefit.title} className="h-12 w-12 rounded-xl" />
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
                  <ContentPhoto slug="politicians" seed={step.title} className="mx-auto h-14 w-14 rounded-full" />
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
            <p className="mt-4 text-lg text-tp-muted">Headshots for candidates and public servants at every level.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item) => {
              return (
                <div key={item.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                  <ContentPhoto slug="politicians" seed={item.title} className="h-10 w-10 rounded-lg" />
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
            Show Voters Who You Are
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get a headshot that builds trust from the first glance.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=/headshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Campaign Headshot
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
