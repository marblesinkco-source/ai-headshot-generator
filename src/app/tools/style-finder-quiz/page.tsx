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

const faqs = [
  {
    q: 'How does the style finder quiz work?',
    a: 'You answer a few quick questions about your industry, goals and preferences, and the quiz recommends a headshot style and package that fits.',
  },
  {
    q: 'How accurate are the recommendations?',
    a: 'The quiz is a guide based on your answers, not a guarantee. Treat the result as a starting point and choose the style that feels right for how you want to be seen.',
  },
  {
    q: 'Do I need an account to take the quiz?',
    a: 'No. The quiz is a free tool you can try without signing up.',
  },
  {
    q: 'Can I change my style after taking the quiz?',
    a: 'Yes. The recommendation is only a suggestion, and you can pick a different style or package when you create your headshots.',
  },
];

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

      <main id="main-content" className="bg-tp-paper">
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
      </main>

      <Footer />
    </>
  );
}
