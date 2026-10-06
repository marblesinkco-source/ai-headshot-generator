import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FileImage, Image as ImageIcon, ShieldCheck, Download } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'Free Image Format Converter: HEIC, WebP, PNG to JPG | TailorPic';
const description =
  'Convert photos between HEIC, WebP, PNG, BMP and JPG formats instantly in your browser. Adjust quality, preserve resolution. No upload, no signup.';
const path = '/tools/image-format-converter';
const ctaHref = '/auth/register?redirect=/dashboard/upload';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const ImageFormatConverter = dynamic(() => import('@/components/tools/image-format-converter'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto h-96 w-full max-w-5xl animate-pulse rounded-tp-card border border-tp-line bg-white"
      aria-label="Loading image converter"
    />
  ),
});

const tips = [
  {
    icon: FileImage,
    title: 'Use JPG for sharing',
    body: 'JPG works almost everywhere, including job portals, email and social profiles. It is the safest choice when a site rejects HEIC or WebP files.',
  },
  {
    icon: ImageIcon,
    title: 'Pick PNG for sharp graphics',
    body: 'PNG is lossless, so text, logos and screenshots stay crisp. Files are usually larger than JPG, and there is no quality setting to tune.',
  },
  {
    icon: ShieldCheck,
    title: 'Your files stay with you',
    body: 'Conversion happens on your device with your browser. Nothing is uploaded, so private photos never reach a server.',
  },
  {
    icon: Download,
    title: 'Balance quality and size',
    body: 'For JPG and WebP, a quality around 80 to 90 is usually a good balance. Lower values shrink the file but can add visible artifacts.',
  },
];

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen bg-tp-paper">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'Image Format Converter', url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />

      <section className="px-4 pb-10 pt-16 sm:px-6 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">Free tool</p>
          <h1 className="font-display font-normal text-4xl leading-tight text-tp-ink sm:text-5xl md:text-6xl">
            Free Image Format Converter
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Turn HEIC, WebP, PNG, BMP and other image files into JPG, PNG or WebP. Choose your quality, keep your original resolution, and download. Everything runs in your browser.
          </p>
        </div>
        <div className="mt-10">
          <ImageFormatConverter />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">Format conversion tips</h2>
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
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Need a professional headshot, not just a new file format?</h2>
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
