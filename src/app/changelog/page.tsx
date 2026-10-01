import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Changelog | TailorPic',
  description:
    'See what is new at TailorPic. Follow our latest product updates, new features, and improvements to the AI photo generation platform.',
  alternates: { canonical: '/changelog' },
  openGraph: generateOGMetadata({ title: 'Changelog | TailorPic', description: 
      'Stay up to date with the latest features, improvements, and updates to TailorPic.', path: '/changelog' }),
  twitter: generateTwitterMetadata({ title: 'Changelog | TailorPic', description: 
      'Stay up to date with the latest features, improvements, and updates to TailorPic.' }),
};

type Category = 'Feature' | 'Tool' | 'Trust';

const categoryStyles: Record<Category, string> = {
  Feature: 'bg-tp-bronze/15 text-tp-bronze-ink border-tp-bronze/30',
  Tool: 'bg-tp-beige text-tp-ink border-tp-line',
  Trust: 'bg-tp-black text-tp-paper border-tp-black',
};

interface Highlight {
  title: string;
  description: string;
  category: Category;
  href: string;
}

interface HighlightGroup {
  heading: string;
  summary: string;
  items: Highlight[];
}

// Undated, descriptive highlights of what exists on the site today.
const groups: HighlightGroup[] = [
  {
    heading: 'Headshot generation',
    summary: 'The core product: one upload, many professional looks.',
    items: [
      {
        title: 'Multi-category AI headshots',
        description:
          'Generate portraits across professional, creative, and casual categories from a single set of selfies, starting at $9.90.',
        category: 'Feature',
        href: '/samples',
      },
      {
        title: '40+ photos per order',
        description:
          'Each order delivers a wide range of backgrounds, outfits, and expressions so you can pick the shots that suit you.',
        category: 'Feature',
        href: '/pricing',
      },
      {
        title: 'LinkedIn headshots',
        description:
          'A dedicated flow tuned for LinkedIn profile photos, with framing and styling that read well at small sizes.',
        category: 'Feature',
        href: '/linkedin-headshots',
      },
    ],
  },
  {
    heading: 'For teams',
    summary: 'Consistent, on-brand portraits for everyone in the company.',
    items: [
      {
        title: 'Team headshots',
        description:
          'Give every employee a matching style and background without scheduling a photo shoot.',
        category: 'Feature',
        href: '/team-headshots',
      },
      {
        title: 'Enterprise and team plans',
        description:
          'Information for organizations that need volume ordering, consistent styling, and security review.',
        category: 'Feature',
        href: '/enterprise',
      },
    ],
  },
  {
    heading: 'Free tools',
    summary: 'Small utilities that help before you buy.',
    items: [
      {
        title: 'LinkedIn photo analyzer',
        description: 'Check how your current profile photo comes across.',
        category: 'Tool',
        href: '/tools/linkedin-photo-analyzer',
      },
      {
        title: 'Headshot cost calculator',
        description:
          'Compare the cost of a traditional photo shoot with an AI headshot order.',
        category: 'Tool',
        href: '/tools/headshot-cost-calculator',
      },
      {
        title: 'Background remover, resizer, and more',
        description:
          'Background remover, headshot resizer, resume photo checker, and an email signature generator.',
        category: 'Tool',
        href: '/tools',
      },
    ],
  },
  {
    heading: 'Trust and privacy',
    summary: 'Clear policies so you know how your photos are handled.',
    items: [
      {
        title: '14-day money-back guarantee',
        description:
          'If you are not happy with your results, our refund policy covers you for 14 days.',
        category: 'Trust',
        href: '/refund-policy',
      },
      {
        title: 'Security and data handling',
        description:
          'Published security practices, subprocessors list, and a data processing agreement.',
        category: 'Trust',
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
            Product updates
          </span>
          <h1 className="mt-6 font-display text-4xl font-normal tracking-tight text-tp-black sm:text-6xl">
            Changelog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Follow the latest updates, features, and improvements to TailorPic.
            We ship regularly to make your experience better.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {groups.map((group) => (
            <section
              key={group.heading}
              aria-labelledby={`group-${group.heading}`}
              className="rounded-tp-card border border-tp-line bg-tp-beige/40 p-6 sm:p-8"
            >
              <h2
                id={`group-${group.heading}`}
                className="font-display text-2xl font-normal text-tp-black sm:text-3xl"
              >
                {group.heading}
              </h2>
              <p className="mt-2 text-sm text-tp-muted">{group.summary}</p>

              <ul className="mt-6 space-y-5 border-t border-tp-line pt-6">
                {group.items.map((item) => (
                  <li key={item.title}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryStyles[item.category]}`}
                      >
                        {item.category}
                      </span>
                      <h3 className="font-display text-lg font-normal text-tp-ink">
                        <Link
                          href={item.href}
                          className="underline-offset-4 hover:text-tp-bronze-ink hover:underline"
                        >
                          {item.title}
                        </Link>
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-tp-muted">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-tp-card bg-tp-black p-8 text-center">
          <h2 className="font-display text-2xl font-normal text-tp-paper sm:text-3xl">
            Try TailorPic risk-free
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-tp-paper/70">
            Headshots from $9.90, backed by a 14-day money-back guarantee.
          </p>
          <Link
            href="/pricing"
            className="mt-6 inline-flex items-center rounded-tp-button bg-tp-bronze px-6 py-3 text-sm font-medium text-tp-black transition-colors hover:bg-tp-bronze/90"
          >
            See pricing
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-tp-muted">
          Dated release notes will appear here as we ship new updates.
        </p>
      </section>

      <Footer />
    </main>
  );
}
