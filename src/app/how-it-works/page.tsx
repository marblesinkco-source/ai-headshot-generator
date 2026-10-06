import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BeforeAfterIllustration } from '@/components/marketing/illustrations';
import { HowToSchema, BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const StickyCTA = dynamic(() => import('@/components/marketing/sticky-cta').then(m => ({ default: m.StickyCTA })), { ssr: false });

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
  BadgeCheck,
  Timer,
  LayoutGrid,
  ArrowRight,
  Smartphone,
  ImageIcon,
  Layers,
  MonitorUp,
  Lightbulb,
  Glasses,
} from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'How TailorPic Works: Upload Selfies, Get AI Headshots' },
  description: 'Learn how TailorPic creates professional AI photos in 3 steps: upload selfies, let our AI train on your features, and download high-resolution photos from a single upload.',
  alternates: { canonical: '/how-it-works' },
  openGraph: generateOGMetadata({ title: `How It Works | ${siteConfig.name}`, description: 
      'Upload your selfies, our AI trains a custom model on your features, and you get professional photos in about 2 hours.', path: '/how-it-works' }),
  twitter: generateTwitterMetadata({ title: `How It Works | ${siteConfig.name}`, description: 
      'Upload selfies, let our AI train on your features, and download professional photos in about 2 hours.' }),
};

const steps = [
  {
    number: 1,
    icon: Upload,
    title: 'Upload Your Selfies',
    description:
      'Start by uploading 4 to 10 casual selfies of yourself. These can be taken with your phone — no professional photos needed. Our AI uses these images to learn your unique facial features, skin tone, hair, and overall appearance from multiple perspectives.',
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
      'Once you upload your selfies, our AI trains a custom model specifically on your features. This is not a generic filter or a face swap — it is a personalized AI model that understands what makes you look like you. It then generates professional photos (from 1 to 160, depending on your package) across your chosen styles, from corporate headshots to creative portraits.',
    tips: [
      'Training and generation take about 2 hours for most orders',
      'Every package includes HD resolution',
      'You can choose from 12 style categories',
      'The AI preserves your natural features while enhancing lighting and composition',
      'Every result is unique — no templates or stock overlays',
    ],
  },
  {
    number: 3,
    icon: Download,
    title: 'Download & Use',
    description:
      'Browse your complete gallery of AI-generated photos once they are ready. Favorite the ones you love most, then download them in high resolution (4K on the Executive package). Your photos come with full commercial rights — use them anywhere you need a professional image.',
    tips: [
      'Download individual photos or your entire gallery at once',
      'High-resolution downloads on every package, 4K on Executive',
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
      'Get up to 160 professional photos across a range of styles in a single session — headshots, creative, casual, and more.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Your photos are ready in about 2 hours, not days. No scheduling, no commute, no waiting for a photographer.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy First',
    description:
      'Your uploads are used only to create your photos and are automatically deleted within 30 days.',
  },
];

const whyChooseUs = [
  {
    icon: BadgeCheck,
    title: 'No Subscription Required',
    description:
      'Pay once for your package. There are no recurring charges and nothing to cancel.',
  },
  {
    icon: Timer,
    title: 'Fast Turnaround',
    description:
      'Most orders are ready in about 2 hours, with an email when they are done.',
  },
  {
    icon: LayoutGrid,
    title: 'Variety From One Upload',
    description:
      'Get a variety of looks from a single upload, from corporate to casual.',
  },
  {
    icon: ShieldCheck,
    title: 'Satisfaction Guarantee',
    description:
      'Not happy with your headshots? We will work with you until you are.',
  },
];

const timeline = [
  { icon: Upload, label: 'Upload', time: 'A few minutes', note: 'Add your selfies and pick your styles' },
  { icon: Sparkles, label: 'AI Processing', time: 'About 2 hours', note: 'We train your model and generate your photos' },
  { icon: Download, label: 'Download', time: 'Instant', note: 'Browse your gallery and save your favorites' },
];

const youNeed = [
  { icon: Smartphone, title: 'Selfies from your phone', description: 'Casual shots are fine. Upload 4 to 10 photos with a variety of angles and expressions for the best results.' },
  { icon: Sun, title: 'Good lighting', description: 'Face a window or shoot outdoors in soft daylight so your features are even and clear.' },
  { icon: ImageIcon, title: 'A simple background', description: 'A plain, uncluttered wall works best, and changing it between shots helps the AI focus on you.' },
  { icon: Eye, title: 'A clear view of your face', description: 'No sunglasses, hats or heavy filters. Include a few different angles and expressions.' },
];

const youGet = [
  { icon: LayoutGrid, title: 'Up to 160 photos', description: 'A full set of professional photos generated from one upload.' },
  { icon: Layers, title: 'Multiple styles', description: 'Choose from 12 style categories, from corporate headshots to creative portraits.' },
  { icon: MonitorUp, title: 'High-resolution files', description: 'HD downloads on every package, 4K on Executive.' },
  { icon: BadgeCheck, title: 'Commercial rights', description: 'Use your photos on LinkedIn, your website, business cards and more.' },
];

const bestResultsTips = [
  { icon: Sun, title: 'Shoot in soft daylight', description: 'Stand facing a window. Avoid harsh overhead light and strong shadows across your face.' },
  { icon: RotateCcw, title: 'Mix up angles and expressions', description: 'Include front-on and slightly turned shots, with a smile and a neutral look.' },
  { icon: Glasses, title: 'Keep your face unobstructed', description: 'Skip sunglasses, hats and anything covering your features. Regular glasses are fine if you usually wear them.' },
  { icon: Camera, title: 'Use recent photos', description: 'Pick selfies that look like you today so your results match how you look now.' },
  { icon: Smartphone, title: 'Hold the camera at eye level', description: 'It keeps proportions natural and avoids distortion from extreme up or down angles.' },
  { icon: Lightbulb, title: 'Skip filters and beauty modes', description: 'Unedited photos give the AI the most accurate information about your real features.' },
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
      'Upload 4 to 10 clear selfies. More variety in angles, lighting and expression helps our AI learn your features more accurately, so use the full 10 if you have good shots.',
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
      'If you are not satisfied with your photos, contact our support team and we will work with you to make it right.',
  },
  {
    question: 'What do I need to get started?',
    answer:
      'Just a phone and a handful of casual selfies taken in good lighting. No professional equipment, photographer or studio is needed.',
  },
  {
    question: 'What resolution are the photos?',
    answer:
      'Every package includes HD resolution. The Executive package delivers 4K, suited to print and large displays.',
  },
];

export default function HowItWorksPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'How TailorPic Works: Upload Selfies, Get AI Headshots', url: `${siteConfig.url}/how-it-works` },
      ]} />
      <Header />
      <HowToSchema />
      <FAQSchema items={faqs} />

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
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
              className={cn(buttonVariants({ size: 'lg' }), 'bg-tp-bronze text-tp-black hover:bg-tp-bronze/90')}
            >
              Get Started
            </Link>
          </div>
          <p className="mt-5 text-center text-sm text-tp-beige/50">
            From {BASE_PRICE_DISPLAY} &middot; One-time payment &middot; No subscription
          </p>
        </div>
      </section>

      {/* Time estimate */}
      <section className="border-b border-tp-line bg-tp-paper py-12 sm:py-16" aria-labelledby="timeline-heading">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="timeline-heading" className="text-center font-display text-2xl font-normal italic text-tp-ink sm:text-3xl">
            From selfies to photos in about 2 hours
          </h2>
          <ol className="mt-8 flex flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-3">
            {timeline.map((t, i) => {
              const Icon = t.icon;
              return (
                <li key={t.label} className="flex flex-1 flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-3">
                  <div className="flex-1 rounded-tp-card border border-tp-line bg-white p-5 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-beige">
                      <Icon className="h-6 w-6 text-tp-bronze-ink" aria-hidden="true" />
                    </div>
                    <p className="mt-3 text-base font-semibold text-tp-ink">{t.label}</p>
                    <p className="mt-1 font-display font-normal text-2xl italic text-tp-bronze-ink">{t.time}</p>
                    <p className="mt-1 text-sm text-tp-muted">{t.note}</p>
                  </div>
                  {i < timeline.length - 1 && (
                    <ArrowRight className="mx-auto hidden h-5 w-5 shrink-0 text-tp-bronze md:block" aria-hidden="true" />
                  )}
                </li>
              );
            })}
          </ol>
          <p className="mt-6 text-center text-xs text-tp-muted">
            Times are approximate. We email you as soon as your photos are ready.
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
                  className="relative overflow-hidden rounded-tp-dialog border border-tp-line bg-white p-6 shadow-sm sm:p-10"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-6 select-none font-display font-normal text-[10rem] italic leading-none text-tp-beige sm:text-[14rem]"
                  >
                    {step.number}
                  </span>
                  <div className="relative flex flex-col gap-6 sm:flex-row sm:gap-10">
                    <div className="flex shrink-0 items-center gap-4 sm:flex-col">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-tp-black font-display font-normal text-4xl italic text-tp-bronze sm:h-24 sm:w-24 sm:text-5xl">
                        {step.number}
                      </div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-tp-card bg-tp-paper sm:h-16 sm:w-16">
                        <Icon className="h-7 w-7 text-tp-bronze-ink sm:h-8 sm:w-8" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">
                        Step {step.number}
                      </p>
                      <h2 className="mt-1 font-display text-3xl font-normal italic text-tp-ink sm:text-4xl">
                        {step.title}
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-tp-muted sm:text-lg">
                        {step.description}
                      </p>
                      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                        {step.tips.map((tip) => (
                          <li
                            key={tip}
                            className="flex items-start gap-3 rounded-tp-button bg-tp-paper p-3 text-sm text-tp-muted"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                      {step.number === 1 && (
                        <p className="mt-4 text-sm text-tp-muted">
                          Need help choosing the right selfies? Check our <Link href="/photo-tips" className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-ink">photo tips guide</Link>.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="bg-tp-black py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-paper">
            Ready to see the difference?
          </h2>
          <p className="mt-3 text-base text-tp-beige">
            Upload a few selfies and get your photos in ~2 hours.
          </p>
          <Link
            href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
            className="mt-8 inline-flex items-center justify-center rounded-tp-button bg-tp-paper px-8 py-3.5 text-base font-semibold text-tp-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-tp-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze"
          >
            Get Started — {BASE_PRICE_DISPLAY}
          </Link>
          <p className="mt-4 text-sm text-tp-beige">
            One-time payment · No subscription
          </p>
        </div>
      </section>

      {/* Before → After visual */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 text-center">
          <BeforeAfterIllustration className="w-full h-auto" />
          <p className="mt-4 text-sm text-tp-muted">
            From a casual selfie to a polished, studio-quality headshot — powered by AI.
          </p>
        </div>
      </section>

      {/* What you'll need */}
      <section className="bg-tp-paper py-20 sm:py-28" aria-labelledby="need-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 id="need-heading" className="font-display text-3xl font-normal italic text-tp-ink sm:text-4xl">
              What You&apos;ll Need
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-tp-muted">
              No studio, no photographer. Just your phone and a few minutes.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {youNeed.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-beige">
                    <Icon className="h-6 w-6 text-tp-bronze-ink" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What you'll get */}
      <section className="bg-tp-black py-20 sm:py-28" aria-labelledby="get-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 id="get-heading" className="font-display text-3xl font-normal italic text-tp-bronze sm:text-4xl">
              What You&apos;ll Get
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-tp-beige/60">
              One upload, a full gallery of photos that look like you.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {youGet.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-tp-card border border-white/10 bg-white/5 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-bronze/10">
                    <Icon className="h-6 w-6 text-tp-bronze" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-beige/60">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-tp-paper py-20 sm:py-28" aria-labelledby="why-choose-us-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              id="why-choose-us-heading"
              className="font-display text-3xl font-normal italic text-tp-ink sm:text-4xl"
            >
              Why Choose Us
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-tp-muted">
              Simple terms and no surprises.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-tp-card border border-tp-line bg-white p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-beige">
                    <Icon className="h-6 w-6 text-tp-bronze-ink" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {item.description}
                  </p>
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
              TailorPic is not just another photo filter. Here is what sets
              our approach apart.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-tp-card border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-bronze/10">
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

      {/* Tips for best results */}
      <section className="py-20 sm:py-28" aria-labelledby="tips-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 id="tips-heading" className="font-display text-3xl font-normal italic text-tp-ink sm:text-4xl">
              Tips for Best Results
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-tp-muted">
              Better input photos lead to a better likeness. Keep these in mind when you shoot.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bestResultsTips.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4 rounded-tp-card border border-tp-line bg-white p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tp-button bg-tp-beige">
                    <Icon className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-tp-ink">
                      <span className="mr-1.5 text-tp-bronze-ink">{i + 1}.</span>
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-tp-muted">{item.description}</p>
                  </div>
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
            <div className="rounded-tp-card border border-tp-line bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tp-bronze/15">
                  <Check className="h-5 w-5 text-tp-bronze-ink" />
                </div>
                <h3 className="text-xl font-semibold text-tp-ink">Do</h3>
              </div>
              <ul className="mt-6 space-y-4">
                {doList.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.text} className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-tp-bronze-ink" />
                      <span className="text-sm leading-relaxed text-tp-muted">
                        {item.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* DON'T */}
            <div className="rounded-tp-card border border-tp-line bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tp-muted/10">
                  <X className="h-5 w-5 text-tp-muted" />
                </div>
                <h3 className="text-xl font-semibold text-tp-ink">
                  Don&apos;t
                </h3>
              </div>
              <ul className="mt-6 space-y-4">
                {dontList.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-tp-muted" />
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
            Transform your photos with studio-quality AI headshots. Your new headshots are just a few selfies away.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
              className={cn(buttonVariants({ size: 'lg' }), 'bg-tp-bronze text-tp-black hover:bg-tp-bronze/90')}
            >
              Create Your Photos
            </Link>
            <Link
              href="/pricing"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'border-tp-beige/30 text-tp-beige hover:bg-white/10')}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <StickyCTA href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" />
      <Footer />
    </main>
  );
}
