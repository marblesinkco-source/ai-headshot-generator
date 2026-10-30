import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Clock, Camera, Upload, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/config/categories';

export const revalidate = 3600;

const category = CATEGORIES['express-headshots'];
const pkg = category.packages[0];
const price = `$${(pkg.price / 100).toFixed(2)}`;

const PAGE_TITLE = 'Express AI Headshots in 15 Seconds | TailorPic';
const PAGE_DESC =
  `Upload 1 selfie, get 5 professional AI headshots in 15 seconds. No training, no waiting. ${price} one-time payment. The fastest way to get a professional headshot.`;

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESC,
  alternates: { canonical: '/express-headshots' },
  openGraph: generateOGMetadata({
    title: 'Express AI Headshots — 15 Seconds',
    description: PAGE_DESC,
    path: '/express-headshots',
  }),
  twitter: generateTwitterMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESC,
  }),
};

const STYLES = [
  { name: 'Business Formal', desc: 'Suit and tie, studio backdrop' },
  { name: 'Smart Casual', desc: 'Relaxed yet polished professional look' },
  { name: 'Creative Modern', desc: 'Contemporary style for creative fields' },
  { name: 'LinkedIn Ready', desc: 'Optimized for LinkedIn profiles' },
  { name: 'Executive', desc: 'Premium look for leadership pages' },
];

const STEPS = [
  {
    icon: Upload,
    title: 'Upload 1 Selfie',
    desc: 'Take or choose a clear, front-facing photo. That\'s all we need.',
  },
  {
    icon: Sparkles,
    title: 'AI Generates 5 Styles',
    desc: 'Our AI creates 5 professional headshots in different styles — in just 15 seconds.',
  },
  {
    icon: Camera,
    title: 'Download & Use',
    desc: 'Pick your favorites and use them on LinkedIn, resumes, company pages, and more.',
  },
];

const COMPARISONS = [
  { label: 'Photo Studio', time: '1–2 weeks', cost: '$150–$400', photos: '5–10', hassle: 'Booking, travel, wardrobe' },
  { label: 'Other AI Tools', time: '30–90 min', cost: '$20–$50', photos: '20–100', hassle: 'Upload 10–20 photos, wait for training' },
  { label: 'TailorPic Express', time: '15 seconds', cost: price, photos: '5 styles', hassle: 'Upload 1 selfie — done', highlight: true },
];

const V = '?v=5';

export default function ExpressHeadshotsPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Express Headshots', url: `${siteConfig.url}/express-headshots` },
      ]} />
      <Header />
      <main id="main-content" className="bg-white">

        {/* Hero */}
        <section className="relative overflow-hidden bg-tp-black pt-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(184,141,74,0.15),_transparent_70%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* Left: Copy */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm text-tp-bronze mb-6">
                  <Zap className="h-4 w-4" />
                  <span>New: Express Headshots</span>
                </div>
                <h1 className="font-display font-normal text-4xl tracking-tight text-tp-paper sm:text-5xl lg:text-6xl">
                  Professional Headshot
                  <br />
                  <span className="text-tp-bronze">in 15 Seconds</span>
                </h1>
                <p className="mt-5 max-w-lg text-lg text-tp-beige/80 leading-relaxed">
                  Upload a single selfie and get 5 studio-quality headshots in different professional styles —
                  no photo training, no waiting. Instant results powered by next-generation AI.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-tp-beige/60">
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-tp-bronze" /> 15-second delivery</span>
                  <span className="flex items-center gap-1.5"><Camera className="h-4 w-4 text-tp-bronze" /> Only 1 selfie needed</span>
                  <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-tp-bronze" /> 5 professional styles</span>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/auth/register?redirect=%2Fdashboard%2Finstant-preview"
                    className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'bg-tp-bronze text-tp-black hover:bg-tp-beige h-auto py-3.5 px-8 text-base')}
                  >
                    Get Express Headshots — {price}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <span className="text-sm text-tp-beige/50">One-time payment · No subscription</span>
                </div>
              </div>

              {/* Right: Gallery preview */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { src: `/brand/tailorpic/web/after-mert.jpg${V}`, label: 'Business Formal' },
                    { src: `/brand/tailorpic/web/after-ozan.jpg${V}`, label: 'Smart Casual' },
                    { src: `/brand/tailorpic/web/after-halil.jpg${V}`, label: 'Creative Modern' },
                    { src: `/brand/tailorpic/web/after-alpaslan.jpg${V}`, label: 'LinkedIn Ready' },
                  ].map((item, i) => (
                    <div key={item.label} className="relative overflow-hidden rounded-tp-card">
                      <div className="relative aspect-[3/4]">
                        <Image
                          src={item.src}
                          alt={`Express AI headshot — ${item.label} style (AI-generated concept image)`}
                          fill
                          className="object-cover object-[50%_25%]"
                          sizes="(min-width: 1024px) 220px, (min-width: 640px) 40vw, 45vw"
                          priority={i < 2}
                        />
                        <span className="absolute bottom-2 left-2 rounded-tp-button bg-tp-black/60 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-tp-paper">
                          {item.label}
                        </span>
                        <span className="absolute top-2 right-2 bg-tp-black/60 backdrop-blur-sm text-tp-paper/80 text-[9px] px-1.5 py-0.5 rounded-tp-button">
                          AI-generated concept
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Speed badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-tp-bronze px-5 py-2 text-sm font-semibold text-tp-black shadow-lg">
                  <Zap className="inline h-4 w-4 mr-1" />
                  All generated in 15 seconds
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
                How Express Headshots Work
              </h2>
              <p className="mt-3 text-tp-muted text-lg">Three steps. Fifteen seconds. Five professional headshots.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <div key={step.title} className="text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-tp-bronze/10">
                    <step.icon className="h-6 w-6 text-tp-bronze-ink" />
                  </div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-tp-bronze-ink">Step {i + 1}</div>
                  <h3 className="text-lg font-semibold text-tp-ink mb-2">{step.title}</h3>
                  <p className="text-sm text-tp-muted leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 Styles */}
        <section className="bg-tp-beige/30 py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
                5 Professional Styles, Instantly
              </h2>
              <p className="mt-3 text-tp-muted text-lg">Every Express Headshot order includes all five styles.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {STYLES.map((style) => (
                <div
                  key={style.name}
                  className="rounded-tp-card border border-tp-line bg-white p-5 text-center"
                >
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-tp-bronze/10">
                    <Camera className="h-5 w-5 text-tp-bronze-ink" />
                  </div>
                  <h3 className="font-semibold text-tp-ink text-sm mb-1">{style.name}</h3>
                  <p className="text-xs text-tp-muted">{style.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
                Why Express Headshots?
              </h2>
              <p className="mt-3 text-tp-muted text-lg">Compare the fastest way to get a professional headshot.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-tp-line">
                    <th className="py-3 px-4 text-left font-semibold text-tp-ink" />
                    <th className="py-3 px-4 text-left font-semibold text-tp-ink">Time</th>
                    <th className="py-3 px-4 text-left font-semibold text-tp-ink">Cost</th>
                    <th className="py-3 px-4 text-left font-semibold text-tp-ink">Photos</th>
                    <th className="py-3 px-4 text-left font-semibold text-tp-ink">Hassle</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISONS.map((row) => (
                    <tr
                      key={row.label}
                      className={cn(
                        'border-b border-tp-line',
                        row.highlight && 'bg-tp-bronze/5 font-medium'
                      )}
                    >
                      <td className="py-4 px-4 font-semibold text-tp-ink whitespace-nowrap">
                        {row.highlight && <Zap className="inline h-4 w-4 mr-1 text-tp-bronze-ink" />}
                        {row.label}
                      </td>
                      <td className={cn('py-4 px-4', row.highlight ? 'text-tp-bronze-ink font-semibold' : 'text-tp-muted')}>
                        {row.time}
                      </td>
                      <td className="py-4 px-4 text-tp-muted">{row.cost}</td>
                      <td className="py-4 px-4 text-tp-muted">{row.photos}</td>
                      <td className="py-4 px-4 text-tp-muted">{row.hassle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Video Placeholder Section */}
        <section className="bg-tp-black py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl mb-4">
              See It in Action
            </h2>
            <p className="text-tp-beige/70 text-lg mb-10 max-w-2xl mx-auto">
              Watch how Express Headshots transforms a single selfie into 5 professional headshots in just 15 seconds.
            </p>
            {/* Video placeholder — Murat will provide the actual promo video */}
            <div className="relative mx-auto max-w-2xl aspect-video rounded-tp-card overflow-hidden bg-tp-ink border border-tp-line">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-tp-bronze/20 border border-tp-bronze/40">
                  <svg className="h-7 w-7 text-tp-bronze ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-tp-beige/60 text-sm">Demo video coming soon</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing CTA */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
            <div className="rounded-tp-dialog border border-tp-line bg-white p-8 sm:p-10 text-center shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-tp-bronze/10 px-3 py-1 text-xs font-semibold text-tp-bronze-ink mb-4">
                <Zap className="h-3.5 w-3.5" />
                Express
              </div>
              <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">{price}</h2>
              <p className="mt-1 text-sm text-tp-muted">One-time payment · No subscription</p>

              <ul className="mt-6 space-y-3 text-left">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-tp-ink">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-tp-bronze-ink" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/register?redirect=%2Fdashboard%2Finstant-preview"
                className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-8 w-full bg-tp-bronze text-tp-black hover:bg-tp-beige h-auto py-3.5 text-base')}
              >
                Get Express Headshots
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <p className="mt-3 text-xs text-tp-muted">
                Secure checkout via Paddle · Instant delivery
              </p>
            </div>

            {/* Upsell */}
            <div className="mt-6 rounded-tp-card border border-tp-line bg-tp-beige/20 p-5 text-center">
              <p className="text-sm text-tp-muted">
                Need more photos or styles?{' '}
                <Link href="/headshots" className="text-tp-bronze-ink font-medium hover:underline">
                  See all headshot packages →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-tp-beige/30 py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl mb-10">
              Frequently Asked Questions
            </h2>
            <div className="divide-y divide-tp-line rounded-tp-card border border-tp-line bg-white">
              {[
                {
                  q: 'How is Express different from regular headshots?',
                  a: 'Express Headshots use a next-generation AI model that works from a single selfie with no training step. Regular headshots require 4–10 photos and take longer to process, but offer more output photos and customization.',
                },
                {
                  q: 'How many photos do I need to upload?',
                  a: 'Just one. A single clear, front-facing selfie is all the Express AI needs.',
                },
                {
                  q: 'How long does it really take?',
                  a: 'About 15 seconds from upload to results. The AI generates all 5 style variations in parallel.',
                },
                {
                  q: 'What styles are included?',
                  a: 'Every Express order includes 5 styles: Business Formal, Smart Casual, Creative Modern, LinkedIn Ready, and Executive.',
                },
                {
                  q: 'Is it really just $19.90?',
                  a: `Yes — ${price} is a one-time payment. No subscription, no hidden fees. You get all 5 headshots instantly.`,
                },
                {
                  q: 'Can I use these on LinkedIn?',
                  a: 'Absolutely. The LinkedIn Ready style is specifically optimized for LinkedIn profile dimensions and professional appearance.',
                },
              ].map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-tp-ink">
                    {f.q}
                    <span className="text-tp-bronze-ink transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-tp-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-4 pb-20 pt-6 sm:px-6">
          <div className="mx-auto max-w-3xl rounded-tp-dialog bg-tp-ink px-6 py-12 text-center sm:px-10">
            <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">
              Ready in 15 seconds
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-tp-beige sm:text-base">
              Upload one selfie. Get 5 professional headshots. No training, no waiting.
            </p>
            <Link
              href="/auth/register?redirect=%2Fdashboard%2Finstant-preview"
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-7 h-auto min-h-11 max-w-full whitespace-normal py-3 text-center bg-tp-bronze text-tp-black hover:bg-tp-beige')}
            >
              Get Express Headshots — {price} →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
