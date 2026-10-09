import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import {
  Camera,
  Sun,
  User,
  Smile,
  Scan,
  Focus,
  Images,
  XCircle,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

const PAGE_TITLE = 'How to Take the Perfect Selfie for AI Headshots';
const PAGE_DESCRIPTION =
  'A practical checklist for the selfies you upload: lighting, background, angle, expression, distance, focus, and variety, so your AI headshots look like you.';

export const metadata: Metadata = {
  title: { absolute: `${PAGE_TITLE} | ${siteConfig.name}` },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/selfie-guide' },
  openGraph: generateOGMetadata({
    title: `${PAGE_TITLE} | ${siteConfig.name}`,
    description: PAGE_DESCRIPTION,
    path: '/selfie-guide',
  }),
  twitter: generateTwitterMetadata({
    title: `${PAGE_TITLE} | ${siteConfig.name}`,
    description: PAGE_DESCRIPTION,
  }),
};

type IconType = React.ComponentType<{ className?: string }>;

const tips: { icon: IconType; title: string; text: string }[] = [
  {
    icon: Sun,
    title: 'Lighting',
    text: 'Face a window or use soft, even light so it falls across your whole face. Avoid harsh overhead light and avoid standing with a bright window behind you.',
  },
  {
    icon: Camera,
    title: 'Background',
    text: 'Choose a plain, uncluttered wall or space. The AI replaces the background in your final headshots, but a clean one helps keep attention on your face.',
  },
  {
    icon: User,
    title: 'Angle',
    text: 'Hold the camera at eye level or slightly above. Avoid extreme angles, such as looking sharply up or down into the lens.',
  },
  {
    icon: Smile,
    title: 'Expression',
    text: 'Aim for a natural smile and a relaxed face. Include a few different expressions, for example a closed-mouth smile and a wider one.',
  },
  {
    icon: Scan,
    title: 'Distance',
    text: 'Frame from the chest up. Not so close that your face fills the screen, and not a full-body shot.',
  },
  {
    icon: Focus,
    title: 'Focus',
    text: 'Make sure your face is sharp and in focus. Tap your face on the screen, hold still, and check each photo before you upload it.',
  },
  {
    icon: Images,
    title: 'Variety',
    text: 'Upload 5 to 10 different photos with slight variations in expression, angle, and outfit, rather than many near-identical shots.',
  },
  {
    icon: XCircle,
    title: 'What to avoid',
    text: 'Sunglasses, heavy filters, group photos, and blurry shots. Use photos that look like you today.',
  },
];

const dos = [
  'Soft, even light on your face',
  'Chest-up framing at eye level',
  'A natural smile and a few other relaxed expressions',
  'Sharp, in-focus photos',
  '5 to 10 photos with small variations',
];

const donts = [
  'Sunglasses or anything covering your face',
  'Heavy filters or beauty modes',
  'Group photos or other people in frame',
  'Blurry or badly lit shots',
  'Harsh overhead light or a bright window behind you',
];

const howToSteps = [
  {
    name: 'Set up your light',
    text: 'Face a window or use soft, even light. Avoid harsh overhead light and backlighting.',
  },
  {
    name: 'Pick a clean background',
    text: 'Stand in front of a plain, uncluttered wall or space.',
  },
  {
    name: 'Set your angle and distance',
    text: 'Hold the camera at eye level or slightly above, framed from the chest up.',
  },
  {
    name: 'Relax your expression',
    text: 'Use a natural smile and a relaxed face, and take a few different expressions.',
  },
  {
    name: 'Check that your face is sharp',
    text: 'Tap your face to focus, hold still, and review each photo for blur.',
  },
  {
    name: 'Take 5 to 10 varied photos',
    text: 'Make slight variations between shots and skip sunglasses, heavy filters, and group photos.',
  },
];

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  step: howToSteps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.name,
    text: s.text,
    url: `${siteConfig.url}/selfie-guide`,
  })),
};

export default function SelfieGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Selfie Guide', url: `${siteConfig.url}/selfie-guide` },
        ]}
      />
      <Header />
      <main id="main-content">

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black py-20 sm:py-28">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze">
            <Camera className="h-3.5 w-3.5" aria-hidden="true" />
            Selfie Guide
          </div>
          <h1 className="font-display font-normal text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {PAGE_TITLE}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
            You only need a phone and a few minutes. Follow this checklist
            and your uploads will give {siteConfig.name} a clear picture of
            what you look like.
          </p>
        </div>
      </section>

      {/* Why it matters */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
            Why Your Upload Photos Matter
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed text-tp-muted">
            <p>
              The AI builds your headshots from the photos you give it. Clear,
              well-lit photos that show your face accurately give it better
              material to work from, and better input generally leads to better
              output.
            </p>
            <p>
              Blurry, heavily filtered, or poorly lit photos give it less to
              learn from. The checklist below takes only a few minutes to
              follow. For ideas on clothing, see{' '}
              <Link
                href="/what-to-wear"
                className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-ink"
              >
                what to wear
              </Link>
              , and for more on lighting and camera habits, read our{' '}
              <Link
                href="/photo-tips"
                className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-ink"
              >
                photo tips
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              The Checklist
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-tp-muted">
              Eight things to check before you take or choose your photos.
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

      {/* Before you upload */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              Before You Upload
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-tp-muted">
              A quick final check.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-tp-card border border-tp-line bg-white p-6 sm:p-8">
              <h3 className="font-display font-normal text-2xl text-tp-ink">
                Do
              </h3>
              <ul className="mt-5 space-y-4">
                {dos.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-tp-bronze-ink"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-tp-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6 sm:p-8">
              <h3 className="font-display font-normal text-2xl text-tp-ink">
                Don&apos;t
              </h3>
              <ul className="mt-5 space-y-4">
                {donts.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-tp-muted"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-tp-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display font-normal text-3xl text-white sm:text-4xl">
            Ready to Create Your Headshots?
          </h2>
          <p className="mt-4 text-tp-beige/60">
            Put the checklist to work, upload your photos, and let{' '}
            {siteConfig.name} do the rest.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
            >
              Get Started <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/headshots"
              className="inline-flex items-center gap-2 text-sm font-medium text-tp-beige/80 underline underline-offset-2 hover:text-white"
            >
              See headshot packages
            </Link>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
