import Image from 'next/image';
import { getIndustryVisual, portrait } from '@/config/stock-portraits';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { ContentPhoto } from '@/components/marketing/content-photo';
const pageTitle = "AI Headshots for Photographers | TailorPic";
const pageDescription =
  'Professional AI headshots for photographers, videographers and creative professionals. Polished portraits for your portfolio, website and social media.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/photographers' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/industries/photographers', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'industry' }),
};

const benefits = [
  {
    title: "Show Your Creative Identity",
    description: "Your headshot should reflect the same visual quality you deliver to clients. Get a portrait that matches your artistic brand and aesthetic standards.",
  },
  {
    title: "Multiple Looks, One Session",
    description: "Generate headshots in different styles, from editorial and moody to clean and corporate, so you have the right image for every platform.",
  },
  {
    title: "Portfolio & Website Ready",
    description: "High-resolution portraits sized for your About page, photography portfolio, and directory listings on platforms like The Knot or Thumbtack.",
  },
  {
    title: "Booking Pages & Proposals",
    description: "A strong headshot on your booking page and client proposals builds trust before the first meeting and helps convert inquiries into sessions.",
  },
  {
    title: "Consistent Across Platforms",
    description: "Use matching headshots on Instagram, your website, Google Business Profile, and photography directories for a cohesive personal brand.",
  },
  {
    title: "No Need to Ask a Colleague",
    description: "Skip the awkward favor of asking another photographer to shoot your headshot. Upload a few selfies and get studio-quality results on your own schedule.",
  },
];

const steps = [
  {
    title: "Upload 6-10 Selfies",
    description: "Take clear photos in good light. Vary angles and expressions slightly. Casual or professional attire both work.",
  },
  {
    title: "Choose Your Style",
    description: "Pick from editorial, clean, or creative looks with backgrounds that match your brand identity.",
  },
  {
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for your website, social media, and directory profiles.",
  },
];

const audiences = [
  {
    title: "Wedding Photographers",
    description: "Put a polished face on The Knot, WeddingWire, and your own site to win couples over before the consultation.",
  },
  {
    title: "Portrait & Commercial Photographers",
    description: "Show potential clients you understand great portraiture with a headshot that demonstrates your eye for quality.",
  },
  {
    title: "Photography Students",
    description: "Build your professional presence early with a headshot for your emerging portfolio and LinkedIn.",
  },
  {
    title: "Studios & Creative Teams",
    description: "Give your entire team consistent headshots for the studio website without scheduling a separate shoot day.",
  },
];

const faqs = [
  {
    question: "Will the headshots look professional enough for a photographer's website?",
    answer: "Yes. Our AI produces high-resolution, studio-quality portraits with natural lighting and clean retouching that meet the visual standards photographers expect on their own sites.",
  },
  {
    question: "Can I get different styles for different platforms?",
    answer: "Absolutely. You can generate multiple looks, from creative and editorial to clean corporate portraits, so you have the right headshot for Instagram, your About page, and directory listings.",
  },
  {
    question: "What should I wear in my selfies?",
    answer: "Wear whatever you typically shoot in. If you want a more polished result, a blazer or neutral top works well. The AI adapts your attire to the style you choose.",
  },
  {
    question: "How many headshots do I get?",
    answer: "Each package delivers multiple headshot variations. You can select different backgrounds and styles so you have options for every use case.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours. Upload between client sessions and have finished portraits before the end of the day.",
  },
  {
    question: "Can I use these headshots commercially?",
    answer: "Yes. You receive full commercial rights with every headshot, so you can use them on your website, marketing materials, business cards, and any platform.",
  },
];

export default function PhotographersIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Photographers"}
        description={"AI-generated professional headshots for photographers, videographers, and creative professionals for portfolios, websites, and social media."}
        price={990}
        category="Professional Services"
        slug="industries/photographers"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Industries', url: `${siteConfig.url}/industries` },
          { name: "Photographers", url: `${siteConfig.url}/industries/photographers` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Image src={portrait(getIndustryVisual("photographers").heroPortraitId)} alt={getIndustryVisual("photographers").alt} width={20} height={20} className="h-5 w-5 rounded-full object-cover" />
              For Photographers &amp; Creatives
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Photographers</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              You spend your career making others look their best. Now get a headshot that reflects your own creative vision, without asking a colleague for a favor or booking a separate session.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Photographer Headshot
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
                src={portrait(getIndustryVisual("photographers").heroPortraitId)}
                alt={getIndustryVisual("photographers").alt}
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
            Multiple Style Options
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
              Built for the People Behind the Camera
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for your website, directories, and every social platform.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              return (
                <div
                  key={benefit.title}
                  className="tp-card rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <ContentPhoto slug="photographers" seed={benefit.title} className="h-12 w-12 rounded-xl" />
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
                  <ContentPhoto slug="photographers" seed={step.title} className="mx-auto h-14 w-14 rounded-full" />
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
            <p className="mt-4 text-lg text-tp-muted">Headshots for every kind of photographer and creative.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item) => {
              return (
                <div key={item.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                  <ContentPhoto slug="photographers" seed={item.title} className="h-10 w-10 rounded-lg" />
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
            Your Clients See Your Face Before Your Work
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get a headshot that matches the quality you deliver to every client.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Photographer Headshot
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
