import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Check, Clock, Crop, GraduationCap, Mic, Palette, Shield, Sparkles, Star, Upload, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const pageTitle = "AI Headshots for Podcast Cover Art | TailorPic";
const pageDescription =
  "Professional host photos for podcast cover art on Spotify and Apple Podcasts. Get polished portraits from a few selfies, delivered in about 2 hours. Starting at $9.90.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: 'https://www.tailorpic.com/use-cases/podcast-cover' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: 'https://www.tailorpic.com/use-cases/podcast-cover',
  },
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: "AI Headshots for Podcast Cover Art",
  description: "Professional host portraits for podcast cover art and episode artwork",
  url: 'https://www.tailorpic.com/use-cases/podcast-cover',
  brand: { '@type': 'Brand', name: 'TailorPic' },
  category: 'Professional Services',
  offers: {
    '@type': 'Offer',
    price: '9.90',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://www.tailorpic.com/use-cases/podcast-cover',
  },
};

const benefits = [
  {
    icon: Mic,
    title: "Stand Out in Podcast Directories",
    description: "A clear, well-lit host portrait helps your show catch the eye in Apple Podcasts and Spotify search results.",
  },
  {
    icon: Crop,
    title: "Composed for Square Artwork",
    description: "Photos are framed with your face centered so they crop cleanly into square cover art and small thumbnails.",
  },
  {
    icon: Palette,
    title: "Backgrounds That Match Your Brand",
    description: "Choose a clean or colored background that fits your cover design and title text.",
  },
  {
    icon: Sparkles,
    title: "No Studio Shoot Needed",
    description: "Skip the photographer. Your portrait is generated from selfies, so you can refresh your cover anytime.",
  },
  {
    icon: Shield,
    title: "Your Photos, Your Rights",
    description: "You own every image with no watermarks. Reuse them on cover art, websites, and social posts.",
  },
  {
    icon: Clock,
    title: "Ready for Your Next Episode Launch",
    description: "Upload selfies today and have your portrait in about 2 hours, in time for your next season artwork.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload a Few Selfies",
    description: "Share 6-10 clear phone photos with different expressions and angles. Natural daylight works best.",
  },
  {
    icon: Users,
    title: "Choose a Host-Ready Style",
    description: "Pick a friendly, confident, or editorial look and a background that suits your show.",
  },
  {
    icon: Check,
    title: "Download and Add to Your Artwork",
    description: "Get high-resolution photos in about 2 hours, then drop your favorite into your cover template.",
  },
];

const features = [
  {
    icon: Mic,
    title: "Solo Podcast Hosts",
    description: "Put a confident face on your show and build a recognizable brand.",
  },
  {
    icon: Users,
    title: "Co-Hosted Shows",
    description: "Match the look of each host so your cover art feels consistent.",
  },
  {
    icon: Briefcase,
    title: "Business & Brand Podcasts",
    description: "Give your company show a polished, credible host image.",
  },
  {
    icon: GraduationCap,
    title: "Educators & Interview Shows",
    description: "Create approachable portraits for guests-first and teaching formats.",
  },
];

const faqs = [
  {
    question: "What size should my podcast cover photo be?",
    answer: "Most directories ask for square artwork, commonly at least 1400 x 1400 pixels. You receive high-resolution files that crop cleanly to a square.",
  },
  {
    question: "Will the photo look like me?",
    answer: "Yes. TailorPic is trained on your own selfies, so results keep your real features and natural expression.",
  },
  {
    question: "Can I use it for multiple hosts?",
    answer: "Yes. Each host uploads their own selfies, and you can choose matching styles and backgrounds for a consistent look.",
  },
  {
    question: "Can I pick a background that fits my cover design?",
    answer: "Yes. You can choose a clean studio-style or colored background during setup to suit your artwork.",
  },
  {
    question: "How much does it cost?",
    answer: "TailorPic starts at $9.90 per pack, far less than a photographer session.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most orders arrive in about 2 hours after you upload your selfies.",
  },
];

export default function PodcastCoverUseCasePage() {
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
          { name: "Podcast Cover", url: `${siteConfig.url}/use-cases/podcast-cover` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Mic className="h-4 w-4" />
              {"Podcast Cover Art"}
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              {"AI Headshots for "}
              <span className="not-italic text-tp-bronze">{"Podcast Cover Art"}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              {"Your cover art is your first impression in a crowded directory. Get a crisp, professional host portrait from a handful of selfies, delivered in about 2 hours, starting at just $9.90."}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                {"Get Your Podcast Headshot"}
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
            {"Fits Square Cover Art"}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Delivered in About 2 Hours"}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Starting at $9.90"}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Money-Back Guarantee"}
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
              {"Why Your Podcast Cover Photo Matters"}
            </h2>
            <p className="mt-4 text-lg text-tp-muted">{"Listeners judge a show by its artwork before they press play."}</p>
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
            <p className="mt-4 text-lg text-tp-muted">{"From selfie to new cover art portrait in three steps."}</p>
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
              {"Who Uses TailorPic for Podcast Art"}
            </h2>
            <p className="mt-4 text-lg text-tp-muted">{"Great portraits for every host who wants a stronger show identity."}</p>
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
            {"Give Your Podcast a Face Listeners Remember"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            {"Make your cover art work harder from the first glance. Starting at just $9.90."}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              {"Get Your Podcast Headshot"}
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
