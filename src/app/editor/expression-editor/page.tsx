import type { Metadata } from 'next';
import Link from 'next/link';
import { Smile, Sparkles, Check, Upload, Users, Briefcase, UserCheck, GraduationCap, Camera, Heart, Sun, Layers } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';

const title = 'AI Expression Editor — Adjust Smile for Headshots | TailorPic';
const description =
  'See how TailorPic\'s AI adjusts smile intensity and facial expression so your professional headshot looks warm, confident and approachable.';
const path = '/editor/expression-editor';

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
  name: 'AI Expression Editor',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload a few selfies', body: 'Share 8–15 photos showing your natural expressions, from neutral to a relaxed smile.' },
  { icon: Smile, title: 'Choose your expression', body: 'Pick a soft smile, a warm grin or a calm, serious look for your finished headshots.' },
  { icon: Check, title: 'Download your headshots', body: 'Get headshots with an approachable, natural expression, ready for LinkedIn and company pages.' },
];

const features = [
  { icon: Smile, title: 'Smile intensity', body: 'Dial from a subtle closed-mouth smile to a warm, open one that suits your industry.' },
  { icon: Heart, title: 'Approachable warmth', body: 'Small changes around the eyes and cheeks make you look friendly, not forced.' },
  { icon: Camera, title: 'Eye engagement', body: 'A genuine-looking smile reaches the eyes, avoiding the stiff look of a posed grin.' },
  { icon: Sparkles, title: 'Natural-looking results', body: 'Expression changes are built from your own face, so nothing looks warped or artificial.' },
  { icon: Sun, title: 'Relaxed, confident look', body: 'Tension in the jaw and brow is softened for a calm, assured appearance.' },
  { icon: Layers, title: 'Expression variety', body: 'Get several expression options from a single set of selfies and choose your favorite.' },
];

const useCases = [
  { icon: Briefcase, title: 'Job seekers', body: 'Look friendly and capable in the photo recruiters see first.' },
  { icon: UserCheck, title: 'Professionals and founders', body: 'Choose the right level of warmth for your bio, speaker page or press kit.' },
  { icon: Users, title: 'Teams and companies', body: 'Keep expressions consistent and welcoming across a team page.' },
  { icon: GraduationCap, title: 'Students and graduates', body: 'Skip the awkward smile from a rushed selfie and get a natural, confident look.' },
];

const faqs = [
  { q: 'Can AI change my smile in a photo?', a: 'Yes. TailorPic generates headshots with an expression you choose, from a subtle smile to a warm grin, based on your own face.' },
  { q: 'Will the expression look fake?', a: 'TailorPic aims for natural results by keeping your features and adjusting the whole face, including the eyes, so the expression looks believable.' },
  { q: 'Do I need to smile in my selfies?', a: 'No. A mix of neutral and relaxed expressions works well. The AI builds the final expression from your facial features.' },
  { q: 'Is this a standalone expression editor?', a: 'No. This page describes how TailorPic\'s AI headshot service handles expression. You get finished headshots rather than a one-off editing tool.' },
];

export default function ExpressionEditorPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'AI Photo Editor', url: `${siteConfig.url}/editor` },
          { name: 'AI Expression Editor', url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-tp-ink sm:text-5xl">
            AI Expression Editor for Approachable Headshots
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            A forced grin or tense face can cost you trust. TailorPic&apos;s AI adjusts smile intensity and facial expression so your headshot looks warm, confident and genuinely approachable.
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
            Smile with confidence — get AI headshots
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
