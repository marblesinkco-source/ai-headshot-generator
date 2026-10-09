import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ShieldCheck, Camera, Eye, Sparkles } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'Free Photo EXIF Data Viewer & Remover | TailorPic';
const description =
  "View your photo's hidden metadata — camera, date, GPS location — and download a clean copy with all data stripped. Runs in your browser, nothing is uploaded.";
const path = '/tools/exif-viewer';
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const ExifViewer = dynamic(() => import('@/components/tools/exif-viewer'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto h-80 w-full max-w-3xl animate-pulse rounded-tp-card border border-tp-line bg-white"
      aria-label="Loading EXIF viewer"
    />
  ),
});

const tips = [
  {
    icon: ShieldCheck,
    title: 'Why strip metadata',
    body: 'Photos can quietly carry the place they were taken. Removing metadata keeps your home, workplace or routine from being traced back through a shared picture.',
  },
  {
    icon: Camera,
    title: 'What EXIF data contains',
    body: 'Depending on the device, it can include camera make and model, the date and time, orientation, software used, exposure settings and sometimes GPS location.',
  },
  {
    icon: Eye,
    title: 'When to remove it',
    body: 'Clean a photo before you post it online, send it to someone you do not know, or upload it to a marketplace, forum or public profile.',
  },
  {
    icon: Sparkles,
    title: 'Keep the quality',
    body: 'Saving a clean JPEG re-encodes the image. Choose a quality of 90 or higher to keep detail, and work from your original file rather than a copy that was already re-saved.',
  },
];

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen bg-tp-paper">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'EXIF Viewer & Remover', url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />

      <section className="px-4 pb-10 pt-16 sm:px-6 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">Free tool</p>
          <h1 className="font-display font-normal text-4xl leading-tight text-tp-ink sm:text-5xl md:text-6xl">
            Free Photo EXIF Data Viewer &amp; Remover
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            See the hidden details stored inside your photo, like camera, date and location, then download a clean copy with all metadata removed. Everything runs in your browser, so your photo stays on your device.
          </p>
        </div>
        <div className="mt-10">
          <ExifViewer />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">Photo privacy tips</h2>
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
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">
            Want a headshot that&apos;s clean from the start?
          </h2>
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
