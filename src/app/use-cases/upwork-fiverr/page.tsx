import type { Metadata } from 'next';
import Link from 'next/link';
import { BadgeCheck, Briefcase, Camera, Check, Clock, Code2, Globe, Palette, Shield, TrendingUp, Upload, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { FAQSchema, ProductSchema, BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { FAQAccordion } from '@/components/marketing/faq-accordion';
import { RelatedLinks } from '@/components/related-links';
import { getRelatedUseCases } from '@/lib/internal-links';

const pageTitle = 'AI Headshots for Upwork & Fiverr Freelancers | TailorPic';
const pageDescription =
  `Trust-building headshots for Upwork, Fiverr and other freelance marketplace profiles. Win more clients with a professional photo from a few selfies. From ${BASE_PRICE_DISPLAY}.`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/upwork-fiverr' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/upwork-fiverr', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};


const benefits = [
  {
    icon: BadgeCheck,
    title: "Win More Client Trust",
    description: "Buyers scroll through dozens of profiles. A clear, professional photo signals reliability and helps you get the click.",
  },
  {
    icon: TrendingUp,
    title: "Stand Out in Search Results",
    description: "Your photo sits next to your title and rate. A polished headshot makes your profile memorable against faceless competitors.",
  },
  {
    icon: Camera,
    title: "Sharp at Every Size",
    description: "Photos are framed so your face stays clear in tiny search thumbnails and in full profile and gig pages.",
  },
  {
    icon: Globe,
    title: "One Look Across Every Platform",
    description: "Use the same headshot on Upwork, Fiverr, Freelancer, Toptal, LinkedIn, and your portfolio for a consistent brand.",
  },
  {
    icon: Shield,
    title: "Your Photos, Your Rights",
    description: "You own every image with no watermarks, so you can use them on any marketplace and in your own marketing.",
  },
  {
    icon: Clock,
    title: "Launch Your Profile Faster",
    description: "Skip scheduling a photographer. Get your headshot within hours and publish your profile today.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload a Few Selfies",
    description: "Share 6-10 clear phone photos with different expressions and angles. Natural light works best.",
  },
  {
    icon: Briefcase,
    title: "Choose a Professional Style",
    description: "Pick a business, business-casual, or friendly look and a clean background that suits your niche.",
  },
  {
    icon: Check,
    title: "Download and Update Your Profiles",
    description: "Get your high-resolution photos within hours, then add your favorite to every marketplace profile.",
  },
];

const features = [
  {
    icon: Palette,
    title: "Designers & Creatives",
    description: "Show clients the person behind the portfolio and build a personal connection.",
  },
  {
    icon: Code2,
    title: "Developers & Technical Freelancers",
    description: "Look credible to clients who are trusting you with their product.",
  },
  {
    icon: Users,
    title: "Writers, Marketers & Consultants",
    description: "Make a professional first impression before the first proposal.",
  },
  {
    icon: Globe,
    title: "Global & Remote Talent",
    description: "Look polished and trustworthy to clients anywhere in the world.",
  },
];

const faqs = [
  {
    question: "Does a profile photo really affect how many jobs I get?",
    answer: "Clients often decide quickly which profiles to open. A clear, professional photo builds trust and makes your profile feel more complete, which can help you stand out in search results.",
  },
  {
    question: "Is an AI headshot allowed on Upwork and Fiverr?",
    answer: "Both platforms ask for a clear photo of your face. Because TailorPic is trained on your own selfies, the result is a realistic photo of you, which fits their profile photo guidelines. Always check each platform's current policy.",
  },
  {
    question: "Will the photo look like me?",
    answer: "Yes. Results keep your real features and natural expression, so clients are not surprised on your first video call.",
  },
  {
    question: "Can I use it on every platform?",
    answer: "Absolutely. You own full rights and can use the photos on Upwork, Fiverr, Freelancer, LinkedIn, your website, and proposals.",
  },
  {
    question: "How much does it cost?",
    answer: `TailorPic starts at ${BASE_PRICE_DISPLAY} per pack, a small investment compared with a photographer session.`,
  },
  {
    question: "How long does delivery take?",
    answer: "Most orders arrive within hours after you upload your selfies, so you can publish your profile the same day.",
  },
];

export default function UpworkFiverrUseCasePage() {
  const relatedPages = getRelatedUseCases('upwork-fiverr');

  return (
    <>
      <ProductSchema
        name="TailorPic"
        description="Trust-building headshots for Upwork, Fiverr and freelance marketplace profiles"
        price={199}
        category="Professional Services"
        slug="use-cases/upwork-fiverr"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
          items={[
            { name: 'Home', url: siteConfig.url },
            { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
            { name: 'Upwork & Fiverr', url: `${siteConfig.url}/use-cases/upwork-fiverr` },
          ]}
        />
      <Header />
      <main id="main-content">
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Use Cases', href: '/use-cases' }, { label: 'Freelance Platforms' }]} currentPath="/use-cases/upwork-fiverr" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Briefcase className="h-4 w-4" />
              Freelancer Profile Photos
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Headshots for{' '}
              <span className="not-italic text-tp-bronze">Freelance Platforms</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Clients hire people they trust, and trust starts with your profile photo. Get a professional headshot for Upwork, Fiverr, and other marketplaces from a handful of selfies. Delivered within hours, starting at just {BASE_PRICE_DISPLAY}.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Freelancer Headshot
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
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Made for Marketplace Profiles
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Delivered Within Hours
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Starting at {BASE_PRICE_DISPLAY}
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
              Why Your Freelancer Photo Matters
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Your headshot is the first thing a client sees in search results.</p>
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
            <p className="mt-4 text-lg text-tp-muted">From selfie to a client-ready profile photo in three steps.</p>
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
              Who Uses TailorPic for Freelancing
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Great headshots for everyone who sells their skills online.</p>
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
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <RelatedLinks links={relatedPages} title="Related Use Cases" />


      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
            Turn Profile Views into Clients
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Show clients a professional, trustworthy face. Starting at just {BASE_PRICE_DISPLAY}.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Freelancer Headshot
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
