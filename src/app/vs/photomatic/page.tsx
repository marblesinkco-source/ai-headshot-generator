import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const competitor = "Photomatic";
const title = `TailorPic vs ${competitor} — AI Headshot Generator Comparison`;
const description =
  "Compare TailorPic vs Photomatic. Photomatic is an AI portrait and photo tool; TailorPic creates AI headshots from your selfies, from $1.99.";
const path = '/vs/photomatic';
const canonicalUrl = 'https://www.tailorpic.com/vs/photomatic';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: generateOGMetadata({ title, description, path: path, type: 'vs' }),
  twitter: generateTwitterMetadata({ title, description, type: 'vs' }),
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'TailorPic AI Headshots',
  description:
    'AI headshot generator delivering up to 160 photos across 12 categories, trained with LoRA fine-tuning and results typically delivered in under 2 hours, from $1.99.',
  brand: { '@type': 'Brand', name: siteConfig.name },
  url: canonicalUrl,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  offers: {
    '@type': 'Offer',
    price: '1.99',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: `${siteConfig.url}/auth/register`,
  },
};

const intro =
  "Photomatic offers AI-powered portrait and photo generation. TailorPic is built around a dedicated model trained on your selfies, generating professional headshots in 12 categories with one-time packages from $1.99.";

const rows: { label: string; tailorpic: string; other: string }[] = [
  {
    "label": "Starting price",
    "tailorpic": "from $1.99",
    "other": "Plans vary; check their site"
  },
  {
    "label": "Photos included",
    "tailorpic": "1 to 160, depending on package",
    "other": "Varies by plan; check their site"
  },
  {
    "label": "Delivery time",
    "tailorpic": "Results within hours",
    "other": "Check their site for current turnaround"
  },
  {
    "label": "Core purpose",
    "tailorpic": "AI headshots of you from selfies",
    "other": "AI portrait and photo generation"
  },
  {
    "label": "Training method",
    "tailorpic": "LoRA fine-tuning on your own photos",
    "other": "Check their site for method details"
  },
  {
    "label": "Pricing model",
    "tailorpic": "One-time payment, no subscription",
    "other": "Check their site for pricing model"
  },
  {
    "label": "Professional headshots",
    "tailorpic": "Dedicated business and LinkedIn category",
    "other": "Portrait-focused; check their site for styles"
  },
  {
    "label": "Dating and social photos",
    "tailorpic": "Dedicated dating category",
    "other": "Check their site for categories"
  },
  {
    "label": "Style variety",
    "tailorpic": "12 categories in one order",
    "other": "Check their site for available styles"
  },
  {
    "label": "Team features",
    "tailorpic": "Team and enterprise options available",
    "other": "Check their site for team plans"
  }
];

const differences = [
  {
    "title": "A low entry price",
    "body": "TailorPic packages start from $1.99, with no subscription to manage."
  },
  {
    "title": "12 categories in one order",
    "body": "A single TailorPic order covers business, dating, creative and more, so you can reuse one upload across many needs."
  },
  {
    "title": "A personal model",
    "body": "TailorPic fine-tunes a dedicated model on your selfies so results keep your real features."
  },
  {
    "title": "Trade-off on speed",
    "body": "TailorPic results are ready in under 2 hours for most orders; guaranteed within 24 hours, since a dedicated model is trained on your uploads. Compare current turnaround on their site."
  }
];

const useCases = {
  tailorpic: [
  "A single small payment with no subscription",
  "A likeness trained on your own photos",
  "Dedicated categories for work, dating and social",
  "Team and enterprise options"
],
  other: [
  "To evaluate another AI portrait workflow",
  "To compare styles and sample outputs",
  "To review Photomatic's current plans and features",
  "A different interface or pricing structure"
],
};

const faqs = [
  {
    "question": "Is TailorPic cheaper than Photomatic?",
    "answer": "TailorPic packages start from $1.99 and go up to 160 photos. Photomatic's plans vary, so compare against their current price page."
  },
  {
    "question": "How does TailorPic create headshots?",
    "answer": "It fine-tunes a dedicated LoRA model on your selfies, then generates photos across 12 categories."
  },
  {
    "question": "How long does TailorPic take?",
    "answer": "Results within hours, since a dedicated model is fine-tuned on your uploads."
  },
  {
    "question": "Do I need a subscription with TailorPic?",
    "answer": "No. Every package is a single one-time payment (from $1.99) with no recurring fees."
  },
  {
    "question": "Should I check Photomatic's details myself?",
    "answer": "Yes. Their features and pricing change, so confirm on their website before deciding."
  }
];

export default function VsPhotomaticPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-tp-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
        <BreadcrumbSchema
          items={[
            { name: 'Home', url: siteConfig.url },
            { name: 'VS', url: `${siteConfig.url}/vs` },
            { name: competitor, url: `${siteConfig.url}${path}` },
          ]}
        />
        <FAQSchema items={faqs} />

        {/* Hero */}
        <section className="bg-tp-black py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-tp-bronze">Comparison</p>
            <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-tp-paper sm:text-5xl lg:text-6xl">
              TailorPic <span className="text-tp-bronze">vs</span> {competitor}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-beige">{intro}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={buttonVariants({ variant: 'primary', size: 'lg' }) + ' bg-tp-bronze text-tp-black hover:bg-tp-beige'}>
                Get headshots from $1.99
              </Link>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-center text-3xl font-display font-normal text-tp-ink">Side-by-side comparison</h2>
            <div className="overflow-x-auto rounded-tp-card border border-tp-line bg-white">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-tp-line bg-tp-paper">
                    <th scope="col" className="px-5 py-4 font-semibold text-tp-muted">Feature</th>
                    <th scope="col" className="px-5 py-4 font-semibold text-tp-bronze-ink">TailorPic</th>
                    <th scope="col" className="px-5 py-4 font-semibold text-tp-muted">{competitor}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label} className="border-b border-tp-line last:border-b-0">
                      <th scope="row" className="px-5 py-4 font-medium text-tp-ink">{row.label}</th>
                      <td className="bg-tp-bronze/10 px-5 py-4 font-medium text-tp-ink">
                        <span className="inline-flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
                          {row.tailorpic}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-tp-muted">{row.other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-xs text-tp-muted">
              Competitor details are approximate and based on publicly listed information. Pricing and features change, so confirm on their website before buying.
            </p>
          </div>
        </section>

        {/* Key differences */}
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-10 text-center text-3xl font-display font-normal text-tp-ink">Key differences</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {differences.map((d) => (
                <div key={d.title} className="rounded-tp-card border border-tp-line bg-tp-paper p-7">
                  <h3 className="mb-2 text-lg font-semibold text-tp-ink">{d.title}</h3>
                  <p className="text-sm leading-relaxed text-tp-muted">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-10 text-center text-3xl font-display font-normal text-tp-ink">Which one should you choose?</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-tp-card border border-tp-bronze bg-white p-7">
                <h3 className="mb-4 text-lg font-semibold text-tp-bronze-ink">Choose TailorPic if you want</h3>
                <ul className="space-y-3">
                  {useCases.tailorpic.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-tp-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-tp-card border border-tp-line bg-white p-7">
                <h3 className="mb-4 text-lg font-semibold text-tp-ink">Choose {competitor} if you want</h3>
                <ul className="space-y-3">
                  {useCases.other.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-tp-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-tp-muted" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-10 text-center text-3xl font-display font-normal text-tp-ink">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-tp-card border border-tp-line bg-tp-paper p-6">
                  <h3 className="mb-2 font-semibold text-tp-ink">{faq.question}</h3>
                  <p className="text-sm leading-relaxed text-tp-muted">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-tp-black py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-display font-normal text-tp-paper">Ready for your best headshots?</h2>
            <p className="mx-auto mt-4 max-w-xl text-tp-beige">
              Professional photos across 12 categories from $1.99. No subscription, results typically delivered in under 2 hours.
            </p>
            <div className="mt-8">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={buttonVariants({ variant: 'primary', size: 'lg' }) + ' bg-tp-bronze text-tp-black hover:bg-tp-beige'}>
                Get started
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
