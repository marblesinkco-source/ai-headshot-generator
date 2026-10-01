import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Check, Clock, Heart, Plane, RefreshCw, Shield, Smile, Sparkles, Star, Upload, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const pageTitle = "AI Photos for Dating Profile Pictures | TailorPic";
const pageDescription =
  "Natural, flattering AI photos for your dating profile on Tinder, Hinge and Bumble. Get varied, realistic portraits from a few selfies in about 2 hours. Starting at $9.90.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: 'https://www.tailorpic.com/use-cases/dating-profile-photo' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: 'https://www.tailorpic.com/use-cases/dating-profile-photo',
  },
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: "AI Photos for Dating Profile Pictures",
  description: "Natural, realistic AI photos for dating app profiles",
  url: 'https://www.tailorpic.com/use-cases/dating-profile-photo',
  brand: { '@type': 'Brand', name: 'TailorPic' },
  category: 'Professional Services',
  offers: {
    '@type': 'Offer',
    price: '9.90',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://www.tailorpic.com/use-cases/dating-profile-photo',
  },
};

const benefits = [
  {
    icon: Heart,
    title: "A Strong First Impression",
    description: "Clear, well-lit portraits help your main photo stand out in a stack of profiles.",
  },
  {
    icon: Sparkles,
    title: "Variety in One Session",
    description: "Get different settings, outfits and moods so your profile tells a fuller story.",
  },
  {
    icon: Shield,
    title: "Keeps You Looking Like You",
    description: "Results are trained on your selfies and keep your real features and natural expression.",
  },
  {
    icon: Camera,
    title: "No Photographer Needed",
    description: "Skip awkward shoots and asking friends to take pictures. Everything starts from selfies.",
  },
  {
    icon: Star,
    title: "Yours to Use Everywhere",
    description: "You own every image with no watermarks, so use them across any app or platform.",
  },
  {
    icon: Clock,
    title: "Ready Fast",
    description: "Upload selfies today and have your photos in about 2 hours.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload a Few Selfies",
    description: "Share 6-10 clear phone photos with different expressions and angles. Natural daylight works best.",
  },
  {
    icon: Smile,
    title: "Choose Your Vibe",
    description: "Pick a casual, outdoorsy, dressed-up or relaxed look that fits your personality.",
  },
  {
    icon: Check,
    title: "Download and Update Your Profile",
    description: "Get high-resolution photos in about 2 hours, then pick your favorites for your apps.",
  },
];

const features = [
  {
    icon: Heart,
    title: "First-Time Daters",
    description: "Build a profile that shows off your personality with confidence.",
  },
  {
    icon: RefreshCw,
    title: "Returning to Dating",
    description: "Refresh your photos with a modern, natural set.",
  },
  {
    icon: Plane,
    title: "Busy Professionals",
    description: "Get great photos without scheduling a shoot.",
  },
  {
    icon: Camera,
    title: "Anyone Short on Good Photos",
    description: "Turn a few selfies into a complete, varied set.",
  },
];

const faqs = [
  {
    "question": "Will the photos look like me?",
    "answer": "Yes. TailorPic is trained on your own selfies, so results keep your real features and natural expression."
  },
  {
    "question": "Is it okay to use AI photos on dating apps?",
    "answer": "Use photos that honestly represent how you look. Some apps have their own rules, so check each platform's guidelines."
  },
  {
    "question": "Can I get different looks?",
    "answer": "Yes. You can choose from several styles and settings, from casual to dressed up."
  },
  {
    "question": "Do I own the photos?",
    "answer": "Yes. You own every image and there are no watermarks."
  },
  {
    "question": "How much does it cost?",
    "answer": "TailorPic starts at $9.90 per pack, far less than a photographer session."
  },
  {
    "question": "How long does delivery take?",
    "answer": "Most orders arrive in about 2 hours after you upload your selfies."
  }
];

export default function DatingProfilePhotoUseCasePage() {
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
          { name: "Dating Profile Photo", url: `${siteConfig.url}/use-cases/dating-profile-photo` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Heart className="h-4 w-4" />
              {"Dating Profile Photos"}
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              {"AI Photos for "}
              <span className="not-italic text-tp-bronze">{"Dating Profile Pictures"}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              {"Your first photo decides whether someone swipes. Get a set of warm, natural portraits from a handful of selfies, delivered in about 2 hours, starting at just $9.90."}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                {"Get Your Dating Photos"}
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
            {"Natural, Realistic Looks"}
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
              {"Why Your Dating Photos Matter"}
            </h2>
            <p className="mt-4 text-lg text-tp-muted">{"Profiles with clear, friendly photos get a better first impression."}</p>
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
            <p className="mt-4 text-lg text-tp-muted">{"From selfie to swipe-worthy photos in three steps."}</p>
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
              {"Who Uses TailorPic for Dating Photos"}
            </h2>
            <p className="mt-4 text-lg text-tp-muted">{"Better photos for anyone who wants a stronger first impression."}</p>
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
            {"Put Your Best Face Forward"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            {"Show the real you in the best light. Starting at just $9.90."}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              {"Get Your Dating Photos"}
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
