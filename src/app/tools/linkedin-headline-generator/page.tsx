import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { HeadlineForm } from './headline-form';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const title = 'Free LinkedIn Headline Generator: 5 Headline Ideas';
const description =
  'Free LinkedIn headline generator. Enter your job title, industry and skills to get 5 headline ideas with a character counter and one-click copy.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/tools/linkedin-headline-generator' },
  openGraph: generateOGMetadata({ title, description, path: '/tools/linkedin-headline-generator' }),
  twitter: generateTwitterMetadata({ title, description }),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'LinkedIn Headline Generator',
  description,
  url: `${siteConfig.url}/tools/linkedin-headline-generator`,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const tips = [
  {
    title: 'Lead with what people search for',
    body: 'Recruiters search by job title and skill. Put your real title and your strongest keyword in the first few words.',
  },
  {
    title: 'Say who you help and how',
    body: 'A headline that names an audience and an outcome tells people why to read your profile, not just what your job is called.',
  },
  {
    title: 'Use separators to make it scannable',
    body: 'Pipes and arrows break a headline into short chunks. Two or three chunks are easier to read than one long sentence.',
  },
  {
    title: 'Stay inside 220 characters',
    body: 'LinkedIn cuts off anything longer, and many views show only the first part. Keep the important words up front.',
  },
  {
    title: 'Match your headline to your photo',
    body: 'Your photo and headline appear together in search results, comments and messages. Make sure both say the same thing about you.',
  },
];

const faqs = [
  {
    q: "How long can a LinkedIn headline be?",
    a: "LinkedIn headlines can be up to 220 characters. Many views show only the first part, so keep your most important words at the start.",
  },
  {
    q: "What keywords should I put in my headline?",
    a: "Use your real job title and your strongest skill or specialty. Recruiters search by title and skill, so these terms help the right people find your profile.",
  },
  {
    q: "Should my headline be just my job title?",
    a: "It does not have to be. By default LinkedIn shows your current job title, but you can replace it with a headline that also names who you help and the outcome you deliver.",
  },
  {
    q: "Can I edit the generated headlines?",
    a: "Yes. The ideas are built on common formulas, and you can copy any of them and edit it. Use the character counter to stay within the limit.",
  },
];

export default function LinkedInHeadlineGeneratorPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'LinkedIn Headline Generator', url: `${siteConfig.url}/tools/linkedin-headline-generator` },
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

      <section className="bg-tp-black pt-16">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze">Free tool</p>
          <h1 className="mt-3 text-3xl font-display font-normal tracking-tight text-white sm:text-5xl">
            LinkedIn Headline Generator
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-beige sm:text-lg">
            Tell us your job title, industry and skills. Get five headline ideas built on common
            formulas, ready to copy and edit.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <HeadlineForm />
      </section>

      <section className="border-t border-tp-line bg-tp-paper">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-normal text-tp-ink sm:text-3xl">
            Tips for a Great LinkedIn Headline
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {tips.map((tip, i) => (
              <li key={tip.title} className="rounded-tp-card border border-tp-line bg-white p-5">
                <span className="text-sm font-semibold text-tp-bronze-ink">Tip {i + 1}</span>
                <h3 className="mt-1 text-base font-semibold text-tp-ink">{tip.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{tip.body}</p>
              </li>
            ))}
          </ol>
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

      <section className="bg-tp-ink">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-display font-normal text-white sm:text-3xl">
            Pair your new headline with a professional photo
          </h2>
          <p className="mt-3 text-tp-beige">
            A strong headline gets the click. A professional photo helps your profile make a good
            first impression. Create yours with AI from selfies, from {BASE_PRICE_DISPLAY}.
          </p>
          <Link href="/headshots" className={buttonVariants({ size: 'lg', className: 'mt-6' })}>
            See AI Headshots
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
