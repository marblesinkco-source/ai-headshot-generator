import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Check, Eye, Image, Palette, Play, Shield, Sparkles, TrendingUp, Upload, Users, Video } from 'lucide-react';
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

const pageTitle = 'AI Photos for YouTube Channels & Avatars | TailorPic';
const pageDescription =
  `Build a recognizable YouTube brand with AI-generated creator photos: channel avatars, banner portraits and thumbnail-ready faces from a few selfies. From ${BASE_PRICE_DISPLAY}.`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/youtube' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/youtube', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};

const benefits = [
  {
    icon: Eye,
    title: "Stand Out in Search and Suggested",
    description: "Your channel avatar shows up beside every video. A crisp, expressive face makes viewers more likely to recognize and click your content.",
  },
  {
    icon: Image,
    title: "Thumbnail-Ready Portraits",
    description: "Get portraits with clean edges and strong expressions that cut out easily for thumbnails, where a human face consistently draws attention.",
  },
  {
    icon: Palette,
    title: "Match Your Channel Branding",
    description: "Pick background colors and tones that line up with your banner, intro, and overlays so the whole channel looks designed.",
  },
  {
    icon: Video,
    title: "Banner and About Page Visuals",
    description: "Use wide-friendly compositions for channel art, collaboration graphics, sponsor decks, and your About section.",
  },
  {
    icon: TrendingUp,
    title: "Look Established Before You Are",
    description: "New channels earn trust faster with professional visuals. Brands and collaborators judge your media kit on first impression.",
  },
  {
    icon: Shield,
    title: "Commercial Rights Included",
    description: "You own every photo, with no watermarks. Use them in videos, merch, sponsorship pitches, and across every platform.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload Your Selfies",
    description: "Send 6-10 well-lit phone photos with varied expressions. Include a few big smiles and a few serious looks for range.",
  },
  {
    icon: Sparkles,
    title: "Set Your Channel Style",
    description: "Choose a look that matches your niche, from clean studio and tech-desk vibes to bold colored backdrops and casual lifestyle.",
  },
  {
    icon: Play,
    title: "Download and Publish",
    description: "Receive high-resolution photos within hours. Update your avatar, banner, and thumbnails and hit publish.",
  },
];

const features = [
  {
    icon: Video,
    title: "New & Growing Creators",
    description: "Launch with a polished identity without spending on a photoshoot before your first video takes off.",
  },
  {
    icon: Camera,
    title: "Faceless Channels Going On-Camera",
    description: "Ready to show your face? Get confident, consistent imagery to introduce yourself to your audience.",
  },
  {
    icon: Users,
    title: "Educators & Course Creators",
    description: "Project authority and approachability on tutorial and explainer channels where trust drives subscriptions.",
  },
  {
    icon: TrendingUp,
    title: "Business & Brand Channels",
    description: "Give founders and spokespeople a consistent, professional face across company video content.",
  },
];

const faqs = [
  {
    question: "What size should a YouTube channel profile picture be?",
    answer: "YouTube recommends an 800 x 800 pixel image displayed as a circle. TailorPic delivers high-resolution photos with your face centered, so they crop cleanly to that circle at any size.",
  },
  {
    question: "Can I use the photos in thumbnails?",
    answer: "Yes. You own full commercial rights, so you can cut out your portrait and place it on thumbnails, banners, and overlays as often as you like.",
  },
  {
    question: "Will the photos match my channel's visual style?",
    answer: "You can choose backgrounds, lighting, and overall tone to match your branding. Bright and energetic, dark and cinematic, or clean and minimal are all possible.",
  },
  {
    question: "Do I need a professional camera?",
    answer: "No. A recent smartphone and decent lighting are enough. Our AI builds studio-quality results from your selfies.",
  },
  {
    question: "Can I use the photos for sponsorship and media kits?",
    answer: "Absolutely. Commercial use is included, so the photos work in media kits, pitch decks, press features, and collaboration announcements.",
  },
  {
    question: "How much does it cost and how long does it take?",
    answer: `Packs start at ${BASE_PRICE_DISPLAY} and most orders are delivered within hours, so you can refresh your channel the same day.`,
  },
];

export default function YouTubeUseCasePage() {
  const relatedPages = getRelatedUseCases('youtube');

  return (
    <>
      <ProductSchema
        name="AI Photos for YouTube Channels"
        description="AI-generated creator portraits for YouTube channel avatars, banners, thumbnails, and media kits."
        price={990}
        category="Professional Services"
        slug="use-cases/youtube"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
          items={[
            { name: 'Home', url: siteConfig.url },
            { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
            { name: 'Youtube', url: `${siteConfig.url}/use-cases/youtube` },
          ]}
        />
      <Header />
      <main id="main-content">
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Use Cases', href: '/use-cases' }, { label: 'YouTube' }]} currentPath="/use-cases/youtube" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Play className="h-4 w-4" />
              YouTube Creator Photos
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Photos for{' '}
              <span className="not-italic text-tp-bronze">YouTube Channels</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Your face is your channel&apos;s brand. Create standout avatars, banner portraits, and thumbnail-ready photos from a few selfies, without booking a studio. Delivered within hours, starting at just {BASE_PRICE_DISPLAY}.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Channel Photos
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
            Commercial Use Included
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
              Why Creator Photos Drive Channel Growth
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Make every avatar, banner, and thumbnail work harder for your channel.</p>
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
            <p className="mt-4 text-lg text-tp-muted">From selfie to channel-ready visuals in three steps.</p>
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
              Who Uses TailorPic for YouTube
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Professional visuals for every kind of channel.</p>
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
            Give Your Channel a Face Worth Clicking
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Build a channel identity viewers recognize and remember. Starting at just {BASE_PRICE_DISPLAY}.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Channel Photos
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
