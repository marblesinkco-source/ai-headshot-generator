import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Eye, SlidersHorizontal, Check, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'Free Headshot Quality Score — Rate Your Photo | TailorPic';
const description =
  'Get an instant quality score for your headshot. Analyzes framing, lighting, background, sharpness, and contrast with actionable tips. Free and runs in your browser.';
const path = '/tools/headshot-quality-score';
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const HeadshotQualityScore = dynamic(() => import('@/components/tools/headshot-quality-score'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto h-96 w-full max-w-4xl animate-pulse rounded-tp-card border border-tp-line bg-white"
      aria-label="Loading headshot quality scorer"
    />
  ),
});

const tips = [
  {
    icon: Eye,
    title: 'Five-point analysis',
    body: 'Your photo is scored on framing, lighting balance, background simplicity, sharpness, and contrast — the five things that matter most in a headshot.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Specific tips',
    body: 'Each score comes with a tip tailored to your photo, like "try centering your face" or "the left side is brighter than the right."',
  },
  {
    icon: Check,
    title: 'Visual overlay',
    body: 'See a composition grid overlaid on your photo showing the rule of thirds, center area, and estimated subject position.',
  },
  {
    icon: ShieldCheck,
    title: 'Stays on your device',
    body: 'All analysis runs in your browser using the Canvas API. Your photo is never uploaded to a server.',
  },
];

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen bg-tp-paper">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'Headshot Quality Score', url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />

      <section className="px-4 pb-10 pt-16 sm:px-6 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">Free tool</p>
          <h1 className="font-display font-normal text-4xl leading-tight text-tp-ink sm:text-5xl md:text-6xl">
            Free Headshot Quality Score
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Upload a headshot and get an instant quality score. See how your framing, lighting, background, sharpness, and contrast measure up, with specific tips to improve. Everything runs in your browser.
          </p>
        </div>
        <div className="mt-10">
          <HeadshotQualityScore />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">What we check</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tips.map((tip) => (
              <div key={tip.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-beige/40 text-tp-bronze-ink">
                  <tip.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-xl font-normal text-tp-ink">{tip.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-6 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-tp-dialog bg-tp-ink px-6 py-12 text-center sm:px-10">
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Want a perfect headshot every time?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-tp-beige sm:text-base">
            TailorPic turns your selfies into studio-style AI headshots. Plans start from {BASE_PRICE_DISPLAY}.
          </p>
          <Link href={ctaHref} className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-7 bg-tp-bronze text-tp-black hover:bg-tp-beige')}>
            Try TailorPic →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
