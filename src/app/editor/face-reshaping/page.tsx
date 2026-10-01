import type { Metadata } from 'next';
import Link from 'next/link';
import { ScanFace, Sparkles, Check, Upload, Users, Briefcase, UserCheck, GraduationCap, Maximize2, Layers, Sun, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';

const title = 'AI Face Reshaping — Subtle Contouring and Jawline Refinement | TailorPic';
const description =
  'See how TailorPic\'s AI delivers subtle face contouring and jawline refinement for flattering headshots that still look like you.';
const path = '/editor/face-reshaping';

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
  name: 'AI Face Reshaping',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload a few selfies', body: 'Share 8–15 photos of your face. Wide-angle distortion from close selfies is handled for you.' },
  { icon: ScanFace, title: 'AI refines your features', body: 'Jawline and face contours are balanced subtly, never changed beyond recognition.' },
  { icon: Check, title: 'Download your headshots', body: 'Get flattering headshots that still look like you in person.' },
];

const features = [
  { icon: Maximize2, title: 'Jawline refinement', body: 'A defined, balanced jawline that looks natural from every angle.' },
  { icon: Layers, title: 'Subtle contouring', body: 'Soft shaping of cheeks and face planes without an edited look.' },
  { icon: Sun, title: 'Flattering light and shadow', body: 'Studio-style lighting adds natural depth to your features.' },
  { icon: ShieldCheck, title: 'Likeness preserved', body: 'Your identity stays intact, so people recognize you when you meet.' },
  { icon: Sparkles, title: 'Natural-looking results', body: 'No warped edges or overdone filters, just a polished version of you.' },
  { icon: ScanFace, title: 'Selfie distortion fixed', body: 'Close-up lens stretch is corrected for realistic proportions.' },
];

const useCases = [
  { icon: Briefcase, title: 'Job seekers', body: 'Look your best in a profile photo without changing who you are.' },
  { icon: UserCheck, title: 'Professionals and founders', body: 'Confident, refined headshots for bios, press and speaker pages.' },
  { icon: Users, title: 'Teams and companies', body: 'Consistent, flattering photos across your whole team page.' },
  { icon: GraduationCap, title: 'Students and graduates', body: 'A polished first professional photo for LinkedIn.' },
];

const faqs = [
  { q: 'Will the AI change how I look?', a: 'Only subtly. TailorPic aims for flattering, natural results and keeps your likeness recognizable.' },
  { q: 'Can it fix selfie distortion?', a: 'Yes. Headshots are generated with realistic proportions, so close-up lens stretch does not carry over.' },
  { q: 'Will it look over-edited?', a: 'No. Refinements are light and come from balanced lighting and posing, not heavy warping.' },
  { q: 'Is this a standalone face reshaping tool?', a: 'No. This page describes how TailorPic\'s AI headshot service handles facial refinement. You get finished headshots rather than a one-off editing tool.' },
];

export default function FaceReshapingPage() {
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
          { name: 'AI Face Reshaping', url: `${siteConfig.url}${path}` },
        ]}
      />
      <FAQSchema items={faqs} />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            AI Face Reshaping for Professional Headshots
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Close-up selfies stretch and flatten your face. TailorPic&apos;s AI applies subtle contouring and jawline refinement so your headshot is flattering and still unmistakably you.
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
            Flattering and still you — get AI headshots
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
