import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Palette, Copy, Download, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'Free Photo Color Palette Extractor | TailorPic';
const description =
  'Extract the dominant color palette from any photo. Get HEX and RGB codes, copy individual colors or the full palette. Everything runs in your browser.';
const path = '/tools/color-palette-extractor';
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const ColorPaletteExtractor = dynamic(() => import('@/components/tools/color-palette-extractor'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto h-96 w-full max-w-4xl animate-pulse rounded-tp-card border border-tp-line bg-white"
      aria-label="Loading color palette extractor"
    />
  ),
});

const tips = [
  {
    icon: Palette,
    title: 'Extract dominant colors',
    body: 'Upload any photo and the tool pulls out the five to eight most prominent colors using pixel analysis. No account or server needed.',
  },
  {
    icon: Copy,
    title: 'Copy codes instantly',
    body: 'Each color shows its HEX and RGB values with a one-click copy button. Grab a single swatch or the full palette as CSS variables.',
  },
  {
    icon: Download,
    title: 'Download the palette',
    body: 'Save the palette as a PNG color strip to reference later, share with your designer or drop into a mood board.',
  },
  {
    icon: ShieldCheck,
    title: 'Stays on your device',
    body: 'The palette is extracted in your browser using the Canvas API. Your photo is never uploaded to a server.',
  },
];

const faqs = [
  {
    q: "How does the tool find the colors in my photo?",
    a: "It analyzes the pixels of your photo in your browser using the Canvas API and returns its most prominent colors.",
  },
  {
    q: "Which color formats do I get?",
    a: "Each color shows its HEX and RGB values with a one-click copy button. You can copy a single swatch or the full palette as CSS variables.",
  },
  {
    q: "Can I use a headshot to keep my brand consistent?",
    a: "Yes. Extract the colors from your headshot, such as clothing or background tones, and compare them with your brand colors so your photo and materials look coordinated.",
  },
  {
    q: "Is my photo uploaded?",
    a: "No. The palette is extracted in your browser and your photo is never uploaded to a server. You can save the result as a PNG color strip.",
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'Color Palette Extractor', url: `${siteConfig.url}${path}` },
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
            Free Photo Color Palette Extractor
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Upload a photo and get its dominant colors as HEX and RGB codes. Copy a single color or the whole palette, then download it as a PNG strip. Everything runs in your browser.
          </p>
        </div>
        <div className="mt-10">
          <ColorPaletteExtractor />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">Palette tips</h2>
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
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Need a headshot that matches your brand?</h2>
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
