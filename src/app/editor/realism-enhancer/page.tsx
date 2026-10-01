import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Building2, Camera, Check, Eye, Focus, Layers, ScanFace, ShieldCheck, Sparkles, Upload, UserCheck, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';

const title = 'AI Realism Enhancer — Natural-Looking AI Photos | TailorPic';
const description =
  'See how TailorPic\'s AI produces natural, photorealistic headshots with real skin texture, believable detail and no plastic AI look.';
const path = '/editor/realism-enhancer';

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
  name: 'AI Realism Enhancer',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload your selfies', body: 'Share a varied set of photos so the AI learns how you really look.' },
  { icon: ScanFace, title: 'AI preserves real detail', body: 'Skin texture, hair strands and eye detail are generated to look photographic.' },
  { icon: Check, title: 'Review and download', body: 'Choose the most natural headshots and download them in high resolution.' },
];

const features = [
  { icon: Layers, title: 'Real skin texture', body: 'Keeps pores and fine detail instead of smoothing skin into a plastic finish.' },
  { icon: Eye, title: 'Lifelike eyes', body: 'Natural catchlights and sharp, symmetrical eyes without the uncanny stare.' },
  { icon: Focus, title: 'Believable detail', body: 'Sharp hair, fabric and edges that hold up when zoomed in.' },
  { icon: Camera, title: 'Photographic depth', body: 'Realistic depth of field and lens-like background softness.' },
  { icon: ScanFace, title: 'Natural proportions', body: 'Faces, hands and features stay anatomically believable.' },
  { icon: ShieldCheck, title: 'Looks like you', body: 'Built from your own photos so the likeness stays recognizable.' },
];

const useCases = [
  { icon: Briefcase, title: 'Professionals', body: 'Use headshots that colleagues and clients accept as real photos.' },
  { icon: UserCheck, title: 'Job seekers', body: 'Avoid the obvious AI look on applications and résumés.' },
  { icon: Building2, title: 'Company websites', body: 'Keep team pages looking authentic and trustworthy.' },
  { icon: Users, title: 'Creators and speakers', body: 'Publish bios and event profiles with natural-looking portraits.' },
];

const faqs = [
  { q: 'Why do some AI photos look fake?', a: 'Over-smoothing, odd lighting and inconsistent detail give AI images a plastic look. Our AI is tuned to keep natural texture and detail.' },
  { q: 'Will I still look like me?', a: 'Yes. Results are built from your own photos and aim for a natural, recognizable likeness.' },
  { q: 'Are the photos detectable as AI?', a: 'Our goal is natural-looking portraits, but we cannot guarantee how any platform or viewer will judge an image.' },
  { q: 'Is this a standalone enhancer tool?', a: 'No. This page explains how our AI headshot service aims for realism. You upload selfies and receive finished headshots.' },
];

export default function RealismEnhancerPage() {
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
          { name: 'AI Realism Enhancer', url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-tp-ink sm:text-5xl">
            AI Realism Enhancer for Natural-Looking Photos
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Many AI photos look airbrushed and artificial. TailorPic&apos;s AI focuses on real skin texture, believable detail and natural proportions so your headshots look like real photography.
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
        <h2 className="text-center text-2xl font-bold text-tp-ink sm:text-3xl">What makes results look real</h2>
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
            Get AI headshots that look real
          </h2>
          <p className="mt-3 text-tp-muted">
            Upload a few selfies and get natural, studio-quality headshots in hours, from $9.90.
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
