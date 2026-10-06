import type { Metadata } from 'next';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';
import { StyleFinderQuiz } from '@/components/tools/style-finder-quiz';

export const metadata: Metadata = {
  title: { absolute: 'Style Finder Quiz — Find Your Perfect Headshot Style | TailorPic' },
  description:
    'Answer 5 quick questions and discover which AI headshot style matches your industry, personality and goals. Free quiz, no account needed.',
  alternates: {
    canonical: '/tools/style-finder-quiz',
  },
  openGraph: generateOGMetadata({
    title: 'Style Finder Quiz — Find Your Perfect Headshot Style',
    description:
      'Answer 5 quick questions to discover which AI headshot style matches your industry and goals.',
    type: 'default',
    path: '/tools/style-finder-quiz',
  }),
  twitter: generateTwitterMetadata({
    title: 'Style Finder Quiz — Find Your Perfect Headshot Style',
    description:
      'Answer 5 quick questions to discover which AI headshot style matches your industry and goals.',
  }),
};

export default function StyleFinderQuizPage() {
  return (
    <>
      <Header />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Tools', url: `${siteConfig.url}/tools` },
          { name: 'Style Finder Quiz', url: `${siteConfig.url}/tools/style-finder-quiz` },
        ]}
      />

      <main className="bg-tp-paper">
        {/* Hero */}
        <section className="border-b border-tp-line bg-white px-4 pb-12 pt-24 text-center sm:pb-16 sm:pt-32">
          <p className="text-xs font-semibold uppercase tracking-brand text-tp-bronze">
            Free Tool
          </p>
          <h1 className="font-display font-normal mx-auto mt-3 max-w-3xl text-4xl text-tp-ink sm:text-5xl lg:text-6xl">
            Find Your Perfect Headshot Style
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Answer 5 quick questions about your industry, goals and preferences — we&apos;ll
            recommend the ideal AI headshot style and package for you.
          </p>
        </section>

        {/* Quiz */}
        <section className="px-4 py-12 sm:py-16">
          <StyleFinderQuiz />
        </section>

        {/* Info */}
        <section className="border-t border-tp-line bg-white px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display font-normal text-2xl text-tp-ink sm:text-3xl">
              40+ Professional Styles
            </h2>
            <p className="mt-4 text-base leading-relaxed text-tp-muted">
              TailorPic offers over 40 curated headshot styles — from corporate and executive to
              creative and editorial. Each style is trained on professional photography to deliver
              studio-quality results from your selfies.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
