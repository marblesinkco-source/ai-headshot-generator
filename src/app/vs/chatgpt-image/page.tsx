import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const competitor = "ChatGPT Image Generation";
const title = 'TailorPic vs ChatGPT Image Generation: Headshot Comparison';
const description =
  "Compare TailorPic vs ChatGPT image generation for headshots. TailorPic starts from $1.99 with a LoRA model trained on your own face.";
const path = '/vs/chatgpt-image';

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
    'AI headshot generator delivering up to 160 photos across 12 categories, trained with LoRA fine-tuning and results typically delivered in under 2 hours, from $1.99.',
  brand: { '@type': 'Brand', name: siteConfig.name },
  url: `${siteConfig.url}${path}`,
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
  "ChatGPT image generation is convenient and already in a tool many people use. TailorPic is specialized: it trains a personal model on your photos and delivers up to 160 headshots across 12 categories.";

const rows: { label: string; tailorpic: string; other: string }[] = [
  { label: "Starting price", tailorpic: "from $1.99", other: "Included with ChatGPT plans; check their site" },
  { label: "Photos included", tailorpic: "1 to 160, depending on package", other: "A few images per request; limits vary by plan" },
  { label: "Delivery time", tailorpic: "Results within hours", other: "Usually quick per image" },
  { label: "Categories / styles", tailorpic: "12 categories (business, dating, creative, pets and more)", other: "General-purpose images from text and reference photos" },
  { label: "Training method", tailorpic: "LoRA fine-tuning on your own photos", other: "No personal model training; results depend on the prompt and reference" },
  { label: "Pricing model", tailorpic: "One-time payment, no subscription", other: "Tied to a ChatGPT plan; check their site" },
  { label: "Built for headshots", tailorpic: "Yes, purpose-built workflow", other: "General-purpose image generation" },
  { label: "Consistency across photos", tailorpic: "Same trained model across all photos", other: "Each image is generated separately, so likeness can vary" },
  { label: "Convenience", tailorpic: "Upload once, receive a full set", other: "Very convenient if you already use ChatGPT" },
  { label: "Team features", tailorpic: "Team and enterprise options available", other: "Check their site for business plans" },
];

const differences = [
  { title: "Specialized vs convenient", body: "ChatGPT is handy for quick images. TailorPic is tuned for headshots, with categories and a workflow designed for that single goal." },
  { title: "A trained model, not a one-off", body: "TailorPic fine-tunes a LoRA model on your selfies, so every photo in the set draws on the same learned likeness." },
  { title: "A full set in one go", body: "You receive photos across 12 categories instead of generating and refining images one at a time." },
  { title: "Trade-off on speed", body: "ChatGPT can return an image in moments. TailorPic typically completes in under 2 hours, since it trains a dedicated model first." },
];

const useCases = {
  tailorpic: [
    "A full set of headshots with a consistent likeness",
    "A one-time payment from $1.99 with no subscription",
    "A model trained on your own photos",
    "Ready-made categories for work, dating and more",
  ],
  other: [
    "Quick, casual images while you chat",
    "To iterate conversationally on a single image",
    "One tool for text, images and other tasks",
    "Immediate results without waiting for training",
  ],
};

const faqs = [
  { question: "Is TailorPic cheaper than ChatGPT image generation?", answer: "TailorPic packages start from $1.99 and go up to 160 photos. ChatGPT image generation is tied to ChatGPT plans that can change, so check their current pricing." },
  { question: "Can ChatGPT make headshots of me?", answer: "ChatGPT can generate portrait-style images, but it does not train a personal model on your face. TailorPic fine-tunes a LoRA model on your own photos for a consistent likeness." },
  { question: "How long does TailorPic take?", answer: "Results within hours, since a dedicated model is fine-tuned on your uploads." },
  { question: "Do I need to write prompts with TailorPic?", answer: "No. You upload your photos and receive finished headshots across 12 categories." },
  { question: "Do I need a subscription with TailorPic?", answer: "No. Every package is a single one-time payment (from $1.99) with no recurring fees." },
];

export default function VsChatgptImagePage() {
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
