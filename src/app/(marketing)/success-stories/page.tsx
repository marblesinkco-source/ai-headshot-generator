import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { ArrowRight, Zap, Wallet, Palette, CalendarCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const title = 'Success Stories | AI Headshot Scenarios';
const description =
  'See how teams and professionals can use AI headshots: representative scenarios for startups, law firms, brokerages, and universities.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/success-stories' },
  openGraph: {
    title: `Success Stories | ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/success-stories`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Success Stories | ${siteConfig.name}`,
    description,
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Scenario {
  title: string;
  challenge: string;
  solution: string;
  results: string[];
}

const scenarios: Scenario[] = [
  {
    title: 'Growing Tech Startup',
    challenge:
      'A fast-growing startup keeps adding people across several cities and time zones. Profile photos on the website, pitch decks, and team directory are a mix of old selfies and cropped event shots, and new hires are rarely photographed at all.',
    solution:
      'Each new team member uploads a few selfies from their phone and receives a set of polished headshots in a shared, consistent style. The team page and internal directory are refreshed without anyone traveling to a studio.',
    results: [
      'New hires get a professional photo during onboarding',
      'Remote and in-office staff look equally polished',
      'The team page feels cohesive and current',
    ],
  },
  {
    title: 'Law Firm Rebrand',
    challenge:
      'A mid-sized firm is refreshing its brand and website. Attorney photos were taken over many years by different photographers, and coordinating busy calendars for a new shoot would delay the launch.',
    solution:
      'Attorneys and staff create headshots on their own schedule, choosing from conservative, business-appropriate styles that match the new brand direction. The marketing team reviews the results and picks the strongest options for the site.',
    results: [
      'Bio pages share one visual standard',
      'No courtroom or client time lost to photo sessions',
      'Launch timelines are no longer tied to a shoot date',
    ],
  },
  {
    title: 'Real Estate Brokerage',
    challenge:
      'A brokerage with many independent agents needs trustworthy, approachable photos for listings, signage, and email signatures. Agents often use whatever photo they have, which makes the brand look uneven.',
    solution:
      'Agents generate their own headshots in a friendly, professional style and reuse them across listing pages, social profiles, and marketing materials. The brokerage shares simple guidelines on clothing and lighting for the source selfies.',
    results: [
      'Agents show up consistently across listings and profiles',
      'Updating a photo takes minutes, not weeks',
      'Newly licensed agents are marketing-ready sooner',
    ],
  },
  {
    title: 'University Faculty',
    challenge:
      'A department wants updated faculty and staff photos for its directory and research pages. Faculty are spread between campus, labs, and fieldwork, and a single photo day rarely reaches everyone.',
    solution:
      'Faculty and staff upload selfies whenever it suits them and choose a clean, academic-friendly look. The department assembles the approved images into its directory and publication profiles.',
    results: [
      'More of the department is represented in the directory',
      'Photos stay current as people join or change roles',
      'Less administrative effort coordinating schedules',
    ],
  },
];

interface Outcome {
  icon: LucideIcon;
  title: string;
  description: string;
}

const outcomes: Outcome[] = [
  {
    icon: Zap,
    title: 'Faster turnaround than scheduling photoshoots',
    description:
      'Skip the back-and-forth of finding a photographer, a date, and a location. Upload selfies and receive your headshots without waiting on anyone else’s calendar.',
  },
  {
    icon: Wallet,
    title: 'Cost-effective for teams of any size',
    description:
      'Whether you are one person or a growing organization, you avoid studio fees, travel, and retouching costs that add up with traditional photography.',
  },
  {
    icon: Palette,
    title: 'Consistent, on-brand appearance across the team',
    description:
      'Choose a shared style so every profile, bio page, and directory entry feels like it belongs to the same organization.',
  },
  {
    icon: CalendarCheck,
    title: 'Easy process that does not disrupt the workday',
    description:
      'Taking a few selfies is quick and can be done anywhere. No time off, no dress-up day, and no lost hours for a group shoot.',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SuccessStoriesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Success Stories', url: `${siteConfig.url}/success-stories` },
        ]}
      />
      <Header />

      <main id="main-content" className="min-h-screen">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-tp-black py-20 sm:py-28">
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C9A98A_0%,transparent_50%)]" />
          </div>
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Success Stories
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Explore how teams and professionals can use AI headshots to look
              polished, save time, and stay consistent. The scenarios below are
              illustrative examples, not individual customer accounts.
            </p>
          </div>
        </section>

        {/* ── Scenario Cards ── */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl text-tp-ink sm:text-4xl">
                How AI headshots fit real-world teams
              </h2>
              <p className="mt-4 text-tp-muted">
                Each scenario is a representative example showing a common
                challenge and how AI headshots can help.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {scenarios.map((s) => (
                <article
                  key={s.title}
                  className="flex flex-col rounded-tp-card border border-tp-line bg-white p-6 sm:p-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display text-2xl text-tp-ink">
                      {s.title}
                    </h3>
                    <span className="inline-flex items-center rounded-full border border-tp-bronze/40 bg-tp-bronze/10 px-3 py-1 text-xs font-semibold text-tp-ink">
                      Representative scenario
                    </span>
                  </div>

                  <div className="mt-6 space-y-5">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-tp-bronze">
                        The challenge
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-tp-muted">
                        {s.challenge}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-tp-bronze">
                        The solution
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-tp-muted">
                        {s.solution}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-tp-bronze">
                        Typical outcomes
                      </h4>
                      <ul className="mt-2 space-y-2">
                        {s.results.map((r) => (
                          <li
                            key={r}
                            className="flex items-start gap-2 text-sm text-tp-ink"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tp-bronze"
                            />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-tp-muted">
              These scenarios are fictional and for illustration only. They do
              not describe real companies, people, or measured results.
            </p>
          </div>
        </section>

        {/* ── Common Outcomes ── */}
        <section className="bg-tp-paper py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl text-tp-ink sm:text-4xl">
                Common Outcomes
              </h2>
              <p className="mt-4 text-tp-muted">
                Benefits teams and professionals typically look for when they
                move to AI headshots.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {outcomes.map((o) => (
                <div
                  key={o.title}
                  className="rounded-tp-card border border-tp-line bg-white p-6"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-tp-black/5">
                    <o.icon
                      className="h-5 w-5 text-tp-bronze"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-display text-xl text-tp-ink">
                    {o.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {o.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-tp-black py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Start Your Success Story
            </h2>
            <p className="mt-4 text-tp-beige/60">
              Upload a few selfies and get professional AI headshots for
              yourself or your whole team. No studio visit required.
            </p>
            <div className="mt-8">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
              >
                Start Your Success Story <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
