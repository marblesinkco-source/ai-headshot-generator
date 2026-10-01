import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Subprocessors | TailorPic',
  description:
    'The third-party subprocessors TailorPic uses to process personal data on our behalf, including their purpose and data location.',
  alternates: { canonical: '/subprocessors' },
  openGraph: generateOGMetadata({ title: 'Subprocessors | TailorPic', description: 
      'The third-party subprocessors TailorPic uses to process personal data on our behalf, including their purpose and data location.', path: '/subprocessors' }),
  twitter: generateTwitterMetadata({ title: 'Subprocessors | TailorPic', description: 
      'The third-party subprocessors TailorPic uses to process personal data on our behalf, including their purpose and data location.' }),
};

const subprocessors = [
  { name: 'Supabase', purpose: 'Authentication, database, storage', location: 'United States' },
  { name: 'Stripe', purpose: 'Payment processing', location: 'United States' },
  { name: 'Replicate', purpose: 'AI image generation', location: 'United States' },
  { name: 'Resend', purpose: 'Transactional email', location: 'United States' },
  { name: 'Vercel', purpose: 'Hosting & CDN', location: 'United States (Global Edge)' },
  { name: 'Google Analytics', purpose: 'Website analytics', location: 'United States' },
  { name: 'Google Cloud', purpose: 'OAuth provider', location: 'United States' },
];

const linkClass = 'font-medium text-tp-bronze-ink underline underline-offset-2';

export default function SubprocessorsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Subprocessors', url: `${siteConfig.url}/subprocessors` },
        ]}
      />
      <Header />

      <section className="border-b border-tp-line bg-white pt-16">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            Subprocessors
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-tp-muted">
            A subprocessor is a third-party service provider that {siteConfig.name} engages to
            process personal data on our behalf in order to deliver our service. The providers
            below process personal data under our instructions.
          </p>
          <p className="mt-4 text-sm text-tp-muted">Last updated: October 2026</p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-tp-ink">Current subprocessors</h2>

          {/* Table on sm+, stacked cards on mobile */}
          <div className="mt-6 hidden overflow-hidden rounded-xl border border-tp-line sm:block">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                List of {siteConfig.name} subprocessors, their purpose, and data location
              </caption>
              <thead className="bg-tp-paper text-tp-ink">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Subprocessor</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Purpose</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Data Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tp-line">
                {subprocessors.map((sp) => (
                  <tr key={sp.name} className="bg-white">
                    <th scope="row" className="px-5 py-4 font-semibold text-tp-ink">{sp.name}</th>
                    <td className="px-5 py-4 text-tp-muted">{sp.purpose}</td>
                    <td className="px-5 py-4 text-tp-muted">{sp.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-6 space-y-3 sm:hidden">
            {subprocessors.map((sp) => (
              <li key={sp.name} className="rounded-xl border border-tp-line bg-white p-5">
                <p className="font-semibold text-tp-ink">{sp.name}</p>
                <dl className="mt-2 space-y-1 text-sm">
                  <div>
                    <dt className="inline font-medium text-tp-ink">Purpose: </dt>
                    <dd className="inline text-tp-muted">{sp.purpose}</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-tp-ink">Data Location: </dt>
                    <dd className="inline text-tp-muted">{sp.location}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-tp-line bg-tp-paper py-14">
        <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-tp-ink">
              Changes to our subprocessors
            </h2>
            <p className="mt-4 text-base leading-relaxed text-tp-muted">
              In line with Article 28 of the GDPR, we will notify users before we add or replace a
              subprocessor, giving them the opportunity to object. This page will be updated to
              reflect any change. Questions or objections can be sent to{' '}
              <a href={`mailto:${siteConfig.supportEmail}`} className={linkClass}>
                {siteConfig.supportEmail}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-tp-ink">Related documents</h2>
            <p className="mt-4 text-base leading-relaxed text-tp-muted">
              For more on how we process personal data, see our{' '}
              <Link href="/dpa" className={linkClass}>
                Data Processing Agreement
              </Link>{' '}
              and our{' '}
              <Link href="/privacy" className={linkClass}>
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
