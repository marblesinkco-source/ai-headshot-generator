import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { SlidersHorizontal, Crop, Layers, Mail } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'Free Headshot Photo Compressor | TailorPic';
const description =
  'Reduce the file size of your headshot right in your browser. Pick a target like 100KB or 500KB, keep your dimensions, and download a compressed JPG. Nothing is uploaded.';
const path = '/tools/headshot-compressor';
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const HeadshotCompressor = dynamic(() => import('@/components/tools/headshot-compressor'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto h-80 w-full max-w-3xl animate-pulse rounded-tp-card border border-tp-line bg-white"
      aria-label="Loading compressor"
    />
  ),
});

const tips = [
  {
    icon: SlidersHorizontal,
    title: 'Start around 80 quality',
    body: 'Quality in the 70 to 85 range usually shrinks a photo a lot while looking nearly identical on screen. Go lower only if you need to hit a strict limit.',
  },
  {
    icon: Crop,
    title: 'Resize for big savings',
    body: 'A photo straight from a phone is often much larger than any profile slot displays. Setting a max dimension cuts file size more than quality alone.',
  },
  {
    icon: Layers,
    title: 'Compress once, from the original',
    body: 'Each JPG save loses a little detail. Always compress from your original file instead of re-compressing a file you already compressed.',
  },
  {
    icon: Mail,
    title: 'Check the upload limit',
    body: 'Job portals, forms and email often cap attachments. Choose a target size preset that sits under the limit stated on the form.',
  },
];

const faqs: { q: string; a: string }[] = [
  { q: "How do I reduce the file size of a headshot?", a: "Upload your photo, choose a target size preset or set the quality yourself, and download the compressed JPG. Resizing to a smaller maximum dimension also reduces file size, often more than lowering quality alone." },
  { q: "Does compressing a photo reduce its quality?", a: "JPG compression is lossy, so some detail is lost. Moderate quality settings usually look very similar on screen, and lower settings produce smaller files with more visible loss. Compress from your original file rather than a file you already compressed." },
  { q: "What file size limit should I aim for?", a: "Check the limit stated on the form, job portal, or email service you are using, then choose a target size preset that sits under it." },
  { q: "Is my photo uploaded when I compress it?", a: "No. Compression runs in your browser, so your photo stays on your device." },
];

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen bg-tp-paper">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'Headshot Compressor', url: `${siteConfig.url}${path}` },
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
            Free Headshot Photo Compressor
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Make your photo file smaller without changing its dimensions. Choose a target size or set the quality yourself. Everything runs in your browser, so your photo stays on your device.
          </p>
        </div>
        <div className="mt-10">
          <HeadshotCompressor />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">Compression tips</h2>
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
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Want a headshot worth compressing?</h2>
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
