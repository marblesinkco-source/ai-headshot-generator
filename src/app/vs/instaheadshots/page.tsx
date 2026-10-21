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


const competitor = "InstaHeadshots";
const title = 'TailorPic vs InstaHeadshots: AI Headshot Comparison';
const description =
  `Compare TailorPic vs InstaHeadshots. TailorPic starts from ${BASE_PRICE_DISPLAY} across 12 categories; InstaHeadshots, now sold as Magic Studio headshots, starts at $59 for 50 headshots.`;
const path = '/vs/instaheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path: path, type: 'vs' }),
  twitter: generateTwitterMetadata({ title, description, type: 'vs' }),
};


// Competitor facts, checked on 2026-10-21. instaheadshots.com redirects to
//   https://magicstudio.com/headshots/  "Starting at $59", "50 headshots",
//     "5 looks"; "Ready in 15 minutes" (FAQ: about 60 minutes on Starter);
//     refund if fewer than 4 decent headshots and none downloaded, within
//     3 days of delivery; team discounts for groups of five or more
// Re-check this page before changing any InstaHeadshots value below.
const rows: { label: string; tailorpic: string; other: string }[] = [
  { label: "Starting price", tailorpic: `from ${BASE_PRICE_DISPLAY}`, other: "$59" },
  { label: "Photos included", tailorpic: "1 to 160, depending on package", other: "50 headshots, 5 looks" },
  { label: "Delivery time", tailorpic: "Results within hours", other: "15 to about 60 minutes, by pack" },
  { label: "Categories / styles", tailorpic: "12 categories (headshots, dating, pets, avatars and more)", other: "Professional headshots" },
  { label: "Training method", tailorpic: "LoRA fine-tuning on your own photos", other: "Not publicly detailed" },
  { label: "Refund", tailorpic: "Free regeneration", other: "Refund within 3 days if fewer than 4 good headshots and none downloaded" },
  { label: "Team features", tailorpic: "Team and enterprise options available", other: "Discounts for groups of five or more" },
];

const differences = [
  { title: "Lower entry price, more range", body: `InstaHeadshots (now Magic Studio headshots) starts at $59 for 50 headshots. TailorPic starts from ${BASE_PRICE_DISPLAY} for a single photo and covers 12 categories.` },
  { title: "Beyond the headshot", body: "InstaHeadshots focuses on professional headshots. TailorPic also includes dating, creative, pet and other categories." },
  { title: "Personalization", body: "TailorPic trains a LoRA model on your own photos for a closer likeness." },
  { title: "Delivery", body: "InstaHeadshots is faster, at 15 to about 60 minutes. TailorPic delivers within hours, with the extra time going to model training." },
];

const useCases = {
  tailorpic: [
    "More than a basic headshot, with 12 categories",
    `Photos from ${BASE_PRICE_DISPLAY}`,
    "A personalized LoRA-trained model",
    "Team and enterprise options as you grow",
  ],
  other: [
    "Headshots in about 15 to 60 minutes",
    "A refund if you get fewer than 4 good headshots and download none",
    "Team discounts for groups of five or more",
  ],
};

const faqs = [
  { question: "Is InstaHeadshots cheaper than TailorPic?", answer: `No. InstaHeadshots, now sold as Magic Studio headshots, starts at $59 for 50 headshots (October 2026). TailorPic starts from ${BASE_PRICE_DISPLAY} for one photo, with packages up to 160 photos.` },
  { question: "What styles does TailorPic offer?", answer: "TailorPic offers 12 categories, including business, dating and creative looks. InstaHeadshots focuses on professional headshots." },
  { question: "How does TailorPic train its model?", answer: "TailorPic uses LoRA fine-tuning on your uploaded photos to capture your likeness, and results are ready within hours for most orders." },
  { question: "Is TailorPic a subscription?", answer: `No. TailorPic packages are one-time payments starting at ${BASE_PRICE_DISPLAY}.` },
];

export default function Page() {
  const relatedPages = getRelatedVsPages('instaheadshots');

  return (
    <>
      <Header />
      <main id="main-content" className="bg-tp-paper">
      <ProductSchema
        name="TailorPic AI Headshots"
        description="AI headshot generator delivering up to 160 photos across 12 categories, trained with LoRA fine-tuning and results typically delivered within hours."
        price={BASE_PRICE_CENTS}
        category="Professional Services"
        slug="vs/instaheadshots"
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
              InstaHeadshots offers fast professional headshots from $59. TailorPic adds 12 categories and LoRA fine-tuning from {BASE_PRICE_DISPLAY}.
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
            <div className="relative overflow-x-auto rounded-tp-card border border-tp-line bg-white">
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
