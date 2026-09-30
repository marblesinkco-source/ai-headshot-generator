import type { Metadata } from 'next';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Changelog | TailorPic',
  description:
    'See what is new at TailorPic. Follow our latest product updates, new features, and improvements to the AI photo generation platform.',
  alternates: { canonical: '/changelog' },
  openGraph: {
    title: 'Changelog | TailorPic',
    description:
      'Stay up to date with the latest features, improvements, and updates to TailorPic.',
    url: `${siteConfig.url}/changelog`,
  },
};

type BadgeType = 'new' | 'improved' | 'launch';

interface ChangelogEntry {
  title: string;
  description: string;
  badge: BadgeType;
}

interface ChangelogMonth {
  date: string;
  entries: ChangelogEntry[];
}

const badgeStyles: Record<BadgeType, string> = {
  new: 'bg-emerald-100 text-emerald-700',
  improved: 'bg-amber-100 text-amber-700',
  launch: 'bg-tp-bronze/20 text-tp-bronze-ink',
};

const badgeLabels: Record<BadgeType, string> = {
  new: 'New',
  improved: 'Improved',
  launch: 'Launch',
};

const changelog: ChangelogMonth[] = [
  {
    date: 'September 2026',
    entries: [
      {
        title: 'Industry-Specific Landing Pages',
        description:
          'Added dedicated pages for healthcare, consulting, and accounting professionals with tailored messaging and examples.',
        badge: 'new',
      },
      {
        title: 'Competitor Comparison Pages',
        description:
          'New vs. pages comparing TailorPic with alternatives so you can make an informed choice.',
        badge: 'new',
      },
      {
        title: 'Refund Policy Page',
        description:
          '14-day money-back guarantee clearly documented with a transparent, hassle-free refund process.',
        badge: 'improved',
      },
    ],
  },
  {
    date: 'August 2026',
    entries: [
      {
        title: 'Express Tier Launch',
        description:
          'New $9.90 Express package for quick previews — perfect for trying out AI headshots before committing to a full package.',
        badge: 'new',
      },
      {
        title: '11 Photo Categories',
        description:
          'Expanded from headshots to dating, pets, family, and more. Eleven categories to cover every use case.',
        badge: 'improved',
      },
    ],
  },
  {
    date: 'July 2026',
    entries: [
      {
        title: 'Affiliate Program',
        description:
          '35% commission for partners who refer new customers. Join our affiliate program and earn with every referral.',
        badge: 'new',
      },
      {
        title: 'Enterprise Solutions',
        description:
          'Dedicated enterprise page with volume pricing, team management, and priority support for organizations.',
        badge: 'new',
      },
    ],
  },
  {
    date: 'June 2026',
    entries: [
      {
        title: 'Platform Launch',
        description:
          'TailorPic officially launches with AI-powered photo generation. Studio-quality results in hours, not days.',
        badge: 'launch',
      },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="min-h-screen">
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Changelog', url: `${siteConfig.url}/changelog` },
      ]} />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Changelog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Follow the latest updates, features, and improvements to TailorPic.
            We ship regularly to make your experience better.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="border-l border-tp-line pl-8 sm:pl-10">
          {changelog.map((month) => (
            <div key={month.date} className="relative mb-12 last:mb-0">
              {/* Date badge */}
              <div className="absolute -left-[calc(2rem+0.5px)] top-0 sm:-left-[calc(2.5rem+0.5px)]">
                <span className="inline-flex items-center rounded-full bg-tp-black px-3 py-1 text-xs font-medium text-tp-bronze">
                  {month.date}
                </span>
              </div>

              {/* Entries */}
              <div className="space-y-6 pt-1">
                {month.entries.map((entry) => (
                  <div key={entry.title}>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${badgeStyles[entry.badge]}`}
                      >
                        {badgeLabels[entry.badge]}
                      </span>
                      <h3 className="font-semibold text-tp-ink">
                        {entry.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-tp-muted">
                      {entry.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
