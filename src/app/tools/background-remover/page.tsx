import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { UploadCloud, Zap, Sparkles, BadgeCheck } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { BackgroundRemoverDemo } from '@/components/tools/tool-demos';

const title = 'Free AI Background Remover for Photos and Headshots';
const description = 'Remove backgrounds from your photos instantly with AI. Perfect for professional headshots, product photos and social media with clean, natural-looking edges.';
const path = '/tools/background-remover';
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title: title, description: description, path: '/tools/background-remover' }),
  twitter: generateTwitterMetadata({ title: title, description: description }),
};

const faqs: { q: string; a: string }[] = [{"q": "Is the background remover really free?", "a": "Yes. You can get started for free with no credit card required."}, {"q": "What file formats are supported?", "a": "JPG, PNG and WEBP images up to 10MB work best."}, {"q": "Will it work on hair and fine details?", "a": "Our AI is designed to preserve fine details such as hair strands and glasses for natural-looking results."}, {"q": "Can I get a full professional headshot instead?", "a": "Yes. TailorPic generates studio-quality AI headshots with the background, lighting and attire already polished."}];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: "AI Background Remover",
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
          { name: "Background Remover", url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />
      <main id="main-content" className="bg-tp-paper">

      <section className="px-4 pb-10 pt-16 sm:px-6 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">Free tool</p>
          <h1 className="font-display font-normal text-4xl leading-tight text-tp-ink sm:text-5xl md:text-6xl">Free AI Background Remover</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">Remove backgrounds from your photos instantly with AI. Perfect for professional headshots, product photos, and social media.</p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl">
          <UploadZone />
        </div>
      </section>

      <BackgroundRemoverDemo />

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          <div className="rounded-tp-card border border-tp-line bg-white p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-beige/40 text-tp-bronze-ink"><Zap className="h-5 w-5" aria-hidden="true" /></span>
            <h2 className="mt-4 font-display text-xl font-normal text-tp-ink">Instant Results</h2>
            <p className="mt-2 text-sm leading-relaxed text-tp-muted">Clean cutouts in seconds, with no editing skills or manual selection needed.</p>
          </div>
          <div className="rounded-tp-card border border-tp-line bg-white p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-beige/40 text-tp-bronze-ink"><Sparkles className="h-5 w-5" aria-hidden="true" /></span>
            <h2 className="mt-4 font-display text-xl font-normal text-tp-ink">HD Quality</h2>
            <p className="mt-2 text-sm leading-relaxed text-tp-muted">Crisp edges around hair and shoulders, preserved at full resolution.</p>
          </div>
          <div className="rounded-tp-card border border-tp-line bg-white p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-beige/40 text-tp-bronze-ink"><BadgeCheck className="h-5 w-5" aria-hidden="true" /></span>
            <h2 className="mt-4 font-display text-xl font-normal text-tp-ink">No Watermark</h2>
            <p className="mt-2 text-sm leading-relaxed text-tp-muted">Download your finished image clean, ready for LinkedIn, resumes and stores.</p>
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
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Want more than a cutout?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-tp-beige sm:text-base">TailorPic creates studio-quality headshots from your selfies, backed by a quality commitment.</p>
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
