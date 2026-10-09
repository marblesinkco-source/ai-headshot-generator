import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const competitor = "Midjourney";
const title = `TailorPic vs ${competitor} — AI Headshot Generator Comparison`;
const description =
  `Compare TailorPic vs Midjourney for headshots. TailorPic starts from ${BASE_PRICE_DISPLAY} with LoRA-trained likeness, no prompting skill or Discord needed.`;
const path = '/vs/midjourney';

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
    `AI headshot generator delivering up to 160 photos across 12 categories, trained with LoRA fine-tuning and results typically delivered within hours, from ${BASE_PRICE_DISPLAY}.`,
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
  "Midjourney is a powerful AI art tool, but getting a good headshot takes prompting skill. TailorPic trains a model on your photos and delivers finished headshots with no prompts to write.";

const rows: { label: string; tailorpic: string; other: string }[] = [
  { label: "Starting price", tailorpic: `from ${BASE_PRICE_DISPLAY}`, other: "Subscription-based; check their site" },
  { label: "Photos included", tailorpic: "1 to 160, depending on package", other: "Depends on prompts and plan limits" },
  { label: "Delivery time", tailorpic: "Results within hours", other: "Varies by mode and queue" },
  { label: "Categories / styles", tailorpic: "12 categories (business, dating, creative, pets and more)", other: "Artistic and photorealistic imagery of all kinds" },
  { label: "Training method", tailorpic: "LoRA fine-tuning on your own photos", other: "Prompt-based generation; not a model trained on your face" },
  { label: "Pricing model", tailorpic: "One-time payment, no subscription", other: "Check their site for current plans" },
  { label: "Built for headshots", tailorpic: "Yes, purpose-built workflow", other: "General art tool, not specialized for headshots" },
  { label: "Skill required", tailorpic: "None: upload photos and receive results", other: "Prompting skill helps a lot to get usable portraits" },
  { label: "Interface", tailorpic: "Simple web upload flow", other: "Has been associated with Discord; check their site for current options" },
  { label: "Team features", tailorpic: "Team and enterprise options available", other: "Check their site for team plans" },
];

const differences = [
  { title: "No prompting required", body: "Midjourney rewards people who know how to write and refine prompts. TailorPic removes that step: upload selfies and get headshots." },
  { title: "A model of your face", body: "TailorPic fine-tunes a LoRA model on your own photos. A prompt-only tool has no specific knowledge of how you look." },
  { title: "Simple web flow", body: "There is no community server to learn. You sign up, upload and wait for your photos." },
  { title: "Trade-off on artistic range", body: "Midjourney is excellent for stylized art and concept imagery. If you want artwork rather than realistic headshots, it is a stronger fit." },
];

const useCases = {
  tailorpic: [
    "Headshots that resemble you, without writing prompts",
    `A one-time payment from ${BASE_PRICE_DISPLAY} with no subscription`,
    "A simple web flow with no extra apps to learn",
    "Dating, creative, pet and product photos from one upload",
  ],
  other: [
    "Stunning stylized art, concept images and illustrations",
    "To invest time learning prompt craft",
    "Maximum creative range over realism of a specific face",
    "An active community for inspiration and ideas",
  ],
};

const faqs = [
  { question: "Is TailorPic cheaper than Midjourney?", answer: `TailorPic packages start from ${BASE_PRICE_DISPLAY} and go up to 160 photos. Midjourney is priced by plan and can change, so check their current pricing.` },
  { question: "Can Midjourney make headshots of me?", answer: "Midjourney can produce portraits from prompts, but it is not trained on your face by default. TailorPic trains a personal LoRA model on your own photos." },
  { question: "Do I need Discord or prompting skill for TailorPic?", answer: "No. You upload your photos on the website and receive finished headshots, with no prompts to write." },
  { question: "How long does TailorPic take?", answer: "Results within hours, since a dedicated model is fine-tuned on your uploads." },
  { question: "Do I need a subscription with TailorPic?", answer: `No. Every package is a single one-time payment (from ${BASE_PRICE_DISPLAY}) with no recurring fees.` },
];

export default function VsMidjourneyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-tp-paper">
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
                Get headshots from {BASE_PRICE_DISPLAY}
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
              Professional photos across 12 categories from {BASE_PRICE_DISPLAY}. No subscription, results typically delivered within hours.
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
