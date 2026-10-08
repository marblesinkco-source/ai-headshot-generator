import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const competitor = "Facetune";
const title = `TailorPic vs ${competitor} — AI Headshot Generator Comparison`;
const description =
  'Compare TailorPic vs Facetune. TailorPic delivers LoRA-trained headshots from $1.99; Facetune is a selfie editing app on a subscription.';
const path = '/vs/facetune';

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

const rows: { label: string; tailorpic: string; other: string }[] = [
  { label: "Starting price", tailorpic: "from $1.99", other: "Free basic version; VIP subscription for full features" },
  { label: "Billing model", tailorpic: "One-time payment, no subscription", other: "Subscription (weekly, monthly or annual)" },
  { label: "Focus", tailorpic: "Headshots and profile photos", other: "Selfie retouching, reshaping and AI enhancement" },
  { label: "Photos included", tailorpic: "1 to 160, depending on package", other: "Edit your own photos; no headshot generation" },
  { label: "Delivery time", tailorpic: "Results within hours", other: "Instant edits on your existing photos" },
  { label: "Categories / styles", tailorpic: "12 categories (business, dating, creative, pets and more)", other: "Editing tools and filters, not headshot categories" },
  { label: "Training method", tailorpic: "LoRA fine-tuning on your own photos", other: "No personal model; applies edits to existing photos" },
  { label: "Ongoing cost", tailorpic: "None after your one-time payment (from $1.99)", other: "Recurring subscription for VIP features" },
  { label: "Platform", tailorpic: "Web-based, works on any device", other: "Mobile app (iOS and Android)" },
];

const differences = [
  { title: "Generation vs retouching", body: "TailorPic creates entirely new professional headshots from your selfies. Facetune edits and enhances photos you already have. If you lack a good starting photo, TailorPic solves that; Facetune requires one." },
  { title: "Professional focus vs selfie focus", body: "TailorPic is built for professional headshots across business, dating and creative contexts. Facetune is designed for everyday selfie enhancement and social media posts." },
  { title: "One-time vs subscription", body: "TailorPic packages are one-time payments starting at $1.99. Facetune offers a free version with limited tools and a VIP subscription for full access, which adds up over time." },
  { title: "Web vs mobile", body: "TailorPic works in any browser on any device. Facetune is a mobile app that requires downloading from the App Store or Google Play." },
];

const useCases = {
  tailorpic: [
    "A one-time payment from $1.99 with no subscription",
    "New professional headshots without an existing good photo",
    "A personalized LoRA-trained model of your face",
    "Photos for LinkedIn, resumes, dating and creative uses",
  ],
  other: [
    "Quick retouching of selfies you have already taken",
    "Skin smoothing, teeth whitening and face reshaping tools",
    "Social media photo editing on your phone",
    "Real-time camera filters and video enhancement",
  ],
};

const faqs = [
  { question: "Is TailorPic better than Facetune for headshots?", answer: "For professional headshots, yes. TailorPic generates new studio-quality photos from selfies, while Facetune edits existing photos. If you need a headshot for work or a profile, TailorPic is purpose-built for that." },
  { question: "Can Facetune create professional headshots?", answer: "Facetune can improve an existing photo with retouching and filters, but it does not generate new headshots. You need a good starting photo to work with." },
  { question: "Is TailorPic a subscription like Facetune?", answer: "No. TailorPic packages are one-time payments starting at $1.99 with no recurring fees. Facetune uses a subscription model for its VIP features." },
  { question: "Do I need to download an app for TailorPic?", answer: "No. TailorPic is entirely web-based and works in any modern browser. No app download is needed." },
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
              Facetune is a popular selfie editor for retouching and enhancing existing photos. TailorPic is a headshot specialist: realistic, LoRA-trained photos across 12 categories (up to 160 per order), from $1.99.
            </p>
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
