import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import {
  Ruler,
  Users,
  Share2,
  Briefcase,
  FileText,
  ImageUp,
  FileImage,
  Crop,
  Layers,
  Eye,
  ArrowRight,
} from 'lucide-react';

const PAGE_TITLE = 'Headshot Size Guide: Dimensions for Every Platform';
const PAGE_DESCRIPTION =
  'Recommended headshot dimensions and aspect ratios for LinkedIn, Twitter/X, Facebook, Instagram, email signatures, Slack, Zoom, resumes, passport photos, and more.';

export const metadata: Metadata = {
  title: { absolute: `${PAGE_TITLE} | ${siteConfig.name}` },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/headshot-sizes' },
  openGraph: generateOGMetadata({
    title: `${PAGE_TITLE} | ${siteConfig.name}`,
    description: PAGE_DESCRIPTION,
    path: '/headshot-sizes',
  }),
  twitter: generateTwitterMetadata({
    title: `${PAGE_TITLE} | ${siteConfig.name}`,
    description: PAGE_DESCRIPTION,
  }),
};

type IconType = React.ComponentType<{ className?: string }>;

type PlatformSize = {
  platform: string;
  size: string;
  ratio: string;
  notes?: string;
};

type Category = {
  title: string;
  description: string;
  icon: IconType;
  items: PlatformSize[];
};

const categories: Category[] = [
  {
    title: 'Professional Networks',
    description: 'Profile photos and banners for the networks you are judged on.',
    icon: Users,
    items: [
      {
        platform: 'LinkedIn Profile',
        size: '400×400 px',
        ratio: '1:1',
        notes: 'Displays as a circle, min 200×200',
      },
      {
        platform: 'LinkedIn Banner',
        size: '1584×396 px',
        ratio: '4:1',
        notes: 'Background area',
      },
      {
        platform: 'Twitter/X Profile',
        size: '400×400 px',
        ratio: '1:1',
        notes: 'Displays as a circle',
      },
      {
        platform: 'Twitter/X Header',
        size: '1500×500 px',
        ratio: '3:1',
      },
    ],
  },
  {
    title: 'Social Media',
    description: 'Casual profile photos that still need to look sharp.',
    icon: Share2,
    items: [
      {
        platform: 'Facebook Profile',
        size: '170×170 px',
        ratio: '1:1',
        notes: 'Min 180×180 for quality',
      },
      {
        platform: 'Instagram Profile',
        size: '320×320 px',
        ratio: '1:1',
      },
    ],
  },
  {
    title: 'Business Tools',
    description: 'The small avatars that appear in your daily work apps.',
    icon: Briefcase,
    items: [
      {
        platform: 'Email Signature',
        size: '200×200 px',
        ratio: '1:1',
        notes: 'Keep under 100KB',
      },
      {
        platform: 'Slack/Teams',
        size: '512×512 px',
        ratio: '1:1',
      },
      {
        platform: 'Zoom Profile',
        size: '150×150 px',
        ratio: '1:1',
        notes: 'Upload higher, auto-crops',
      },
      {
        platform: 'Google Workspace',
        size: '250×250 px',
        ratio: '1:1',
      },
    ],
  },
  {
    title: 'Documents & Print',
    description: 'Formats where physical size and resolution both count.',
    icon: FileText,
    items: [
      {
        platform: 'Resume/CV',
        size: '2×2.5 in (600×750 px)',
        ratio: '4:5',
        notes: 'US standard',
      },
      {
        platform: 'Passport Photo (US)',
        size: '2×2 in (600×600 px)',
        ratio: '1:1',
        notes: 'White background required',
      },
      {
        platform: 'Press Kit',
        size: '1200×1500 px',
        ratio: '4:5',
        notes: 'High resolution',
      },
      {
        platform: 'Company Directory',
        size: '300×300 px',
        ratio: '1:1',
        notes: 'Varies by company',
      },
    ],
  },
];

const tips: { icon: IconType; title: string; text: string }[] = [
  {
    icon: ImageUp,
    title: 'Upload the highest resolution you have',
    text: 'Platforms scale images down well but scale them up badly. Start from the largest version and let each site resize it.',
  },
  {
    icon: FileImage,
    title: 'Use lossless formats when possible',
    text: 'PNG avoids the extra compression artifacts that JPEG adds each time a file is saved. Use JPEG when a size limit, like an email signature, calls for it.',
  },
  {
    icon: Crop,
    title: 'Crop for the circle',
    text: 'Many platforms show profile photos as circles. Keep your face centered with a little space around the head so the corners cropped away do not matter.',
  },
  {
    icon: Layers,
    title: 'Keep a master and make copies',
    text: 'Save one uncropped, full-size original. Create each platform version from the master instead of resizing an already-resized file.',
  },
  {
    icon: Eye,
    title: 'Check it at small size',
    text: 'Most of the places your headshot appears are tiny. Preview it at thumbnail size to confirm your face is still clear and recognizable.',
  },
];

export default function HeadshotSizesPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Headshot Sizes', url: `${siteConfig.url}/headshot-sizes` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black py-20 sm:py-28">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze">
            <Ruler className="h-3.5 w-3.5" aria-hidden="true" />
            Size Guide
          </div>
          <h1 className="font-display font-normal text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {PAGE_TITLE}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
            Using the right size keeps your headshot sharp, correctly cropped,
            and professional wherever it appears. Find the recommended
            dimensions for each platform below.
          </p>
        </div>
      </section>

      {/* Why size matters */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
            Why Size Matters
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed text-tp-muted">
            <p>
              A great headshot can still look unprofessional if it is the wrong
              size. Images that are too small get stretched and turn blurry,
              while images with the wrong aspect ratio get cropped
              automatically, sometimes cutting off part of your face.
            </p>
            <p>
              Each platform displays photos differently. Some show a circle,
              some a square, and some a wide banner. Starting with the
              recommended dimensions means your photo looks the way you intended
              on every profile, signature, and document.
            </p>
          </div>
        </div>
      </section>

      {/* Platform sizes */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              Platform Sizes
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-tp-muted">
              Recommended dimensions, aspect ratios, and notes for each
              platform. Requirements can change, so check a platform&apos;s own
              help pages if you need exact limits.
            </p>
          </div>

          <div className="space-y-12">
            {categories.map(({ title, description, icon: Icon, items }) => (
              <div key={title}>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tp-button bg-white">
                    <Icon
                      className="h-5 w-5 text-tp-bronze-ink"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-normal text-2xl text-tp-ink">
                      {title}
                    </h3>
                    <p className="text-sm text-tp-muted">{description}</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {items.map((item) => (
                    <div
                      key={item.platform}
                      className="rounded-tp-card border border-tp-line bg-white p-6"
                    >
                      <h4 className="text-base font-semibold text-tp-ink">
                        {item.platform}
                      </h4>
                      <dl className="mt-3 space-y-2 text-sm">
                        <div className="flex items-baseline justify-between gap-4">
                          <dt className="text-tp-muted">Recommended size</dt>
                          <dd className="text-right font-semibold text-tp-ink">
                            {item.size}
                          </dd>
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                          <dt className="text-tp-muted">Aspect ratio</dt>
                          <dd className="text-right font-semibold text-tp-ink">
                            {item.ratio}
                          </dd>
                        </div>
                      </dl>
                      {item.notes && (
                        <p className="mt-4 border-t border-tp-line pt-3 text-sm leading-relaxed text-tp-muted">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General tips */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              General Tips
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-tp-muted">
              Five habits that keep your headshot looking good at any size.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {tips.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="rounded-tp-card border border-tp-line bg-white p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-paper">
                    <Icon
                      className="h-5 w-5 text-tp-bronze-ink"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-tp-muted">
                    Tip {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-tp-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-tp-black py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-white">
            Need a Headshot That Fits Every Platform?
          </h2>
          <p className="mt-4 text-tp-beige/60 max-w-lg mx-auto">
            Upload a few selfies and get professional headshots delivered within hours, ready to size for LinkedIn, email, and more.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
              className="rounded-tp-button bg-tp-bronze px-8 py-3.5 text-sm font-semibold text-tp-black transition-colors hover:bg-tp-bronze/90"
            >
              Get Your Headshots <ArrowRight className="ml-1 inline h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/tools/headshot-resizer"
              className="text-sm font-semibold text-tp-beige/70 hover:text-tp-bronze transition-colors"
            >
              Try the Resizer Tool →
            </Link>
          </div>
          <p className="mt-5 text-xs text-tp-beige/40">
            Starting at {BASE_PRICE_DISPLAY} · No subscription required
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
