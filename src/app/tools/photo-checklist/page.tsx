import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { DataPrivacyStrip } from '@/components/marketing/data-privacy-strip';
import { buttonVariants } from '@/components/ui/button';
import { PhotoChecklist } from '@/components/tools/photo-checklist';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { cn } from '@/lib/utils';

const PAGE_TITLE = 'Photo Upload Checklist';
const PAGE_DESCRIPTION =
  'Check your photos against 16 quality points for lighting, composition, sharpness, and subject before uploading. Get the best results from your AI headshots. Free, no sign-up.';
const PATH = '/tools/photo-checklist';

export const metadata: Metadata = {
  title: { absolute: `${PAGE_TITLE} | ${siteConfig.name}` },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: generateOGMetadata({
    title: `${PAGE_TITLE} | ${siteConfig.name}`,
    description: PAGE_DESCRIPTION,
    type: 'default',
    path: PATH,
  }),
  twitter: generateTwitterMetadata({
    title: `${PAGE_TITLE} | ${siteConfig.name}`,
    description: PAGE_DESCRIPTION,
    type: 'default',
  }),
};

const TIPS = [
  {
    title: 'Use several different photos',
    body: 'Mix angles, outfits, and backgrounds. Variety helps the AI learn how you look rather than one single pose.',
  },
  {
    title: 'Take photos in daylight',
    body: 'Stand facing a window on an overcast day or in open shade. Soft light is flattering and easy to get right.',
  },
  {
    title: 'Keep the camera at eye level',
    body: 'Prop your phone on a shelf or ask a friend to help. Shooting from far above or below distorts proportions.',
  },
  {
    title: 'Skip edited or screenshot images',
    body: 'Use original files straight from your camera roll. Re-saved, filtered, or cropped copies lose the detail the AI relies on.',
  },
];

const faqs = [
  {
    q: 'What makes a good source photo for AI headshots?',
    a: 'Clear, sharp photos with soft, even lighting, your face fully visible, and a natural expression. Using several different photos with varied angles, outfits and backgrounds gives the AI a better sense of how you look.',
  },
  {
    q: 'Does the checklist upload or store my photos?',
    a: 'No. The checklist runs in your browser, so you tick off the checks yourself and nothing is sent anywhere.',
  },
  {
    q: 'Should I avoid sunglasses, hats and heavy filters?',
    a: 'Yes. Anything that covers your face or alters your features, such as sunglasses, hats or beauty filters, makes it harder for the AI to capture your real likeness.',
  },
  {
    q: 'Can I use photos taken on my phone?',
    a: 'Yes. Modern phone cameras work well as long as the photo is sharp, well lit and not heavily compressed or edited.',
  },
];

export default function PhotoChecklistPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Tools', url: `${siteConfig.url}/tools` },
          { name: 'Photo Checklist', url: `${siteConfig.url}${PATH}` },
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze">
            Free Tool
          </div>
          <h1 className="font-display font-normal text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {PAGE_TITLE}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
            Go through 16 quick checks on lighting, composition, quality, and subject so your photos give the AI the
            best chance at great headshots. It runs entirely in your browser.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="bg-white py-16 sm:py-20">
        <PhotoChecklist />
      </section>

      {/* Tips */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">
            Tips for better source photos
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {TIPS.map((tip) => (
              <div key={tip.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <h3 className="flex items-start gap-2 text-base font-semibold text-tp-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
                  {tip.title}
                </h3>
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

      {/* CTA */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display font-normal text-3xl text-white sm:text-4xl">
            Photos ready? Create your AI headshots
          </h2>
          <p className="mt-4 text-tp-beige/60">Upload your best photos and choose the package that fits your needs.</p>
          <div className="mt-8">
            <Link
              href="/pricing"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-tp-bronze text-tp-black shadow-none hover:bg-tp-bronze/90',
              )}
            >
              View pricing <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <DataPrivacyStrip />
        </div>
      </div>

      <Footer />
    </main>
  );
}
