import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Camera, Users, Briefcase, Clock, CheckCircle, Sparkles } from 'lucide-react';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { BreadcrumbSchema, FAQSchema, PricingProductSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { formatPrice } from '@/lib/utils';
import { CATEGORIES } from '@/config/categories';
import { PROFESSIONS } from '@/config/professions';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const PAGE_TITLE = 'AI Professional Headshots | Studio-Quality Portraits from Selfies | TailorPic';
const PAGE_DESC =
  'Get studio-quality professional headshots from your own selfies. 40+ styles, 30+ profession-specific options. From $1.99. No studio visit needed.';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESC,
  alternates: { canonical: '/headshots' },
  openGraph: generateOGMetadata({
    title: 'AI Professional Headshots',
    description: PAGE_DESC,
    subtitle: 'Studio-quality portraits from selfies',
    path: '/headshots',
  }),
  twitter: generateTwitterMetadata({
    title: 'AI Professional Headshots | TailorPic',
    description: PAGE_DESC,
  }),
};

/* ── Profession categories for grouped display ── */
const PROFESSION_GROUPS = [
  {
    label: 'Business & Finance',
    slugs: ['executives', 'consultants', 'accountants', 'financial-advisors', 'insurance-agents', 'sales-professionals'],
  },
  {
    label: 'Healthcare',
    slugs: ['doctors', 'nurses', 'dentists', 'pharmacists', 'therapists', 'psychologists', 'veterinarians'],
  },
  {
    label: 'Legal & Education',
    slugs: ['lawyers', 'teachers', 'professors'],
  },
  {
    label: 'Technology & Engineering',
    slugs: ['developers', 'engineers', 'architects'],
  },
  {
    label: 'Creative & Media',
    slugs: ['actors', 'journalists', 'photographers', 'models', 'podcasters'],
  },
  {
    label: 'People & Marketing',
    slugs: ['recruiters', 'hr-professionals', 'marketing-professionals', 'coaches', 'realtors', 'personal-trainers'],
  },
];

const headshots = CATEGORIES.headshots;
const entryPackage = headshots.packages[0];
const recommendedPackage = headshots.packages.find((p) => p.recommended) ?? headshots.packages[4];

const faqItems = [
  {
    q: 'How many selfies do I need to upload?',
    a: 'Upload 4 to 10 clear photos of yourself. Include different angles and expressions for the best results. The AI uses these to learn your facial features.',
  },
  {
    q: 'What headshot styles are available?',
    a: 'TailorPic offers 40+ styles including Corporate, Studio Classic, Natural Light, Executive, Creative, LinkedIn-optimized, and many more. Each style produces a different look suitable for various professional contexts.',
  },
  {
    q: 'How long does it take to get my headshots?',
    a: 'Most headshots are delivered within 2 hours. Timing may vary slightly with demand, but we prioritize quality in every batch.',
  },
  {
    q: 'Can I use these headshots for my business?',
    a: 'Yes. Every package includes a full commercial license. Use your headshots on LinkedIn, company websites, business cards, email signatures, press materials, and anywhere else you need a professional photo.',
  },
  {
    q: 'What makes AI headshots different from studio photography?',
    a: 'AI headshots are generated from your selfies rather than captured in a studio. They offer the same professional quality at a fraction of the cost and time. No scheduling, no travel, no awkward poses under studio lights.',
  },
  {
    q: 'Are there headshots for specific professions?',
    a: 'Yes. TailorPic offers profession-specific headshot pages with recommended styles and use cases for over 30 professions, from lawyers and doctors to engineers and coaches.',
  },
];

export default function HeadshotsLandingPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <PricingProductSchema path="/headshots" />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Professional Headshots', url: `${siteConfig.url}/headshots` },
        ]}
      />
      <FAQSchema
        items={faqItems.map((item) => ({ question: item.q, answer: item.a }))}
      />
      <Header />

      {/* ── Hero ── */}
      <section className="relative bg-tp-black py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,#C9A98A_0%,transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,#C9A98A_0%,transparent_45%)]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,rgba(0,0,0,0.3))]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Professional Headshots' },
            ]}
            className="mb-8 justify-center [&_a]:text-tp-beige/50 [&_span]:text-tp-beige/70 [&_svg]:text-tp-beige/30"
          />

          <h1 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight">
            AI Professional{' '}
            <span className="text-tp-bronze">Headshots</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-tp-beige/70 max-w-2xl mx-auto leading-relaxed">
            Studio-quality headshots from your own selfies. 40+ styles, 30+
            profession-specific options. Ready in about 2 hours.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-tp-bronze text-tp-black hover:bg-tp-bronze/90 active:bg-tp-bronze/80 font-semibold shadow-lg shadow-tp-bronze/20'
              )}
            >
              Get Your Headshots <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/samples"
              className="inline-flex items-center gap-2 text-sm font-semibold text-tp-beige/70 hover:text-tp-bronze transition-colors"
            >
              View Samples <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <p className="mt-6 text-sm text-tp-beige/50">
            From {formatPrice(entryPackage?.price ?? 199)} &middot; No subscription &middot; Commercial license included
          </p>
        </div>
      </section>

      {/* ── Value props ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Camera, title: '40+ Styles', desc: 'Corporate, creative, outdoor, executive and more' },
              { icon: Users, title: '30+ Professions', desc: 'Tailored recommendations for your field' },
              { icon: Clock, title: '~2 Hour Delivery', desc: 'No scheduling, no studio visits needed' },
              { icon: Sparkles, title: '4K Resolution', desc: 'Print-ready with full commercial license' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 rounded-tp-card border border-tp-line bg-tp-paper p-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-tp-black">
                  <item.icon className="h-5 w-5 text-tp-bronze" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-tp-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-tp-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Professions by Industry ── */}
      <section className="bg-tp-paper py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              For Every Profession
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Headshots Tailored to Your Field
            </h2>
            <p className="mt-4 text-tp-muted max-w-2xl mx-auto leading-relaxed">
              Each profession page includes recommended styles, use cases, and
              industry-specific tips to help you choose the right look.
            </p>
          </div>

          <div className="space-y-8">
            {PROFESSION_GROUPS.map((group) => (
              <div key={group.label}>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.slugs.map((slug) => {
                    const prof = PROFESSIONS.find((p) => p.slug === slug);
                    if (!prof) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/headshots/for-${slug}`}
                        className="inline-flex items-center gap-1.5 rounded-tp-button border border-tp-line bg-white px-4 py-2.5 text-sm text-tp-ink transition-all hover:border-tp-bronze/40 hover:bg-tp-beige hover:text-tp-bronze-ink"
                      >
                        {prof.profession}
                        <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              Simple Process
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Three Steps to Your New Headshot
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Upload Selfies',
                desc: 'Upload 4-10 everyday photos from your phone. Different angles and expressions work best.',
              },
              {
                step: '02',
                title: 'Choose Your Style',
                desc: 'Pick from 40+ professional styles — corporate, creative, outdoor, LinkedIn-optimized, and more.',
              },
              {
                step: '03',
                title: 'Get Your Headshots',
                desc: 'Receive studio-quality headshots in about 2 hours. Download in 4K, ready for any platform.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-tp-black text-lg font-semibold text-tp-bronze">
                  {item.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-tp-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-semibold text-tp-bronze-ink hover:text-tp-ink transition-colors"
            >
              Learn more about the process <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pricing Preview ── */}
      <section className="border-t border-tp-line/40 bg-tp-paper py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              Packages
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Professional Headshots from {formatPrice(entryPackage?.price ?? 199)}
            </h2>
            <p className="mt-4 text-tp-muted max-w-xl mx-auto leading-relaxed">
              Start with a single photo or go all-in with up to 160 headshots.
              Every package includes a full commercial license.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {/* Entry */}
            {entryPackage && (
              <div className="rounded-tp-card border border-tp-line bg-white p-6">
                <h3 className="text-lg font-semibold text-tp-ink">{entryPackage.name}</h3>
                <p className="mt-1 text-2xl font-semibold text-tp-bronze-ink">
                  {formatPrice(entryPackage.price)}
                </p>
                <p className="mt-1 text-sm text-tp-muted">
                  {entryPackage.outputCount} headshot &middot; Try before you commit
                </p>
                <ul className="mt-4 space-y-2">
                  {entryPackage.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-tp-ink">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-tp-bronze" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended */}
            {recommendedPackage && (
              <div className="relative rounded-tp-card border-2 border-tp-bronze bg-white p-6 shadow-lg shadow-tp-bronze/10">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-tp-bronze px-3 py-0.5 text-xs font-semibold text-tp-black">
                  Most Popular
                </span>
                <h3 className="text-lg font-semibold text-tp-ink">{recommendedPackage.name}</h3>
                <p className="mt-1 text-2xl font-semibold text-tp-bronze-ink">
                  {formatPrice(recommendedPackage.price)}
                </p>
                <p className="mt-1 text-sm text-tp-muted">
                  {recommendedPackage.outputCount} headshots &middot;{' '}
                  {formatPrice(Math.round(recommendedPackage.price / recommendedPackage.outputCount))}/photo
                </p>
                <ul className="mt-4 space-y-2">
                  {recommendedPackage.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-tp-ink">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-tp-bronze" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* View all */}
            <div className="flex flex-col items-center justify-center rounded-tp-card border border-dashed border-tp-line bg-tp-beige/50 p-6 text-center">
              <Briefcase className="h-8 w-8 text-tp-bronze/60 mb-3" />
              <h3 className="text-lg font-semibold text-tp-ink">Need More?</h3>
              <p className="mt-2 text-sm text-tp-muted leading-relaxed">
                Up to 160 headshots per package. Team pricing available for 5+ people.
              </p>
              <Link
                href="/pricing"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-tp-bronze-ink hover:text-tp-ink transition-colors"
              >
                See All Packages <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              Questions
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Headshot FAQ
            </h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="group rounded-tp-card border border-tp-line bg-tp-paper transition-shadow hover:shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-[15px] font-semibold text-tp-ink">
                  {item.q}
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-tp-muted transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-sm text-tp-muted leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-tp-black py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C9A98A_0%,transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            Your Next Headshot, Ready Today
          </h2>
          <p className="mt-5 text-lg text-tp-beige/60 max-w-lg mx-auto leading-relaxed">
            Upload a few selfies and get back studio-quality headshots. No camera, no
            studio, no scheduling.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-tp-bronze text-tp-black hover:bg-tp-bronze/90 active:bg-tp-bronze/80 font-semibold shadow-lg shadow-tp-bronze/20'
              )}
            >
              Get Your Headshots <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/technology"
              className="inline-flex items-center gap-2 text-sm font-semibold text-tp-beige/70 hover:text-tp-bronze transition-colors"
            >
              How Our AI Works <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p className="mt-6 text-xs text-tp-beige/40">
            From {formatPrice(entryPackage?.price ?? 199)} &middot; No subscription required
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
