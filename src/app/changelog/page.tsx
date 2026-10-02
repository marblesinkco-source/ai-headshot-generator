import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  Sparkles,
  Users,
  Camera,
  Palette,
  Shield,
  Zap,
  ImagePlus,
  ArrowRight,
  Mail,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'TailorPic Changelog: Product Updates and New Features' },
  description:
    'See what is new at TailorPic. Follow our latest product updates, new features, and improvements to the AI photo generation platform.',
  alternates: { canonical: '/changelog' },
  openGraph: generateOGMetadata({
    title: 'TailorPic Changelog: Product Updates and New Features',
    description:
      'Stay up to date with the latest features, improvements, and updates to TailorPic.',
    path: '/changelog',
  }),
  twitter: generateTwitterMetadata({
    title: 'TailorPic Changelog: Product Updates and New Features',
    description:
      'Stay up to date with the latest features, improvements, and updates to TailorPic.',
  }),
};

type Tag = 'New' | 'Improved' | 'Fixed';

const tagStyles: Record<Tag, string> = {
  New: 'bg-tp-bronze/15 text-tp-bronze-ink border-tp-bronze/30',
  Improved: 'bg-tp-beige text-tp-ink border-tp-line',
  Fixed: 'bg-tp-black text-tp-paper border-tp-black',
};

interface ChangelogEntry {
  tag: Tag;
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
}

interface ChangelogGroup {
  period: string;
  entries: ChangelogEntry[];
}

const iconClass = 'h-5 w-5 text-tp-bronze-ink';

const changelog: ChangelogGroup[] = [
  {
    period: 'Recent',
    entries: [
      {
        tag: 'New',
        title: 'LinkedIn photo analyzer',
        description:
          'A free tool that evaluates your current LinkedIn profile photo and gives actionable feedback on lighting, framing, and overall impression.',
        icon: <Camera className={iconClass} />,
        href: '/tools/linkedin-photo-analyzer',
      },
      {
        tag: 'Improved',
        title: 'Expanded style library',
        description:
          'More backgrounds, outfits, and expressions across professional, creative, and casual categories. Each order now delivers 40+ unique photos.',
        icon: <Palette className={iconClass} />,
        href: '/samples',
      },
      {
        tag: 'New',
        title: 'Free headshot tools',
        description:
          'Background remover, headshot resizer, resume photo checker, and email signature generator are now available at no cost.',
        icon: <Layers className={iconClass} />,
        href: '/tools',
      },
    ],
  },
  {
    period: 'Earlier this year',
    entries: [
      {
        tag: 'New',
        title: 'Team headshots',
        description:
          'Give every employee a matching style and background without scheduling a photo shoot. Consistent, on-brand portraits for the whole company.',
        icon: <Users className={iconClass} />,
        href: '/team-headshots',
      },
      {
        tag: 'Improved',
        title: 'Enterprise and volume plans',
        description:
          'Dedicated pricing for organizations that need volume ordering, consistent styling across departments, and security review.',
        icon: <Zap className={iconClass} />,
        href: '/enterprise',
      },
      {
        tag: 'Fixed',
        title: 'Faster photo delivery',
        description:
          'Optimized the generation pipeline so results arrive sooner, with better consistency across all output photos in an order.',
        icon: <Sparkles className={iconClass} />,
      },
    ],
  },
  {
    period: 'Launch',
    entries: [
      {
        tag: 'New',
        title: 'AI headshot generation',
        description:
          'The core product: upload a set of selfies, choose your categories, and receive dozens of professional-quality headshots from $1.99.',
        icon: <ImagePlus className={iconClass} />,
        href: '/pricing',
      },
      {
        tag: 'New',
        title: 'Security and privacy foundations',
        description:
          'Published security practices, subprocessors list, data processing agreement, and a 14-day money-back guarantee from day one.',
        icon: <Shield className={iconClass} />,
        href: '/security',
      },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main id="main-content" className="min-h-screen bg-tp-paper">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Changelog', url: `${siteConfig.url}/changelog` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-tp-bronze-ink">
            Product Updates
          </span>
          <h1 className="mt-6 font-display text-4xl font-normal tracking-tight text-tp-black sm:text-6xl">
            What&apos;s New at TailorPic
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Follow the latest updates, features, and improvements. We ship
            regularly to make your headshot experience better.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {changelog.map((group) => (
            <div key={group.period}>
              {/* Period heading */}
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-8 items-center rounded-full border border-tp-line bg-white px-4 text-xs font-medium uppercase tracking-wider text-tp-muted">
                  {group.period}
                </span>
                <div className="h-px flex-1 bg-tp-line" />
              </div>

              {/* Entries with left border */}
              <div className="ml-3 border-l-2 border-tp-bronze/30 pl-6 sm:ml-4 sm:pl-8">
                <div className="space-y-6">
                  {group.entries.map((entry) => (
                    <article
                      key={entry.title}
                      className="group relative rounded-tp-card border border-tp-line bg-white p-5 transition-shadow hover:shadow-md hover:shadow-tp-black/5 sm:p-6"
                    >
                      {/* Bronze dot on the timeline */}
                      <div className="absolute -left-[calc(1.5rem+5px)] top-6 h-2.5 w-2.5 rounded-full border-2 border-tp-bronze bg-tp-paper sm:-left-[calc(2rem+5px)]" />

                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="hidden flex-shrink-0 items-center justify-center rounded-tp-button border border-tp-line bg-tp-beige/50 p-2.5 sm:flex">
                          {entry.icon}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide ${tagStyles[entry.tag]}`}
                            >
                              {entry.tag}
                            </span>
                            <h2 className="font-display text-lg font-normal text-tp-ink">
                              {entry.href ? (
                                <Link
                                  href={entry.href}
                                  className="underline-offset-4 hover:text-tp-bronze-ink hover:underline"
                                >
                                  {entry.title}
                                </Link>
                              ) : (
                                entry.title
                              )}
                            </h2>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                            {entry.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe to updates */}
        <div className="mt-16 rounded-tp-card border border-tp-line bg-tp-beige/40 p-8 text-center sm:p-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-tp-bronze/30 bg-tp-bronze/10">
            <Mail className="h-5 w-5 text-tp-bronze-ink" />
          </div>
          <h2 className="mt-4 font-display text-2xl font-normal text-tp-black">
            Subscribe to updates
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-tp-muted">
            Get notified when we ship new features and improvements. No spam,
            unsubscribe anytime.
          </p>
          <form
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            action="#"
          >
            <input
              type="email"
              placeholder="you@company.com"
              aria-label="Email address"
              className="flex-1 rounded-tp-button border border-tp-line bg-white px-4 py-2.5 text-sm text-tp-ink placeholder:text-tp-muted/80 focus:border-tp-bronze focus:outline-none focus:ring-1 focus:ring-tp-bronze"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-tp-button bg-tp-black px-5 py-2.5 text-sm font-medium text-tp-paper transition-colors hover:bg-tp-ink"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-tp-card bg-tp-black p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-normal text-tp-paper sm:text-3xl">
            Try the latest version
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-tp-paper/70">
            Professional AI headshots from $1.99, backed by a 14-day
            money-back guarantee.
          </p>
          <Link
            href="/auth/register"
            className="mt-6 inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-6 py-3 text-sm font-medium text-tp-black transition-colors hover:bg-tp-bronze/90"
          >
            Get started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
