import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';
<<<<<<< HEAD
import { ArrowRight } from 'lucide-react';
=======
import { CheckCircle2, ArrowRight, Clock, Shield, Zap } from 'lucide-react';
>>>>>>> 41c29f27 (feat: add About page, persona section, FAQ expansion & status improvements)

export const revalidate = 3600;

const STATUS_TITLE = `System Status | ${siteConfig.name}`;
const STATUS_DESCRIPTION = `How to report a problem with ${siteConfig.name}. This page is not a live monitoring dashboard.`;

export const metadata: Metadata = {
  title: { absolute: STATUS_TITLE },
  description: STATUS_DESCRIPTION,
  alternates: { canonical: '/status' },
  // Not a live dashboard: keep it out of search until a real uptime monitor is connected.
  robots: { index: false, follow: true },
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
            <p className="mx-auto mt-6 max-w-xl text-lg text-tp-beige/70">
              We do not run a public live monitoring dashboard yet, so this page
              does not show a live status. If something is not working, tell us
              and we will look into it.
            </p>
          </div>
        </section>

        <section className="bg-tp-paper py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              Services
            </h2>
            <ul className="mt-8 divide-y divide-tp-line rounded-tp-card border border-tp-line bg-white">
              {components.map((c) => (
                <li key={c.name} className="p-5">
                  <p className="font-semibold text-tp-ink">{c.name}</p>
                  <p className="mt-0.5 text-sm text-tp-muted">{c.description}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-tp-card border border-tp-line bg-tp-beige/40 p-5 text-sm text-tp-muted">
              For help with an order or to report an outage, contact{' '}
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

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-tp-card border border-tp-line bg-tp-paper/50 p-5">
                <Zap className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-tp-ink">Fast Processing</h3>
                <p className="mt-1.5 text-sm text-tp-muted">
                  Most headshot orders are completed within hours of upload.
                </p>
              </div>
              <div className="rounded-tp-card border border-tp-line bg-tp-paper/50 p-5">
                <Shield className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-tp-ink">Secure Infrastructure</h3>
                <p className="mt-1.5 text-sm text-tp-muted">
                  Encrypted transfers, secure payment processing, and automatic data deletion.
                </p>
              </div>
              <div className="rounded-tp-card border border-tp-line bg-tp-paper/50 p-5">
                <Clock className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-tp-ink">24/7 Availability</h3>
                <p className="mt-1.5 text-sm text-tp-muted">
                  Upload selfies and generate headshots anytime — our AI runs around the clock.
                </p>
              </div>
            </div>
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
