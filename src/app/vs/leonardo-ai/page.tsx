import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { FAQAccordion } from '@/components/marketing/faq-accordion';

const competitor = "Leonardo AI";
const title = `TailorPic vs ${competitor} — AI Headshot Generator Comparison`;
const description =
  `Compare TailorPic vs Leonardo AI for headshots. TailorPic starts from ${BASE_PRICE_DISPLAY} with LoRA-trained likeness of you, not a general AI art platform.`;
const path = '/vs/leonardo-ai';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path: path, type: 'vs' }),
  twitter: generateTwitterMetadata({ title, description, type: 'vs' }),
};


const intro =
  "Leonardo AI is an AI art platform that can generate portraits. TailorPic is a headshot service that trains a model on your own photos, so the results are meant to look like you.";

const rows: { label: string; tailorpic: string; other: string }[] = [
  { label: "Starting price", tailorpic: `from ${BASE_PRICE_DISPLAY}`, other: "Varies by plan; check their site" },
  { label: "Photos included", tailorpic: "1 to 160, depending on package", other: "Depends on prompts and plan limits" },
  { label: "Delivery time", tailorpic: "Results within hours", other: "Varies by settings and queue" },
  { label: "Categories / styles", tailorpic: "12 categories (business, dating, creative, pets and more)", other: "Broad art styles, characters and concepts" },
  { label: "Training method", tailorpic: "LoRA fine-tuning on your own photos", other: "Portraits come from prompts and models; not trained on your photos by default" },
  { label: "Pricing model", tailorpic: "One-time payment, no subscription", other: "Check whether free, credit or subscription plans apply" },
  { label: "Built for headshots", tailorpic: "Yes, purpose-built workflow", other: "AI art platform; portraits are one use among many" },
  { label: "Setup effort", tailorpic: "Upload photos and receive results", other: "Choose models, write prompts and iterate" },
  { label: "Likeness of you", tailorpic: "Personal LoRA trained on your selfies", other: "Depends on the workflow you set up yourself" },
  { label: "Team features", tailorpic: "Team and enterprise options available", other: "Check their site for team plans" },
];

const differences = [
  { title: "Art platform vs headshot service", body: "Leonardo is built for creative art of all kinds. TailorPic narrows the focus to realistic, professional photos of you." },
  { title: "Trained on you", body: "TailorPic fine-tunes a LoRA model on your selfies as part of the service. With an art platform, matching your face takes extra setup and skill." },
  { title: "Ready-made categories", body: "Eleven categories are included, so you do not need to design scenes, lighting or outfits through prompts." },
  { title: "Trade-off on creative control", body: "Leonardo gives you more control over style and experimentation. If you enjoy tuning prompts and models, that freedom may be worth it." },
];

const useCases = {
  tailorpic: [
    "Realistic headshots of you without managing models or prompts",
    `A one-time payment from ${BASE_PRICE_DISPLAY} with no subscription`,
    "A likeness trained on your own photos",
    "Ready-made categories for work, dating and more",
  ],
  other: [
    "An AI art platform for illustrations, characters and concept art",
    "Hands-on control over models, styles and prompts",
    "To experiment with many creative directions",
    "Generation tools beyond portraits",
  ],
};

const faqs = [
  { question: "Is TailorPic cheaper than Leonardo AI?", answer: `TailorPic packages start from ${BASE_PRICE_DISPLAY} and go up to 160 photos. Leonardo AI pricing varies by plan and can change, so check their current pricing.` },
  { question: "Can Leonardo AI make portraits of me?", answer: "Leonardo can generate portraits, but it is an AI art platform and does not automatically train on your photos. TailorPic trains a personal LoRA model on your selfies as part of the service." },
  { question: "How long does TailorPic take?", answer: "Results within hours, since a dedicated model is fine-tuned on your uploads." },
  { question: "Do I need to write prompts with TailorPic?", answer: "No. You upload your photos and receive finished headshots across 12 categories." },
  { question: "Do I need a subscription with TailorPic?", answer: `No. Every package is a single one-time payment (from ${BASE_PRICE_DISPLAY}) with no recurring fees.` },
];

export default function VsLeonardoAiPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-tp-paper">
      <ProductSchema
        name="TailorPic AI Headshots"
        description="AI headshot generator delivering up to 160 photos across 12 categories, trained with LoRA fine-tuning and results typically delivered within hours."
        price={199}
        category="Professional Services"
        slug="vs/leonardo-ai"
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
            <FAQAccordion items={faqs} />
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
