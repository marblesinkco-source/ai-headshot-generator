import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';

const competitor = "HeadMagic";
const title = `TailorPic vs ${competitor} — AI Headshot Generator Comparison`;
const description =
  "Compare TailorPic vs HeadMagic. Both are AI headshot services; TailorPic delivers 40+ headshots across 11 categories for a one-time $9.90 with no subscription.";
const path = '/vs/headmagic';
const canonicalUrl = 'https://www.tailorpic.com/vs/headmagic';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    siteName: siteConfig.name,
    type: 'website',
    images: [siteConfig.ogImage],
  },
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'TailorPic AI Headshots',
  description:
    'AI headshot generator delivering 40+ professional photos across 11 categories, trained with LoRA fine-tuning and delivered within 24 hours for a one-time $9.90.',
  brand: { '@type': 'Brand', name: siteConfig.name },
  url: canonicalUrl,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  offers: {
    '@type': 'Offer',
    price: '9.90',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: `${siteConfig.url}/auth/register`,
  },
};

const intro =
  "HeadMagic is an AI headshot service in the same space as TailorPic. Both turn your selfies into professional portraits; the differences come down to price model, category range and delivery.";

const rows: { label: string; tailorpic: string; other: string }[] = [
  {
    "label": "Starting price",
    "tailorpic": "$9.90 one-time",
    "other": "Check their site for current pricing"
  },
  {
    "label": "Photos included",
    "tailorpic": "40+ photos",
    "other": "Varies by package; check their site"
  },
  {
    "label": "Delivery time",
    "tailorpic": "Within 24 hours",
    "other": "Check their site for current turnaround"
  },
  {
    "label": "Core purpose",
    "tailorpic": "AI headshots of you from selfies",
    "other": "AI headshots from your photos"
  },
  {
    "label": "Training method",
    "tailorpic": "LoRA fine-tuning on your own photos",
    "other": "Check their site for their method"
  },
  {
    "label": "Pricing model",
    "tailorpic": "One-time payment, no subscription",
    "other": "Check their site"
  },
  {
    "label": "Professional headshots",
    "tailorpic": "Dedicated business and LinkedIn category",
    "other": "A core focus"
  },
  {
    "label": "Dating and social photos",
    "tailorpic": "Dedicated dating category",
    "other": "Check their site for available styles"
  },
  {
    "label": "Pets, family and creative categories",
    "tailorpic": "Included across 11 categories",
    "other": "Check their site for available categories"
  },
  {
    "label": "Team features",
    "tailorpic": "Team and enterprise options available",
    "other": "Check their site for team plans"
  }
];

const differences = [
  {
    "title": "Same goal, different packaging",
    "body": "Both services aim at professional headshots from selfies. TailorPic bundles 40+ photos across 11 categories."
  },
  {
    "title": "One-time price",
    "body": "TailorPic is $9.90 once, so there is no plan ladder to compare."
  },
  {
    "title": "Range beyond work photos",
    "body": "TailorPic also covers dating, social and creative looks from the same upload."
  },
  {
    "title": "Trade-off on turnaround",
    "body": "TailorPic trains a dedicated model and delivers within 24 hours. Compare HeadMagic's current turnaround on their site."
  }
];

const useCases = {
  "tailorpic": [
    "Brand-new headshots generated from selfies",
    "A single small payment with no subscription",
    "A likeness trained on your own photos",
    "One upload reused across work, dating and creative looks"
  ],
  "other": [
    "Headshots from a service you already know",
    "A package that matches your budget after comparing prices",
    "Specific styles listed on their site",
    "To review HeadMagic's current plans and features"
  ]
};

const faqs = [
  {
    "question": "Is TailorPic cheaper than HeadMagic?",
    "answer": "TailorPic is a one-time $9.90 for 40+ photos. HeadMagic's pricing may differ, so compare against their current price page."
  },
  {
    "question": "Are TailorPic and HeadMagic similar?",
    "answer": "Both are AI headshot services that work from your selfies. Compare the categories, price model and turnaround for your needs."
  },
  {
    "question": "How long does TailorPic take?",
    "answer": "Delivery is within 24 hours, since a dedicated model is fine-tuned on your uploads."
  },
  {
    "question": "Do I need a subscription with TailorPic?",
    "answer": "No. It is a single $9.90 payment with no recurring fees."
  },
  {
    "question": "Can I use the photos for LinkedIn?",
    "answer": "Yes. TailorPic has a dedicated business and LinkedIn category among its 11 categories."
  }
];

export default function VsHeadmagicPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-tp-paper">
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
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-tp-paper sm:text-5xl lg:text-6xl">
              TailorPic <span className="text-tp-bronze">vs</span> {competitor}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-beige">{intro}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/auth/register" className={buttonVariants({ variant: 'primary', size: 'lg' }) + ' bg-tp-bronze text-tp-black hover:bg-tp-beige'}>
                Get 40+ headshots for $9.90
              </Link>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-center text-3xl font-bold text-tp-ink">Side-by-side comparison</h2>
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
            <h2 className="mb-10 text-center text-3xl font-bold text-tp-ink">Key differences</h2>
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
            <h2 className="mb-10 text-center text-3xl font-bold text-tp-ink">Which one should you choose?</h2>
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
            <h2 className="mb-10 text-center text-3xl font-bold text-tp-ink">Frequently asked questions</h2>
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
            <h2 className="text-3xl font-bold text-tp-paper">Ready for your best headshots?</h2>
            <p className="mx-auto mt-4 max-w-xl text-tp-beige">
              40+ professional photos across 11 categories for a one-time $9.90. No subscription, delivered within 24 hours.
            </p>
            <div className="mt-8">
              <Link href="/auth/register" className={buttonVariants({ variant: 'primary', size: 'lg' }) + ' bg-tp-bronze text-tp-black hover:bg-tp-beige'}>
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
