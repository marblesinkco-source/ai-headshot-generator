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

type Category = 'Feature' | 'Improvement' | 'Security' | 'Launch';

const categoryStyles: Record<Category, string> = {
  Feature: 'bg-tp-bronze/15 text-tp-bronze-ink border-tp-bronze/30',
  Improvement: 'bg-tp-beige text-tp-ink border-tp-line',
  Security: 'bg-tp-black text-tp-paper border-tp-black',
  Launch: 'bg-tp-bronze text-tp-black border-tp-bronze',
};

interface ChangelogEntry {
  title: string;
  description: string;
  category: Category;
}

interface ChangelogRelease {
  date: string;
  version: string;
  summary: string;
  entries: ChangelogEntry[];
}

const changelog: ChangelogRelease[] = [
  {
    date: 'October 2026',
    version: 'v1.5',
    summary: 'Built for teams: pricing, planning tools, and transparency.',
    entries: [
      {
        title: 'Volume Pricing for Teams',
        description:
          'Tiered per-seat pricing that rewards larger teams, with consistent styling across every employee headshot.',
        category: 'Feature',
      },
      {
        title: 'ROI Calculator',
        description:
          'Estimate how much your organization saves compared with traditional photo shoots before you commit.',
        category: 'Feature',
      },
      {
        title: 'Technology Page',
        description:
          'A plain-language look at how our AI generates studio-quality portraits and how your data is handled.',
        category: 'Improvement',
      },
    ],
  },
  {
    date: 'September 2026',
    version: 'v1.4',
    summary: 'Guidance and integrations to help you get more from every photo.',
    entries: [
      {
        title: 'Photo Tips Guide',
        description:
          'Practical advice on choosing source photos, lighting, and expressions for the best possible results.',
        category: 'Improvement',
      },
      {
        title: 'Integrations Page',
        description:
          'See how TailorPic fits into the tools you already use for profiles, hiring, and team directories.',
        category: 'Feature',
      },
      {
        title: 'Developer API Preview',
        description:
          'Early access to a programmatic interface for generating headshots inside your own workflows.',
        category: 'Feature',
      },
    ],
  },
  {
    date: 'August 2026',
    version: 'v1.3',
    summary: 'A much bigger creative range.',
    entries: [
      {
        title: '40+ New Headshot Styles',
        description:
          'New backgrounds, outfits, and looks across professional, creative, and casual settings.',
        category: 'Feature',
      },
      {
        title: 'Before/After Showcase',
        description:
          'Side-by-side comparisons showing the transformation from everyday selfies to polished portraits.',
        category: 'Improvement',
      },
    ],
  },
  {
    date: 'July 2026',
    version: 'v1.2',
    summary: 'Privacy and a smoother app experience.',
    entries: [
      {
        title: 'Cookie Consent (GDPR Compliance)',
        description:
          'Clear, granular cookie controls so visitors decide what is stored, in line with GDPR requirements.',
        category: 'Security',
      },
      {
        title: 'PWA Support',
        description:
          'Install TailorPic on your phone or desktop for faster access and a more app-like experience.',
        category: 'Feature',
      },
    ],
  },
  {
    date: 'June 2026',
    version: 'v1.0',
    summary: 'TailorPic goes live.',
    entries: [
      {
        title: 'Core Headshot Generation',
        description:
          'AI-powered photo generation with studio-quality results in hours, not days.',
        category: 'Launch',
      },
      {
        title: 'Dashboard',
        description:
          'One place to upload photos, track progress, and manage your orders.',
        category: 'Launch',
      },
      {
        title: 'Gallery',
        description:
          'Browse, favorite, and download your generated photos in high resolution.',
        category: 'Launch',
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

      {/* Release cards */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <ol className="space-y-8">
          {changelog.map((release) => (
            <li
              key={release.date}
              className="rounded-tp-card border border-tp-line bg-tp-beige/40 p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-tp-button bg-tp-black px-3 py-1 text-xs font-medium text-tp-bronze">
                  {release.version}
                </span>
                <h2 className="font-display text-2xl font-normal text-tp-black sm:text-3xl">
                  {release.date}
                </h2>
              </div>
              <p className="mt-2 text-sm text-tp-muted">{release.summary}</p>

              <ul className="mt-6 space-y-5 border-t border-tp-line pt-6">
                {release.entries.map((entry) => (
                  <li key={entry.title}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryStyles[entry.category]}`}
                      >
                        {entry.category}
                      </span>
                      <h3 className="font-display text-lg font-normal text-tp-ink">
                        {entry.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-tp-muted">
                      {entry.description}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-center text-xs text-tp-muted">
          Dates and features listed are representative of planned milestones.
        </p>
      </section>

      <Footer />
    </main>
  );
}
