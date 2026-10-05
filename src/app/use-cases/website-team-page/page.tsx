import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Building2, Check, Clock, Globe, Layout, Shield, Sparkles, Upload, UserCheck, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const pageTitle = "AI Headshots for Website Team Pages | TailorPic";
const pageDescription =
  'Consistent, professional headshots for your About Us and Team page. Every team member from a few selfies, matching style and background. Starting at $1.99.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: 'https://www.tailorpic.com/use-cases/website-team-page' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/website-team-page', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: "AI Headshots for Website Team Pages",
  description: "Consistent team page headshots for company websites",
  url: 'https://www.tailorpic.com/use-cases/website-team-page',
  brand: { '@type': 'Brand', name: 'TailorPic' },
  category: 'Professional Services',
  offers: {
    '@type': 'Offer',
    price: '1.99',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://www.tailorpic.com/use-cases/website-team-page',
  },
};

const benefits = [
  {
    icon: Users,
    title: "A Consistent, Cohesive Look",
    description: "Choose one style and background so every headshot matches, whether your team is five people or fifty.",
  },
  {
    icon: Building2,
    title: "Builds Trust with Visitors",
    description: "Real faces on your About page show prospects there are actual experts behind the brand.",
  },
  {
    icon: Globe,
    title: "Perfect for Remote Teams",
    description: "Team members in different cities and time zones all get matching photos without coordinating a shoot day.",
  },
  {
    icon: Sparkles,
    title: "No Photographer Needed",
    description: "Skip scheduling, travel, and studio fees. Everyone uploads selfies from their own phone.",
  },
  {
    icon: Shield,
    title: "You Own Every Image",
    description: "No watermarks and full rights to use the photos on your website, brochures, and social profiles.",
  },
  {
    icon: Clock,
    title: "New Hires Live Fast",
    description: "Onboard a new teammate and have their website photo ready in about 2 hours.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Each Person Uploads Selfies",
    description: "Every team member shares 6-10 clear phone photos with different expressions and angles.",
  },
  {
    icon: Layout,
    title: "Pick One Team Style",
    description: "Choose a shared background, attire, and framing so the whole team page looks uniform.",
  },
  {
    icon: Check,
    title: "Download and Publish",
    description: "Get high-resolution headshots in about 2 hours, ready to drop into your website builder.",
  },
];

const features = [
  {
    icon: Briefcase,
    title: "Agencies & Consultancies",
    description: "Show clients the people behind the work with a polished, matching team lineup.",
  },
  {
    icon: Building2,
    title: "Startups & Small Businesses",
    description: "Look established from day one without paying for a studio session.",
  },
  {
    icon: Globe,
    title: "Remote-First Companies",
    description: "Unify photos across time zones without flying anyone to a shoot.",
  },
  {
    icon: UserCheck,
    title: "Law, Medical & Finance Firms",
    description: "Project the credibility clients expect from regulated professional services.",
  },
];

const faqs = [
  {
    question: "How do I make team page photos look consistent?",
    answer: "Choose the same style, background, and framing for everyone during setup. TailorPic applies it across each person's photos so the team page looks uniform.",
  },
  {
    question: "Do all team members need to be in the same place?",
    answer: "No. Each person uploads their own selfies from anywhere, which makes TailorPic ideal for remote and hybrid teams.",
  },
  {
    question: "Will each headshot look like the real person?",
    answer: "Yes. TailorPic is trained on each person's own selfies, so results keep their real features and natural expression.",
  },
  {
    question: "What size are the photos?",
    answer: "You receive high-resolution files that can be cropped for square, round, or portrait layouts in any website builder.",
  },
  {
    question: "How much does it cost?",
    answer: "TailorPic starts at $1.99 per pack, far less than hiring a photographer for a team shoot.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most orders arrive in about 2 hours after the selfies are uploaded.",
  },
];

export default function WebsiteTeamPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
          { name: "Website Team Pages", url: `${siteConfig.url}/use-cases/website-team-page` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Users className="h-4 w-4" />
              Website Team Page Photos
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Headshots for{' '}
              <span className="not-italic text-tp-bronze">Website Team Pages</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Mismatched photos make a team page look unfinished. Give every person a polished, consistent headshot from a few selfies, no photographer or office shoot required. Delivered in about 2 hours, starting at just $1.99.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Team Page Headshot
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
            Consistent Team Styling
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Delivered in About 2 Hours
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Starting at $1.99
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
              Why Your Team Page Photos Matter
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Visitors check the team page to decide who they are dealing with.</p>
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
            <p className="mt-4 text-lg text-tp-muted">From selfies to a finished team page in three steps.</p>
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
              Who Uses TailorPic for Team Pages
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Great for every organization with a face on its website.</p>
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
            A Team Page Your Whole Company Can Be Proud Of
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Give every teammate a matching, professional headshot. Starting at just $1.99.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Team Page Headshot
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
