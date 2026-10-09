import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Camera, Check, Heart, Layers, Palette, Shield, Sparkles, Sun, Upload, UserCheck, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const title = 'Green Background Headshots — Natural & Calming | TailorPic';
const description =
  'Get AI headshots on a natural green background. Ideal for wellness professionals, environmental organizations and healthcare teams.';
const path = '/editor/background-changer/green';

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
  name: 'Green Background Headshots',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload a few selfies', body: 'Share 4–10 photos in different lighting and angles. The backgrounds in your originals do not matter.' },
  { icon: Sparkles, title: 'AI builds your headshots', body: 'Our AI learns your features and generates new headshots against the green background you choose.' },
  { icon: Check, title: 'Pick your favorites', body: 'Download the headshots that suit your practice, organization or profile.' },
];

const features = [
  { icon: Sun, title: 'Fresh, natural feel', body: 'Soft light and gentle green tones create a calm, healthy look.' },
  { icon: Palette, title: 'Range of green tones', body: 'Choose sage, forest, mint or olive to match your brand and personality.' },
  { icon: Layers, title: 'Clean, natural edges', body: 'Hair and shoulders blend into the green without halos or cutout lines.' },
  { icon: Heart, title: 'Warm and approachable', body: 'A friendly style that helps clients and patients feel at ease.' },
  { icon: Camera, title: 'Flattering skin tones', body: 'Lighting is balanced so your complexion looks natural against the green.' },
  { icon: Users, title: 'Cohesive team pages', body: 'Give a clinic or organization one consistent, welcoming backdrop.' },
];

const useCases = [
  { icon: Heart, title: 'Wellness professionals', body: 'Convey calm and care on yoga, nutrition and holistic practice websites.' },
  { icon: Building2, title: 'Environmental organizations', body: 'Reflect your mission with a nature-inspired look on team and donor pages.' },
  { icon: Shield, title: 'Healthcare providers', body: 'Build trust on clinic pages, directories and patient portals.' },
  { icon: UserCheck, title: 'Coaches and educators', body: 'Use a fresh, friendly headshot for courses, programs and bios.' },
];

const faqs = [
  { q: 'Which shade of green should I choose?', a: 'Soft sage and mint feel calm and gentle, while forest and olive feel grounded and authoritative. Pick the tone that best fits your field and brand.' },
  { q: 'Does the green reflect on my face?', a: 'Lighting is balanced so your skin looks natural. The background is generated together with you, so any subtle color spill looks realistic.' },
  { q: 'Will the edges around my hair look cut out?', a: 'No. The background is generated together with you in a single image, so hair and shoulders blend naturally.' },
  { q: 'Do the backgrounds in my selfies matter?', a: 'No. Upload selfies with good lighting and a clear view of your face. The backgrounds in your uploads do not carry over.' },
];

export default function GreenBackgroundPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'AI Photo Editor', url: `${siteConfig.url}/editor` },
          { name: 'AI Background Changer', url: `${siteConfig.url}/editor/background-changer` },
          { name: 'Green Background Headshots', url: `${siteConfig.url}${path}` },
        ]}
      />
      <FAQSchema items={faqs} />
      <Header />
      <main id="main-content" className="bg-white">

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool · Green background</p>
          <h1 className="mt-3 text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            Green Background Headshots — Natural & Calming
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Green evokes growth, health and calm. TailorPic&apos;s AI generates your headshot against a soft, nature-inspired green background that feels fresh, trustworthy and welcoming.
          </p>
          <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={buttonVariants({ size: 'lg', className: 'mt-8' })}>
            Try TailorPic AI Headshots
          </Link>
          <p className="mt-4 text-sm text-tp-muted">
            <Link href="/editor/background-changer" className="font-medium text-tp-bronze-ink underline underline-offset-4">
              See all background options
            </Link>
          </p>
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
        <h2 className="text-center text-2xl font-display font-normal text-tp-ink sm:text-3xl">What you get</h2>
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
            Get your green background headshot
          </h2>
          <p className="mt-3 text-tp-muted">
            Upload a few selfies and get studio-quality professional headshots in hours, from {BASE_PRICE_DISPLAY}.
          </p>
          <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={buttonVariants({ size: 'lg', className: 'mt-6' })}>
            Get AI Headshots
          </Link>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
