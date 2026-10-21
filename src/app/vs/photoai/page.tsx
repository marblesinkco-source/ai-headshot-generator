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


const competitor = "PhotoAI";
const title = `TailorPic vs ${competitor} — AI Headshot Generator Comparison`;
const description =
  `Compare TailorPic vs PhotoAI for headshots. TailorPic: one-time packages from ${BASE_PRICE_DISPLAY}, up to 160 headshots. PhotoAI: a membership with many photo packs.`;
const path = '/vs/photoai';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path: path, type: 'vs' }),
  twitter: generateTwitterMetadata({ title, description, type: 'vs' }),
};


// Competitor facts, checked on PhotoAI's own site on 2026-10-21:
//   https://photoai.com  membership ("All photo packs are included in your
//     membership", "You can cancel your subscription at any time"); model
//     creation "takes about 5 minutes"; packs include Dating, Fashion, Travel,
//     Professional and more. Plan prices were not shown on the homepage.
// Re-check this page before adding any PhotoAI price below.
const rows: { label: string; tailorpic: string; other: string }[] = [
  { label: "Starting price", tailorpic: `from ${BASE_PRICE_DISPLAY}`, other: "Membership; see their site for current prices" },
  { label: "Billing model", tailorpic: "One-time payment, no subscription", other: "Subscription you can cancel any time" },
  { label: "Focus", tailorpic: "Headshots and profile photos", other: "Many kinds of AI photos, not only headshots" },
  { label: "Setup time", tailorpic: "Results within hours", other: "AI model created in about 5 minutes" },
  { label: "Categories / styles", tailorpic: "12 categories (headshots, dating, pets, avatars and more)", other: "Photo packs such as Dating, Fashion, Travel and Professional" },
  { label: "Training method", tailorpic: "LoRA fine-tuning on your own photos", other: "Personal AI model trained on your photos" },
  { label: "Ongoing cost", tailorpic: `None after your one-time payment (from ${BASE_PRICE_DISPLAY})`, other: "Recurring while you stay subscribed" },
];

const differences = [
  { title: "Subscription vs one-time", body: `PhotoAI is a membership subscription. TailorPic is a single payment from ${BASE_PRICE_DISPLAY}, so there is nothing to cancel if you only need one set of photos.` },
  { title: "Specialist vs generalist", body: "PhotoAI covers many photo types beyond headshots. TailorPic focuses on headshots and profile photos, including business, dating and creative looks." },
  { title: "Cost over time", body: `A PhotoAI subscription renews until you cancel it. TailorPic is paid once, with packages starting at ${BASE_PRICE_DISPLAY}.` },
  { title: "Speed", body: "PhotoAI creates its AI model in about 5 minutes. TailorPic trains a personal LoRA model on your photos and typically delivers within hours." },
];

const useCases = {
  tailorpic: [
    `A one-time payment from ${BASE_PRICE_DISPLAY} with no subscription`,
    "A tool built around portraits of you",
    "A personalized LoRA-trained model of your face",
    "Photos for work, dating and creative uses",
  ],
  other: [
    "A wide variety of AI photos beyond headshots",
    "Ongoing access to generate new images",
    "A subscription-based workflow for frequent use",
    "Creative scenes and non-headshot photo styles",
  ],
};

const faqs = [
  { question: "Is TailorPic cheaper than PhotoAI?", answer: `Our entry price is lower, but the packages are not like-for-like: TailorPic starts from ${BASE_PRICE_DISPLAY} for a single photo and goes up to 160 photos, while PhotoAI is a membership subscription you can cancel any time.` },
  { question: "Is PhotoAI only for headshots?", answer: "No. PhotoAI generates various types of AI photos, not just headshots. TailorPic is focused on headshots and profile photos." },
  { question: "Is TailorPic a subscription?", answer: `No. TailorPic packages are one-time payments starting at ${BASE_PRICE_DISPLAY} with no recurring fees.` },
  { question: "How many photos does TailorPic include?", answer: "TailorPic packages range from 1 to 160 photos across 12 categories, typically delivered within hours." },
];

export default function Page() {
  const relatedPages = getRelatedVsPages('photoai');

  return (
    <>
      <Header />
      <main id="main-content" className="bg-tp-paper">
      <ProductSchema
        name="TailorPic AI Headshots"
        description="AI headshot generator delivering up to 160 photos across 12 categories, trained with LoRA fine-tuning and results typically delivered within hours."
        price={BASE_PRICE_CENTS}
        category="Professional Services"
        slug="vs/photoai"
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
              PhotoAI is a broad AI photo tool sold as a subscription. TailorPic is a headshot specialist: polished, LoRA-trained photos across 12 categories (up to 160 per order), from {BASE_PRICE_DISPLAY}.
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
