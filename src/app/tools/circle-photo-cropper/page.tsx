import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Crop, Camera, Palette, CircleUser } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'Free Circle Photo Cropper | Round Profile Picture Maker | TailorPic';
const description =
  'Crop your photo into a perfect circle with transparent or solid background. Choose your size, zoom and position, then download as PNG. No upload needed.';
const path = '/tools/circle-photo-cropper';
const ctaHref = '/auth/register?redirect=/dashboard/upload';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const CirclePhotoCropper = dynamic(() => import('@/components/tools/circle-photo-cropper'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto h-80 w-full max-w-3xl animate-pulse rounded-tp-card border border-tp-line bg-white"
      aria-label="Loading circle cropper"
    />
  ),
});

const tips = [
  {
    icon: CircleUser,
    title: 'Center the face',
    body: 'Place your eyes in the upper half of the circle and leave a little room above your head. Circles trim the corners, so keep key details near the middle.',
  },
  {
    icon: Crop,
    title: 'Zoom in a little',
    body: 'Profile pictures display small. A slightly tighter crop keeps your face readable at thumbnail size on social and chat apps.',
  },
  {
    icon: Camera,
    title: 'Start with a sharp photo',
    body: 'Use the highest resolution original you have. A larger source lets you zoom in and still export a crisp 800 or 1000 pixel circle.',
  },
  {
    icon: Palette,
    title: 'Pick the right background',
    body: 'Transparent PNGs work well on colored or dark profile slots. Choose a solid color if the platform fills transparent areas with white or black.',
  },
];

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen bg-tp-paper">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'Circle Photo Cropper', url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />

      <section className="px-4 pb-10 pt-16 sm:px-6 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">Free tool</p>
          <h1 className="font-display font-normal text-4xl leading-tight text-tp-ink sm:text-5xl md:text-6xl">
            Free Circle Photo Cropper
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Crop any photo into a perfect circle with a transparent or solid background, then download it as a PNG. Everything runs in your browser, so your photo stays on your device.
          </p>
        </div>
        <div className="mt-10">
          <CirclePhotoCropper />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">Circle cropping tips</h2>
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
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Want a headshot worth cropping?</h2>
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
