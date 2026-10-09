import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { DataPrivacyStrip } from '@/components/marketing/data-privacy-strip';
import { buttonVariants } from '@/components/ui/button';
import { PfpMaker } from '@/components/tools/pfp-maker';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { cn } from '@/lib/utils';

const PAGE_TITLE = 'Free Profile Picture Maker';
const PAGE_DESCRIPTION =
  'Resize and crop your profile picture for LinkedIn, Instagram, X, Facebook, Slack, Zoom and Teams. Free, runs in your browser, and your photo never leaves your device.';
const PATH = '/tools/pfp-maker';

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

const PLATFORM_SIZES = [
  { name: 'LinkedIn', size: '400 × 400 px' },
  { name: 'Instagram', size: '320 × 320 px' },
  { name: 'Twitter/X', size: '400 × 400 px' },
  { name: 'Facebook', size: '170 × 170 px' },
  { name: 'Slack', size: '512 × 512 px' },
  { name: 'Zoom', size: '150 × 150 px' },
  { name: 'Teams', size: '300 × 300 px' },
];

const faqs = [
  {
    q: "What size should a profile picture be?",
    a: "It depends on the platform. This tool exports LinkedIn at 400 \u00d7 400 px, Instagram at 320 \u00d7 320 px, Twitter/X at 400 \u00d7 400 px, Facebook at 170 \u00d7 170 px, Slack at 512 \u00d7 512 px, Zoom at 150 \u00d7 150 px and Teams at 300 \u00d7 300 px.",
  },
  {
    q: "What file format does the PFP maker export?",
    a: "It downloads a correctly sized PNG, which keeps edges sharp and works on all major platforms.",
  },
  {
    q: "Why is my profile picture cropped by the platform?",
    a: "Many platforms display profile pictures in a circle or crop them further. Keep your face centered with some room around it so nothing important is cut off.",
  },
  {
    q: "Are my photos uploaded to a server?",
    a: "No. Everything runs in your browser, so your photo stays on your device.",
  },
];

export default function PfpMakerPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Tools', url: `${siteConfig.url}/tools` },
          { name: 'PFP Maker', url: `${siteConfig.url}${PATH}` },
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
            Pick a platform, position your photo, and download a correctly sized PNG. Everything runs in your browser.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="bg-white py-16 sm:py-20">
        <PfpMaker />
      </section>

      {/* Platform sizes */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">
            Profile picture sizes by platform
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-tp-muted">
            These are the sizes this tool exports. Platforms may crop or resize further, so keep your face centered with
            some room around it.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PLATFORM_SIZES.map((p) => (
              <div key={p.name} className="rounded-tp-card border border-tp-line bg-white p-5">
                <h3 className="text-base font-semibold text-tp-ink">{p.name}</h3>
                <p className="mt-1 text-sm text-tp-muted">{p.size}</p>
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
            Need a better photo to crop?
          </h2>
          <p className="mt-4 text-tp-beige/60">
            Resizing fixes the size, not the photo. Create AI headshots from a selfie and use them on every platform.
          </p>
          <div className="mt-8">
            <Link
              href="/headshots"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-tp-bronze text-tp-black shadow-none hover:bg-tp-bronze/90',
              )}
            >
              Create your AI headshots <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
