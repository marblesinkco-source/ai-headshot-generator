import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { CircleUser, SlidersHorizontal, Download, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'Free Profile Picture Maker for All Platforms | TailorPic';
const description =
  'Crop and resize your photo for LinkedIn, Instagram, Facebook, Twitter/X, YouTube, Zoom, Slack, and more. Download one or all sizes as a ZIP. Free and runs in your browser.';
const path = '/tools/profile-picture-maker';
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const ProfilePictureMaker = dynamic(() => import('@/components/tools/profile-picture-maker'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto h-96 w-full max-w-4xl animate-pulse rounded-tp-card border border-tp-line bg-white"
      aria-label="Loading profile picture maker"
    />
  ),
});

const tips = [
  {
    icon: CircleUser,
    title: 'Nine platforms, one upload',
    body: 'Crop and resize for LinkedIn, Instagram, Facebook, Twitter/X, YouTube, Zoom, Slack, WhatsApp, and Discord in one go.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Drag to reposition',
    body: 'Move and resize the crop area to frame your face perfectly. See a live circle or square preview for each platform.',
  },
  {
    icon: Download,
    title: 'Download one or all',
    body: 'Save the version you need as a PNG, or download all nine platform sizes in a single ZIP file.',
  },
  {
    icon: ShieldCheck,
    title: 'Stays on your device',
    body: 'Photos are cropped and resized in your browser using the Canvas API. Nothing is uploaded to a server.',
  },
];

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen bg-tp-paper">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'Profile Picture Maker', url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />

      <section className="px-4 pb-10 pt-16 sm:px-6 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">Free tool</p>
          <h1 className="font-display font-normal text-4xl leading-tight text-tp-ink sm:text-5xl md:text-6xl">
            Free Profile Picture Maker
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Upload a photo and crop it for nine social platforms at once. Drag to reposition, see circle and square previews, then download one or all sizes as a ZIP. Everything runs in your browser.
          </p>
        </div>
        <div className="mt-10">
          <ProfilePictureMaker />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">How to use it</h2>
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
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Want professional AI headshots?</h2>
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
