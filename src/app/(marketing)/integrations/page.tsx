import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  Users,
  MessageSquare,
  BarChart3,
  Palette,
  UserSearch,
  Globe,
  Plug,
  Zap,
  Inbox,
  Code2,
  Briefcase,
  Store,
  ArrowRight,
} from 'lucide-react';

const pageTitle = 'Integrations & Partnerships';
const pageDescription = `Planned ${siteConfig.name} integrations with HR, communication, CRM, design, recruiting and website tools, plus partnership options for technology, agency and reseller partners.`;

export const metadata: Metadata = {
  title: `${pageTitle} | ${siteConfig.name}`,
  description: pageDescription,
  alternates: { canonical: '/integrations' },
  openGraph: generateOGMetadata({ title: `${pageTitle} | ${siteConfig.name}`, description: pageDescription, path: '/integrations' }),
  twitter: generateTwitterMetadata({ title: `${pageTitle} | ${siteConfig.name}`, description: pageDescription }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const categories = [
  {
    icon: Users,
    name: 'HR & People',
    tools: ['BambooHR', 'Workday', 'Gusto'],
    description:
      'Keep employee directory photos consistent and up to date across your people systems.',
  },
  {
    icon: MessageSquare,
    name: 'Communication',
    tools: ['Slack', 'Microsoft Teams'],
    description:
      'Bring professional profile photos to the places your team talks every day.',
  },
  {
    icon: BarChart3,
    name: 'CRM & Sales',
    tools: ['Salesforce', 'HubSpot'],
    description:
      'Give sales reps and account teams polished photos for contact cards and outreach.',
  },
  {
    icon: Palette,
    name: 'Design & Creative',
    tools: ['Canva', 'Figma'],
    description:
      'Drop finished headshots straight into team pages, decks and brand layouts.',
  },
  {
    icon: UserSearch,
    name: 'ATS & Recruiting',
    tools: ['Greenhouse', 'Lever'],
    description:
      'Help recruiters and hiring teams present a professional face to candidates.',
  },
  {
    icon: Globe,
    name: 'Website & CMS',
    tools: ['WordPress', 'Shopify'],
    description:
      'Publish consistent team and author photos on your website without manual uploads.',
  },
];

const steps = [
  {
    icon: Plug,
    number: '1',
    title: 'Connect your tool',
    description:
      'Link TailorPic to the tool your team already uses with a simple authorization flow.',
  },
  {
    icon: Zap,
    number: '2',
    title: 'Trigger headshot generation',
    description:
      'Start headshots for new hires, team members or clients from inside your existing workflow.',
  },
  {
    icon: Inbox,
    number: '3',
    title: 'Receive results automatically',
    description:
      'Finished headshots are delivered back to the connected tool, ready to use.',
  },
];

const partnerTypes = [
  {
    icon: Code2,
    title: 'Technology Partners',
    description:
      'Integrate the TailorPic API into your product so your users can generate professional headshots without leaving your platform.',
  },
  {
    icon: Briefcase,
    title: 'Agency Partners',
    description:
      'Offer AI headshots to your clients as part of your branding, photography, HR or marketing services.',
  },
  {
    icon: Store,
    title: 'Reseller Partners',
    description:
      'Explore white-label options to offer headshot generation under your own brand to your customers.',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function IntegrationsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: pageTitle, url: `${siteConfig.url}/integrations` },
        ]}
      />
      <Header />
      <main id="main-content">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-tp-black py-24 sm:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-tp-bronze/10 blur-[120px]"
          />
          <div className="relative mx-auto max-w-4xl px-4 text-center">
            <span className="mb-4 inline-block rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium tracking-wide text-tp-bronze">
              Planned Integrations
            </span>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Integrations &amp; <span className="text-tp-bronze">Partnerships</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-beige/80">
              We are planning ways to connect {siteConfig.name} with the tools
              your team already uses, so professional headshots fit naturally
              into your existing workflows.
            </p>
          </div>
        </section>

        {/* ── Integration Categories ───────────────────────────── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl text-tp-ink sm:text-4xl">
                Where we want to connect
              </h2>
              <p className="mt-4 text-tp-muted">
                These are the categories we are exploring. None are available
                yet, and the tools listed are examples of what we may support.
              </p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.name}
                    className="flex flex-col rounded-tp-card border border-tp-line bg-tp-paper p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-black text-tp-bronze">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="rounded-full border border-tp-bronze/40 bg-tp-beige px-3 py-1 text-xs font-semibold text-tp-bronze-ink">
                        Coming Soon
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-xl text-tp-ink">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-tp-bronze-ink">
                      {category.tools.join(' · ')}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                      {category.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── How Integrations Will Work ───────────────────────── */}
        <section className="bg-tp-paper py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl text-tp-ink sm:text-4xl">
                How integrations will work
              </h2>
              <p className="mt-4 text-tp-muted">
                A simple three-step flow is the goal. Details may change as we
                build.
              </p>
            </div>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    className="rounded-tp-card border border-tp-line bg-white p-6 text-center"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tp-black text-tp-bronze">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-tp-bronze-ink">
                      Step {step.number}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-tp-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Partner With Us ──────────────────────────────────── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl text-tp-ink sm:text-4xl">
                Partner with us
              </h2>
              <p className="mt-4 text-tp-muted">
                We are open to conversations with technology companies,
                agencies and resellers who want to bring AI headshots to their
                customers.
              </p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {partnerTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.title}
                    className="rounded-tp-card border border-tp-line bg-tp-paper p-6"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-black text-tp-bronze">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-display text-xl text-tp-ink">
                      {type.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                      {type.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="bg-tp-black py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Help shape what we build next
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-tp-beige/80">
              Tell us which tools matter to your team, or talk to us about a
              partnership.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-8 py-3.5 text-base font-semibold text-tp-black transition hover:bg-tp-bronze/90"
              >
                Become a Partner
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-tp-button border border-tp-bronze/50 px-8 py-3.5 text-base font-semibold text-tp-beige transition hover:border-tp-bronze hover:text-tp-bronze"
              >
                Request an Integration
              </Link>
            </div>
          </div>
        </section>

        {/* ── Disclaimer ───────────────────────────────────────── */}
        <section className="border-t border-tp-line bg-tp-paper py-8">
          <p className="mx-auto max-w-3xl px-4 text-center text-xs leading-relaxed text-tp-muted">
            Integration availability is planned and subject to change. Listed
            third-party names are trademarks of their respective owners.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
