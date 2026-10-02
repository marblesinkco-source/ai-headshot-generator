import type { Metadata } from 'next';
import Link from 'next/link';
import { Maximize2, Sparkles, Check, Upload, Users, Briefcase, UserCheck, Camera, Layers, Monitor, Sun, GraduationCap } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'AI Smart Crop & Resize: LinkedIn, Passport, ID | TailorPic';
const description =
  'See how TailorPic\'s AI crops and resizes headshots with face-aware framing for LinkedIn, passport, ID and other platform photo requirements.';
const path = '/editor/crop-resize';

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
  name: 'AI Smart Crop & Resize',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload a few selfies', body: 'Share 8–15 photos of your face and shoulders. Framing in the originals does not need to be perfect.' },
  { icon: Maximize2, title: 'Pick a format', body: 'Choose a platform size such as a LinkedIn profile, square avatar, or a passport or ID style frame.' },
  { icon: Check, title: 'Download your headshots', body: 'Get headshots framed and sized for your chosen use, ready to upload.' },
];

const features = [
  { icon: Maximize2, title: 'Face-aware framing', body: 'Crops are centered on your face with balanced headroom, so you are never cut off.' },
  { icon: Monitor, title: 'Platform-ready sizes', body: 'Formats for LinkedIn, social profiles, company directories and email signatures.' },
  { icon: Camera, title: 'Passport and ID style', body: 'Plain-background, front-facing framing suited to common ID photo layouts. Always check your issuer\'s official rules.' },
  { icon: Layers, title: 'Multiple aspect ratios', body: 'Get square, portrait and landscape versions from the same session.' },
  { icon: Sun, title: 'Consistent lighting', body: 'Every crop keeps the same lighting and color, so your photos match across platforms.' },
  { icon: Sparkles, title: 'Sharp at any size', body: 'Headshots are generated at high resolution so resizing stays crisp.' },
];

const useCases = [
  { icon: Briefcase, title: 'Job seekers', body: 'Get a correctly framed LinkedIn photo that is not cropped awkwardly by the platform.' },
  { icon: UserCheck, title: 'Professionals and founders', body: 'Keep one consistent face across speaker pages, bios and directories.' },
  { icon: Users, title: 'Teams and companies', body: 'Produce uniform sizes and framing for every team member photo.' },
  { icon: GraduationCap, title: 'Students and graduates', body: 'Prepare photos for applications, student portals and ID-style uploads.' },
];

const faqs = [
  { q: 'What size should a LinkedIn profile photo be?', a: 'LinkedIn works best with a square-friendly, face-centered photo. TailorPic frames your headshot so your face stays prominent when the platform crops it.' },
  { q: 'Can I get a passport or ID style photo?', a: 'TailorPic can produce plain-background, front-facing framing in the style of ID photos. Official documents have strict rules, so confirm your issuing authority\'s requirements before submitting.' },
  { q: 'Does cropping reduce image quality?', a: 'No. Headshots are generated at high resolution, so cropping and resizing for typical profile uses stays sharp.' },
  { q: 'Is this a standalone crop tool?', a: 'No. This page describes how TailorPic\'s AI headshot service handles framing and sizes. You get finished headshots rather than a one-off editing tool.' },
];

export default function CropResizePage() {
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
          { name: 'AI Smart Crop & Resize', url: `${siteConfig.url}${path}` },
        ]}
      />
      <FAQSchema items={faqs} />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            AI Smart Crop &amp; Resize for Every Platform
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Every platform wants a different photo size. TailorPic&apos;s AI frames your face correctly for LinkedIn, passport-style and ID-style formats, so you never have to crop by hand.
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
            The right frame for every platform — get AI headshots
          </h2>
          <p className="mt-3 text-tp-muted">
            Upload a few selfies and get studio-quality professional headshots in hours, from $1.99.
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
