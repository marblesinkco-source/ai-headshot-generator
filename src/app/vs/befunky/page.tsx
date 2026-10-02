import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const competitor = "BeFunky";
const title = `TailorPic vs ${competitor} — AI Headshot Generator Comparison`;
const description =
  "Compare TailorPic vs BeFunky. BeFunky is an online photo editor and collage maker; TailorPic creates AI headshots from your selfies, from $1.99.";
const path = '/vs/befunky';
const canonicalUrl = 'https://www.tailorpic.com/vs/befunky';

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
    'AI headshot generator delivering up to 160 photos across 11 categories, trained with LoRA fine-tuning and delivered within 24 hours, from $1.99.',
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
  "BeFunky is a browser-based photo editor with collage and graphic design tools. TailorPic is built for people: it trains a personal model on your selfies and generates professional headshots in 11 categories.";

const rows: { label: string; tailorpic: string; other: string }[] = [
  {
    "label": "Starting price",
    "tailorpic": "from $1.99",
    "other": "Free tier and paid plans; check their site"
  },
  {
    "label": "Photos included",
    "tailorpic": "1 to 160, depending on package",
    "other": "Edits the photos you upload"
  },
  {
    "label": "Delivery time",
    "tailorpic": "Within 24 hours",
    "other": "Editing is typically instant"
  },
  {
    "label": "Core purpose",
    "tailorpic": "AI headshots of you from selfies",
    "other": "Online photo editing, collages and design"
  },
  {
    "label": "Training method",
    "tailorpic": "LoRA fine-tuning on your own photos",
    "other": "Editing tools applied to existing images"
  },
  {
    "label": "Pricing model",
    "tailorpic": "One-time payment, no subscription",
    "other": "Free and subscription-based options"
  },
  {
    "label": "Professional headshots",
    "tailorpic": "Dedicated business and LinkedIn category",
    "other": "Possible by retouching a photo you already have"
  },
  {
    "label": "Dating and social photos",
    "tailorpic": "Dedicated dating category",
    "other": "Not a known focus"
  },
  {
    "label": "Collage and graphic design",
    "tailorpic": "Not a focus",
    "other": "A core strength"
  },
  {
    "label": "Team features",
    "tailorpic": "Team and enterprise options available",
    "other": "Check their site for team plans"
  }
];

const differences = [
  {
    "title": "Generates new photos, not just edits",
    "body": "BeFunky edits images you already have. TailorPic generates fresh headshots from a handful of selfies, so you do not need a good original."
  },
  {
    "title": "Built for people",
    "body": "TailorPic is tuned for faces and professional looks across 11 categories, while BeFunky is a general-purpose editor and design tool."
  },
  {
    "title": "A low entry price",
    "body": "TailorPic packages start from $1.99, with no subscription to manage."
  },
  {
    "title": "Trade-off on speed",
    "body": "BeFunky edits are quick. TailorPic delivers within 24 hours because a dedicated model is trained on your uploads."
  }
];

const useCases = {
  tailorpic: [
  "Brand-new headshots generated from selfies",
  "A single small payment with no subscription",
  "A likeness trained on your own photos",
  "One upload reused across work, dating and creative looks"
],
  other: [
  "Hands-on editing of photos you already have",
  "Collages, graphics and social templates",
  "Retouching and filters in the browser",
  "To review BeFunky's current plans and features"
],
};

const faqs = [
  {
    "question": "Is TailorPic cheaper than BeFunky?",
    "answer": "TailorPic packages start from $1.99 and go up to 160 photos. BeFunky offers free and paid plans that vary, so compare against their current price page."
  },
  {
    "question": "Can BeFunky make a headshot?",
    "answer": "BeFunky can retouch and crop a photo you already have. TailorPic generates entirely new professional headshots from your selfies."
  },
  {
    "question": "How long does TailorPic take?",
    "answer": "Delivery is within 24 hours, since a dedicated model is fine-tuned on your uploads."
  },
  {
    "question": "Do I need a subscription with TailorPic?",
    "answer": "No. Every package is a single one-time payment (from $1.99) with no recurring fees."
  },
  {
    "question": "Can I use both tools together?",
    "answer": "Yes. Some people generate headshots with TailorPic and then use an editor like BeFunky to add text or build a collage."
  }
];

export default function VsBefunkyPage() {
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
              <Link href="/auth/register?redirect=/headshots" className={buttonVariants({ variant: 'primary', size: 'lg' }) + ' bg-tp-bronze text-tp-black hover:bg-tp-beige'}>
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
              Professional photos across 11 categories from $1.99. No subscription, delivered within 24 hours.
            </p>
            <div className="mt-8">
              <Link href="/auth/register?redirect=/headshots" className={buttonVariants({ variant: 'primary', size: 'lg' }) + ' bg-tp-bronze text-tp-black hover:bg-tp-beige'}>
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
