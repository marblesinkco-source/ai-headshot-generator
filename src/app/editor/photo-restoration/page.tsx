import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Check, Droplets, Eraser, GraduationCap, History, Image as ImageIcon, Palette, ScanFace, Sparkles, Sun, Upload, UserCheck } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'AI Photo Restoration: Fix Old & Damaged Photos | TailorPic';
const description =
  'Old, scratched or faded photos? See how TailorPic\'s AI uses them as reference to create fresh, high-quality professional headshots of you.';
const path = '/editor/photo-restoration';

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
  name: 'AI Photo Restoration',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload your photos', body: 'Share 8–15 photos, including older, scanned or faded ones alongside recent selfies.' },
  { icon: Sparkles, title: 'AI renews your look', body: 'Our AI learns your features and generates clean new headshots with modern color, detail and lighting.' },
  { icon: Check, title: 'Download fresh headshots', body: 'Get high-quality portraits ready for LinkedIn, résumés and company pages.' },
];

const features = [
  { icon: Eraser, title: 'No scratches or creases', body: 'Marks, folds and dust on scanned prints do not carry into your new headshots.' },
  { icon: Palette, title: 'Vivid, balanced color', body: 'Faded and yellowed tones become natural, true-to-life color.' },
  { icon: ScanFace, title: 'Restored facial detail', body: 'Eyes, skin and hair come out clearly defined instead of soft and grainy.' },
  { icon: Sun, title: 'Even, modern lighting', body: 'Harsh flash and uneven exposure are replaced by flattering, studio-style light.' },
  { icon: Droplets, title: 'Clean, low noise', body: 'Film grain and compression artifacts are replaced with smooth, sharp results.' },
  { icon: History, title: 'Your likeness, updated', body: 'Results reflect how you look across your photos, for a consistent and accurate portrait.' },
];

const useCases = [
  { icon: Briefcase, title: 'Professionals with dated photos', body: 'Replace an old profile picture with a current, high-quality headshot.' },
  { icon: ImageIcon, title: 'People with only scanned prints', body: 'Use older scans as reference and still end up with a modern result.' },
  { icon: UserCheck, title: 'Authors and speakers', body: 'Get a polished portrait for book jackets, bios and event pages.' },
  { icon: GraduationCap, title: 'Families and alumni', body: 'Create a clean, current portrait for reunions, directories and announcements.' },
];

const faqs = [
  { q: 'Can it restore a single old photo?', a: 'Not exactly. TailorPic generates new headshots from several photos of you, rather than repairing one image pixel by pixel.' },
  { q: 'Can I upload scanned or damaged photos?', a: 'You can include them as extra references, but clear, recent selfies give the best results. Heavily damaged faces are hard to use.' },
  { q: 'Will the result look like me today?', a: 'The AI reflects the photos you provide, so include recent ones if you want your headshot to show how you look now.' },
  { q: 'Is this a standalone restoration tool?', a: 'No. This page describes how TailorPic\'s AI headshot service handles older photos. You get finished headshots rather than a one-off editing tool.' },
];

export default function PhotoRestorationPage() {
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
          { name: 'AI Photo Restoration', url: `${siteConfig.url}${path}` },
        ]}
      />
      <FAQSchema items={faqs} />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            AI Photo Restoration — Restore Old &amp; Damaged Photos
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Faded colors, scratches and grain make old photos unusable. TailorPic&apos;s AI learns from them and generates fresh, high-quality professional headshots with clean detail and natural color.
          </p>
          <Link href="/auth/register" className={buttonVariants({ size: 'lg', className: 'mt-8' })}>
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
            Give old photos a fresh start — get AI headshots
          </h2>
          <p className="mt-3 text-tp-muted">
            Upload a few photos and get studio-quality professional headshots in hours, from $9.90.
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
