import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Users, Columns, LayoutGrid, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const HeadshotCollage = dynamic(() => import('@/components/tools/headshot-collage'), {
  ssr: false,
  loading: () => (
    <div className="mx-auto max-w-5xl space-y-4" aria-busy="true">
      <div className="h-28 animate-pulse rounded-tp-card bg-tp-beige/30" />
      <div className="h-64 animate-pulse rounded-tp-card bg-tp-beige/30" />
    </div>
  ),
});

const title = 'Free Headshot Collage & Side-by-Side Maker | TailorPic';
const description =
  'Combine 2 to 6 photos into one image. Compare headshots side by side, build a team grid or make a before and after. Free, private and done in your browser.';
const path = '/tools/headshot-collage';
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const useCases = [
  {
    icon: Columns,
    title: 'Compare headshots',
    text: 'Put two or three options next to each other to pick the one that fits your profile best.',
  },
  {
    icon: Users,
    title: 'Team page',
    text: 'Arrange up to six photos in an even grid with optional name labels for an about page.',
  },
  {
    icon: LayoutGrid,
    title: 'Before & After',
    text: 'Show an original photo beside the result with simple labels under each.',
  },
  {
    icon: ShieldCheck,
    title: 'Private by design',
    text: 'Everything is processed in your browser. Your photos are not uploaded to a server.',
  },
];

const faqs = [
  {
    q: "How many photos can I combine in a collage?",
    a: "You can combine 2 to 6 photos into a single image. Choose a layout, set the spacing and background, add optional labels and download the result as a PNG.",
  },
  {
    q: "Can I use the collage maker for a team page?",
    a: "Yes. Arrange up to six photos in an even grid with optional name labels, then use the PNG on an about page or in a presentation. For larger teams you can make several collages.",
  },
  {
    q: "Can I compare headshots side by side?",
    a: "Yes. Place two or three headshots next to each other to see which one fits your profile best before you choose. A before and after layout with labels is also available.",
  },
  {
    q: "Are my photos uploaded to a server?",
    a: "No. The collage is built in your browser, so your photos stay on your device.",
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'Headshot Collage Maker', url: `${siteConfig.url}${path}` },
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
            Headshot Collage &amp; Side-by-Side Maker
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Combine 2 to 6 photos into a single image. Choose a layout, set the spacing and background, add labels, then download a PNG.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-5xl">
          <HeadshotCollage />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">What people make with it</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map(({ icon: Icon, title: t, text }) => (
              <div key={t} className="rounded-tp-card border border-tp-line bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-beige/40 text-tp-bronze-ink">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-xl font-normal text-tp-ink">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{text}</p>
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
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Need better photos to compare?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-tp-beige sm:text-base">
            TailorPic turns your selfies into professional AI headshots, ready to drop into your collage.
          </p>
          <Link href={ctaHref} className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-7 bg-tp-bronze text-tp-black hover:bg-tp-beige')}>
            Create your headshots with TailorPic →
          </Link>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
