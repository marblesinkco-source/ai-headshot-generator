import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { getAllPhotoStyles, type PhotoStyle } from '@/config/styles';

export const metadata: Metadata = {
  title: { absolute: 'AI Headshot Styles: Find the Look That Fits You | TailorPic' },
  description:
    'Browse TailorPic headshot styles by category: professional, natural, creative, artistic and more. Find the look that fits you and see what each suits best.',
  alternates: { canonical: '/styles' },
  openGraph: generateOGMetadata({ title: 'AI Headshot Styles: Find the Look That Fits You | TailorPic', description: 
      'Browse AI headshot styles by category and see which use cases each one suits, from LinkedIn to creative portfolios.', path: '/styles', type: 'style' }),
  twitter: generateTwitterMetadata({ title: 'AI Headshot Styles: Find the Look That Fits You | TailorPic', description: 
      'Browse AI headshot styles by category and see which use cases each one suits, from LinkedIn to creative portfolios.' }),
};

interface StyleCategory {
  id: string;
  title: string;
  blurb: string;
  slugs: string[];
}

const CATEGORIES: StyleCategory[] = [
  {
    id: 'professional',
    title: 'Professional and Corporate',
    blurb: 'Perfect for LinkedIn, company websites, team pages and leadership bios.',
    slugs: [
      'corporate',
      'corporate-formal',
      'corporate-team',
      'executive',
      'professional-linkedin',
      'business-casual',
      'startup-founder',
      'tech-startup',
      'studio-classic',
      'headshot-close-up',
      'black-tie',
    ],
  },
  {
    id: 'natural',
    title: 'Natural and Lifestyle',
    blurb: 'Warm, relaxed looks for personal brands, coaches, creators and social profiles.',
    slugs: [
      'natural-light',
      'natural-bokeh',
      'warm-golden',
      'warm-portrait',
      'sunset-golden',
      'outdoor',
      'rustic-outdoor',
      'environmental',
      'casual',
      'soft-focus',
      'pastel-soft',
      'minimalist',
    ],
  },
  {
    id: 'creative',
    title: 'Creative and Editorial',
    blurb: 'Bold backdrops and expressive looks for portfolios, speaker pages and creative teams.',
    slugs: [
      'creative',
      'editorial',
      'fashion-editorial',
      'magazine-cover',
      'glamour',
      'bold-color',
      'gradient-backdrop',
      'urban-street',
      'bohemian',
      'industrial',
    ],
  },
  {
    id: 'classic-mood',
    title: 'Classic and Moody',
    blurb: 'Timeless black and white, cinematic and heritage looks with plenty of character.',
    slugs: [
      'old-money',
      'vintage',
      'yearbook',
      'monochrome',
      'black-and-white-classic',
      'high-contrast',
      'dark-moody',
      'cinematic',
      'film-noir',
      'noir-detective',
    ],
  },
  {
    id: 'artistic',
    title: 'Artistic and Fantasy',
    blurb: 'Playful, stylized portraits for avatars, gaming profiles and just-for-fun shots.',
    slugs: [
      'pop-art',
      'watercolor',
      'art-deco',
      'renaissance',
      'marble-bust',
      'anime-portrait',
      'cottagecore',
      'tropical',
      'neon-glow',
      'cyberpunk',
      'vaporwave',
      'holographic',
      'glass-morphism',
      'grunge',
    ],
  },
];

// Curated editorial picks, not usage data.
const POPULAR_SLUGS = [
  'professional-linkedin',
  'corporate',
  'natural-light',
  'startup-founder',
  'executive',
  'business-casual',
];

const TRY_MANY_SLUGS = ['corporate', 'natural-light', 'creative'];

function StyleCard({ style, featured = false }: { style: PhotoStyle; featured?: boolean }) {
  const useCase = style.idealFor[0];
  return (
    <Link
      href={`/styles/${style.slug}`}
      className={`group flex h-full flex-col rounded-tp-card border bg-white p-6 transition-all hover:-translate-y-1 hover:border-tp-bronze hover:shadow-md ${
        featured ? 'border-tp-bronze' : 'border-tp-line'
      }`}
    >
      <h3 className="font-display font-normal text-2xl text-tp-ink">{style.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-tp-muted">{style.description}</p>
      {useCase && (
        <p className="mt-4 rounded-tp-button bg-tp-paper px-3 py-2 text-sm text-tp-ink">
          <span className="font-semibold text-tp-bronze-ink">Great for: </span>
          {useCase}
        </p>
      )}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-tp-bronze-ink transition-all group-hover:gap-2.5">
        Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  );
}

function CtaButton({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
      className="inline-flex items-center justify-center gap-2 rounded-tp-button bg-tp-black px-6 py-3 text-sm font-semibold text-tp-paper transition-colors hover:bg-tp-ink"
    >
      {children} <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

export default function StylesPage() {
  const styles = getAllPhotoStyles();
  const bySlug = new Map(styles.map((s) => [s.slug, s]));

  const popular = POPULAR_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (s): s is PhotoStyle => Boolean(s),
  );
  const tryMany = TRY_MANY_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (s): s is PhotoStyle => Boolean(s),
  );

  const used = new Set(CATEGORIES.flatMap((c) => c.slugs));
  const groups = CATEGORIES.map((c) => ({
    ...c,
    items: c.slugs.map((slug) => bySlug.get(slug)).filter((s): s is PhotoStyle => Boolean(s)),
  }));
  // Any style not assigned above still shows up, so new styles are never hidden.
  const leftovers = styles.filter((s) => !used.has(s.slug));
  if (leftovers.length > 0) {
    groups.push({
      id: 'more',
      title: 'More Styles',
      blurb: 'Additional looks to explore.',
      slugs: leftovers.map((s) => s.slug),
      items: leftovers,
    });
  }

  return (
    <main id="main-content" className="min-h-screen bg-tp-paper">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Photo Styles', url: `${siteConfig.url}/styles` },
        ]}
      />
      <Header />

      <section className="pb-8 pt-20 sm:pt-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              Photo Styles
            </p>
            <h1 className="mt-3 font-display font-normal text-4xl tracking-tight text-tp-ink sm:text-5xl">
              Choose Your Perfect Headshot Style
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
              From formal corporate portraits to bold creative looks, find the style that fits where
              you will use it.
            </p>
            <nav aria-label="Style categories" className="mt-8 flex flex-wrap justify-center gap-2">
              <a
                href="#popular"
                className="rounded-tp-button border border-tp-bronze bg-white px-4 py-2 text-sm font-medium text-tp-bronze-ink transition-colors hover:bg-tp-beige/40"
              >
                Most popular
              </a>
              {groups.map((g) => (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  className="rounded-tp-button border border-tp-line bg-white px-4 py-2 text-sm font-medium text-tp-ink transition-colors hover:border-tp-bronze"
                >
                  {g.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {popular.length > 0 && (
        <section id="popular" className="scroll-mt-24 py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-tp-card border border-tp-bronze bg-tp-beige/30 p-6 sm:p-10">
              <div className="mb-8 max-w-2xl">
                <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
                  <Sparkles className="h-4 w-4" aria-hidden="true" /> Most Popular Styles
                </p>
                <h2 className="mt-2 font-display font-normal text-3xl text-tp-ink sm:text-4xl">
                  Start with a crowd favorite
                </h2>
                <p className="mt-3 text-tp-muted">
                  Our go-to picks for the most common needs: a LinkedIn profile, a company page or a
                  founder bio. Not sure where to begin? Begin here.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {popular.map((style) => (
                  <StyleCard key={style.slug} style={style} featured />
                ))}
              </div>
              <div className="mt-8">
                <CtaButton>Try a popular style</CtaButton>
              </div>
            </div>
          </div>
        </section>
      )}

      {groups.map((group) => (
        <section key={group.id} id={group.id} className="scroll-mt-24 py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-2xl">
              <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">{group.title}</h2>
              <p className="mt-2 text-tp-muted">{group.blurb}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((style) => (
                <StyleCard key={style.slug} style={style} />
              ))}
            </div>
            <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-tp-card border border-tp-line bg-white p-6 sm:flex-row sm:items-center">
              <p className="font-display font-normal text-xl text-tp-ink">
                Like a {group.title.toLowerCase()} look? Create yours from a few selfies.
              </p>
              <CtaButton>Get my headshots</CtaButton>
            </div>
          </div>
        </section>
      ))}

      <section id="cant-decide" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-tp-card bg-tp-black p-8 text-center sm:p-12">
            <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Can&apos;t decide?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-tp-beige">
              You do not have to pick just one. Different places call for different looks, so try
              a few styles and keep your favorites.
            </p>
            {tryMany.length > 0 && (
              <ul className="mx-auto mt-6 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
                {tryMany.map((style) => (
                  <li
                    key={style.slug}
                    className="rounded-tp-card border border-tp-bronze/40 p-4 text-sm text-tp-beige"
                  >
                    <Link
                      href={`/styles/${style.slug}`}
                      className="font-display font-normal text-xl text-tp-paper underline-offset-4 hover:underline"
                    >
                      {style.name}
                    </Link>
                    <p className="mt-1">{style.idealFor[0]}</p>
                  </li>
                ))}
              </ul>
            )}
            <p className="mx-auto mt-6 max-w-2xl text-sm text-tp-beige">
              A simple combo: a polished style for LinkedIn and work, a natural one for your
              personal brand, and a creative one for your portfolio.
            </p>
            <div className="mt-8">
              <Link
                href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
                className="inline-flex items-center justify-center gap-2 rounded-tp-button bg-tp-bronze px-6 py-3 text-sm font-semibold text-tp-black transition-colors hover:bg-tp-beige"
              >
                Try multiple styles <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
