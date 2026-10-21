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


const competitor = "ProfilePicture.AI";
const title = 'TailorPic vs ProfilePicture.AI: AI Headshot Comparison';
const description =
  `Compare TailorPic vs ProfilePicture.AI for headshots. TailorPic starts from ${BASE_PRICE_DISPLAY} across 12 categories with LoRA-trained likeness.`;
const path = '/vs/profilepicture-ai';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path: path, type: 'vs' }),
  twitter: generateTwitterMetadata({ title, description, type: 'vs' }),
};


const intro =
  "ProfilePicture.AI is a free profile picture maker: crop, remove the background and add borders to a photo you already have. TailorPic creates new AI photos of you from selfies, across 12 categories.";

// Competitor facts, checked on ProfilePicture.AI's own site on 2026-10-21:
//   https://www.profilepicture.ai  "The pfp maker is 100% free. No sign-up,
//     no watermark, no credit card."; editor with background removal, crops,
//     borders, filters, text and presets for Instagram, WhatsApp, LinkedIn, X,
//     YouTube and more; points to HeadshotPro as its paid product
// Re-check this page before changing any ProfilePicture.AI value below.
const rows: { label: string; tailorpic: string; other: string }[] = [
  { label: "Price", tailorpic: `from ${BASE_PRICE_DISPLAY}`, other: "Free" },
  { label: "What it does", tailorpic: "Creates new AI photos of you from selfies", other: "Edits a photo you already have" },
  { label: "Sign-up", tailorpic: "Free account needed", other: "No sign-up" },
  { label: "Tools", tailorpic: "12 categories, AI generation and built-in editing", other: "Background removal, crops, borders, filters and text" },
  { label: "Platform sizes", tailorpic: "Free social media resizer tool", other: "Presets for LinkedIn, Instagram, X, YouTube and more" },
  { label: "AI model of your face", tailorpic: "LoRA fine-tuning on your own photos", other: "None" },
];

const differences = [
  { title: "New photo vs edited photo", body: "ProfilePicture.AI polishes a photo you already have. TailorPic creates new studio-style photos of you, which helps when you do not have a good photo to start from." },
  { title: "Beyond the profile photo", body: "Twelve categories cover LinkedIn, dating, creative portraits, pets and product shots, so one upload can serve several needs." },
  { title: "Free vs paid", body: `ProfilePicture.AI is free with no sign-up. TailorPic starts from ${BASE_PRICE_DISPLAY} for one AI photo.` },
  { title: "Use both", body: "You can create a headshot with TailorPic, then crop or frame it for each platform with a free editor." },
];

const useCases = {
  tailorpic: [
    "A single small payment with no subscription",
    "One upload reused across work, dating and creative looks",
    "A likeness trained on your own photos",
    "Clear, predictable pricing",
  ],
  other: [
    "A free tool with no sign-up",
    "To crop or frame a photo you already like",
    "Platform-sized exports for social profiles",
  ],
};

const faqs = [
  { question: "Is TailorPic cheaper than ProfilePicture.AI?", answer: `TailorPic packages start from ${BASE_PRICE_DISPLAY} and go up to 160 photos. ProfilePicture.AI is a free editor for photos you already have, so it does not create new photos of you.` },
  { question: "What makes TailorPic different from ProfilePicture.AI?", answer: "TailorPic trains a personal LoRA model on your photos and creates new photos in 12 categories. ProfilePicture.AI edits an existing photo." },
  { question: "How long does TailorPic take?", answer: "Results within hours, since a dedicated model is fine-tuned on your uploads." },
  { question: "Do I need a subscription with TailorPic?", answer: `No. Every package is a single one-time payment (from ${BASE_PRICE_DISPLAY}) with no recurring fees.` },
  { question: "Can I use the photos on LinkedIn?", answer: "Yes. The business category is built for LinkedIn, resumes and company pages." },
];

export default function VsProfilepictureAiPage() {
  const relatedPages = getRelatedVsPages('profilepicture-ai');

  return (
    <>
      <Header />
      <main id="main-content" className="bg-tp-paper">
      <ProductSchema
        name="TailorPic AI Headshots"
        description="AI headshot generator delivering up to 160 photos across 12 categories, trained with LoRA fine-tuning and results typically delivered within hours."
        price={BASE_PRICE_CENTS}
        category="Professional Services"
        slug="vs/profilepicture-ai"
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
