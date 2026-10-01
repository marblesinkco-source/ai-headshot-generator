import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { AnalyzerForm } from './analyzer-form';

const title = 'Free LinkedIn Photo Analyzer: Score Your Profile Photo';
const description =
  'Get an instant score and actionable tips for your LinkedIn profile photo. Free analysis of lighting, background, framing and professionalism by TailorPic.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/tools/linkedin-photo-analyzer' },
  openGraph: generateOGMetadata({ title: title, description: description, path: '/tools/linkedin-photo-analyzer' }),
  twitter: generateTwitterMetadata({ title: title, description: description }),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'LinkedIn Photo Analyzer',
  description,
  url: `${siteConfig.url}/tools/linkedin-photo-analyzer`,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

export default function LinkedInPhotoAnalyzerPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'LinkedIn Photo Analyzer', url: `${siteConfig.url}/tools/linkedin-photo-analyzer` },
        ]}
      />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            LinkedIn Photo Analyzer
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Answer 8 quick questions about your current profile photo and get an instant score out of
            100, plus specific tips to fix whatever is holding it back. No upload needed.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <AnalyzerForm />
      </section>

      <section className="border-t border-tp-line bg-tp-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-display font-normal text-tp-ink sm:text-3xl">
            Skip the checklist. Get a photo that passes every test.
          </h2>
          <p className="mt-3 text-tp-muted">
            Upload a few selfies and get studio-quality LinkedIn headshots in hours, from $9.90.
          </p>
          <Link
            href="/auth/register"
            className={buttonVariants({ size: 'lg', className: 'mt-6' })}
          >
            Get AI Headshots — From $9.90
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
