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
const pageTitle = "AI Headshots for Architects & Designers | TailorPic";
const pageDescription =
  'Professional AI headshots for architects, interior designers and design professionals. Portraits for firm websites, AIA profiles, proposals and LinkedIn.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/architects' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/industries/architects', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'industry' }),
};

const benefits = [
  {
    title: "Reflect Your Design Sensibility",
    description: "Your headshot should match the quality and intentionality you bring to every project. Get a portrait that looks as polished as your portfolio.",
  },
  {
    title: "Firm Website & Team Pages",
    description: "Clean, consistent headshots for your firm's About page that present a unified, professional image to potential clients and collaborators.",
  },
  {
    title: "Project Proposals & RFPs",
    description: "Include a professional headshot in project proposals, qualifications packages, and competition submissions to put a face to your expertise.",
  },
  {
    title: "AIA & Directory Profiles",
    description: "Stand out on AIA directories, Houzz, and architecture firm listings with a headshot that reflects your professional standards.",
  },
  {
    title: "Speaking & Publication Bios",
    description: "Use your headshot for conference speaker bios, award submissions, published articles, and lecture announcements.",
  },
  {
    title: "LinkedIn & Networking",
    description: "A strong professional headshot on LinkedIn helps you connect with developers, clients, and fellow architects who find you through search.",
  },
];

const steps = [
  {
    title: "Upload 6-10 Selfies",
    description: "Take clear photos in good light. Business casual or professional attire works well. Vary angles and expressions slightly.",
  },
  {
    title: "Choose Your Style",
    description: "Pick a polished professional, creative, or refined casual look with a background that complements your firm's brand.",
  },
  {
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for your website, proposals, and professional profiles.",
  },
];

const audiences = [
  {
    title: "Licensed Architects",
    description: "Update your firm bio, AIA profile, and LinkedIn with a portrait that matches the quality of your work.",
  },
  {
    title: "Interior Designers",
    description: "Show clients the creative professional behind their space with a headshot for your portfolio and Houzz profile.",
  },
  {
    title: "Architecture Students",
    description: "Prepare for internship applications and your first firm position with a professional headshot on a student budget.",
  },
  {
    title: "Design Firms & Studios",
    description: "Give your entire team consistent headshots for the firm website without pulling everyone from their projects for a photo day.",
  },
];

const faqs = [
  {
    question: "Will the headshots look polished enough for an architecture firm's website?",
    answer: "Yes. Our AI produces high-resolution portraits with clean lighting and professional retouching that meet the visual standards architecture firms maintain on their websites and marketing materials.",
  },
  {
    question: "Can I get a creative look rather than a standard corporate headshot?",
    answer: "Absolutely. You can choose from professional, creative, and refined casual styles. Many architects prefer a look that feels intentional and design-forward rather than generic corporate.",
  },
  {
    question: "Can our entire firm get matching headshots?",
    answer: "Yes. Each team member uploads their own selfies and receives individual headshots. This is much simpler than scheduling a photographer for an office-wide session, especially with people on different project sites.",
  },
  {
    question: "What should I wear in my selfies?",
    answer: "Business casual or professional attire works best. A blazer, clean button-down, or structured top in solid colors will give you the most versatile results.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours. Upload during your morning commute and have finished portraits before your afternoon client meeting.",
  },
  {
    question: "Can I use these headshots in competition submissions?",
    answer: "Yes. You receive full commercial rights with every headshot. Use them in competition entries, RFP responses, award submissions, and any professional context.",
  },
];

export default function ArchitectsIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Architects"}
        description={"AI-generated professional headshots for architects, interior designers, and design professionals for firm websites, proposals, and professional profiles."}
        price={990}
        category="Professional Services"
        slug="industries/architects"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Industries', url: `${siteConfig.url}/industries` },
          { name: "Architects", url: `${siteConfig.url}/industries/architects` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Image src={portrait(getIndustryVisual("architects").heroPortraitId)} alt={getIndustryVisual("architects").alt} width={20} height={20} className="h-5 w-5 rounded-full object-cover" />
              For Architects &amp; Designers
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Architects</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              You design spaces that inspire. Your headshot should reflect that same attention to detail. Get polished, intentional portraits from a few selfies, without leaving the studio.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Architect Headshot
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
                src={portrait(getIndustryVisual("architects").heroPortraitId)}
                alt={getIndustryVisual("architects").alt}
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
            Professional &amp; Creative Styles
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
              Headshots as Intentional as Your Designs
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for your firm website, proposals, and every professional profile.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              return (
                <div
                  key={benefit.title}
                  className="tp-card rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <ContentPhoto slug="architects" seed={benefit.title} className="h-12 w-12 rounded-xl" />
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
                  <ContentPhoto slug="architects" seed={step.title} className="mx-auto h-14 w-14 rounded-full" />
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
            <p className="mt-4 text-lg text-tp-muted">Headshots for every role in architecture and design.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item) => {
              return (
                <div key={item.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                  <ContentPhoto slug="architects" seed={item.title} className="h-10 w-10 rounded-lg" />
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
            Design Your Professional Image
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get polished headshots for your firm website, proposals, and profiles from a few selfies.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Architect Headshot
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
