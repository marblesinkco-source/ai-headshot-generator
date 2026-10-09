import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Type, Move, LayoutGrid, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'Free Image Watermark & Text Overlay Maker | TailorPic';
const description =
  'Add custom text watermarks to your photos. Choose font, size, color, opacity and position. Single or tiled pattern. Everything runs in your browser.';
const path = '/tools/watermark-maker';
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const WatermarkMaker = dynamic(() => import('@/components/tools/watermark-maker'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto h-96 w-full max-w-5xl animate-pulse rounded-tp-card border border-tp-line bg-white"
      aria-label="Loading watermark maker"
    />
  ),
});

const tips = [
  {
    icon: Type,
    title: 'Customize your text',
    body: 'Type any text, pick a font family and size, then set the color and opacity. The watermark renders in real time so you can tweak until it looks right.',
  },
  {
    icon: Move,
    title: 'Place it anywhere',
    body: 'Use the 9-position grid for quick placement or drag the watermark to the exact spot you want. Rotate it for a diagonal look.',
  },
  {
    icon: LayoutGrid,
    title: 'Tile for full coverage',
    body: 'Switch to tiled mode and the watermark repeats across the whole image in a diagonal pattern. Great for proofs and portfolio previews.',
  },
  {
    icon: ShieldCheck,
    title: 'Stays on your device',
    body: 'The watermark is drawn in your browser with the Canvas API. Your photo is never sent to a server and you download the finished image directly.',
  },
];

const faqs = [
  {
    q: 'Can I add a text watermark to my photos for free?',
    a: 'Yes. Type your text, choose the font, size, color and opacity, then download the watermarked image.',
  },
  {
    q: 'Is my photo uploaded anywhere?',
    a: 'No. The watermark is drawn in your browser using the Canvas API, and your photo is never sent to a server.',
  },
  {
    q: 'What is the difference between single and tiled watermarks?',
    a: 'A single watermark sits in one position you choose. Tiled mode repeats the text across the whole image, which makes it harder to crop out and is useful for proofs and portfolio previews.',
  },
  {
    q: 'Will a watermark fully prevent my photo from being copied?',
    a: 'No. A watermark discourages casual reuse and shows ownership, but it cannot technically stop someone from copying an image.',
  },
];

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen bg-tp-paper">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'Watermark Maker', url: `${siteConfig.url}${path}` },
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
            Free Image Watermark & Text Overlay Maker
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Add a custom text watermark to your photos. Choose the font, size, color, opacity and position, as a single mark or a tiled pattern. Everything runs in your browser.
          </p>
        </div>
        <div className="mt-10">
          <WatermarkMaker />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">Watermark tips</h2>
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
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Want a headshot worth protecting?</h2>
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
