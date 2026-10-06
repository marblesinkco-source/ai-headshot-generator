import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FileImage, Monitor, Eye, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'Free Image DPI Checker & Print Size Calculator | TailorPic';
const description =
  "Check your photo's DPI, see its print dimensions at any resolution, and find out if it's sharp enough for print. Everything runs in your browser.";
const path = '/tools/dpi-checker';
const ctaHref = '/auth/register?redirect=/dashboard/upload';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const DpiChecker = dynamic(() => import('@/components/tools/dpi-checker'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto h-96 w-full max-w-5xl animate-pulse rounded-tp-card border border-tp-line bg-white"
      aria-label="Loading DPI checker"
    />
  ),
});

const tips = [
  {
    icon: FileImage,
    title: 'Check DPI instantly',
    body: 'Upload any JPEG or PNG and the tool reads the embedded DPI from the file header. If no DPI is stored, it shows the pixel dimensions so you can decide.',
  },
  {
    icon: Monitor,
    title: 'See print sizes',
    body: 'Enter a target DPI and see the exact print dimensions in inches and centimeters. A color-coded badge tells you whether the resolution is enough for sharp prints.',
  },
  {
    icon: Eye,
    title: 'Compare print formats',
    body: 'A quick table shows how your image maps to common print sizes — from wallet to 16 by 20 — with a quality grade for each.',
  },
  {
    icon: ShieldCheck,
    title: 'Stays on your device',
    body: 'The DPI is read in your browser. Your photo is never sent to a server and the file header is parsed locally.',
  },
];

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen bg-tp-paper">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'DPI Checker', url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />

      <section className="px-4 pb-10 pt-16 sm:px-6 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">Free tool</p>
          <h1 className="font-display font-normal text-4xl leading-tight text-tp-ink sm:text-5xl md:text-6xl">
            Free Image DPI Checker &amp; Print Size Calculator
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Upload a photo to read its embedded DPI, see how large it can print, and compare common print sizes. Everything runs in your browser.
          </p>
        </div>
        <div className="mt-10">
          <DpiChecker />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">DPI tips</h2>
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
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Need a print-ready headshot?</h2>
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
