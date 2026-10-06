import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Camera, Users, Briefcase, Clock, CheckCircle, Sparkles, Fingerprint } from 'lucide-react';
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
  {
    q: 'What is your refund policy?',
    a: 'We offer a satisfaction guarantee on every package. If you are not happy with your headshots, reach out and we will work with you to make it right. See our guarantee page for details.',
  },
  {
    q: 'Is my data safe?',
    a: 'Yes. Your photos are processed securely, never sold or shared, and automatically deleted within 30 days. Payment is handled through Stripe. See our security page for full details.',
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
              { icon: Sparkles, title: 'HD & 4K Quality', desc: 'Print-ready with full commercial license' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 rounded-tp-card border border-tp-line bg-tp-paper p-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-tp-black">
                  <item.icon className="h-5 w-5 text-tp-bronze" aria-hidden="true" />
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
                        className="group inline-flex items-center gap-1.5 rounded-tp-button border border-tp-line bg-white px-4 py-2.5 text-sm text-tp-ink transition-all hover:border-tp-bronze/40 hover:bg-tp-beige hover:text-tp-bronze-ink"
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
                desc: 'Receive studio-quality headshots in about 2 hours. HD on every package, 4K on Executive. Ready for any platform.',
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

      {/* ── Full Pricing Ladder ── */}
      <section className="border-t border-tp-line/40 bg-tp-paper py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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

          {/* Package ladder table */}
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-tp-line">
                  <th className="px-4 py-3 font-semibold text-tp-ink">Package</th>
                  <th className="px-4 py-3 font-semibold text-tp-ink text-right">Photos</th>
                  <th className="px-4 py-3 font-semibold text-tp-ink text-right">Price</th>
                  <th className="px-4 py-3 font-semibold text-tp-ink text-right hidden sm:table-cell">Per Photo</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {headshots.packages.map((pkg) => {
                  const perPhoto = pkg.outputCount > 0 ? Math.round(pkg.price / pkg.outputCount) : pkg.price;
                  return (
                    <tr
                      key={pkg.id}
                      className={cn(
                        'border-b border-tp-line/60 transition-colors hover:bg-tp-beige/40',
                        pkg.recommended && 'bg-tp-bronze/[0.04]'
                      )}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-tp-ink">{pkg.name}</span>
                          {pkg.recommended && (
                            <span className="rounded-full bg-tp-bronze px-2 py-0.5 text-[10px] font-semibold text-tp-black">
                              Popular
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right text-tp-ink tabular-nums">
                        {pkg.outputCount} {pkg.outputCount === 1 ? 'photo' : 'photos'}
                      </td>
                      <td className="px-4 py-4 text-right font-semibold text-tp-bronze-ink tabular-nums">
                        {formatPrice(pkg.price)}
                      </td>
                      <td className="px-4 py-4 text-right text-tp-muted tabular-nums hidden sm:table-cell">
                        {formatPrice(perPhoto)}/photo
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Link
                          href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
                          className={cn(
                            'inline-flex items-center gap-1 rounded-tp-button px-3 py-1.5 text-xs font-semibold transition-colors',
                            pkg.recommended
                              ? 'bg-tp-bronze text-tp-black hover:bg-tp-bronze/90'
                              : 'border border-tp-line text-tp-ink hover:border-tp-bronze/40 hover:text-tp-bronze-ink'
                          )}
                        >
                          Choose
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 font-semibold text-tp-bronze-ink hover:text-tp-ink transition-colors"
            >
              Compare All Categories <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <span className="text-tp-muted hidden sm:inline">&middot;</span>
            <Link
              href="/for-teams"
              className="inline-flex items-center gap-2 font-semibold text-tp-bronze-ink hover:text-tp-ink transition-colors"
            >
              Team Pricing (5+ people) <ArrowRight className="h-3.5 w-3.5" />
            </Link>
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
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-[15px] font-semibold text-tp-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2 rounded-tp-card">
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

      {/* ── Trust & Guarantee ── */}
      <section className="bg-white border-t border-tp-line/40 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black mb-4">
                <CheckCircle className="h-6 w-6 text-tp-bronze" />
              </div>
              <h3 className="text-sm font-semibold text-tp-ink">Satisfaction Guarantee</h3>
              <p className="mt-2 text-sm text-tp-muted leading-relaxed">
                Not happy with your headshots? We&apos;ll work with you until you are.
              </p>
              <Link href="/guarantee" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-tp-bronze-ink hover:text-tp-ink transition-colors">
                Learn more <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black mb-4">
                <Fingerprint className="h-6 w-6 text-tp-bronze" />
              </div>
              <h3 className="text-sm font-semibold text-tp-ink">Secure &amp; Private</h3>
              <p className="mt-2 text-sm text-tp-muted leading-relaxed">
                Photos deleted within 30 days. Never sold or shared. Stripe-secured payments.
              </p>
              <Link href="/security" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-tp-bronze-ink hover:text-tp-ink transition-colors">
                Security details <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black mb-4">
                <Briefcase className="h-6 w-6 text-tp-bronze" />
              </div>
              <h3 className="text-sm font-semibold text-tp-ink">Commercial License</h3>
              <p className="mt-2 text-sm text-tp-muted leading-relaxed">
                Use your headshots anywhere — LinkedIn, company sites, business cards, press materials.
              </p>
              <Link href="/terms" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-tp-bronze-ink hover:text-tp-ink transition-colors">
                License terms <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Resources ── */}
      <section className="bg-tp-paper border-t border-tp-line/40 py-12 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-normal text-xl sm:text-2xl text-tp-ink text-center mb-8">
            Helpful Resources
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Selfie Guide', href: '/selfie-guide' },
              { label: 'What to Wear', href: '/what-to-wear' },
              { label: 'Photo Tips', href: '/photo-tips' },
              { label: 'Headshot Sizes', href: '/headshot-sizes' },
              { label: 'Before & After', href: '/before-after' },
              { label: 'Photo Styles', href: '/styles' },
              { label: 'Background Options', href: '/backgrounds' },
              { label: 'Team Headshots', href: '/team-headshots' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 rounded-tp-button border border-tp-line bg-white px-4 py-2.5 text-sm text-tp-ink transition-all hover:border-tp-bronze/40 hover:bg-tp-beige hover:text-tp-bronze-ink"
              >
                {link.label}
              </Link>
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
