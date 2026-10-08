import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Check, Heart, ImagePlus, MessageCircle, Shield, Smile, Sparkles, Sun, Upload, Zap } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const pageTitle = 'AI Photos for Dating Apps: Tinder, Hinge, Bumble | TailorPic';
const pageDescription =
  'Get natural, flattering photos for dating apps like Tinder, Hinge and Bumble. AI-enhanced profile pictures that look like you on your best day. From $1.99.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/dating-apps' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/dating-apps', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};

const benefits = [
  {
    icon: Smile,
    title: "Natural, Not Over-Produced",
    description: "Our AI creates photos that look like a friend took them in great lighting, not like you hired a photographer for your dating profile.",
  },
  {
    icon: Sun,
    title: "Golden Hour Lighting",
    description: "Get that warm, flattering light that makes everyone look their best, even if your apartment has terrible lighting.",
  },
  {
    icon: ImagePlus,
    title: "Variety for Your Profile",
    description: "Receive multiple photos with different backgrounds and styles, so you can fill your profile grid with distinct, high-quality images.",
  },
  {
    icon: Heart,
    title: "Show Your Personality",
    description: "Choose from casual, outdoor, dressed-up, or lifestyle settings that reflect who you are and what you enjoy.",
  },
  {
    icon: Shield,
    title: "Private and Secure",
    description: "Your selfies are used only to generate your photos. We share your images only with our AI processing partner to generate them, and we never sell them.",
  },
  {
    icon: MessageCircle,
    title: "More Matches, More Conversations",
    description: "Clear, well-lit profile photos are the number one factor in getting right-swipes. Quality photos lead to more meaningful connections.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Take clear photos of yourself in decent lighting. Include a few smiling shots. Everyday clothes work great.",
  },
  {
    icon: Sparkles,
    title: "Choose Your Vibe",
    description: "Select from casual, outdoor, lifestyle, or dressed-up styles. Pick backgrounds that match the energy you want to project.",
  },
  {
    icon: Check,
    title: "Update Your Dating Profile",
    description: "Receive natural-looking, high-resolution photos within hours. Pick your favorites and refresh your Tinder, Hinge, or Bumble profile.",
  },
];

const features = [
  {
    icon: Zap,
    title: "New to Dating Apps",
    description: "Do not have great photos of yourself? Get a full set of profile-ready images without asking someone to take them.",
  },
  {
    icon: Camera,
    title: "Refreshing Your Profile",
    description: "Swap out old or blurry photos for sharp, current-looking images that get more attention.",
  },
  {
    icon: Heart,
    title: "Back on the Market",
    description: "Starting over after a relationship? Get fresh photos that represent the current you, not who you were two years ago.",
  },
  {
    icon: Sun,
    title: "Camera-Shy People",
    description: "If you hate posing for photos, a few quick selfies are all you need. The AI handles the rest.",
  },
];

const faqs = [
  {
    question: "Will my photos look too perfect or fake?",
    answer: "No. TailorPic is designed to produce natural-looking results that represent the real you in great lighting. The goal is photos that look like you on a good day, not an airbrushed magazine cover.",
  },
  {
    question: "Which dating apps do these photos work for?",
    answer: "TailorPic photos are high resolution and work on every major dating platform including Tinder, Hinge, Bumble, Match, OkCupid, and Coffee Meets Bagel. They also work well for social media profiles.",
  },
  {
    question: "How many photos will I get?",
    answer: "Each pack includes multiple photo variations with different styles and backgrounds. Most users pick 3 to 5 favorites for their dating profile and use others on social media.",
  },
  {
    question: "How much does it cost?",
    answer: "TailorPic starts at $1.99 per pack. That is less than a single drink at a bar and dramatically more effective at getting matches than a blurry bathroom mirror selfie.",
  },
  {
    question: "Can I choose what I am wearing in the photos?",
    answer: "Yes. You can select from a range of attire options, from casual t-shirts to button-downs and blazers, regardless of what you wore in your selfies.",
  },
];

export default function DatingAppsUseCasePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name="AI Photos for Dating Apps"
        description="AI-generated natural-looking profile photos optimized for dating apps like Tinder, Hinge, and Bumble."
        price={990}
        category="Professional Services"
        slug="use-cases/dating-apps"
      />
      <FAQSchema items={faqs} />
      <Header />
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Use Cases', href: '/use-cases' }, { label: 'Dating Apps' }]} currentPath="/use-cases/dating-apps" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Heart className="h-4 w-4" />
              Dating App Photos
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Photos for{' '}
              <span className="not-italic text-tp-bronze">Dating Apps</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Your dating profile photo is your first impression. Get natural, flattering photos that look like you on your best day, from a few quick selfies. No photographer, no awkward poses. Starting at just $1.99.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Dating Photos
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
            Natural-Looking Results
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Delivered Within Hours
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Starting at $1.99
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
              Why Better Photos Mean Better Matches
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Your profile photo is the single biggest factor in whether someone swipes right. Make it count.</p>
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
            <p className="mt-4 text-lg text-tp-muted">Three simple steps to a better dating profile.</p>
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
              Who Uses TailorPic for Dating
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Great photos for every stage of your dating journey.</p>
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
            Get More Matches Starting Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Stop losing matches to bad photos. Get a set of natural, flattering dating profile pictures within hours, from $1.99.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Dating Photos
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
