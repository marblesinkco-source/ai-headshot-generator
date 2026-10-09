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

const competitor = "Luminar AI";
const title = `TailorPic vs ${competitor} — AI Headshot Generator Comparison`;
const description =
  `Compare TailorPic vs Luminar AI. Luminar AI is Skylum\'s AI photo editor; TailorPic makes professional headshots from selfies, from ${BASE_PRICE_DISPLAY}.`;
const path = '/vs/luminar-ai';
const canonicalUrl = 'https://www.tailorpic.com/vs/luminar-ai';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: generateOGMetadata({ title, description, path: path, type: 'vs' }),
  twitter: generateTwitterMetadata({ title, description, type: 'vs' }),
};


const intro =
  "Luminar AI is Skylum's AI-assisted photo editor for retouching and enhancing existing photos. TailorPic takes a different route: it trains a personal model on your selfies and generates professional headshots from scratch.";

const rows: { label: string; tailorpic: string; other: string }[] = [
  {
    "label": "Starting price",
    "tailorpic": `from ${BASE_PRICE_DISPLAY}`,
    "other": "Check Skylum's site for current pricing"
  },
  {
    "label": "Photos included",
    "tailorpic": "1 to 160, depending on package",
    "other": "Edits the photos you import"
  },
  {
    "label": "Delivery time",
    "tailorpic": "Results within hours",
    "other": "Editing is typically instant on your computer"
  },
  {
    "label": "Core purpose",
    "tailorpic": "AI headshots of you from selfies",
    "other": "AI-assisted photo editing and enhancement"
  },
  {
    "label": "Training method",
    "tailorpic": "LoRA fine-tuning on your own photos",
    "other": "Editing tools applied to existing images"
  },
  {
    "label": "Pricing model",
    "tailorpic": "One-time payment, no subscription",
    "other": "Check their site for license options"
  },
  {
    "label": "Professional headshots",
    "tailorpic": "Dedicated business and LinkedIn category",
    "other": "Possible by retouching a photo you already have"
  },
  {
    "label": "Dating and social photos",
    "tailorpic": "Dedicated dating category",
    "other": "Possible through manual editing"
  },
  {
    "label": "Software install",
    "tailorpic": "Runs in your browser",
    "other": "Desktop software; check their site for requirements"
  },
  {
    "label": "Team features",
    "tailorpic": "Team and enterprise options available",
    "other": "Check their site for team plans"
  }
];

const differences = [
  {
    "title": "Generates new photos, not just edits",
    "body": "Luminar AI enhances photos you already have. TailorPic generates fresh headshots from a handful of selfies, so you do not need a good original."
  },
  {
    "title": "No software to install",
    "body": "TailorPic works in your browser: upload selfies and download results. There is no editor to learn."
  },
  {
    "title": "A low entry price",
    "body": `TailorPic packages start from ${BASE_PRICE_DISPLAY}, with no subscription to manage.`
  },
  {
    "title": "Trade-off on editing control",
    "body": "Luminar offers detailed creative control over a photo. TailorPic delivers within hours for most orders and is focused on people photos."
  }
];

const useCases = {
  tailorpic: [
  "Brand-new headshots generated from selfies",
  "A single small payment with no subscription",
  "No desktop software to install",
  "A likeness trained on your own photos"
],
  other: [
  "Creative retouching of photos you already own",
  "Landscape and general photo enhancement",
  "A desktop editing workflow",
  "To review Skylum's current licenses and features"
],
};

const faqs = [
  {
    "question": "Is TailorPic cheaper than Luminar AI?",
    "answer": `TailorPic packages start from ${BASE_PRICE_DISPLAY} and go up to 160 photos. Luminar AI pricing varies, so compare against Skylum's current price page.`
  },
  {
    "question": "Can Luminar AI create a headshot from selfies?",
    "answer": "Luminar AI is an editor for photos you already have. TailorPic generates entirely new professional headshots from your selfies."
  },
  {
    "question": "How long does TailorPic take?",
    "answer": "Results within hours, since a dedicated model is fine-tuned on your uploads."
  },
  {
    "question": "Do I need to install anything?",
    "answer": "No. TailorPic runs in your browser."
  },
  {
    "question": "Can I use both?",
    "answer": "Yes. Some people generate headshots with TailorPic and then fine-tune them in a desktop editor."
  }
];

export default function VsLuminarAiPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-tp-paper">
      <ProductSchema
        name="TailorPic AI Headshots"
        description="AI headshot generator delivering up to 160 photos across 12 categories, trained with LoRA fine-tuning and results typically delivered within hours."
        price={199}
        category="Professional Services"
        slug="vs/luminar-ai"
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
