import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const competitor = "Pixelcut";
const title = `TailorPic vs ${competitor} — AI Headshot Generator Comparison`;
const description =
  "Compare TailorPic vs Pixelcut for AI headshots. TailorPic delivers 40+ LoRA-trained headshots across 11 categories for a one-time $9.90; Pixelcut is a general-purpose AI photo editor with background removal, upscaling and design tools.";
const path = '/vs/pixelcut';

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
  { label: "Starting price", tailorpic: "$9.90 one-time", other: "Free tier available; paid plans vary" },
  { label: "Billing model", tailorpic: "One-time payment, no subscription", other: "Freemium with subscription upgrades" },
  { label: "Focus", tailorpic: "Headshots and profile photos", other: "General photo editing, background removal, design tools" },
  { label: "Photos included", tailorpic: "40+ photos", other: "Depends on how you use the editing tools" },
  { label: "Delivery time", tailorpic: "24 hours", other: "Instant edits on your existing photos" },
  { label: "Categories / styles", tailorpic: "11 categories (business, dating, creative, pets and more)", other: "No headshot-specific categories; general editing features" },
  { label: "Training method", tailorpic: "LoRA fine-tuning on your own photos", other: "No personal model training; edits existing photos" },
  { label: "Ongoing cost", tailorpic: "None after the $9.90 payment", other: "Free tier is limited; full features require a subscription" },
  { label: "Team features", tailorpic: "Team and enterprise options available", other: "Designed for individual and small business use" },
];

const differences = [
  { title: "Generator vs editor", body: "TailorPic generates entirely new headshots from your selfies using a personal AI model. Pixelcut edits photos you already have, offering background removal, upscaling and design templates. They solve different problems." },
  { title: "Headshot specialist vs general tool", body: "TailorPic is built specifically for headshots across professional, dating and creative styles. Pixelcut is a broader photo editing and design platform that handles product photos, social media graphics and more." },
  { title: "Pricing structure", body: "TailorPic is a flat $9.90 with no recurring fees. Pixelcut offers a free tier with limited features and paid plans for full access. Check their site for current pricing." },
  { title: "Personal AI model", body: "TailorPic trains a LoRA model on your uploaded selfies, producing photos that closely resemble you in new settings. Pixelcut enhances existing photos but does not create new portraits from scratch." },
];

const useCases = {
  tailorpic: [
    "A one-time $9.90 payment with no subscription",
    "New professional headshots generated from selfies",
    "A personalized LoRA-trained model of your face",
    "Photos for work, dating and creative uses",
  ],
  other: [
    "Quick background removal on existing photos",
    "Product photography and e-commerce images",
    "A general-purpose photo editing toolkit",
    "Design templates for social media and marketing",
  ],
};

const faqs = [
  { question: "Is TailorPic the same as Pixelcut?", answer: "No. TailorPic is an AI headshot generator that creates new professional photos from your selfies. Pixelcut is a general photo editing tool focused on background removal, upscaling and design features." },
  { question: "Can Pixelcut generate headshots?", answer: "Pixelcut is primarily an editor, not a headshot generator. It can improve existing photos but does not train a personal AI model or generate new headshots the way TailorPic does." },
  { question: "Is TailorPic cheaper than Pixelcut?", answer: "TailorPic is a one-time $9.90 for 40+ headshots. Pixelcut has a free tier with limited features and paid subscription plans. For headshot generation specifically, TailorPic is purpose-built and competitively priced." },
  { question: "How many photos does TailorPic include?", answer: "TailorPic includes 40+ photos across 11 categories, delivered within 24 hours." },
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
              Pixelcut is a versatile photo editor with background removal and design tools. TailorPic is a headshot specialist: 40+ polished, LoRA-trained photos across 11 categories for a one-time $9.90.
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
