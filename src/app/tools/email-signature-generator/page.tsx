import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';
import { SignatureForm } from './signature-form';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const title = 'Free Email Signature Generator with Photo | TailorPic';
const description =
  'Create a professional email signature with your photo in seconds. Pick a layout and color, preview it live, and copy the HTML into Gmail, Outlook or Apple Mail.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/tools/email-signature-generator' },
  openGraph: generateOGMetadata({ title: title, description: description, path: '/tools/email-signature-generator' }),
  twitter: generateTwitterMetadata({ title: title, description: description }),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Email Signature Generator',
  description,
  url: `${siteConfig.url}/tools/email-signature-generator`,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const faqs: { q: string; a: string }[] = [
  {
    q: "How do I add a photo to my email signature?",
    a: "Fill in your details, add your photo, pick a layout and color, then copy the generated HTML signature and paste it into your email client's signature settings. Gmail, Outlook and Apple Mail all accept HTML signatures.",
  },
  {
    q: "What size should my email signature photo be?",
    a: "A small, square photo works best. Large images can slow loading and push your signature text out of place, so keep the file lightweight and crop it to a square before adding it.",
  },
  {
    q: "Will my signature look the same in every email client?",
    a: "Email clients render HTML differently, so small differences can appear. Simple layouts with few styles are the most reliable, and it helps to send yourself a test email before you rely on it.",
  },
  {
    q: "Is the email signature generator free?",
    a: "Yes, the generator is free to use.",
  },
];

export default function EmailSignatureGeneratorPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Email Signature Generator', url: `${siteConfig.url}/tools/email-signature-generator` },
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

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            Email Signature Generator
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Build a clean, professional email signature with your photo. Pick a layout and color, watch
            the preview update live, then copy it into your email client.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <SignatureForm />
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

      <section className="border-t border-tp-line bg-tp-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-display font-normal text-tp-ink sm:text-3xl">
            Ready for a better headshot in your signature?
          </h2>
          <p className="mt-3 text-tp-muted">
            Upload a few selfies and get studio-quality photos in hours, from {BASE_PRICE_DISPLAY}.
          </p>
          <Link
            href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
            className={buttonVariants({ size: 'lg', className: 'mt-6' })}
          >
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
