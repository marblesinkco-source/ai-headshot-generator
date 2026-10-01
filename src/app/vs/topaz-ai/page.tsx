import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';

const competitor = "Topaz Labs";
const title = `TailorPic vs ${competitor} — AI Headshot Generator Comparison`;
const description =
  "Compare TailorPic vs Topaz Labs. Topaz specializes in AI photo sharpening, denoising and upscaling; TailorPic creates 40+ AI headshots from your selfies for a one-time $9.90.";
const path = '/vs/topaz-ai';
const canonicalUrl = 'https://www.tailorpic.com/vs/topaz-ai';

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
  "Topaz Labs makes AI software for sharpening, denoising and upscaling photos and video. TailorPic is built for people: it trains a personal model on your selfies and generates professional headshots in 11 categories.";

const rows: { label: string; tailorpic: string; other: string }[] = [
  {
    "label": "Starting price",
    "tailorpic": "$9.90 one-time",
    "other": "Paid software and subscription options; check their site"
  },
  {
    "label": "Photos included",
    "tailorpic": "40+ photos",
    "other": "Enhances the photos you supply"
  },
  {
    "label": "Delivery time",
    "tailorpic": "Within 24 hours",
    "other": "Processing time depends on your image and hardware"
  },
  {
    "label": "Core purpose",
    "tailorpic": "AI headshots of you from selfies",
    "other": "Image sharpening, denoising and upscaling"
  },
  {
    "label": "Training method",
    "tailorpic": "LoRA fine-tuning on your own photos",
    "other": "Enhancement models applied to existing images"
  },
  {
    "label": "Pricing model",
    "tailorpic": "One-time payment, no subscription",
    "other": "Software licenses and subscriptions, varies by product"
  },
  {
    "label": "Professional headshots",
    "tailorpic": "Dedicated business and LinkedIn category",
    "other": "Improves quality of an existing headshot"
  },
  {
    "label": "Dating and social photos",
    "tailorpic": "Dedicated dating category",
    "other": "Not a known focus"
  },
  {
    "label": "Software install",
    "tailorpic": "None, works in the browser",
    "other": "Desktop applications"
  },
  {
    "label": "Image quality enhancement",
    "tailorpic": "Not a focus",
    "other": "A core strength"
  }
];

const differences = [
  {
    "title": "Creates photos, not just quality",
    "body": "Topaz improves the resolution and clarity of images you already have. TailorPic generates new headshots, so you do not need a good original."
  },
  {
    "title": "No software or hardware to manage",
    "body": "TailorPic runs in your browser. Desktop enhancement tools can depend on your computer for speed."
  },
  {
    "title": "A flat, low entry price",
    "body": "TailorPic is $9.90 one time with no license or plan to choose."
  },
  {
    "title": "Trade-off on control",
    "body": "Topaz gives detailed control over sharpening and noise. TailorPic hands you finished, styled results."
  }
];

const useCases = {
  tailorpic: [
  "New headshots generated from selfies",
  "No software to install or configure",
  "A likeness trained on your own photos",
  "A single small payment with no subscription"
],
  other: [
  "Sharpening a blurry or noisy photo",
  "Upscaling a low resolution image for print",
  "Detailed control over enhancement settings",
  "To review Topaz's current products and pricing"
],
};

const faqs = [
  {
    "question": "Is TailorPic cheaper than Topaz Labs?",
    "answer": "TailorPic is a one-time $9.90 for 40+ photos. Topaz pricing varies by product and license, so compare against their current price pages."
  },
  {
    "question": "Can Topaz make a headshot?",
    "answer": "It enhances the quality of a photo you already have. TailorPic generates entirely new professional headshots from your selfies."
  },
  {
    "question": "How long does TailorPic take?",
    "answer": "Delivery is within 24 hours, since a dedicated model is fine-tuned on your uploads."
  },
  {
    "question": "Can I upscale TailorPic photos with Topaz?",
    "answer": "Yes. Your images are yours, so you can enhance them further with any tool."
  },
  {
    "question": "Do I need a subscription with TailorPic?",
    "answer": "No. It is a single $9.90 payment with no recurring fees."
  }
];

export default function VsTopazAiPage() {
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
