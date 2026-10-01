import type { Metadata } from 'next';
import Link from 'next/link';
import { Aperture, Briefcase, Camera, Check, Eye, GraduationCap, ScanFace, Smartphone, Sparkles, Sun, Upload, UserCheck, Zap } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';

const title = 'AI Image Unblur — Sharpen Blurry Photos | TailorPic';
const description =
  'Blurry or out-of-focus selfies? See how TailorPic\'s AI turns soft, low-quality photos into sharp, professional headshots with clear detail.';
const path = '/editor/unblur-image';

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
  name: 'AI Image Unblur',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload your photos', body: 'Share 10–20 selfies (minimum 8). Slightly soft or out-of-focus shots are fine as long as your face is visible.' },
  { icon: Sparkles, title: 'AI rebuilds sharp detail', body: 'Our AI learns your features across all your photos and generates new headshots with crisp focus.' },
  { icon: Check, title: 'Download sharp headshots', body: 'Get high-resolution results ready for LinkedIn, résumés and company pages.' },
];

const features = [
  { icon: Aperture, title: 'Crisp focus', body: 'Eyes, eyelashes and hair strands come out clearly defined instead of soft.' },
  { icon: ScanFace, title: 'Natural skin detail', body: 'Sharpness keeps realistic texture, without the plastic or over-processed look.' },
  { icon: Smartphone, title: 'Works from phone selfies', body: 'Front-camera shots with shake or low resolution are a normal starting point.' },
  { icon: Sun, title: 'Better low-light results', body: 'Noisy, grainy photos taken indoors become clean, evenly lit headshots.' },
  { icon: Eye, title: 'Clear, expressive eyes', body: 'Sharp eyes make a headshot feel engaging and trustworthy.' },
  { icon: Zap, title: 'Fast turnaround', body: 'Get finished headshots in hours without any manual retouching.' },
];

const useCases = [
  { icon: Briefcase, title: 'Job seekers', body: 'Turn an old, soft profile photo into a sharp image recruiters notice.' },
  { icon: Camera, title: 'Anyone with only phone selfies', body: 'Skip the photographer and still get crisp, professional results.' },
  { icon: UserCheck, title: 'Freelancers and consultants', body: 'Look polished on your website and proposals with a clear, high-quality portrait.' },
  { icon: GraduationCap, title: 'Students and graduates', body: 'Upgrade low-resolution photos for applications and LinkedIn.' },
];

const faqs = [
  { q: 'Can AI fix any blurry photo?', a: 'Not always. Mild blur and softness are fine, but heavily blurred faces are hard to recover. Upload a mix of clearer selfies for the best results.' },
  { q: 'Does it sharpen my existing photo?', a: 'Not directly. TailorPic learns your features from your uploads and generates new, sharp headshots rather than filtering the original.' },
  { q: 'Will the result still look like me?', a: 'Yes. The AI is trained on your own photos, so your features stay accurate while the image quality improves.' },
  { q: 'Is this a standalone unblur tool?', a: 'No. This page describes how TailorPic\'s AI headshot service handles blurry inputs. You get finished headshots rather than a one-off editing tool.' },
];

export default function UnblurImagePage() {
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
          { name: 'AI Image Unblur', url: `${siteConfig.url}${path}` },
        ]}
      />
      <FAQSchema items={faqs} />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            AI Image Unblur — Sharpen Blurry Photos
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Shaky hands, low light and out-of-focus cameras leave you with soft photos. TailorPic&apos;s AI turns them into sharp, high-resolution professional headshots with clear detail.
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
            Skip the blur — get sharp AI headshots
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
