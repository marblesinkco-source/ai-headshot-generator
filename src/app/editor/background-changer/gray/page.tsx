import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Building2, Check, Contrast, Layers, Palette, Sparkles, Sun, Upload, UserCheck, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';

const title = 'Gray Background Headshots — Classic & Versatile | TailorPic';
const description =
  'Get AI headshots on a neutral gray background, the classic studio backdrop that works for nearly every profession, platform and skin tone.';
const path = '/editor/background-changer/gray';

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
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Gray Background Headshots',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload a few selfies', body: 'Share 8–15 photos in different lighting and angles. The backgrounds in your originals do not matter.' },
  { icon: Sparkles, title: 'AI builds your headshots', body: 'Our AI learns your features and generates new headshots against the gray background you choose.' },
  { icon: Check, title: 'Pick your favorites', body: 'Download the headshots that suit your profile, résumé or company page.' },
];

const features = [
  { icon: Contrast, title: 'Flattering for most skin tones', body: 'A neutral tone that does not compete with your complexion or clothing.' },
  { icon: Palette, title: 'Light to charcoal shades', body: 'Choose a soft light gray for a bright feel or a deeper charcoal for a dramatic look.' },
  { icon: Layers, title: 'Natural separation', body: 'Subtle gradients add depth and lift you off the background.' },
  { icon: Sun, title: 'Studio-style lighting', body: 'Soft, directional light modeled on a real portrait studio setup.' },
  { icon: Briefcase, title: 'Works in any industry', body: 'Understated enough for law and finance, clean enough for tech and creative roles.' },
  { icon: Users, title: 'Easy to keep consistent', body: 'A timeless backdrop that keeps team photos matching as people join.' },
];

const useCases = [
  { icon: Briefcase, title: 'Professionals in any field', body: 'One safe, polished choice when you are unsure which background to pick.' },
  { icon: Building2, title: 'Team and leadership pages', body: 'A neutral look that ages well as your brand evolves.' },
  { icon: UserCheck, title: 'Freelancers and consultants', body: 'Look established across your website, proposals and social profiles.' },
  { icon: Sparkles, title: 'Creatives and actors', body: 'A simple studio backdrop for portfolios and casting profiles.' },
];

const faqs = [
  { q: 'Why is gray considered so versatile?', a: 'It is neutral, so it does not clash with clothing, brand colors or skin tones, and it suits formal and casual contexts alike.' },
  { q: 'Light gray or dark gray?', a: 'Light gray feels open and modern. Darker gray feels more serious and dramatic. If you are unsure, a mid-tone gray is a safe choice.' },
  { q: 'Will gray look dull?', a: 'Not when done well. Soft gradients and good lighting give a polished, dimensional result instead of a flat look.' },
  { q: 'Can I try more than one background?', a: 'Yes. You can pick from different professional styles when you set up your headshots.' },
];

export default function GrayBackgroundPage() {
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
          { name: 'AI Background Changer', url: `${siteConfig.url}/editor/background-changer` },
          { name: 'Gray Background Headshots', url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Gray background</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-tp-ink sm:text-5xl">
            Gray Background Headshots — Classic & Versatile
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Neutral gray is the classic studio backdrop for a reason. It flatters nearly every skin tone and outfit and fits almost any industry. TailorPic&apos;s AI generates your headshot against a refined gray background.
          </p>
          <Link href="/auth/register" className={buttonVariants({ size: 'lg', className: 'mt-8' })}>
            Try TailorPic AI Headshots
          </Link>
          <p className="mt-4 text-sm text-tp-muted">
            <Link href="/editor/background-changer" className="font-medium text-tp-bronze-ink underline underline-offset-4">
              See all background options
            </Link>
          </p>
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
        <h2 className="text-center text-2xl font-bold text-tp-ink sm:text-3xl">What you get</h2>
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
            Get your gray background headshot
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
