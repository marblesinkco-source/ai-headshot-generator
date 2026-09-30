import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';
import { Palette, Sun, Maximize2, ArrowRight } from 'lucide-react';

const title = 'AI Photo Editor — Professional Headshot Editing Tools | TailorPic';
const description =
  'Explore TailorPic\'s AI-powered photo editing tools: background changer, photo enhancer, and image upscaler. Get professional headshots without manual editing.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/editor' },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}/editor`,
    siteName: siteConfig.name,
    type: 'website',
    images: [siteConfig.ogImage],
  },
};

const tools = [
  {
    icon: Palette,
    name: 'AI Background Changer',
    description:
      'Replace cluttered or unprofessional backgrounds with clean, studio-quality options. Choose from solid colors, gradient washes, or realistic office settings.',
    href: '/editor/background-changer',
  },
  {
    icon: Sun,
    name: 'AI Photo Enhancer',
    description:
      'Automatically correct lighting, sharpen details, and balance color so every headshot looks professionally retouched without any manual editing.',
    href: '/editor/photo-enhancer',
  },
  {
    icon: Maximize2,
    name: 'AI Image Upscaler',
    description:
      'Increase the resolution of your headshots while preserving sharpness. Get print-ready images from small originals with intelligent detail reconstruction.',
    href: '/editor/image-upscaler',
  },
];

export default function EditorIndexPage() {
  return (
    <main className="min-h-screen bg-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'AI Photo Editor', url: `${siteConfig.url}/editor` },
        ]}
      />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">
            AI-Powered Editing
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-tp-ink sm:text-5xl">
            AI Photo Editor
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Professional headshot editing powered by artificial intelligence. No Photoshop skills
            required — let AI handle the technical details while you focus on looking your best.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-tp-card border border-tp-line bg-white p-6 transition-all hover:border-tp-bronze/40 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tp-paper text-tp-bronze-ink">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-4 text-lg font-bold text-tp-ink group-hover:text-tp-bronze-ink transition-colors">
                  {tool.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{tool.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-tp-bronze-ink group-hover:text-tp-bronze transition-colors">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-tp-line bg-tp-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-tp-ink sm:text-3xl">
            Skip the editing — get AI headshots
          </h2>
          <p className="mt-3 text-tp-muted">
            Instead of editing photos yourself, upload a few selfies and let TailorPic generate
            studio-quality headshots for you. From $9.90.
          </p>
          <Link
            href="/auth/register"
            className={buttonVariants({ size: 'lg', className: 'mt-6' })}
          >
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
