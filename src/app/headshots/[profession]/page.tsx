import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle, Briefcase, Camera, Sun, Palette, Monitor, Leaf, Crown, Building2, Aperture, Sparkles, User, Gem } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { formatPrice } from '@/lib/utils';
import { getAllProfessionSlugs, getProfessionBySlug, type ProfessionPage } from '@/config/professions';
import { getCategoryBySlug } from '@/config/categories';

interface Props {
  params: Promise<{ profession: string }>;
}

/** Strip the `for-` prefix from the URL slug to get the profession config key */
function parseProfessionSlug(rawSlug: string): string | null {
  if (rawSlug.startsWith('for-')) return rawSlug.slice(4);
  return null;
}

/* ── Style metadata for recommended style cards ── */
const STYLE_META: Record<string, { name: string; icon: LucideIcon; description: string }> = {
  corporate:             { name: 'Corporate',            icon: Briefcase, description: 'Clean backgrounds, professional lighting — the gold standard for business.' },
  'studio-classic':      { name: 'Studio Classic',       icon: Camera,    description: 'Timeless studio look with controlled lighting and neutral tones.' },
  'natural-light':       { name: 'Natural Light',        icon: Sun,       description: 'Warm, approachable photos with soft natural lighting.' },
  creative:              { name: 'Creative',             icon: Palette,   description: 'Bold and expressive with artistic lighting and color.' },
  'professional-linkedin': { name: 'Professional LinkedIn', icon: Monitor, description: 'Optimized for LinkedIn — polished and approachable.' },
  outdoor:               { name: 'Outdoor',              icon: Leaf,      description: 'Fresh, natural backdrops for an approachable look.' },
  executive:             { name: 'Executive',            icon: Crown,     description: 'Premium studio quality for senior leaders and board profiles.' },
  'startup-founder':     { name: 'Startup Founder',      icon: Building2, description: 'Modern and confident — the look of innovation.' },
  minimalist:            { name: 'Minimalist',           icon: Aperture,  description: 'Clean, distraction-free portraits that let you shine.' },
  glamour:               { name: 'Glamour',              icon: Sparkles,  description: 'Magazine-quality polish with dramatic lighting.' },
  casual:                { name: 'Casual',               icon: User,      description: 'Relaxed and authentic — great for personal brands.' },
  'old-money':           { name: 'Old Money',            icon: Gem,       description: 'Refined elegance with classic, understated styling.' },
};

function getStyleMeta(slug: string) {
  return STYLE_META[slug] ?? { name: slug, icon: Camera, description: 'Professional headshot style.' };
}

/* ── Static params ── */
export async function generateStaticParams() {
  return getAllProfessionSlugs().map((slug) => ({ profession: `for-${slug}` }));
}

/* ── SEO metadata ── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { profession: rawSlug } = await params;
  const slug = parseProfessionSlug(rawSlug);
  if (!slug) return {};
  const prof = getProfessionBySlug(slug);
  if (!prof) return {};

  return {
    title: { absolute: prof.seoTitle },
    description: prof.seoDescription,
    alternates: { canonical: `/headshots/for-${prof.slug}` },
    openGraph: generateOGMetadata({ title: prof.seoTitle, description: prof.seoDescription, path: `/headshots/for-${prof.slug}` }),
    twitter: generateTwitterMetadata({ title: prof.seoTitle, description: prof.seoDescription }),
  };
}

/* ── How-it-works steps ── */
const STEPS = [
  {
    step: '01',
    title: 'Upload Your Selfies',
    description: 'Take 4–10 casual selfies with your phone. Different angles, natural light — our AI handles the rest.',
  },
  {
    step: '02',
    title: 'AI Creates Your Headshots',
    description: 'Our AI trains a custom model on your features and generates studio-quality headshots tailored to your profession.',
  },
  {
    step: '03',
    title: 'Download & Use Everywhere',
    description: 'Receive high-resolution headshots within hours. Use them on any platform — full commercial rights included.',
  },
];

export default async function ProfessionLandingPage({ params }: Props) {
  const { profession: rawSlug } = await params;
  const slug = parseProfessionSlug(rawSlug);

  if (!slug) {
    notFound();
  }

  const prof = getProfessionBySlug(slug);

  if (!prof) {
    notFound();
  }

  // Get headshots category for pricing data
  const headshotsCat = getCategoryBySlug('headshots');
  const entryPkg = headshotsCat?.packages[0];

  // Generic FAQ for all profession pages
  const faqs = [
    {
      question: `What makes these headshots right for ${prof.profession.toLowerCase()}?`,
      answer: prof.whyMatters,
    },
    {
      question: 'How quickly will I get my headshots?',
      answer: 'Most headshots are ready within hours after you upload your selfies. You can upload from any device, at any time — no appointment needed.',
    },
    {
      question: 'What photos do I need to upload?',
      answer: 'Take 4–10 casual selfies with your phone. Show your face from different angles in natural light. No professional photos needed — our AI handles the rest.',
    },
    {
      question: 'Can I use these headshots commercially?',
      answer: 'Yes. Every order includes full commercial rights. Use your headshots on websites, directories, business cards, social media, and any other professional context.',
    },
    {
      question: 'What if I want multiple styles?',
      answer: `Our packages include multiple professional styles. For ${prof.profession.toLowerCase()}, we recommend ${prof.recommendedStyles.map((s) => getStyleMeta(s).name).join(', ')} — but you can choose from all 12 available styles.`,
    },
  ];

  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={prof.title}
        description={prof.seoDescription}
        price={entryPkg?.price ?? 199}
        category="Professional Services"
        slug={`headshots/for-${prof.slug}`}
      />
      <FAQSchema items={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Professional Headshots by Profession',
            itemListElement: getAllProfessionSlugs().map((s, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `https://www.tailorpic.com/headshots/for-${s}`,
            })),
          }),
        }}
      />
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Headshots', href: '/headshots' },
              { label: prof.title },
            ]}
            currentPath={`/headshots/for-${prof.slug}`}
          />
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Camera className="h-4 w-4" />
              For {prof.profession}
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              {prof.headline.replace('AI Headshots for ', '')}
              <br />
              <span className="not-italic text-tp-bronze">AI Headshots</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              {prof.subheadline}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots">
                <Button size="lg" className="gap-2">
                  Get Your Headshots
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/headshots">
                <Button variant="outline" size="lg" className="border-tp-beige/30 text-tp-beige hover:bg-tp-beige/10">
                  See All Styles
                </Button>
              </Link>
            </div>
            {entryPkg && (
              <p className="mt-6 text-sm text-tp-beige/50">
                Starting from {formatPrice(entryPkg.price)} · No subscription
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-tp-bronze" />
            Studio Quality
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-tp-bronze" />
            Fast Delivery
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-tp-bronze" />
            Full Commercial Rights
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-tp-bronze" />
            12 Professional Styles
          </span>
        </div>
      </section>

      {/* ── Why it matters ── */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
                Why Your Headshot Matters
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-tp-muted">
                {prof.whyMatters}
              </p>
            </div>

            {/* Use cases card */}
            <div className="rounded-tp-card border border-tp-line bg-tp-beige/50 p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-tp-bronze">
                Where You&apos;ll Use It
              </h3>
              <ul className="mt-6 space-y-4">
                {prof.useCases.map((useCase) => (
                  <li key={useCase} className="flex items-center gap-3 text-tp-ink">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-tp-bronze" />
                    <span className="text-sm">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Recommended Styles ── */}
      <section className="border-y border-tp-line bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
              Recommended Styles for {prof.profession}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
              Our most popular styles for your profession, hand-picked to match where you&apos;ll use them.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {prof.recommendedStyles.map((styleSlug) => {
              const style = getStyleMeta(styleSlug);
              const Icon = style.icon;
              return (
                <div
                  key={styleSlug}
                  className="group rounded-tp-card border border-tp-line bg-tp-paper p-6 text-center transition-shadow hover:shadow-md"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tp-bronze/10 transition-colors group-hover:bg-tp-bronze/20">
                    <Icon className="h-6 w-6 text-tp-bronze" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">{style.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{style.description}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-center text-sm text-tp-muted">
            Plus 9 more styles to choose from.{' '}
            <Link href="/headshots" className="font-medium text-tp-bronze hover:underline">
              See all styles &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
            3 Simple Steps
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-tp-muted">
            No studio. No photographer. Just your phone and a few minutes.
          </p>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {STEPS.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tp-bronze/10">
                  <span className="text-lg font-bold text-tp-bronze">{item.step}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-tp-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing teaser ── */}
      {headshotsCat && (
        <section className="border-y border-tp-line bg-tp-beige/30 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
                Simple, Transparent Pricing
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
                From a single headshot to a full portfolio — pick the package that fits.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {/* Show entry, recommended, and premium packages */}
              {[headshotsCat.packages[0], headshotsCat.packages[4], headshotsCat.packages[5]].filter(Boolean).map((pkg) => {
                const isRecommended = pkg.name === 'Professional';
                return (
                  <div
                    key={pkg.name}
                    className={`rounded-tp-card border p-6 text-center transition-shadow hover:shadow-md ${
                      isRecommended
                        ? 'border-tp-bronze bg-white shadow-sm ring-1 ring-tp-bronze/20'
                        : 'border-tp-line bg-white'
                    }`}
                  >
                    {isRecommended && (
                      <span className="mb-3 inline-block rounded-full bg-tp-bronze/10 px-3 py-1 text-xs font-semibold text-tp-bronze">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-tp-ink">{pkg.name}</h3>
                    <p className="mt-2 text-3xl font-bold text-tp-bronze-ink">
                      {formatPrice(pkg.price)}
                    </p>
                    <p className="mt-1 text-sm text-tp-muted">
                      {pkg.outputCount} {pkg.outputCount === 1 ? 'photo' : 'photos'}
                    </p>
                    <Link
                      href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
                      className="mt-6 block"
                    >
                      <Button
                        variant={isRecommended ? 'default' : 'outline'}
                        className="w-full"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-center text-sm text-tp-muted">
              <Link href="/pricing" className="font-medium text-tp-bronze hover:underline">
                View all 6 packages &rarr;
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* ── FAQs ── */}
      <section className="bg-tp-paper py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-tp-card border border-tp-line bg-white p-6">
                <h3 className="text-lg font-semibold text-tp-ink">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related profession pages ── */}
      <section className="border-t border-tp-line py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-normal text-tp-ink">
            Headshots for Other Professionals
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {(() => {
              const others = getAllProfessionSlugs().filter((s) => s !== prof.slug);
              // Show a diverse, deterministic subset: pick evenly from the list
              const step = Math.max(1, Math.floor(others.length / 8));
              const selected: string[] = [];
              for (let i = 0; selected.length < 8 && i < others.length; i += step) {
                selected.push(others[i]);
              }
              return selected;
            })().map((s) => {
                const p = getProfessionBySlug(s);
                if (!p) return null;
                return (
                  <Link
                    key={s}
                    href={`/headshots/for-${s}`}
                    className="rounded-full border border-tp-line bg-white px-5 py-2.5 text-sm font-medium text-tp-ink shadow-sm transition-colors hover:border-tp-bronze/40 hover:bg-tp-beige"
                  >
                    {p.profession}
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-tp-black py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-normal tracking-tight text-tp-paper sm:text-4xl">
              Ready to Upgrade Your Professional Image?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-tp-beige/70">
              Get studio-quality headshots delivered within hours — no appointment, no studio, no hassle. Starting from just {formatPrice(entryPkg?.price ?? 199)}.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots">
                <Button size="lg" className="gap-2">
                  Create Your Headshots Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/team-headshots">
                <Button variant="outline" size="lg" className="border-tp-beige/30 text-tp-beige hover:bg-tp-beige/10">
                  Team Plans
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-tp-beige/50">
              No subscription required. One-time payment. Full commercial rights.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
