import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { UploadCloud, Ruler } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { HeadshotResizerDemo } from '@/components/tools/tool-demos';

const title = 'Free Headshot Resizer: LinkedIn, Passport & ID Sizes';
const description = 'Resize your headshot for LinkedIn, Facebook, Twitter, passport and corporate ID photos. Free size guide and resizing tool by TailorPic.';
const path = '/tools/headshot-resizer';
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title: title, description: description, path: '/tools/headshot-resizer' }),
  twitter: generateTwitterMetadata({ title: title, description: description }),
};

const sizes = [
  { name: 'LinkedIn', size: '400 x 400 px', ratio: '1:1' },
  { name: 'Facebook', size: '170 x 170 px', ratio: '1:1' },
  { name: 'Twitter / X', size: '400 x 400 px', ratio: '1:1' },
  { name: 'Passport (US)', size: '2 x 2 inch (600 x 600 px at 300 DPI)', ratio: '1:1' },
  { name: 'Corporate ID', size: '300 x 400 px', ratio: '3:4' },
];

const faqs: { q: string; a: string }[] = [{"q": "What size should my LinkedIn headshot be?", "a": "LinkedIn recommends 400 x 400 pixels, with a square 1:1 ratio."}, {"q": "What is the passport photo size?", "a": "A US passport photo is 2 x 2 inches (51 x 51 mm), typically 600 x 600 pixels at 300 DPI."}, {"q": "Does resizing reduce quality?", "a": "Shrinking a high-resolution photo keeps it sharp. Enlarging a small photo can blur it, so start with the highest resolution you have."}, {"q": "Can TailorPic give me a headshot that already fits every platform?", "a": "Yes. TailorPic headshots are generated in high resolution so they crop cleanly to any platform."}];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: "Headshot Resizer",
      description,
      url: `${siteConfig.url}${path}`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

function UploadZone() {
  return (
    <Link
      href={ctaHref}
      aria-label="Upload your photo"
      className="group flex flex-col items-center justify-center gap-4 rounded-tp-card border-2 border-dashed border-tp-beige bg-white px-6 py-14 text-center transition-colors hover:border-tp-bronze hover:bg-tp-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-tp-beige/40 text-tp-bronze-ink">
        <UploadCloud className="h-7 w-7" aria-hidden="true" />
      </span>
      <span className="text-base font-semibold text-tp-ink">Drag &amp; drop your photo here</span>
      <span className="text-sm text-tp-muted">JPG, PNG or WEBP up to 10MB</span>
      <span className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}>Upload your photo</span>
    </Link>
  );
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: "Headshot Resizer", url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />
      <main id="main-content" className="bg-tp-paper">

      <section className="px-4 pb-10 pt-16 sm:px-6 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">Free tool</p>
          <h1 className="font-display font-normal text-4xl leading-tight text-tp-ink sm:text-5xl md:text-6xl">Free Headshot Resizer</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">Get your headshot in exactly the right size for LinkedIn, Facebook, Twitter, passport and corporate ID photos.</p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl">
          <UploadZone />
        </div>
      </section>

      <HeadshotResizerDemo />

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">Choose a size</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
            {sizes.map((s) => (
              <Link key={s.name} href={ctaHref} className="rounded-tp-card border border-tp-line bg-white p-5 text-center transition-colors hover:border-tp-bronze">
                <Ruler className="mx-auto h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
                <p className="mt-3 text-sm font-semibold text-tp-ink">{s.name}</p>
                <p className="mt-1 text-xs text-tp-muted">{s.size}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">Platform size guide</h2>
          <div className="mt-8 overflow-x-auto rounded-tp-card border border-tp-line bg-white">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead className="bg-tp-beige/30 text-tp-ink">
                <tr><th className="px-5 py-3 font-semibold">Platform</th><th className="px-5 py-3 font-semibold">Recommended size</th><th className="px-5 py-3 font-semibold">Ratio</th></tr>
              </thead>
              <tbody className="divide-y divide-tp-line text-tp-muted">
                {sizes.map((s) => (
                  <tr key={s.name}><td className="px-5 py-3 font-medium text-tp-ink">{s.name}</td><td className="px-5 py-3">{s.size}</td><td className="px-5 py-3">{s.ratio}</td></tr>
                ))}
              </tbody>
            </table>
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
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Start with a better photo</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-tp-beige sm:text-base">Resizing works best on a great source image. TailorPic creates studio-quality headshots in minutes.</p>
          <Link href={ctaHref} className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-7 bg-tp-bronze text-tp-black hover:bg-tp-beige')}>
            Want professional headshots? Try TailorPic →
          </Link>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
