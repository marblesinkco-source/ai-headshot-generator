import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Sun, Smile, Image as ImageIcon, Glasses } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const PassportPhotoMaker = dynamic(() => import('@/components/tools/passport-photo-maker'), {
  ssr: false,
  loading: () => (
    <div className="mx-auto max-w-5xl" aria-busy="true" aria-label="Loading photo maker">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-96 rounded-tp-card border border-tp-line bg-white" />
        <div className="h-96 rounded-tp-card border border-tp-line bg-white" />
      </div>
    </div>
  ),
});

const title = 'Free Passport & ID Photo Maker | TailorPic';
const description =
  'Crop your photo to passport and ID photo sizes for the US, UK, EU, India, Canada, Australia and China, or enter a custom size. Free, and everything runs in your browser.';
const path = '/tools/passport-photo-maker';
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const tips = [
  { icon: Sun, title: 'Even, natural light', text: 'Face a window or soft light source so there are no harsh shadows on your face or the background.' },
  { icon: Smile, title: 'Neutral expression', text: 'Look straight at the camera with your mouth closed and eyes open. Most authorities ask for a neutral face.' },
  { icon: ImageIcon, title: 'Plain background', text: 'Stand in front of a plain, light wall. Check your issuing authority for the exact background colour it requires.' },
  { icon: Glasses, title: 'Check the rules', text: 'Rules on glasses, headwear and print size differ by country. Always confirm with the official source before you submit.' },
];

const faqs: { q: string; a: string }[] = [
  { q: "What size is a passport photo?", a: "It depends on the country. The US uses 2 x 2 inches, while the UK and many EU countries use 35 x 45 mm. This tool offers presets for several countries and a custom size option, but always confirm with your issuing authority." },
  { q: "What background color do passport photos need?", a: "Rules differ by country, but most ask for a plain, light background without shadows or patterns. Check your issuing authority for the exact color it requires before you submit." },
  { q: "Can I wear glasses or a hat in a passport photo?", a: "Rules on glasses, headwear, and expression differ by country. Most authorities ask for a neutral expression with your eyes open and your face clearly visible, so check the official guidance." },
  { q: "Is my photo uploaded to a server?", a: "No. Your photo is processed in your browser and is never uploaded, so it stays on your device." },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'Passport Photo Maker', url: `${siteConfig.url}${path}` },
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
          <h1 className="font-display font-normal text-4xl leading-tight text-tp-ink sm:text-5xl md:text-6xl">Free Passport &amp; ID Photo Maker</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Crop your photo to common passport and ID sizes, then download it or print a 4x6 sheet. Your photo is processed in your browser and never uploaded.
          </p>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6">
        <PassportPhotoMaker />
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">Tips for a better ID photo</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tips.map((t) => (
              <div key={t.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-beige/40 text-tp-bronze-ink">
                  <t.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-xl font-normal text-tp-ink">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{t.text}</p>
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
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Want a professional headshot too?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-tp-beige sm:text-base">
            TailorPic creates studio-style AI headshots from your selfies for LinkedIn, resumes and more.
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
