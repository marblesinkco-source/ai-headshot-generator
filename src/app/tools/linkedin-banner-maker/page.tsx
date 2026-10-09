import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Linkedin, Palette, LayoutGrid, Download } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'Free LinkedIn Banner Maker | TailorPic';
const description =
  'Create a professional LinkedIn background banner with your name, title, and brand colors. Everything runs in your browser.';
const path = '/tools/linkedin-banner-maker';
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const LinkedInBannerMaker = dynamic(() => import('@/components/tools/linkedin-banner-maker'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto h-80 w-full max-w-5xl animate-pulse rounded-tp-card border border-tp-line bg-white"
      aria-label="Loading banner maker"
    />
  ),
});

const faqs: { q: string; a: string }[] = [
  {
    q: "What size is a LinkedIn banner?",
    a: "A LinkedIn banner is 1584 by 396 pixels. The PNG this tool exports matches that size, so it uploads without being resized.",
  },
  {
    q: "What should I put on my LinkedIn banner?",
    a: "Keep it simple: your name and one short line about what you do, in a single calm brand color. Long taglines shrink and become hard to read on mobile.",
  },
  {
    q: "Why does my profile photo cover part of the banner?",
    a: "On desktop, your profile photo sits over the lower-left of the banner. Keep text centered or to the right, or leave the safe-area option on.",
  },
  {
    q: "Is the LinkedIn banner maker free, and is my data uploaded?",
    a: "Yes, it is free. The banner is built in your browser, so nothing is uploaded.",
  },
];

const tips = [
  {
    icon: Linkedin,
    title: 'Mind the profile photo',
    body: 'On desktop, your profile photo covers the lower-left of the banner. Keep text centered or to the right, or leave the safe-area option on.',
  },
  {
    icon: Palette,
    title: 'Pick one brand color',
    body: 'A single dark, calm color looks more professional than many. Choose one that matches your resume, site or company.',
  },
  {
    icon: LayoutGrid,
    title: 'Keep the text short',
    body: 'A name and one line about what you do is enough. Long taglines shrink and get hard to read on mobile.',
  },
  {
    icon: Download,
    title: 'Use the exact size',
    body: 'LinkedIn banners are 1584 by 396 pixels. The PNG you download matches that size, so it uploads without being cropped or blurred.',
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'LinkedIn Banner Maker', url: `${siteConfig.url}${path}` },
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
            Free LinkedIn Banner Maker
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Design a clean LinkedIn background banner with your name, title and colors, then download it as a PNG. Everything runs in your browser, so nothing is uploaded.
          </p>
        </div>
        <div className="mt-10">
          <LinkedInBannerMaker />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">Banner tips</h2>
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
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Pair your banner with a great headshot</h2>
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
