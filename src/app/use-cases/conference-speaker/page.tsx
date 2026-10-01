import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, Briefcase, Check, Clock, GraduationCap, Image, Presentation, Shield, Sparkles, Star, Upload, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const pageTitle = "AI Headshots for Conference Speaker Bios | TailorPic";
const pageDescription =
  "Polished speaker headshots for conference websites, programs and bios. Meet organizer deadlines with a professional photo from a few selfies in about 2 hours. Starting at $9.90.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: 'https://www.tailorpic.com/use-cases/conference-speaker' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: 'https://www.tailorpic.com/use-cases/conference-speaker',
  },
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: "AI Headshots for Conference Speakers",
  description: "Professional speaker bio headshots for conferences and events",
  url: 'https://www.tailorpic.com/use-cases/conference-speaker',
  brand: { '@type': 'Brand', name: 'TailorPic' },
  category: 'Professional Services',
  offers: {
    '@type': 'Offer',
    price: '9.90',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://www.tailorpic.com/use-cases/conference-speaker',
  },
};

const benefits = [
  {
    icon: Presentation,
    title: "Stand Out on the Speaker Lineup",
    description: "A confident, well-lit headshot makes attendees more likely to click through to your session.",
  },
  {
    icon: Clock,
    title: "Meet Organizer Deadlines",
    description: "Organizers often ask for your photo with days to spare. Have it ready in about 2 hours.",
  },
  {
    icon: Image,
    title: "High Resolution for Print and Web",
    description: "Files are large enough for the event website, printed programs, banners, and promo cards.",
  },
  {
    icon: Award,
    title: "Authority Before You Speak",
    description: "A professional portrait signals expertise and helps you get invited back.",
  },
  {
    icon: Sparkles,
    title: "Fresh Photo for Every Event",
    description: "Refresh your look for each conference without booking a new photo session.",
  },
  {
    icon: Shield,
    title: "Your Photos, Your Rights",
    description: "No watermarks, and you can reuse the images on your site, slide decks, and social profiles.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload a Few Selfies",
    description: "Share 6-10 clear phone photos with different expressions and angles. Natural daylight works best.",
  },
  {
    icon: Award,
    title: "Choose a Stage-Ready Style",
    description: "Pick a business, smart-casual, or creative look and a clean background that suits your topic.",
  },
  {
    icon: Check,
    title: "Download and Send to Organizers",
    description: "Get high-resolution photos in about 2 hours and attach them to your speaker submission.",
  },
];

const features = [
  {
    icon: Presentation,
    title: "Keynote & Panel Speakers",
    description: "Look the part on event sites, agendas, and social announcements.",
  },
  {
    icon: Briefcase,
    title: "Consultants & Coaches",
    description: "Use conferences to win clients with a headshot that builds instant credibility.",
  },
  {
    icon: GraduationCap,
    title: "Academics & Researchers",
    description: "Submit polished photos for symposiums, workshops, and invited talks.",
  },
  {
    icon: Users,
    title: "Founders & Executives",
    description: "Represent your company on stage with a consistent, professional image.",
  },
];

const faqs = [
  {
    question: "What kind of headshot do conference organizers want?",
    answer: "Most want a clear, high-resolution, front-facing portrait with a simple background. TailorPic delivers exactly that.",
  },
  {
    question: "Can I use the photo in print and on slides?",
    answer: "Yes. You receive high-resolution files suitable for printed programs, banners, slide decks, and web pages.",
  },
  {
    question: "Will the photo look like me?",
    answer: "Yes. TailorPic is trained on your own selfies, so attendees will recognize you when you walk on stage.",
  },
  {
    question: "Can I get different styles for different events?",
    answer: "Yes. Choose a formal look for a corporate summit and a relaxed one for a creative festival.",
  },
  {
    question: "How much does it cost?",
    answer: "TailorPic starts at $9.90 per pack, far less than a photographer session.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most orders arrive in about 2 hours, which is fast enough for last-minute speaker deadlines.",
  },
];

export default function ConferenceSpeakerPage() {
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
          { name: "Conference Speakers", url: `${siteConfig.url}/use-cases/conference-speaker` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Presentation className="h-4 w-4" />
              Conference Speaker Photos
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Headshots for{' '}
              <span className="not-italic text-tp-bronze">Conference Speakers</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Organizers want your bio and headshot yesterday. Get a crisp, professional speaker photo for the event site, program, and promo graphics from a handful of selfies. Delivered in about 2 hours, starting at just $9.90.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Speaker Headshot
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
            Organizer-Ready Files
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Delivered in About 2 Hours
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Starting at $9.90
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Money-Back Guarantee
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
              Why Your Speaker Photo Matters
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Your headshot sells your session before you step on stage.</p>
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
            <p className="mt-4 text-lg text-tp-muted">From selfie to speaker bio photo in three steps.</p>
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
              Who Uses TailorPic as Speakers
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Great photos for anyone who takes the stage or joins the panel.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item) => {
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
            Step on Stage with a Headshot You Love
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Send organizers a speaker photo you are proud of. Starting at just $9.90.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Speaker Headshot
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
