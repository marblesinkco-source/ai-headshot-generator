import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Palette, SlidersHorizontal, Download, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'Free Photo Filters & Effects Tool | TailorPic';
const description =
  'Apply professional photo filters to your headshots. Choose from 12 effects including grayscale, sepia, vintage, and more. Free and runs in your browser.';
const path = '/tools/photo-filters';
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const PhotoFilters = dynamic(() => import('@/components/tools/photo-filters'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto h-96 w-full max-w-4xl animate-pulse rounded-tp-card border border-tp-line bg-white"
      aria-label="Loading photo filters"
    />
  ),
});

const tips = [
  {
    icon: Palette,
    title: 'Pick a look',
    body: 'Every filter previews on your own photo as a thumbnail, so you can compare all 12 effects before choosing one.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Dial it in',
    body: 'Use the intensity slider to blend between your original and the filtered version. A light touch usually looks the most natural.',
  },
  {
    icon: Download,
    title: 'Save as PNG',
    body: 'Download the result as a PNG. Large photos are scaled to fit within 1600 pixels on the longest side.',
  },
  {
    icon: ShieldCheck,
    title: 'Stays on your device',
    body: 'Filters are applied in your browser using the Canvas API. Your photo is never uploaded to a server.',
  },
];

const faqs = [
  {
    q: 'Which filters work best for a professional headshot?',
    a: 'Subtle options such as grayscale or black and white film usually look the most polished. Lower the intensity so the result looks natural rather than heavily stylised.',
  },
  {
    q: 'Is my photo uploaded when I apply a filter?',
    a: 'No. Filters are applied in your browser and the photo stays on your device.',
  },
  {
    q: 'Can I adjust how strong a filter is?',
    a: 'Yes. Each filter has an intensity control, so you can blend the effect with the original photo before downloading.',
  },
  {
    q: 'Are filtered photos suitable for LinkedIn or a company profile?',
    a: 'It depends on the context. Strong effects like vintage or sepia can look out of place on business profiles, so a light touch or a clean original is usually the safer choice.',
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'Photo Filters', url: `${siteConfig.url}${path}` },
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
            Free Photo Filters &amp; Effects Tool
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Upload a photo and try 12 filters, from grayscale and sepia to vintage and B&amp;W film. Adjust the intensity, then download the result. Everything runs in your browser.
          </p>
        </div>
        <div className="mt-10">
          <PhotoFilters />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">Filter tips</h2>
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
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Want studio-quality headshot effects?</h2>
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
