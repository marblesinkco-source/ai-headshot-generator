import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { PenTool, SlidersHorizontal, Download, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'Free Photo to Pencil Sketch Converter | TailorPic';
const description =
  'Convert any photo into a realistic pencil sketch drawing. Choose sketch styles, adjust line thickness and intensity. Free and runs in your browser.';
const path = '/tools/pencil-sketch';
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const PencilSketch = dynamic(() => import('@/components/tools/pencil-sketch'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto h-96 w-full max-w-4xl animate-pulse rounded-tp-card border border-tp-line bg-white"
      aria-label="Loading pencil sketch converter"
    />
  ),
});

const tips = [
  {
    icon: PenTool,
    title: 'Start with clear contrast',
    body: 'Well-lit photos with a clear subject turn into the cleanest sketches. Flat or dim lighting gives softer, fainter lines.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Tune the lines',
    body: 'Pick a style, then adjust line thickness and intensity. Lower the intensity to blend some of your original photo back in.',
  },
  {
    icon: Download,
    title: 'Save as PNG',
    body: 'Download the sketch as a PNG at your photo’s original resolution, up to 4096 pixels on the longest side.',
  },
  {
    icon: ShieldCheck,
    title: 'Stays on your device',
    body: 'The sketch is drawn in your browser using the Canvas API. Your photo is never uploaded to a server.',
  },
];

const faqs = [
  {
    q: "How does the photo to pencil sketch effect work?",
    a: "The tool uses your browser's Canvas API to detect edges and tones in your photo and redraws them as pencil-style lines. You can choose a style and adjust line thickness and intensity.",
  },
  {
    q: "What kind of photo works best?",
    a: "Well-lit photos with a clear subject and good contrast give the cleanest sketches. Flat or dim lighting produces softer, fainter lines.",
  },
  {
    q: "Can I use a pencil sketch as a profile picture?",
    a: "Yes, many people use sketches for creative or personal profiles. For job-search or corporate profiles, a realistic professional headshot is usually the safer choice.",
  },
  {
    q: "Is my photo uploaded to a server?",
    a: "No. The sketch is created in your browser and you download the PNG directly.",
  },
];

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen bg-tp-paper">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'Pencil Sketch', url: `${siteConfig.url}${path}` },
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

      <section className="px-4 pb-10 pt-16 sm:px-6 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">Free tool</p>
          <h1 className="font-display font-normal text-4xl leading-tight text-tp-ink sm:text-5xl md:text-6xl">
            Free Photo to Pencil Sketch Converter
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Upload a photo and turn it into a pencil sketch. Choose from four sketch styles, adjust line thickness and intensity, then download the result. Everything runs in your browser.
          </p>
        </div>
        <div className="mt-10">
          <PencilSketch />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">Sketch tips</h2>
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
