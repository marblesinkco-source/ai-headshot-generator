import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ImagePlus, SlidersHorizontal, Package, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'Free Batch Photo Resizer — Resize Multiple Photos at Once | TailorPic';
const description =
  'Resize multiple photos at once with platform presets for LinkedIn, Instagram, Facebook, and more. Download individually or as a ZIP. Free and runs in your browser.';
const path = '/tools/batch-photo-resizer';
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const BatchPhotoResizer = dynamic(() => import('@/components/tools/batch-photo-resizer'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto h-96 w-full max-w-4xl animate-pulse rounded-tp-card border border-tp-line bg-white"
      aria-label="Loading batch photo resizer"
    />
  ),
});

const tips = [
  {
    icon: ImagePlus,
    title: 'Add many at once',
    body: 'Drop up to 20 JPEG or PNG photos, up to 15 MB each, and resize them all with one set of settings.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Pick a preset or go custom',
    body: 'Choose a platform preset like LinkedIn or Instagram, or resize by percentage, max width, max height, or exact dimensions.',
  },
  {
    icon: Package,
    title: 'Download one or all',
    body: 'Save any photo as a PNG, or grab every resized photo in a single ZIP file.',
  },
  {
    icon: ShieldCheck,
    title: 'Stays on your device',
    body: 'Photos are resized in your browser using the Canvas API. Nothing is uploaded to a server.',
  },
];

const faqs = [
  {
    q: "How many photos can I resize at once?",
    a: "You can add up to 20 JPEG or PNG photos, up to 15 MB each, and resize them all with one set of settings.",
  },
  {
    q: "Which formats are supported?",
    a: "The tool accepts JPEG and PNG photos. Each resized photo can be saved as a PNG.",
  },
  {
    q: "Can I resize for LinkedIn or Instagram?",
    a: "Yes. Choose a platform preset such as LinkedIn or Instagram, or resize by percentage, max width, max height or exact dimensions.",
  },
  {
    q: "Are my photos uploaded anywhere?",
    a: "No. Photos are resized in your browser using the Canvas API, so nothing is uploaded to a server.",
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'Batch Photo Resizer', url: `${siteConfig.url}${path}` },
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
            Free Batch Photo Resizer
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Resize multiple photos at once with presets for LinkedIn, Instagram, Facebook, and more. Download them one by one or as a ZIP. Everything runs in your browser.
          </p>
        </div>
        <div className="mt-10">
          <BatchPhotoResizer />
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
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Need professional AI headshots for your team?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-tp-beige sm:text-base">
            TailorPic turns selfies into studio-style AI headshots. Plans start from {BASE_PRICE_DISPLAY}.
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
