import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const LinkedInPhotoCropper = dynamic(() => import('@/components/tools/linkedin-photo-cropper'), {
  ssr: false,
  loading: () => (
    <div className="mx-auto h-64 w-full max-w-3xl animate-pulse rounded-tp-card border border-tp-line bg-white" aria-hidden="true" />
  ),
});

const title = 'Free LinkedIn Photo Cropper | TailorPic';
const description =
  'Crop your photo to the perfect LinkedIn dimensions for free. Zoom, reposition with a circular preview and download a 400x400 PNG, all in your browser.';
const path = '/tools/linkedin-photo-cropper';
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const tips = [
  { title: 'Center your face', body: 'LinkedIn shows a small circle, so keep your eyes roughly in the upper third and your face near the middle of the circle.' },
  { title: 'Leave room around your head', body: 'Do not crop too tightly. A little space above your head and shoulders inside the circle looks more natural.' },
  { title: 'Start from a high-resolution original', body: 'Zooming in enlarges pixels, so begin with a sharp photo and avoid zooming further than you need.' },
  { title: 'Check the circle, not the square', body: 'The corners of the square are hidden on LinkedIn. Keep anything important inside the circular guide.' },
];

const faqs: { q: string; a: string }[] = [
  { q: "What aspect ratio does LinkedIn use for profile photos?", a: "LinkedIn profile photos are square (1:1) and are shown inside a circle. This tool crops to a square so your photo fits that format." },
  { q: "What size is the cropped file?", a: "The cropper downloads a square 400 x 400 PNG, which matches LinkedIn's recommended minimum dimensions." },
  { q: "How do I make sure my face fits the circular crop?", a: "Use the circular preview while you drag and zoom. Keep your face near the middle, leave a little space above your head, and keep anything important inside the circle because the corners of the square are hidden." },
  { q: "Will cropping reduce my photo quality?", a: "Zooming in enlarges pixels, so start from a sharp, high-resolution original and avoid zooming further than you need. Cropping happens in your browser and your photo is not uploaded." },
];

export default function LinkedInPhotoCropperPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'LinkedIn Photo Cropper', url: `${siteConfig.url}${path}` },
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
            Free LinkedIn Photo Cropper
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Upload a photo, drag and zoom it into place, and download a square 400 x 400 PNG with a circular
            LinkedIn-style preview. Everything runs in your browser, so your photo stays on your device.
          </p>
        </div>
        <div className="mt-10 px-0">
          <LinkedInPhotoCropper />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">
            Cropping tips
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {tips.map((t) => (
              <div key={t.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <h3 className="font-semibold text-tp-ink">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{t.body}</p>
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
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">
            Want a professional headshot that needs no cropping?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-tp-beige sm:text-base">
            TailorPic turns your selfies into AI-generated professional headshots, from {BASE_PRICE_DISPLAY}.
          </p>
          <Link
            href={ctaHref}
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-7 bg-tp-bronze text-tp-black hover:bg-tp-beige')}
          >
            Get yours with TailorPic
          </Link>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
