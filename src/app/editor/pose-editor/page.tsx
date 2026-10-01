import type { Metadata } from 'next';
import Link from 'next/link';
import { Move, UserCheck, Check, Upload, Sparkles, Users, Briefcase, GraduationCap, Camera, RotateCcw, Maximize2, Target } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';

const title = 'AI Pose Editor — Head Tilt and Posture for Headshots | TailorPic';
const description =
  'See how TailorPic\'s AI adjusts head tilt, shoulder angle and body positioning so your professional headshot looks confident, open and natural.';
const path = '/editor/pose-editor';

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
  name: 'AI Pose Editor',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload a few selfies', body: 'Share 8–15 photos of your face and shoulders. Your pose in them does not need to be perfect.' },
  { icon: Move, title: 'Pick a pose style', body: 'Choose a relaxed, confident or classic corporate posture for your finished headshots.' },
  { icon: Check, title: 'Download your headshots', body: 'Get polished headshots with balanced posture, ready for LinkedIn, résumés and company pages.' },
];

const features = [
  { icon: RotateCcw, title: 'Head tilt correction', body: 'A slight, flattering tilt that feels approachable instead of stiff or crooked.' },
  { icon: Maximize2, title: 'Shoulder angle', body: 'Shoulders are squared or angled for a strong, balanced frame.' },
  { icon: Target, title: 'Body positioning', body: 'Posture and framing are centered so the focus stays on your face.' },
  { icon: Camera, title: 'Eye-line alignment', body: 'Your gaze lands naturally at the camera for a confident connection.' },
  { icon: Sparkles, title: 'Natural-looking results', body: 'Pose changes are generated with your face and lighting, so nothing looks warped.' },
  { icon: Move, title: 'Pose variety', body: 'Get several posture options from a single set of selfies.' },
];

const useCases = [
  { icon: Briefcase, title: 'Job seekers', body: 'Project confidence and openness even if your selfies were taken at awkward angles.' },
  { icon: GraduationCap, title: 'Students and graduates', body: 'Get a professional posture for LinkedIn without a photographer.' },
  { icon: Users, title: 'Teams and companies', body: 'Keep staff poses consistent across a team page.' },
  { icon: UserCheck, title: 'Professionals and founders', body: 'Polished, assured posture for bios, speaker pages and press kits.' },
];

const faqs = [
  { q: 'Can the AI change my head tilt?', a: 'Yes. TailorPic generates headshots with a natural, flattering head position, so a slightly off-angle selfie does not limit the result.' },
  { q: 'Do I need to pose perfectly in my selfies?', a: 'No. Clear, well-lit photos from a few angles matter more than a perfect pose.' },
  { q: 'Will the new pose look natural?', a: 'Yes. Pose, face, clothing and background are generated together in one image, so proportions and lighting stay consistent.' },
  { q: 'Is this a standalone pose editor?', a: 'No. This page describes how TailorPic\'s AI headshot service handles posture. You get finished headshots rather than a one-off editing tool.' },
];

export default function PoseEditorPage() {
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
          { name: 'AI Pose Editor', url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-tp-ink sm:text-5xl">
            AI Pose Editor for Professional Headshots
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            A stiff posture or awkward angle can ruin a good photo. TailorPic&apos;s AI adjusts head tilt, shoulder angle and body positioning so your headshot looks relaxed and confident.
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
            Stand tall without a photo shoot — get AI headshots
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
