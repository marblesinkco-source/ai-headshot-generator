import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import {
  ArrowRight,
  Palette,
  Building2,
  BookOpen,
  Landmark,
  TreePine,
  Lightbulb,
  Target,
  Monitor,
  Layers,
} from 'lucide-react';

const PAGE_TITLE =
  'Professional Headshot Backgrounds: Choose Your Perfect Setting';
const PAGE_DESCRIPTION =
  'Explore studio, gradient, and environmental background options for your AI headshot. Find the perfect setting to match your industry and personal brand.';

export const metadata: Metadata = {
  title: { absolute: `${PAGE_TITLE} | ${siteConfig.name}` },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/backgrounds' },
  openGraph: generateOGMetadata({
    title: `${PAGE_TITLE} | ${siteConfig.name}`,
    description: PAGE_DESCRIPTION,
    path: '/backgrounds',
  }),
  twitter: generateTwitterMetadata({
    title: `${PAGE_TITLE} | ${siteConfig.name}`,
    description: PAGE_DESCRIPTION,
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const studioBackgrounds: {
  name: string;
  description: string;
  bestFor: string;
  swatch: string; // CSS background value
}[] = [
  {
    name: 'Classic White',
    description: 'Clean, timeless. The universal standard for professional headshots.',
    bestFor: 'LinkedIn, resumes, corporate sites',
    swatch: '#ffffff',
  },
  {
    name: 'Soft Gray',
    description: 'Professional and neutral. Adds depth without distraction.',
    bestFor: 'Corporate profiles, team directories',
    swatch: '#c8c8c8',
  },
  {
    name: 'Dark Charcoal',
    description: 'Bold and executive. Commands attention and authority.',
    bestFor: 'Executive bios, speaker profiles',
    swatch: '#3a3a3a',
  },
  {
    name: 'Navy Blue',
    description: 'Authoritative and trustworthy. A classic in professional settings.',
    bestFor: 'Finance, law, consulting',
    swatch: '#1e3a5f',
  },
  {
    name: 'Warm Beige',
    description: 'Approachable and warm. Creates a friendly, inviting impression.',
    bestFor: 'Real estate, coaching, therapy',
    swatch: '#d4b896',
  },
  {
    name: 'Forest Green',
    description: 'Natural and calming. Conveys growth and stability.',
    bestFor: 'Healthcare, wellness, education',
    swatch: '#2d5a3d',
  },
];

const gradientBackgrounds: {
  name: string;
  description: string;
  bestFor: string;
  gradient: string; // CSS background value
}[] = [
  {
    name: 'Blue Gradient',
    description: 'Modern and tech-forward. A polished, contemporary look.',
    bestFor: 'Tech, startups, SaaS',
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #4a8bc2 100%)',
  },
  {
    name: 'Warm Gradient',
    description: 'Creative and energetic. Adds warmth and personality.',
    bestFor: 'Marketing, design, media',
    gradient: 'linear-gradient(135deg, #c27d4a 0%, #d4a373 50%, #e8c99b 100%)',
  },
  {
    name: 'Neutral Gradient',
    description: 'Subtle and refined. Works for any professional context.',
    bestFor: 'Any professional context',
    gradient: 'linear-gradient(135deg, #e8e4df 0%, #c8c4bf 100%)',
  },
];

type IconType = React.ComponentType<{ className?: string }>;

const environmentalBackgrounds: {
  icon: IconType;
  name: string;
  description: string;
  bestFor: string;
}[] = [
  {
    icon: Building2,
    name: 'Office Setting',
    description:
      'Glass walls, modern workspace feel. Projects a corporate, forward-thinking image.',
    bestFor: 'Business, management, corporate roles',
  },
  {
    icon: BookOpen,
    name: 'Bookshelf',
    description:
      'Academic, scholarly, and authoritative. Perfect for thought leaders and educators.',
    bestFor: 'Academia, publishing, consulting',
  },
  {
    icon: Landmark,
    name: 'City Skyline',
    description:
      'Urban, ambitious, and dynamic. Conveys energy and metropolitan sophistication.',
    bestFor: 'Finance, real estate, entrepreneurship',
  },
  {
    icon: TreePine,
    name: 'Nature / Outdoor',
    description:
      'Natural light with a garden or park feel. Warm, personable, and approachable.',
    bestFor: 'Wellness, coaching, creative fields',
  },
];

const tips: { icon: IconType; title: string; description: string }[] = [
  {
    icon: Target,
    title: 'Match your industry expectations',
    description:
      'Finance and law lean toward solid, darker backgrounds. Creative industries can embrace gradients and color.',
  },
  {
    icon: Monitor,
    title: 'Consider where the photo will be used',
    description:
      'LinkedIn favors clean, professional backgrounds. A personal website gives you more freedom to stand out.',
  },
  {
    icon: Lightbulb,
    title: 'Keep it simple if unsure',
    description:
      'A classic white or soft gray background works for virtually every professional context.',
  },
  {
    icon: Layers,
    title: 'Try multiple and compare',
    description:
      'With TailorPic, you can generate headshots with different backgrounds and choose the one that fits best.',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function BackgroundsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Backgrounds', url: `${siteConfig.url}/backgrounds` },
        ]}
      />
      <Header />
      <main id="main-content">

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black py-20 sm:py-28">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze">
            <Palette className="h-3.5 w-3.5" aria-hidden="true" />
            Backgrounds
          </div>
          <h1 className="font-display font-normal text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Professional Headshot Backgrounds
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
            Choose from studio-quality backgrounds that match your industry and
            personal brand.
          </p>
        </div>
      </section>

      {/* Studio Backgrounds */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              Studio Backgrounds
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-tp-muted">
              Classic solid-color backdrops used in professional photography
              studios worldwide.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studioBackgrounds.map((bg) => (
              <div
                key={bg.name}
                className="rounded-tp-card border border-tp-line bg-white p-6"
              >
                <div
                  className="mb-4 h-28 w-full rounded-tp-button border border-tp-line"
                  style={{ backgroundColor: bg.swatch }}
                  aria-label={`${bg.name} color swatch`}
                />
                <div className="mb-1 inline-flex rounded-full bg-tp-paper px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-tp-muted">
                  Studio
                </div>
                <h3 className="mt-2 text-base font-semibold text-tp-ink">
                  {bg.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-tp-muted">
                  {bg.description}
                </p>
                <div className="mt-3 rounded-tp-button bg-tp-paper px-3 py-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-tp-bronze-ink">
                    Best for
                  </span>
                  <span className="mt-0.5 block text-sm text-tp-ink">
                    {bg.bestFor}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Backgrounds */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              Gradient Backgrounds
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-tp-muted">
              Smooth color transitions for a modern, polished aesthetic.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {gradientBackgrounds.map((bg) => (
              <div
                key={bg.name}
                className="rounded-tp-card border border-tp-line bg-white p-6"
              >
                <div
                  className="mb-4 h-28 w-full rounded-tp-button"
                  style={{ background: bg.gradient }}
                  aria-label={`${bg.name} gradient swatch`}
                />
                <div className="mb-1 inline-flex rounded-full bg-tp-bronze/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-tp-bronze-ink">
                  Gradient
                </div>
                <h3 className="mt-2 text-base font-semibold text-tp-ink">
                  {bg.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-tp-muted">
                  {bg.description}
                </p>
                <div className="mt-3 rounded-tp-button bg-tp-paper px-3 py-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-tp-bronze-ink">
                    Best for
                  </span>
                  <span className="mt-0.5 block text-sm text-tp-ink">
                    {bg.bestFor}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental / Scene Backgrounds */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              Environmental Backgrounds
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-tp-muted">
              Scene-based settings that tell a story about who you are and what
              you do.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {environmentalBackgrounds.map(
              ({ icon: Icon, name, description, bestFor }) => (
                <div
                  key={name}
                  className="rounded-tp-card border border-tp-line bg-white p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-paper">
                      <Icon
                        className="h-5 w-5 text-tp-bronze-ink"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <div className="inline-flex rounded-full bg-tp-paper px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-tp-muted">
                        Scene
                      </div>
                      <h3 className="text-base font-semibold text-tp-ink">
                        {name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-tp-muted">
                    {description}
                  </p>
                  <div className="mt-3 rounded-tp-button bg-tp-paper px-3 py-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-tp-bronze-ink">
                      Best for
                    </span>
                    <span className="mt-0.5 block text-sm text-tp-ink">
                      {bestFor}
                    </span>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* How to Choose */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              How to Choose Your Background
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-tp-muted">
              Not sure which background is right for you? These tips will help.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {tips.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-tp-card border border-tp-line bg-white p-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-paper">
                    <Icon
                      className="h-5 w-5 text-tp-bronze-ink"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-tp-ink">
                    {title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-tp-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display font-normal text-3xl text-white sm:text-4xl">
            Ready to Create Your Headshot?
          </h2>
          <p className="mt-4 text-tp-beige/60">
            Choose your background, upload your selfies, and let{' '}
            {siteConfig.name} handle the rest.
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
