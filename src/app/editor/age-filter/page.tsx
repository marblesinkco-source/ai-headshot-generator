import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Sparkles, Check, Upload, Users, Briefcase, UserCheck, GraduationCap, ScanFace, Sun, Layers, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';

const title = 'AI Age Filter — Refreshed, Youthful Headshots | TailorPic';
const description =
  'See how TailorPic\'s AI applies a subtle age adjustment for a refreshed, youthful look in professional headshots, without losing what makes you recognizable.';
const path = '/editor/age-filter';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}${path}`,
    siteName: siteConfig.name,
    type: 'website',
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    images: [siteConfig.ogImage],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI Age Filter',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload a few selfies', body: 'Share 8–15 recent, clear photos of your face so the AI learns how you look today.' },
  { icon: Clock, title: 'Choose a subtle refresh', body: 'Pick a light touch that reduces tiredness and harsh lines, rather than a dramatic change.' },
  { icon: Check, title: 'Download your headshots', body: 'Get headshots with a fresh, well-rested look that still reads as you.' },
];

const features = [
  { icon: Clock, title: 'Subtle age adjustment', body: 'A gentle refresh that takes the edge off fatigue, not a swing to a different age.' },
  { icon: ScanFace, title: 'Identity preserved', body: 'Bone structure, eye shape and key features stay yours, so people recognize you in person.' },
  { icon: Sun, title: 'Rested, bright look', body: 'Under-eye shadows and dull tone are softened for a healthy, energized appearance.' },
  { icon: Sparkles, title: 'Natural-looking results', body: 'Changes are generated with your face and lighting, avoiding an over-filtered look.' },
  { icon: Layers, title: 'Adjustable intensity', body: 'Choose how much refreshing you want and compare options from the same session.' },
  { icon: ShieldCheck, title: 'Honest representation', body: 'Results stay close to reality, so your photo still matches the person who walks into the room.' },
];

const useCases = [
  { icon: Briefcase, title: 'Job seekers', body: 'Look energized and current in your LinkedIn photo after a long search.' },
  { icon: UserCheck, title: 'Professionals and founders', body: 'Present a vibrant, credible image on bios, speaker pages and press kits.' },
  { icon: Users, title: 'Teams and companies', body: 'Give every team member a fresh, consistent look on the company site.' },
  { icon: GraduationCap, title: 'Career changers and returners', body: 'Update an outdated photo with a modern headshot that feels like you now.' },
];

const faqs = [
  { q: 'Can AI make me look younger in a headshot?', a: 'TailorPic can apply a subtle refresh that softens fatigue and harsh lines. It is meant to look like a well-rested version of you, not a different age.' },
  { q: 'Will I still look like myself?', a: 'Yes. Your facial structure and distinctive features come from your own photos, so the result stays recognizable.' },
  { q: 'Is it honest to use an age filter for professional photos?', a: 'We recommend a light touch so you still look like your photo when you meet someone. Headshots that closely match reality build trust.' },
  { q: 'Is this a standalone age filter?', a: 'No. This page describes how TailorPic\'s AI headshot service handles subtle age refinement. You get finished headshots rather than a one-off editing tool.' },
];

export default function AgeFilterPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'AI Photo Editor', url: `${siteConfig.url}/editor` },
          { name: 'AI Age Filter', url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            AI Age Filter for a Refreshed, Youthful Look
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Tired eyes and harsh lighting can add years. TailorPic&apos;s AI applies a subtle age adjustment so your professional headshot looks fresh, energized and still unmistakably you.
          </p>
          <Link href="/auth/register" className={buttonVariants({ size: 'lg', className: 'mt-8' })}>
            Try TailorPic AI Headshots
          </Link>
        </div>
      </section>

      <section className="border-t border-tp-line bg-tp-paper">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-tp-ink sm:text-3xl">How it works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-beige text-tp-bronze-ink">
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-tp-bronze-ink">Step {i + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-tp-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-tp-ink sm:text-3xl">What the AI handles for you</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-tp-card border border-tp-line bg-white p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-beige text-tp-bronze-ink">
                <f.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-tp-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-tp-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-tp-line bg-tp-paper">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-tp-ink sm:text-3xl">Who it&apos;s for</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u) => (
              <div key={u.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <u.icon className="h-6 w-6 text-tp-bronze-ink" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold text-tp-ink">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-tp-ink sm:text-3xl">Frequently asked questions</h2>
        <div className="mt-8 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-tp-card border border-tp-line bg-white p-5">
              <summary className="cursor-pointer font-semibold text-tp-ink">{f.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-tp-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-tp-line bg-tp-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-tp-ink sm:text-3xl">
            A fresher you, still you — get AI headshots
          </h2>
          <p className="mt-3 text-tp-muted">
            Upload a few selfies and get studio-quality professional headshots in hours, from $9.90.
          </p>
          <Link href="/auth/register" className={buttonVariants({ size: 'lg', className: 'mt-6' })}>
            Get AI Headshots
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
