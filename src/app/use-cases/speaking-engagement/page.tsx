import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Check, Clock, Crop, GraduationCap, Mic, Palette, Presentation, Shield, Sparkles, Upload } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { FAQSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const pageTitle = "AI Headshots for Speaking Engagements | TailorPic";
const pageDescription =
  "Professional speaker headshots for event pages, programs, and promo graphics. Get polished portraits from a few selfies in about 2 hours. Starting at $1.99.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: 'https://www.tailorpic.com/use-cases/speaking-engagement' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/speaking-engagement', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: "AI Headshots for Speaking Engagements",
  description: "Professional speaker headshots for event pages, programs, and promotional graphics",
  url: 'https://www.tailorpic.com/use-cases/speaking-engagement',
  brand: { '@type': 'Brand', name: 'TailorPic' },
  category: 'Professional Services',
  offers: {
    '@type': 'Offer',
    price: '1.99',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://www.tailorpic.com/use-cases/speaking-engagement',
  },
};

const benefits = [
  {
    icon: Presentation,
    title: "Stage-Ready Confidence",
    description: "A confident portrait shows organizers and attendees you are a credible speaker.",
  },
  {
    icon: Crop,
    title: "Works for Every Promo Format",
    description: "Photos are framed with your face centered so they crop into banners, program listings, and social cards.",
  },
  {
    icon: Palette,
    title: "Backgrounds That Fit Event Branding",
    description: "Choose a clean or colored background that suits event graphics.",
  },
  {
    icon: Sparkles,
    title: "No Studio Shoot Needed",
    description: "Skip the photographer. Your portrait is generated from selfies, so you can send a fresh photo anytime.",
  },
  {
    icon: Shield,
    title: "Your Photos, Your Rights",
    description: "You own every image with no watermarks. Send them to organizers without restrictions.",
  },
  {
    icon: Clock,
    title: "Ready Before the Call for Speakers",
    description: "Upload selfies today and have your portrait in about 2 hours, in time for the next deadline.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload a Few Selfies",
    description: "Share 6-10 clear phone photos with different expressions and angles. Natural daylight works best.",
  },
  {
    icon: Presentation,
    title: "Choose a Speaker-Ready Style",
    description: "Pick an approachable, authoritative, or editorial look and a background that suits your topic.",
  },
  {
    icon: Check,
    title: "Download and Send to Organizers",
    description: "Get high-resolution photos in about 2 hours, then share your favorite with event teams.",
  },
];

const features = [
  {
    icon: Presentation,
    title: "Keynote & Panel Speakers",
    description: "Supply organizers with a polished photo for programs and promo.",
  },
  {
    icon: Briefcase,
    title: "Consultants & Executives",
    description: "Support your thought-leadership with a credible portrait.",
  },
  {
    icon: Mic,
    title: "Workshop & Webinar Hosts",
    description: "Put a friendly face on your session pages and registration sites.",
  },
  {
    icon: GraduationCap,
    title: "Academics & Researchers",
    description: "Give conference listings a professional portrait for your bio.",
  },
];

const faqs = [
  {
    question: "What do event organizers usually ask for?",
    answer: "Many ask for a high-resolution headshot and a short bio. You receive high-resolution files suited to print and web.",
  },
  {
    question: "Will the photo look like me?",
    answer: "Yes. TailorPic is trained on your own selfies, so results keep your real features and natural expression.",
  },
  {
    question: "Can I pick a background that fits the event?",
    answer: "Yes. You can choose a clean studio-style or colored background during setup.",
  },
  {
    question: "Can I use the photos for slides and social posts?",
    answer: "Yes. You own the images and can reuse them in your deck, bio, and promotions.",
  },
  {
    question: "How much does it cost?",
    answer: "TailorPic starts at $1.99 per pack, far less than a photographer session.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most orders arrive in about 2 hours after you upload your selfies.",
  },
];

export default function SpeakingEngagementUseCasePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <FAQSchema items={faqs} />
      <Header />
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Use Cases', href: '/use-cases' }, { label: 'Speaking Engagements' }]} currentPath="/use-cases/speaking-engagement" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Presentation className="h-4 w-4" />
              {"Speaking Engagements"}
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              {"AI Headshots for "}
              <span className="not-italic text-tp-bronze">{"Speaking Engagements"}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              {"Organizers need a polished photo to promote you. Get a confident speaker portrait from a handful of selfies, delivered in about 2 hours, starting at just $1.99."}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                {"Get Your Speaker Headshot"}
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
            {"Ready for Event Pages and Programs"}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Delivered in About 2 Hours"}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Starting at $1.99"}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Satisfaction Guaranteed"}
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              {"Why Your Speaker Photo Matters"}
            </h2>
            <p className="mt-4 text-lg text-tp-muted">{"Organizers and attendees form an impression of you before you take the stage."}</p>
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
            <p className="mt-4 text-lg text-tp-muted">{"From selfie to speaker-ready portrait in three steps."}</p>
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
              {"Who Uses TailorPic for Speaking"}
            </h2>
            <p className="mt-4 text-lg text-tp-muted">{"Great portraits for every speaker who wants a stronger stage presence."}</p>
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
            {"Step Onto the Stage With a Standout Portrait"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            {"Make your speaker bio work harder from the first glance. Starting at just $1.99."}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              {"Get Your Speaker Headshot"}
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
