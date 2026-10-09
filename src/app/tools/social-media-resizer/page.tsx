import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Smartphone, Monitor, Camera, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'Free Social Media Image Resizer for All Platforms | TailorPic';
const description =
  'Resize your photo for LinkedIn, Instagram, Facebook, X, YouTube, Slack and Zoom in one click. Pick platforms, crop, and download. No signup needed.';
const path = '/tools/social-media-resizer';
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const SocialMediaResizer = dynamic(() => import('@/components/tools/social-media-resizer'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto h-96 w-full max-w-5xl animate-pulse rounded-tp-card border border-tp-line bg-white"
      aria-label="Loading image resizer"
    />
  ),
});

const faqs: { q: string; a: string }[] = [
  {
    q: "What image sizes do social media platforms need?",
    a: "Each platform uses different dimensions for profile photos, banners and posts, and they change from time to time. This tool lets you pick the platforms you need, crop for each one and download every size as a PNG.",
  },
  {
    q: "Which platforms does the social media resizer support?",
    a: "It supports LinkedIn, Instagram, Facebook, X, YouTube, Slack and Zoom. Select the ones you want and adjust the crop for each.",
  },
  {
    q: "Will resizing make my photo blurry?",
    a: "Starting with a large, high-resolution original gives the sharpest results, especially for wide or tall formats like banners and Stories. Enlarging a small photo can look soft, so avoid it when you can.",
  },
  {
    q: "Do I need to sign up or upload my photo anywhere?",
    a: "No signup is needed. Cropping and exporting happen in your browser, so your photo never leaves your device.",
  },
];

const tips = [
  {
    icon: Smartphone,
    title: 'Check the small version',
    body: 'Profile photos show as tiny circles or squares on phones. Zoom in so your face fills the frame and stays clear at thumbnail size.',
  },
  {
    icon: Monitor,
    title: 'Mind banner safe areas',
    body: 'Wide banners are cropped differently on desktop and mobile. Keep key details toward the center so nothing important gets cut off.',
  },
  {
    icon: Camera,
    title: 'Start with a large original',
    body: 'A high-resolution source gives sharper results, especially for tall or wide formats like Stories and headers.',
  },
  {
    icon: ShieldCheck,
    title: 'Your photo stays with you',
    body: 'Cropping and exporting happen in your browser using your device. Your photos never leave your browser.',
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'Social Media Image Resizer', url: `${siteConfig.url}${path}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
      <Header />
      <main id="main-content" className="bg-tp-paper">

      <section className="px-4 pb-10 pt-16 sm:px-6 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">Free tool</p>
          <h1 className="font-display font-normal text-4xl leading-tight text-tp-ink sm:text-5xl md:text-6xl">
            Free Social Media Image Resizer
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Upload one photo, pick the platforms you need, adjust the crop for each, and download every size as a PNG. Everything runs in your browser.
          </p>
        </div>
        <div className="mt-10">
          <SocialMediaResizer />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">Resizing tips</h2>
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

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">Frequently asked questions</h2>
          <div className="mt-8 divide-y divide-tp-line rounded-tp-card border border-tp-line bg-white">
            {faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-tp-ink">
                  {f.q}
                  <span className="text-tp-bronze-ink transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-tp-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-6 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-tp-dialog bg-tp-ink px-6 py-12 text-center sm:px-10">
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Need a headshot worth resizing?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-tp-beige sm:text-base">
            TailorPic turns your selfies into studio-style AI headshots. Plans start from {BASE_PRICE_DISPLAY}.
          </p>
          <Link href={ctaHref} className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-7 bg-tp-bronze text-tp-black hover:bg-tp-beige')}>
            Try TailorPic →
          </Link>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
