import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { HowToSchema, BreadcrumbSchema } from '@/components/structured-data';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import {
  Upload,
  Sparkles,
  Download,
  Fingerprint,
  Palette,
  Zap,
  ShieldCheck,
  Sun,
  Eye,
  RotateCcw,
  Camera,
  Check,
  X,
  ChevronDown,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works',
  description: `Learn how ${siteConfig.name} creates stunning AI-generated professional photos in 3 simple steps. Upload selfies, let our AI work its magic, and download 4K results.`,
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: `How It Works | ${siteConfig.name}`,
    description:
      'Upload your selfies, our AI trains a custom model on your features, and you get 40+ professional photos in about 2 hours.',
    url: `${siteConfig.url}/how-it-works`,
  },
};

const steps = [
  {
    number: 1,
    icon: Upload,
    title: 'Upload Your Selfies',
    description:
      'Start by uploading 10 to 20 casual selfies of yourself. These can be taken with your phone — no professional photos needed. Our AI uses these images to learn your unique facial features, skin tone, hair, and overall appearance from multiple perspectives.',
    tips: [
      'Use natural lighting for the clearest results',
      'Include photos from different angles (front, slight left, slight right)',
      'Make sure your face is clearly visible in every photo',
      'Use a variety of backgrounds so the AI focuses on you',
      'Upload recent photos that reflect your current appearance',
    ],
  },
  {
    number: 2,
    icon: Sparkles,
    title: 'AI Creates Your Photos',
    description:
      'Once you upload your selfies, our AI trains a custom model specifically on your features. This is not a generic filter or a face swap — it is a personalized AI model that understands what makes you look like you. It then generates 40+ professional photos across your chosen styles, from corporate headshots to creative portraits.',
    tips: [
      'The training process takes approximately 2 hours',
      'Each photo is generated at studio-quality resolution',
      'You can choose from 11+ style categories',
      'The AI preserves your natural features while enhancing lighting and composition',
      'Every result is unique — no templates or stock overlays',
    ],
  },
  {
    number: 3,
    icon: Download,
    title: 'Download & Use',
    description:
      'Browse your complete gallery of AI-generated photos once they are ready. Favorite the ones you love most, then download them in full 4K resolution. Your photos come with full commercial rights — use them anywhere you need a professional image.',
    tips: [
      'Download individual photos or your entire gallery at once',
      'All images are delivered in high-resolution 4K quality',
      'Perfect for LinkedIn, dating apps, personal websites, and print',
      'Full commercial usage rights included with every photo',
      'Photos are stored securely for 30 days after delivery',
    ],
  },
];

const differentiators = [
  {
    icon: Fingerprint,
    title: 'Custom AI Model',
    description:
      'We train a unique AI model specifically on your features. This is not a one-size-fits-all filter — it is a model that understands your face.',
  },
  {
    icon: Palette,
    title: 'Multiple Styles',
    description:
      'Get 40+ professional photos across a wide range of styles in a single session — headshots, creative, casual, and more.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Your photos are ready in about 2 hours, not days. No scheduling, no commute, no waiting for a photographer.',
  },
  {
    icon: ShieldCheck,
    title: 'Money-Back Guarantee',
    description:
      'We stand behind our results with a 100% satisfaction guarantee. If you are not happy, we will make it right.',
  },
];

const doList = [
  { icon: Sun, text: 'Natural, even lighting on your face' },
  { icon: Eye, text: 'Face clearly visible, no obstructions' },
  { icon: RotateCcw, text: 'Variety of angles and expressions' },
  { icon: Camera, text: 'Recent photos that look like you now' },
];

const dontList = [
  { text: 'Sunglasses or anything covering your face' },
  { text: 'Heavy filters, edits, or beauty modes' },
  { text: 'Group photos with other people' },
  { text: 'Blurry, dark, or low-resolution images' },
];

const faqs = [
  {
    question: 'How many selfies do I need to upload?',
    answer:
      'We recommend 10 to 20 selfies for the best results. More variety in angles and lighting helps our AI learn your features more accurately. You can upload as few as 8, but quality improves with more input photos.',
  },
  {
    question: 'How long does it take to get my photos?',
    answer:
      'The AI training and generation process takes approximately 2 hours. You will receive an email notification as soon as your photos are ready to view and download.',
  },
  {
    question: 'Can I use these photos commercially?',
    answer:
      'Yes. Every photo you generate comes with full commercial usage rights. You can use them on LinkedIn, your personal website, business cards, marketing materials, dating profiles, and anywhere else you need a professional image.',
  },
  {
    question: 'What if I am not happy with the results?',
    answer:
      'We offer a 100% money-back guarantee within 14 days of delivery. If you are not satisfied with your photos, contact our support team and we will make it right — either with a re-generation or a full refund.',
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen">
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'How It Works', url: `${siteConfig.url}/how-it-works` },
      ]} />
      <Header />
      <HowToSchema />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-tp-bronze/8 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
            Simple 3-Step Process
          </p>
          <h1 className="mt-4 font-display text-4xl font-normal italic text-white sm:text-5xl lg:text-6xl">
            How TailorPic Works
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
            Get studio-quality professional photos without leaving your home.
            Upload a few selfies, let our AI do the rest, and download your
            results in about 2 hours.
          </p>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 sm:space-y-16">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative rounded-2xl border border-tp-line bg-white p-6 shadow-sm sm:p-10"
                >
                  {/* Step number connector */}
                  <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
                    {/* Left: Number + Icon */}
                    <div className="flex shrink-0 flex-col items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-tp-black text-xl font-bold text-tp-bronze sm:h-16 sm:w-16 sm:text-2xl">
                        {step.number}
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tp-paper">
                        <Icon className="h-6 w-6 text-tp-bronze-ink" />
                      </div>
                    </div>

                    {/* Right: Content */}
                    <div className="flex-1">
                      <h2 className="font-display text-2xl font-normal italic text-tp-ink sm:text-3xl">
                        {step.title}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-tp-muted">
                        {step.description}
                      </p>
                      <ul className="mt-5 space-y-2.5">
                        {step.tips.map((tip) => (
                          <li
                            key={tip}
                            className="flex items-start gap-3 text-sm text-tp-muted"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="border-y border-tp-line bg-tp-black py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-normal italic text-tp-bronze sm:text-4xl">
              What Makes Us Different
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-tp-beige/60">
              TailorPic is not just another photo filter. Here is why thousands
              of customers choose us.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tp-bronze/10">
                    <Icon className="h-6 w-6 text-tp-bronze" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-beige/60">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo Requirements */}
      <section className="bg-tp-paper py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-normal italic text-tp-ink sm:text-4xl">
              Photo Requirements
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-tp-muted">
              Follow these tips to get the best possible results from your AI
              photos.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {/* DO */}
            <div className="rounded-2xl border border-tp-line bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-tp-ink">Do</h3>
              </div>
              <ul className="mt-6 space-y-4">
                {doList.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.text} className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                      <span className="text-sm leading-relaxed text-tp-muted">
                        {item.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* DON'T */}
            <div className="rounded-2xl border border-tp-line bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <X className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-tp-ink">
                  Don&apos;t
                </h3>
              </div>
              <ul className="mt-6 space-y-4">
                {dontList.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                    <span className="text-sm leading-relaxed text-tp-muted">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-normal italic text-tp-ink sm:text-4xl">
            Common Questions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-tp-muted">
            Everything you need to know about the process.
          </p>
          <div className="mt-12 divide-y divide-tp-line">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between text-left">
                  <span className="text-base font-medium text-tp-ink group-hover:text-tp-bronze-ink">
                    {faq.question}
                  </span>
                  <ChevronDown className="ml-4 h-5 w-5 shrink-0 text-tp-muted transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tp-black py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-normal italic text-white sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-tp-beige/60">
            Join thousands of happy customers who have transformed their photos
            with AI. Your new headshots are just a few selfies away.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard/upload">
              <Button
                size="lg"
                className="bg-tp-bronze text-tp-black hover:bg-tp-bronze/90"
              >
                Create Your Photos
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                variant="outline"
                size="lg"
                className="border-tp-beige/30 text-tp-beige hover:bg-white/10"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
