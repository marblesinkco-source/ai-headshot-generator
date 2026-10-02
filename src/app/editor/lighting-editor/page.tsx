import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  Camera,
  Check,
  Contrast,
  Lightbulb,
  ShieldCheck,
  Sun,
  SunMedium,
  Upload,
  UserCheck,
  Users,
} from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'AI Lighting Editor — Perfect Portrait Lighting | TailorPic';
const description =
  'See how TailorPic\'s AI fixes harsh shadows, dim rooms and uneven light to deliver headshots with soft, flattering portrait lighting.';
const path = '/editor/lighting-editor';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path: path, type: 'default' }),
  twitter: generateTwitterMetadata({ title, description, type: 'default' }),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI Lighting Editor',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload your selfies', body: 'Add photos taken in any room, even ones with window glare or dim lamps.' },
  { icon: Sun, title: 'AI rebalances the light', body: 'Shadows, highlights and skin tone are generated with professional portrait lighting.' },
  { icon: Check, title: 'Pick your favorites', body: 'Review the results and download headshots ready for any profile.' },
];

const features = [
  { icon: Sun, title: 'Softer shadows', body: 'Removes harsh shadows under the eyes, nose and chin for an even, flattering look.' },
  { icon: SunMedium, title: 'Balanced brightness', body: 'Fixes underexposed and blown-out faces so every headshot is evenly lit.' },
  { icon: Contrast, title: 'Gentle contrast', body: 'Adds natural depth and dimension without a flat or over-processed finish.' },
  { icon: Lightbulb, title: 'Neutral color cast', body: 'Corrects orange indoor bulbs and blue screen light to accurate skin tones.' },
  { icon: Camera, title: 'Studio-style direction', body: 'Key-light placement similar to a professional portrait session.' },
  { icon: ShieldCheck, title: 'Looks like you', body: 'Lighting changes never alter your facial features or likeness.' },
];

const useCases = [
  { icon: Briefcase, title: 'LinkedIn users', body: 'Turn a dim, yellow selfie into a bright, professional profile photo.' },
  { icon: UserCheck, title: 'Job seekers', body: 'Look polished and confident on applications and portfolios.' },
  { icon: Building2, title: 'Small business owners', body: 'Get consistent, well-lit portraits for your website and marketing.' },
  { icon: Users, title: 'Remote teams', body: 'Match lighting across team photos taken in different homes and offices.' },
];

const faqs = [
  { q: 'Can it fix photos with strong shadows?', a: 'Yes. The AI learns your features from your whole photo set and generates headshots with even, flattering light rather than copying the shadows.' },
  { q: 'Will the lighting look natural?', a: 'Yes. The goal is soft, realistic portrait light that looks like a real studio session, not a filter.' },
  { q: 'Do I need good lighting in my selfies?', a: 'No. Better photos help, but the AI does not depend on any single image, so imperfect lighting is fine.' },
  { q: 'Is this a standalone lighting tool?', a: 'No. This page explains how our AI headshot service handles lighting. You upload selfies and receive finished headshots.' },
];

export default function LightingEditorPage() {
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
          { name: 'AI Lighting Editor', url: `${siteConfig.url}${path}` },
        ]}
      />
      <FAQSchema items={faqs} />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            AI Lighting Editor for Perfect Portrait Lighting
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Bad lighting ruins good photos. TailorPic&apos;s AI replaces harsh shadows, yellow indoor bulbs and overexposed faces with soft, studio-style light in your headshots.
          </p>
          <Link href="/auth/register?redirect=/headshots" className={buttonVariants({ size: 'lg', className: 'mt-8' })}>
            Try TailorPic AI Headshots
          </Link>
        </div>
      </section>

      <section className="border-t border-tp-line bg-tp-paper">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-display font-normal text-tp-ink sm:text-3xl">How it works</h2>
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
        <h2 className="text-center text-2xl font-display font-normal text-tp-ink sm:text-3xl">What the AI handles for you</h2>
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
          <h2 className="text-center text-2xl font-display font-normal text-tp-ink sm:text-3xl">Who it&apos;s for</h2>
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
        <h2 className="text-center text-2xl font-display font-normal text-tp-ink sm:text-3xl">Frequently asked questions</h2>
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
          <h2 className="text-2xl font-display font-normal text-tp-ink sm:text-3xl">
            Skip the lighting setup — get AI headshots
          </h2>
          <p className="mt-3 text-tp-muted">
            Upload a few selfies and get professionally lit headshots in hours, from $1.99.
          </p>
          <Link href="/auth/register?redirect=/headshots" className={buttonVariants({ size: 'lg', className: 'mt-6' })}>
            Get AI Headshots
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
