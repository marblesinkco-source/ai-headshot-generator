import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const competitor = "SnapHeadshots";
const title = `TailorPic vs ${competitor} — AI Headshot Generator Comparison`;
const description =
  "Compare TailorPic vs SnapHeadshots. Both start at a similar price, around $9.90; TailorPic adds 40+ photos, 11 categories and built-in editor tools for a one-time payment.";
const path = '/vs/snapheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path: path, type: 'vs' }),
  twitter: generateTwitterMetadata({ title, description, type: 'vs' }),
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'TailorPic AI Headshots',
  description:
    'AI headshot generator delivering 40+ professional photos across 11 categories, trained with LoRA fine-tuning and delivered within 24 hours for a one-time $9.90.',
  brand: { '@type': 'Brand', name: siteConfig.name },
  url: `${siteConfig.url}${path}`,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  offers: {
    '@type': 'Offer',
    price: '9.90',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: `${siteConfig.url}/auth/register`,
  },
};

const rows: { label: string; tailorpic: string; other: string }[] = [
  { label: "Starting price", tailorpic: "$9.90 one-time", other: "Approximately $9.99" },
  { label: "Photos included", tailorpic: "40+ photos", other: "Varies by package; check their site" },
  { label: "Delivery time", tailorpic: "24 hours", other: "Check their site" },
  { label: "Categories / styles", tailorpic: "11 categories (business, dating, creative, pets and more)", other: "Basic headshot styles" },
  { label: "Editor tools", tailorpic: "Built-in editing tools", other: "Check their site" },
  { label: "Training method", tailorpic: "LoRA fine-tuning on your own photos", other: "Not publicly detailed" },
  { label: "One-time vs subscription", tailorpic: "One-time payment, no subscription", other: "Check their site for current billing terms" },
  { label: "Team features", tailorpic: "Team and enterprise options available", other: "Check their site for team options" },
];

const differences = [
  { title: "Similar price, more output", body: "The entry prices are close. TailorPic delivers 40+ photos for $9.90, so you have more to choose from at a comparable cost." },
  { title: "Category variety", body: "TailorPic spans 11 categories, including business, dating and creative looks. SnapHeadshots is focused on basic headshot generation." },
  { title: "Editor tools", body: "TailorPic includes editor tools so you can refine your results, rather than relying only on the raw generated images." },
  { title: "Personalization", body: "TailorPic trains a personal LoRA model on your photos for a close likeness." },
];

const useCases = {
  tailorpic: [
    "More photos for a similar one-time price",
    "A wider range of categories",
    "Editor tools to refine your photos",
    "A personalized LoRA-trained model of your face",
  ],
  other: [
    "A simple, basic headshot generation flow",
    "A low entry price in the same range",
    "A focused tool without extra categories",
    "Straightforward headshots for a profile photo",
  ],
};

const faqs = [
  { question: "Is TailorPic cheaper than SnapHeadshots?", answer: "The prices are similar. TailorPic is a one-time $9.90 and SnapHeadshots is approximately $9.99. Pricing may change, so check their site." },
  { question: "What do I get with TailorPic that is extra?", answer: "TailorPic includes 40+ photos across 11 categories plus editor tools." },
  { question: "Is TailorPic a subscription?", answer: "No. TailorPic is a one-time payment of $9.90 with no recurring fees." },
  { question: "How fast does TailorPic deliver?", answer: "TailorPic delivers within 24 hours because it fine-tunes a LoRA model on your photos." },
];

export default function Page() {
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
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-beige">
              SnapHeadshots offers basic headshot generation at a similar price point. TailorPic adds more photos, 11 categories and editor tools for a one-time $9.90.
            </p>
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
