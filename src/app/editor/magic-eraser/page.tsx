import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Check, Eraser, GraduationCap, Layers, ScanFace, ShieldCheck, Sparkles, Sun, Upload, UserCheck, Users, Zap } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';

const title = 'AI Magic Eraser — Remove Unwanted Objects from Photos | TailorPic';
const description =
  'Distracting objects, clutter and blemishes in your selfies? See how TailorPic\'s AI generates clean, professional headshots without them.';
const path = '/editor/magic-eraser';

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
  name: 'AI Magic Eraser',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload a few selfies', body: 'Share 8–15 photos. Clutter, passersby and objects in the frame do not need to be removed first.' },
  { icon: Sparkles, title: 'AI generates clean headshots', body: 'Our AI learns your features and creates new headshots, leaving distractions out of the picture entirely.' },
  { icon: Check, title: 'Download your favorites', body: 'Get distraction-free headshots for your profile, résumé or company page.' },
];

const features = [
  { icon: Eraser, title: 'No background clutter', body: 'Shelves, posters, cables and other items behind you do not appear in your results.' },
  { icon: Users, title: 'No photobombers', body: 'Other people in your originals are not carried into your headshots.' },
  { icon: ScanFace, title: 'Natural skin', body: 'Temporary blemishes and shine are smoothed while keeping real texture and your likeness.' },
  { icon: Layers, title: 'No watermarks or overlays', body: 'Stamps, stickers and text on your uploads do not carry into the final images.' },
  { icon: Sun, title: 'Clean, even lighting', body: 'Glare, shadows and stray reflections are replaced by flattering, consistent light.' },
  { icon: Zap, title: 'Seamless results', body: 'Everything is generated together in one image, so there are no smudged patches or visible edits.' },
];

const useCases = [
  { icon: Briefcase, title: 'Job seekers', body: 'Get a clean professional photo even if your selfies were taken in a cluttered space.' },
  { icon: UserCheck, title: 'Freelancers and consultants', body: 'Present a focused, distraction-free image on your website and proposals.' },
  { icon: ShieldCheck, title: 'Teams and companies', body: 'Keep every staff photo clean and consistent, with no stray objects.' },
  { icon: GraduationCap, title: 'Students and graduates', body: 'Turn casual photos from shared spaces into a polished profile picture.' },
];

const faqs = [
  { q: 'Can I erase a specific object from my photo?', a: 'Not directly. TailorPic does not edit your original photo. It generates new headshots, so unwanted objects simply do not appear.' },
  { q: 'Can it remove watermarks?', a: 'Watermarks on uploads are not reproduced in your headshots, but we recommend uploading original, unmarked photos you own.' },
  { q: 'Will my blemishes be removed?', a: 'Headshots keep a natural look. Temporary blemishes are softened, while your real features and skin texture stay intact.' },
  { q: 'Is this a standalone magic eraser?', a: 'No. This page describes how TailorPic\'s AI headshot service produces clean images. You get finished headshots rather than a one-off editing tool.' },
];

export default function MagicEraserPage() {
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
          { name: 'AI Magic Eraser', url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-tp-ink sm:text-5xl">
            AI Magic Eraser — Remove Unwanted Objects from Photos
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Stray objects, cluttered rooms and distractions pull attention from your face. TailorPic&apos;s AI generates clean professional headshots where none of it makes it into the final image.
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
            Skip the retouching — get clean AI headshots
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
