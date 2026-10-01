import type { Metadata } from 'next';
import Link from 'next/link';
import { Palette, Sparkles, Check, Upload, Users, Briefcase, GraduationCap, UserCheck, Eye, Sun, Heart, Layers } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';

const title = 'AI Makeup Editor — Natural Professional Makeup for Headshots | TailorPic';
const description =
  'See how TailorPic\'s AI adds natural-looking professional makeup to your headshots, with even skin, defined eyes and soft color that still looks like you.';
const path = '/editor/makeup-editor';

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
  name: 'AI Makeup Editor',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload a few selfies', body: 'Share 8–15 photos of your face. Bare-faced or made-up, both work as a starting point.' },
  { icon: Palette, title: 'Choose a makeup look', body: 'Pick from natural, polished or camera-ready styles that suit a professional setting.' },
  { icon: Check, title: 'Download your headshots', body: 'Get finished headshots with subtle, well-blended makeup that still looks like you.' },
];

const features = [
  { icon: Sparkles, title: 'Even, natural skin', body: 'Smooth tone that keeps real skin texture instead of a plastic finish.' },
  { icon: Eye, title: 'Defined eyes', body: 'Soft definition around eyes and brows that reads clearly on camera.' },
  { icon: Heart, title: 'Soft lip and cheek color', body: 'Muted tones that add warmth without looking heavy.' },
  { icon: Sun, title: 'Healthy glow', body: 'Balanced highlights that look fresh under studio-style lighting.' },
  { icon: Layers, title: 'Blended, realistic layers', body: 'Makeup sits on the face naturally, with no harsh edges or filter look.' },
  { icon: Palette, title: 'Tones for your complexion', body: 'Shades chosen to complement your skin tone and undertone.' },
];

const useCases = [
  { icon: Briefcase, title: 'Job seekers', body: 'Look rested and put-together in your profile photo, whatever your selfies looked like.' },
  { icon: UserCheck, title: 'Executives and founders', body: 'A polished, camera-ready look for bios, press and speaker pages.' },
  { icon: Users, title: 'Teams and companies', body: 'Give every team member a consistent, natural look on your company page.' },
  { icon: GraduationCap, title: 'Students and graduates', body: 'A refined LinkedIn photo without booking a makeup artist.' },
];

const faqs = [
  { q: 'Will the makeup look natural?', a: 'Yes. TailorPic favors subtle, professional looks that enhance your features rather than change them.' },
  { q: 'Can I skip makeup entirely?', a: 'Yes. You can keep a bare, natural look if you prefer. Makeup styling is optional.' },
  { q: 'Will I still look like myself?', a: 'Yes. Your facial structure and skin texture are preserved. Makeup is a light layer, not a new face.' },
  { q: 'Is this a standalone makeup editor?', a: 'No. This page describes how TailorPic\'s AI headshot service handles styling. You get finished headshots rather than a one-off editing tool.' },
];

export default function MakeupEditorPage() {
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
          { name: 'AI Makeup Editor', url: `${siteConfig.url}${path}` },
        ]}
      />
      <FAQSchema items={faqs} />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            AI Makeup Editor for Professional Headshots
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Tired skin and uneven tone show up fast on camera. TailorPic&apos;s AI adds natural-looking professional makeup, so your headshot looks fresh and polished without looking edited.
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
            Camera-ready without the makeup chair — get AI headshots
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
