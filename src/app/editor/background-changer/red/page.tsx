import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Building2, Camera, Check, Eye, Layers, Palette, Sparkles, Star, Upload, UserCheck, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';

const title = 'Red Background Headshots — Bold & Attention-Grabbing | TailorPic';
const description =
  'Get AI headshots on a bold red background. Ideal for media personalities, real estate agents and sales professionals who want to stand out.';
const path = '/editor/background-changer/red';

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
  name: 'Red Background Headshots',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload a few selfies', body: 'Share 8–15 photos in different lighting and angles. The backgrounds in your originals do not matter.' },
  { icon: Sparkles, title: 'AI builds your headshots', body: 'Our AI learns your features and generates new headshots against the red background you choose.' },
  { icon: Check, title: 'Pick your favorites', body: 'Download the headshots that suit your listings, channels or sales profiles.' },
];

const features = [
  { icon: Eye, title: 'Instant attention', body: 'A strong red backdrop draws the eye in thumbnails, feeds and search results.' },
  { icon: Palette, title: 'Shades to match your brand', body: 'Pick a deep crimson, a bright true red or a muted brick tone.' },
  { icon: Camera, title: 'Balanced skin tones', body: 'Lighting is tuned so your face looks natural and not washed out by the saturated color.' },
  { icon: Layers, title: 'Clean, natural edges', body: 'Hair and shoulders blend into the red without halos or harsh outlines.' },
  { icon: Star, title: 'Confident, energetic look', body: 'A high-impact style that conveys drive and approachability.' },
  { icon: Users, title: 'Team-wide consistency', body: 'Give a whole sales team or agency the same branded backdrop.' },
];

const useCases = [
  { icon: Star, title: 'Media personalities', body: 'Make show pages, podcasts and channel art instantly recognizable.' },
  { icon: Building2, title: 'Real estate agents', body: 'Stand out on signs, listings and flyers with a bold, memorable portrait.' },
  { icon: Briefcase, title: 'Sales professionals', body: 'Project energy and confidence on proposals, email signatures and profiles.' },
  { icon: UserCheck, title: 'Coaches and speakers', body: 'Use a high-impact headshot for event pages and promotional material.' },
];

const faqs = [
  { q: 'Is a red background professional enough?', a: 'It suits roles where visibility and energy matter, like sales, media and real estate. For formal or conservative settings, a neutral or navy background may be a safer choice.' },
  { q: 'Can I match the red to my brand color?', a: 'You can pick a shade that fits your style, from deep crimson to bright red. Exact brand color matching may vary slightly from image to image.' },
  { q: 'Will the red reflect on my skin?', a: 'Lighting is balanced so your skin looks natural. The background is generated together with you, so color spill looks realistic and subtle.' },
  { q: 'Do the backgrounds in my selfies matter?', a: 'No. Upload selfies with good lighting and a clear view of your face. The backgrounds in your uploads do not carry over.' },
];

export default function RedBackgroundPage() {
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
          { name: 'AI Background Changer', url: `${siteConfig.url}/editor/background-changer` },
          { name: 'Red Background Headshots', url: `${siteConfig.url}${path}` },
        ]}
      />
      <FAQSchema items={faqs} />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool · Red background</p>
          <h1 className="mt-3 text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            Red Background Headshots — Bold & Attention-Grabbing
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Red signals energy, confidence and action. TailorPic&apos;s AI generates your headshot against a vivid, evenly lit red background that helps you get noticed in crowded feeds and listings.
          </p>
          <Link href="/auth/register" className={buttonVariants({ size: 'lg', className: 'mt-8' })}>
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
        <h2 className="text-center text-2xl font-bold text-tp-ink sm:text-3xl">What you get</h2>
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
            Get your red background headshot
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
