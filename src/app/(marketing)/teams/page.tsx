import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
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
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Teams', url: `${siteConfig.url}/teams` },
        ]}
      />
      <Header />
      <main id="main-content">

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

      {/* ── CTA ── */}
      <section className="bg-tp-black py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-white">
            Start With Your Own Headshot
          </h2>
          <p className="mt-4 text-tp-beige/60 max-w-lg mx-auto">
            Try it yourself first: upload a few selfies and get professional headshots delivered within hours, then bring the same look to your whole team.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
              className="rounded-tp-button bg-tp-bronze px-8 py-3.5 text-sm font-semibold text-tp-black transition-colors hover:bg-tp-bronze/90"
            >
              Get Your Headshots <ArrowRight className="ml-1 inline h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/team-headshots"
              className="text-sm font-semibold text-tp-beige/70 hover:text-tp-bronze transition-colors"
            >
              Explore Team Headshots →
            </Link>
          </div>
          <p className="mt-5 text-xs text-tp-beige/40">
            Starting at {BASE_PRICE_DISPLAY} · No subscription required
          </p>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
