import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  Camera,
  Check,
  Droplets,
  Heart,
  ShieldCheck,
  Smile,
  Sparkles,
  Sun,
  Upload,
  UserCheck,
} from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'AI Teeth Whitener — Perfect Smile Enhancement | TailorPic';
const description =
  'See how TailorPic\'s AI delivers natural teeth whitening and smile enhancement in professional headshots without an artificial look.';
const path = '/editor/teeth-whitener';

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
  name: 'AI Teeth Whitener',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload your selfies', body: 'Add photos where you smile so the AI learns your real expression.' },
  { icon: Smile, title: 'AI enhances your smile', body: 'Teeth tone and brightness are refined while keeping a natural shape.' },
  { icon: Check, title: 'Review and download', body: 'Choose the smile you like best and download your headshots.' },
];

const features = [
  { icon: Droplets, title: 'Natural whitening', body: 'Removes yellow tones while keeping realistic, slightly warm enamel.' },
  { icon: Sun, title: 'Even brightness', body: 'Consistent tone across all visible teeth without patchy spots.' },
  { icon: Smile, title: 'Friendly expression', body: 'Warm, relaxed smiles that feel genuine rather than forced.' },
  { icon: Sparkles, title: 'Subtle polish', body: 'Gentle clean-up that avoids the glowing, over-whitened look.' },
  { icon: Camera, title: 'Flattering lighting', body: 'Light that shows your smile without harsh reflections.' },
  { icon: ShieldCheck, title: 'Looks like you', body: 'Your real smile shape is kept so you stay recognizable.' },
];

const useCases = [
  { icon: Briefcase, title: 'Client-facing pros', body: 'Project warmth and approachability on profiles and proposals.' },
  { icon: UserCheck, title: 'Job seekers', body: 'Smile confidently in photos attached to applications.' },
  { icon: Building2, title: 'Healthcare and wellness', body: 'Show a friendly, trustworthy face on practice websites.' },
  { icon: Heart, title: 'Dating and social profiles', body: 'Put forward a bright, genuine smile in your best photo.' },
];

const faqs = [
  { q: 'Will my teeth look unnaturally white?', a: 'No. The AI aims for a natural shade that looks like a healthy, well-kept smile.' },
  { q: 'Does it change my smile shape?', a: 'No. Your real smile and likeness are preserved; the AI mainly refines tone and brightness.' },
  { q: 'Do I need to smile in my selfies?', a: 'It helps, but the AI can generate pleasant expressions from your overall photo set.' },
  { q: 'Is this a standalone whitening tool?', a: 'No. This page explains how our AI headshot service handles smiles. You upload selfies and receive finished headshots.' },
];

export default function TeethWhitenerPage() {
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
          { name: 'AI Teeth Whitener', url: `${siteConfig.url}${path}` },
        ]}
      />
      <FAQSchema items={faqs} />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            AI Teeth Whitener for a Perfect Smile
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            A confident smile makes a great first impression. TailorPic&apos;s AI brightens teeth naturally and polishes your smile in headshots without the harsh, fake-white look.
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
            Get AI headshots with a confident smile
          </h2>
          <p className="mt-3 text-tp-muted">
            Upload a few selfies and get professional headshots with a natural smile in hours, from $1.99.
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
