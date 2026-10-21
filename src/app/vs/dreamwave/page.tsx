import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BASE_PRICE_DISPLAY, BASE_PRICE_CENTS } from '@/config/pricing';
import { FAQAccordion } from '@/components/marketing/faq-accordion';
import { RelatedLinks } from '@/components/related-links';
import { getRelatedVsPages } from '@/lib/internal-links';

// Revalidate every hour so pricing changes propagate without a manual redeploy
export const revalidate = 3600;


const competitor = "Dreamwave";
const title = `TailorPic vs ${competitor} — AI Headshot Generator Comparison`;
const description =
  `Compare TailorPic vs Dreamwave for AI headshots. TailorPic starts from ${BASE_PRICE_DISPLAY} across 12 categories; Dreamwave focuses on headshots with about two hours from start to gallery.`;
const path = '/vs/dreamwave';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path: path, type: 'vs' }),
  twitter: generateTwitterMetadata({ title, description, type: 'vs' }),
};


// Competitor facts, checked on Dreamwave's own site on 2026-10-21:
//   https://dreamwave.ai  company headshots "$49-59 per person", "150 photos
//     per person", "1-2 hr turnaround", "Free redo for every teammate";
//     also lists pet portraits and photobooth products
//   https://www.dreamwave.ai/ai-headshots  individual: "Start to gallery in
//     about two hours"; no individual prices listed; no refunds if input
//     photos do not follow the guidelines; "our pro retouching team" for
//     small tweaks
// Re-check these pages before changing any Dreamwave value below.
const rows: { label: string; tailorpic: string; other: string }[] = [
  { label: "Starting price", tailorpic: `from ${BASE_PRICE_DISPLAY}`, other: "Individual prices not listed on their headshots page; company headshots $49 to $59 per person" },
  { label: "Photos included", tailorpic: "1 to 160, depending on package", other: "150 photos per person on company headshots" },
  { label: "Delivery time", tailorpic: "Results within hours", other: "About 2 hours from start to gallery" },
  { label: "Categories / styles", tailorpic: "12 categories (headshots, dating, pets, avatars and more)", other: "Headshots, pet portraits and AI photobooths" },
  { label: "Training method", tailorpic: "LoRA fine-tuning on your own photos", other: "Not publicly detailed" },
  { label: "Redo / refund", tailorpic: "Free regeneration", other: "Free redo on company headshots; no refund if input photos miss their guidelines" },
  { label: "Team features", tailorpic: "Team and enterprise options available", other: "Company headshots, priced per person" },
];

const differences = [
  { title: "Try it with one photo", body: `TailorPic starts from ${BASE_PRICE_DISPLAY} for a single photo, so you can see the result before buying a larger package. Dreamwave does not list individual prices on its headshots page.` },
  { title: "Volume vs variety", body: "Dreamwave's company headshots include 150 photos per person. TailorPic packages range from 1 to 160 photos across 12 categories, from business and dating to creative looks." },
  { title: "Speed", body: "Dreamwave says about two hours from start to gallery. TailorPic typically completes within hours, since each model is fine-tuned with LoRA on your own photos." },
  { title: "Training approach", body: "TailorPic trains a personal LoRA model for a close likeness. Dreamwave offers a free redo for every teammate on company headshots." },
];

const useCases = {
  tailorpic: [
    `A low upfront cost, from ${BASE_PRICE_DISPLAY}`,
    "Photos for more than work, such as dating and creative categories",
    "A personalized LoRA-trained model of your face",
    "Predictable pricing with no subscription",
  ],
  other: [
    "Company headshots with 150 photos per person",
    "A free redo for every teammate",
    "AI photobooth products",
    "A pro retouching team for small tweaks",
  ],
};

const faqs = [
  { question: "Is TailorPic cheaper than Dreamwave?", answer: `TailorPic starts from ${BASE_PRICE_DISPLAY} for a single photo and goes up to 160 photos. Dreamwave lists company headshots at $49 to $59 per person and does not show individual prices on its headshots page (October 2026).` },
  { question: "Which is faster, TailorPic or Dreamwave?", answer: "Dreamwave says about two hours from start to gallery. TailorPic results are ready within hours for most orders, since it fine-tunes a LoRA model on your photos." },
  { question: "How many photos do I get with each?", answer: "TailorPic packages range from 1 to 160 photos across 12 categories. Dreamwave company headshots include 150 photos per person." },
  { question: "Is TailorPic a subscription?", answer: `No. TailorPic packages are one-time payments starting at ${BASE_PRICE_DISPLAY} with no recurring fees.` },
];

export default function Page() {
  const relatedPages = getRelatedVsPages('dreamwave');

  return (
    <>
      <Header />
      <main id="main-content" className="bg-tp-paper">
      <ProductSchema
        name="TailorPic AI Headshots"
        description="AI headshot generator delivering up to 160 photos across 12 categories, trained with LoRA fine-tuning and results typically delivered within hours."
        price={BASE_PRICE_CENTS}
        category="Professional Services"
        slug="vs/dreamwave"
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
              Dreamwave focuses on company headshots with 150 photos per person. TailorPic gives you polished, LoRA-trained photos across 12 categories (up to 160 per order), from {BASE_PRICE_DISPLAY}.
            </p>
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
            <FAQAccordion items={faqs} />
          </div>
        </section>

        <RelatedLinks links={relatedPages} title="Compare More Alternatives" />


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
