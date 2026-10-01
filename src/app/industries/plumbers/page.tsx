import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, Briefcase, Camera, Check, FileCheck, Globe, Sparkles, Star, Upload, UserCheck, Users, Zap } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';


const pageTitle = "AI Headshots for Plumbers | TailorPic";
const pageDescription =
  "Professional AI headshots for plumbers, plumbing contractors, and apprentices. Earn customer trust on your website, Google profile, and marketing with a portrait delivered in about 2 hours.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/plumbers' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/industries/plumbers`,
  },
};

const benefits = [
  {
    icon: UserCheck,
    title: "Friendly and Reliable",
    description: "Show customers the dependable professional who will show up on time and get the job done.",
  },
  {
    icon: Globe,
    title: "Website & Local Listings",
    description: "Portraits sized for your homepage, Google Business Profile, and directories like Angi and Yelp.",
  },
  {
    icon: FileCheck,
    title: "Quotes & Service Proposals",
    description: "Add your portrait to quotes and proposals to make your business feel personal and established.",
  },
  {
    icon: Camera,
    title: "Vans, Flyers & Print",
    description: "High-resolution images work for vehicle graphics, door hangers, and mailers.",
  },
  {
    icon: Star,
    title: "Stand Out From Competitors",
    description: "In a crowded local market, a real, professional face sets your business apart from faceless ads.",
  },
  {
    icon: Zap,
    title: "Fast and Affordable",
    description: "Skip the studio. Take selfies at home and get a professional result in about 2 hours.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Take clear, well-lit photos of yourself. Vary your angles and expressions so the AI captures your natural look.",
  },
  {
    icon: Sparkles,
    title: "Choose Your Style",
    description: "Pick a background and look that fit your business, from friendly and casual to crisp and professional.",
  },
  {
    icon: Check,
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for your website, listings, and print.",
  },
];

const audiences = [
  {
    icon: UserCheck,
    title: "Residential Plumbers",
    description: "Friendly portraits that build trust with homeowners on your site and listings.",
  },
  {
    icon: Briefcase,
    title: "Plumbing Contractors",
    description: "Professional headshots for bids, proposals, and company pages.",
  },
  {
    icon: Users,
    title: "Apprentices & Journeymen",
    description: "Polished images for job applications, union profiles, and LinkedIn.",
  },
  {
    icon: Award,
    title: "Master Plumbers & Business Owners",
    description: "Authoritative portraits for team pages, press, and trade associations.",
  },
];

const faqs = [
  {
    question: "Can I use my headshot on my Google Business Profile?",
    answer: "Yes. You receive full commercial rights, so you can use your headshots on Google profiles, directories, websites, and social media.",
  },
  {
    question: "Will it work on a van wrap or flyer?",
    answer: "Yes. Headshots are delivered in high resolution, suitable for print materials including vehicle graphics and flyers.",
  },
  {
    question: "What should I wear in my selfies?",
    answer: "Wear a clean work shirt or something you would wear to meet a customer. The AI adapts attire to the style you choose.",
  },
  {
    question: "Can my whole team get matching headshots?",
    answer: "Yes. Each team member uploads their own selfies and can choose the same background and style for a consistent team page.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours, so you can update your listings the same day.",
  },
  {
    question: "How many headshots do I get?",
    answer: "Each package delivers multiple variations across backgrounds and styles, giving you options for different uses.",
  },
];

export default function PlumbersIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Plumbers"}
        description={"AI-generated professional headshots for plumbers and plumbing contractors for websites, Google Business Profiles, quotes, and marketing."}
        price={990}
        category="Skilled Trades"
        slug="industries/plumbers"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Industries', url: `${siteConfig.url}/industries` },
          { name: "Plumbers", url: `${siteConfig.url}/industries/plumbers` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Briefcase className="h-4 w-4" />
              For Plumbers
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Plumbers</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              When a pipe bursts, people call the plumber they trust. Get a friendly, professional headshot for your website, local listings, and quotes without taking time off the job.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Plumber Headshot
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
            14-Day Money-Back Guarantee
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
              A Face Customers Want to Call
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for your website, local listings, and marketing materials.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="tp-card rounded-2xl border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
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
            <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Three simple steps from selfie to finished headshot.</p>
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
            <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
              Who Uses TailorPic
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Headshots for every kind of plumbing professional.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-tp-line bg-white p-6">
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
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-tp-line bg-white p-6">
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
          <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
            Be the Plumber Customers Remember
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get a headshot that earns trust and helps more customers call.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Plumber Headshot
            </Link>
            <Link href="/pricing" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              View Pricing
            </Link>
          </div>
          <p className="mt-6 text-sm text-tp-muted">
            No subscription required. 14-day money-back guarantee.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
