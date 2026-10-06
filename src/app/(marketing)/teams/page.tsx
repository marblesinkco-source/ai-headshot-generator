import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { TEAM_USE_CASES } from '@/config/team-use-cases';

const PAGE_TITLE = 'Team Headshot Use Cases | TailorPic';
const PAGE_DESCRIPTION =
  'See how teams use AI headshots for team directories, new hire onboarding, corporate events, website redesigns and brand consistency.';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/teams' },
  openGraph: generateOGMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: 'usecase',
    path: '/teams',
  }),
  twitter: generateTwitterMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: 'usecase',
  }),
};

export default function TeamsIndexPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Teams', url: `${siteConfig.url}/teams` },
        ]}
      />
      <Header />

      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl font-normal leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Team headshots, for every situation
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Whether you are refreshing a team page or onboarding a new hire, see how AI headshots
              fit the way your team works.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_USE_CASES.map((uc) => (
              <Link
                key={uc.slug}
                href={`/teams/${uc.slug}`}
                className="group flex flex-col rounded-tp-card border border-tp-line bg-white p-6 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
              >
                <h2 className="font-display text-2xl font-normal text-tp-ink">{uc.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-tp-muted">{uc.heroSubtitle}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-tp-bronze-ink">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-tp-black py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-normal tracking-tight text-tp-paper sm:text-4xl">
            Ready to get your team started?
          </h2>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/for-teams"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-tp-bronze text-tp-black shadow-none hover:bg-tp-bronze/90',
              )}
            >
              Explore team plans <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
