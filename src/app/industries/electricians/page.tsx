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
const pageTitle = "AI Headshots for Electricians | TailorPic";
const pageDescription =
  'Professional AI headshots for electricians, electrical contractors and apprentices. Build trust on your website, Google profile and truck wraps.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/electricians' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/industries/electricians', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'industry' }),
};

const benefits = [
  {
    title: "Build Customer Trust",
    description: "Customers want to know who is coming to their door. A friendly, professional face makes booking easier.",
  },
  {
    title: "Website & Google Profile",
    description: "Sized for your homepage, About page, and Google Business Profile so local search shows a real person.",
  },
  {
    title: "Estimates, Invoices & Proposals",
    description: "Add your portrait to quotes and proposals for a more personal, professional touch.",
  },
  {
    title: "Truck Wraps & Print Marketing",
    description: "High-resolution portraits work for vehicle graphics, flyers, and yard signs.",
  },
  {
    title: "Licensing & Bids",
    description: "Strengthen contractor bids, commercial bid packets, and licensing profiles with a polished image.",
  },
  {
    title: "No Studio Needed",
    description: "Skip time off the job. Take selfies at home and get a professional result in about 2 hours.",
  },
];

const steps = [
  {
    title: "Upload 6-10 Selfies",
    description: "Take clear, well-lit photos of yourself. Vary your angles and expressions so the AI captures your natural look.",
  },
  {
    title: "Choose Your Style",
    description: "Pick a background and look that fit your business, from friendly and casual to crisp and corporate.",
  },
  {
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for your website, listings, and print.",
  },
];

const audiences = [
  {
    title: "Residential Electricians",
    description: "Friendly portraits that build trust with homeowners on your site and listings.",
  },
  {
    title: "Electrical Contractors",
    description: "Professional headshots for bids, proposals, and company pages.",
  },
  {
    title: "Apprentices & Journeymen",
    description: "Polished images for job applications, union profiles, and LinkedIn.",
  },
  {
    title: "Master Electricians & Business Owners",
    description: "Authoritative portraits for team pages, press, and trade associations.",
  },
];

const faqs = [
  {
    question: "Can I use my headshot on my Google Business Profile?",
    answer: "Yes. You receive full commercial rights, so you can use your headshots on Google profiles, websites, and social media.",
  },
  {
    question: "Will it work on a truck wrap or flyer?",
    answer: "Yes. Headshots are delivered in high resolution, suitable for print materials including vehicle graphics and flyers.",
  },
  {
    question: "What should I wear in my selfies?",
    answer: "Wear a clean work shirt or something you would wear to meet a customer. The AI adapts attire to the style you choose.",
  },
  {
    question: "Can my whole crew get matching headshots?",
    answer: "Yes. Each team member uploads their own selfies and can choose the same background and style for a consistent team page.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours, so you can update your website the same day.",
  },
  {
    question: "How many headshots do I get?",
    answer: "Each package delivers multiple variations across backgrounds and styles, giving you options for different uses.",
  },
];

export default function ElectriciansIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Electricians"}
        description={"AI-generated professional headshots for electricians and electrical contractors for websites, Google Business Profiles, estimates, and marketing."}
        price={990}
        category="Skilled Trades"
        slug="industries/electricians"
      />
      <FAQSchema items={faqs} />
      <Header />
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Industries', href: '/industries' }, { label: 'Electricians' }]} currentPath="/industries/electricians" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Image src={portrait(getIndustryVisual("electricians").heroPortraitId)} alt={getIndustryVisual("electricians").alt} width={20} height={20} className="h-5 w-5 rounded-full object-cover" />
              For Electricians
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Electricians</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Homeowners let you into their homes because they trust you. Get a clean, professional headshot for your website, Google Business Profile, and estimates without a photo shoot.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Electrician Headshot
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
                src={portrait(getIndustryVisual("electricians").heroPortraitId)}
                alt={getIndustryVisual("electricians").alt}
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
            Customer-Trust Focused
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
              Put a Trusted Face on Your Trade
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for your website, local listings, and marketing materials.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              return (
                <div
                  key={benefit.title}
                  className="tp-card rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <ContentPhoto slug="electricians" seed={benefit.title} className="h-12 w-12 rounded-xl" />
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
                  <ContentPhoto slug="electricians" seed={step.title} className="mx-auto h-14 w-14 rounded-full" />
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
            <p className="mt-4 text-lg text-tp-muted">Headshots for every kind of electrical professional.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item) => {
              return (
                <div key={item.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                  <ContentPhoto slug="electricians" seed={item.title} className="h-10 w-10 rounded-lg" />
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
            Let Customers Meet You Before You Arrive
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get a headshot that earns trust and helps more customers book.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Electrician Headshot
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
