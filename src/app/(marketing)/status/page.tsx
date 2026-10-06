import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const STATUS_TITLE = `System Status | ${siteConfig.name}`;
const STATUS_DESCRIPTION = `Check the current system status of ${siteConfig.name} and read about our approach to uptime and availability. Contact support for real-time updates.`;

export const metadata: Metadata = {
  title: { absolute: STATUS_TITLE },
  description: STATUS_DESCRIPTION,
  alternates: { canonical: '/status' },
  openGraph: generateOGMetadata({
    title: STATUS_TITLE,
    description: STATUS_DESCRIPTION,
    subtitle: 'System status and uptime',
    path: '/status',
    type: 'default',
  }),
  twitter: generateTwitterMetadata({
    title: STATUS_TITLE,
    description: STATUS_DESCRIPTION,
  }),
};

const components = [
  { name: 'Website', description: 'Marketing pages and checkout flow' },
  { name: 'AI Generation Engine', description: 'Headshot generation and processing' },
  { name: 'Payment Processing', description: 'Secure checkout and billing' },
  { name: 'User Dashboard', description: 'Your photos, orders, and account' },
  { name: 'API', description: 'Application and developer endpoints' },
];

export default function StatusPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'System Status', url: `${siteConfig.url}/status` },
        ]}
      />
      <Header />
      <main id="main-content">
        <section className="bg-tp-black py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h1 className="font-display font-normal text-4xl leading-tight text-white sm:text-5xl">
              System Status
            </h1>
            <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-tp-button border border-tp-bronze/30 bg-tp-bronze/10 px-5 py-3">
              <span className="relative flex h-3 w-3" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
              </span>
              <span className="font-medium text-white">All Systems Operational</span>
            </div>
          </div>
        </section>

        <section className="bg-tp-paper py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              Services
            </h2>
            <ul className="mt-8 divide-y divide-tp-line rounded-tp-card border border-tp-line bg-white">
              {components.map((c) => (
                <li key={c.name} className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <p className="font-semibold text-tp-ink">{c.name}</p>
                    <p className="mt-0.5 text-sm text-tp-muted">{c.description}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-tp-ink">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" aria-hidden="true" />
                    <CheckCircle2 className="h-4 w-4 text-green-600" aria-hidden="true" />
                    Operational
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-tp-card border border-tp-line bg-tp-beige/40 p-5 text-sm text-tp-muted">
              This page is informational and is not a live monitoring dashboard.
              For real-time updates and incident reports, contact{' '}
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="font-medium text-tp-bronze-ink underline underline-offset-2"
              >
                {siteConfig.supportEmail}
              </a>
              .
            </p>
          </div>
        </section>

        <section className="border-y border-tp-line bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              Our Uptime Commitment
            </h2>
            <p className="mt-4 leading-relaxed text-tp-muted">
              We aim for high availability across every part of {siteConfig.name}.
              We do not publish uptime percentages on this page. If something
              is not working as expected, we want to hear about it and will work
              to resolve it as quickly as we can.
            </p>
          </div>
        </section>

        <section className="bg-tp-black py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display font-normal text-3xl text-white sm:text-4xl">
              Seeing a problem?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-tp-beige/70">
              Let us know what you are experiencing and our team will look into it.
            </p>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'mt-8 bg-tp-bronze text-tp-black hover:bg-tp-bronze/90 active:bg-tp-bronze/80'
              )}
            >
              Report an Issue
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
