import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Camera, Palette, Eye, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'Free #OpenToWork Profile Photo Frame Maker | TailorPic';
const description =
  'Add a #OpenToWork or #Hiring frame to your profile photo. Pick a color, adjust the ring, and download as PNG. Everything runs in your browser.';
const path = '/tools/open-to-work-frame';
const ctaHref = '/auth/register?redirect=/dashboard/upload';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const OpenToWorkFrame = dynamic(() => import('@/components/tools/open-to-work-frame'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto h-96 w-full max-w-5xl animate-pulse rounded-tp-card border border-tp-line bg-white"
      aria-label="Loading frame maker"
    />
  ),
});

const tips = [
  {
    icon: Camera,
    title: 'Start with a clear face',
    body: 'The ring covers the edge of your photo, so use a picture where your face is centered and well lit. A sharp, friendly headshot reads better at small sizes.',
  },
  {
    icon: Palette,
    title: 'Pick a color that contrasts',
    body: 'Choose a ring color that stands out against your photo background. The custom option lets you match a brand color or write your own short label.',
  },
  {
    icon: Eye,
    title: 'Keep the ring thin if you prefer subtle',
    body: 'A thinner ring leaves more of your face visible. Go thicker if you want the text to be easy to read in a small feed avatar.',
  },
  {
    icon: ShieldCheck,
    title: 'Stays on your device',
    body: 'The frame is drawn in your browser with the Canvas API. Your photo is never sent to a server, and you download the finished PNG directly.',
  },
];

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen bg-tp-paper">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'OpenToWork Frame', url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />

      <section className="px-4 pb-10 pt-16 sm:px-6 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">Free tool</p>
          <h1 className="font-display font-normal text-4xl leading-tight text-tp-ink sm:text-5xl md:text-6xl">
            Free #OpenToWork Profile Photo Frame Maker
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Add a #OpenToWork, #Hiring or custom colored ring to your profile photo. Adjust the thickness and text, then download a 500 by 500 PNG. Everything runs in your browser.
          </p>
        </div>
        <div className="mt-10">
          <OpenToWorkFrame />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">Frame tips</h2>
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

      <section className="px-4 pb-20 pt-6 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-tp-dialog bg-tp-ink px-6 py-12 text-center sm:px-10">
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Want a headshot worth framing?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-tp-beige sm:text-base">
            TailorPic turns your selfies into studio-style AI headshots. Plans start from {BASE_PRICE_DISPLAY}.
          </p>
          <Link href={ctaHref} className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-7 bg-tp-bronze text-tp-black hover:bg-tp-beige')}>
            Try TailorPic →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
