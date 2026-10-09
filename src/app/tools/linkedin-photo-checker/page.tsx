import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { CheckSquare, SlidersHorizontal, Download, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'Free LinkedIn Profile Photo Checker | TailorPic';
const description =
  'Check if your LinkedIn profile photo meets recommended standards. Get instant feedback on dimensions, aspect ratio, brightness, and composition. Free and runs in your browser.';
const path = '/tools/linkedin-photo-checker';
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const LinkedInPhotoChecker = dynamic(() => import('@/components/tools/linkedin-photo-checker'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto h-96 w-full max-w-4xl animate-pulse rounded-tp-card border border-tp-line bg-white"
      aria-label="Loading LinkedIn photo checker"
    />
  ),
});

const tips = [
  {
    icon: CheckSquare,
    title: 'Instant analysis',
    body: 'Upload your photo and get scored on six criteria: dimensions, aspect ratio, file size, resolution, brightness, and face centering.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Actionable feedback',
    body: 'Each check shows pass, warning, or fail with specific tips to improve your photo before uploading it to LinkedIn.',
  },
  {
    icon: Download,
    title: 'Download optimized',
    body: 'Get a center-cropped, square version of your photo optimized for LinkedIn at the recommended resolution.',
  },
  {
    icon: ShieldCheck,
    title: 'Stays on your device',
    body: 'Your photo is analyzed in your browser using the Canvas API. It is never uploaded to a server.',
  },
];

const faqs: { q: string; a: string }[] = [
  { q: "What size should a LinkedIn profile photo be?", a: "LinkedIn recommends a square profile photo of at least 400 x 400 pixels. Larger square images work too, and LinkedIn displays them in a small circle, so keep your face centered. Check LinkedIn's current help pages for the latest limits." },
  { q: "What does the LinkedIn photo checker look at?", a: "It scores your photo on six criteria: dimensions, aspect ratio, file size, resolution, brightness, and face centering. Each check shows pass, warning, or fail with a tip to improve it." },
  { q: "What makes a good LinkedIn profile photo?", a: "A clear, well-lit photo where your face is large in the frame, centered, and easy to recognize at small sizes. Use a simple background, a natural expression, and clothing you would wear in your profession." },
  { q: "Is my photo uploaded when I use the checker?", a: "No. The analysis runs in your browser using the Canvas API, so your photo stays on your device and is not sent to a server." },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'LinkedIn Photo Checker', url: `${siteConfig.url}${path}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
      <Header />
      <main id="main-content" className="bg-tp-paper">

      <section className="px-4 pb-10 pt-16 sm:px-6 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">Free tool</p>
          <h1 className="font-display font-normal text-4xl leading-tight text-tp-ink sm:text-5xl md:text-6xl">
            Free LinkedIn Profile Photo Checker
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Upload your photo and check if it meets LinkedIn&apos;s recommended standards. Get scored on dimensions, aspect ratio, brightness, and composition. Everything runs in your browser.
          </p>
        </div>
        <div className="mt-10">
          <LinkedInPhotoChecker />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">How it works</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tips.map((tip) => (
              <div key={tip.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-beige/40 text-tp-bronze-ink">
                  <tip.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-xl font-normal text-tp-ink">{tip.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">Frequently asked questions</h2>
          <div className="mt-8 divide-y divide-tp-line rounded-tp-card border border-tp-line bg-white">
            {faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-tp-ink">
                  {f.q}
                  <span className="text-tp-bronze-ink transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-tp-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-6 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-tp-dialog bg-tp-ink px-6 py-12 text-center sm:px-10">
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Want a studio-quality LinkedIn headshot?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-tp-beige sm:text-base">
            TailorPic turns your selfies into studio-style AI headshots. Plans start from {BASE_PRICE_DISPLAY}.
          </p>
          <Link href={ctaHref} className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-7 bg-tp-bronze text-tp-black hover:bg-tp-beige')}>
            Try TailorPic →
          </Link>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
