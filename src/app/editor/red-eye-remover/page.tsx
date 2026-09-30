import type { Metadata } from 'next';
import Link from 'next/link';
import { Eye, Sparkles, Check, Upload, Users, Briefcase, GraduationCap, UserCheck, Sun, Camera, ShieldCheck, Layers } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';

const title = 'AI Red Eye Remover — Fix Flash Glare in Photos | TailorPic';
const description =
  'See how TailorPic\'s AI removes red-eye and flash glare from your photos, restoring natural eye color so your professional headshot looks sharp and alive.';
const path = '/editor/red-eye-remover';

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
  name: 'AI Red Eye Remover',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload your photos', body: 'Share 8–15 photos of your face, even ones taken with a direct flash or in a dim room.' },
  { icon: Eye, title: 'AI restores your eyes', body: 'Red pupils and flash glare are replaced with natural eye color, catchlights and depth.' },
  { icon: Check, title: 'Download your headshots', body: 'Get clean, studio-quality headshots with clear eyes, ready for LinkedIn and résumés.' },
];

const features = [
  { icon: Eye, title: 'Red-eye correction', body: 'Red and orange pupils are rebuilt with a realistic dark pupil and natural iris color.' },
  { icon: Sun, title: 'Flash glare reduction', body: 'Harsh reflections on skin, glasses and foreheads are softened to even, natural light.' },
  { icon: Sparkles, title: 'Natural catchlights', body: 'Small highlights in the eyes keep your gaze lively instead of flat or glassy.' },
  { icon: ShieldCheck, title: 'Your real eye color', body: 'Iris color comes from your own photos, so the result still looks like you.' },
  { icon: Layers, title: 'Whole-image consistency', body: 'Eyes, skin tone and lighting are generated together, so there are no visible patch marks.' },
  { icon: Camera, title: 'Works with phone photos', body: 'Selfies and snapshots taken with on-camera flash are fine as source material.' },
];

const useCases = [
  { icon: Briefcase, title: 'Job seekers', body: 'Turn a flash-lit snapshot into a headshot that shows clear, confident eyes.' },
  { icon: GraduationCap, title: 'Students and graduates', body: 'Use old party or event photos as the starting point for a professional profile picture.' },
  { icon: Users, title: 'Teams and companies', body: 'Keep staff photos consistent even when the source images were taken in different rooms.' },
  { icon: UserCheck, title: 'Professionals and founders', body: 'Get a polished look for bios and press kits without rebooking a photographer.' },
];

const faqs = [
  { q: 'Can AI remove red-eye from a photo?', a: 'Yes. TailorPic\'s AI generates headshots with natural pupils and iris color, so red-eye in your source photos does not carry over.' },
  { q: 'Does it also fix flash glare?', a: 'Yes. Shiny patches on skin and harsh flash shadows are replaced with soft, even lighting in the finished headshots.' },
  { q: 'Will my eyes still look like mine?', a: 'Yes. Eye shape and color are learned from all of your uploaded photos, so the result stays true to your appearance.' },
  { q: 'Is this a standalone red-eye tool?', a: 'No. This page describes how TailorPic\'s AI headshot service handles red-eye and glare. You get finished headshots rather than a one-off retouching tool.' },
];

export default function RedEyeRemoverPage() {
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
          { name: 'AI Red Eye Remover', url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-tp-ink sm:text-5xl">
            AI Red Eye Remover for Professional Photos
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Red pupils and flash glare make a good moment look unprofessional. TailorPic&apos;s AI restores natural eye color and soft lighting so your headshot looks clear and alive.
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
            Clear, natural eyes in every shot — get AI headshots
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
