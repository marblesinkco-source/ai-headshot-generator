import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Check, Upload, Users, Briefcase, UserCheck, GraduationCap, ScanFace, Sun, Layers, Heart, Camera } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';

const title = 'AI Skin Smoother — Natural Retouching for Headshots | TailorPic';
const description =
  'See how TailorPic\'s AI retouches skin naturally, softening blemishes and uneven tone while keeping real texture so your headshot still looks like you.';
const path = '/editor/skin-smoother';

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
  name: 'AI Skin Smoother',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload a few selfies', body: 'Share 8–15 clear photos of your face. Everyday lighting and natural skin are all you need.' },
  { icon: Sparkles, title: 'AI retouches naturally', body: 'Blemishes and uneven tone are softened while pores, freckles and fine texture stay intact.' },
  { icon: Check, title: 'Download your headshots', body: 'Get polished headshots with healthy, realistic skin, ready for LinkedIn and company pages.' },
];

const features = [
  { icon: ScanFace, title: 'Texture-preserving smoothing', body: 'Skin is refined without the plastic, over-blurred look common in filter apps.' },
  { icon: Sparkles, title: 'Blemish softening', body: 'Temporary spots, redness and shine are reduced while your permanent features remain.' },
  { icon: Sun, title: 'Even skin tone', body: 'Patchy color and harsh shadows are balanced for a fresh, rested appearance.' },
  { icon: Heart, title: 'Keeps your character', body: 'Freckles, laugh lines and moles you care about can stay, so you remain recognizable.' },
  { icon: Layers, title: 'Consistent with lighting', body: 'Retouching is generated together with light and background, so nothing looks pasted on.' },
  { icon: Camera, title: 'High-resolution detail', body: 'Output stays sharp enough for profile photos and larger print uses.' },
];

const useCases = [
  { icon: Briefcase, title: 'Job seekers', body: 'Look fresh and rested in your LinkedIn photo without looking over-edited.' },
  { icon: UserCheck, title: 'Professionals and founders', body: 'Polished, credible skin for bios, speaker pages and press kits.' },
  { icon: Users, title: 'Teams and companies', body: 'Keep retouching consistent and subtle across every team member.' },
  { icon: GraduationCap, title: 'Students and graduates', body: 'Get a clean professional look without paying for studio retouching.' },
];

const faqs = [
  { q: 'Will skin smoothing make me look fake?', a: 'No. TailorPic aims for natural retouching that keeps pores and fine texture, so the result looks like healthy skin rather than a filter.' },
  { q: 'Can the AI remove blemishes and redness?', a: 'Yes. Temporary blemishes, redness and shine are softened in the finished headshots, while distinctive features like freckles can be kept.' },
  { q: 'Does it change my face shape?', a: 'No. Skin refinement does not alter your bone structure or features. The headshot is still clearly you.' },
  { q: 'Is this a standalone skin smoother?', a: 'No. This page describes how TailorPic\'s AI headshot service handles skin retouching. You get finished headshots rather than a one-off editing tool.' },
];

export default function SkinSmootherPage() {
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
          { name: 'AI Skin Smoother', url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-tp-ink sm:text-5xl">
            AI Skin Smoother That Keeps Real Texture
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Heavy filters make skin look plastic. TailorPic&apos;s AI retouches blemishes and uneven tone while preserving natural texture, so your headshot looks polished and still like you.
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
            Polished skin, still you — get AI headshots
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
