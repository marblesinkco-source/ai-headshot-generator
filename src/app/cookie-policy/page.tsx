import type { Metadata } from 'next';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Cookie Policy | TailorPic',
  description:
    'Learn how TailorPic uses cookies to improve your experience. Details on cookie types, third-party services, and how to manage your preferences.',
  alternates: { canonical: '/cookie-policy' },
  openGraph: {
    title: 'Cookie Policy | TailorPic',
    description:
      'Learn how TailorPic uses cookies to improve your experience.',
    url: `${siteConfig.url}/cookie-policy`,
  },
};

const cookieTable = [
  {
    name: 'sb-access-token',
    purpose: 'Supabase authentication session token',
    type: 'Essential',
    duration: 'Session',
  },
  {
    name: 'sb-refresh-token',
    purpose: 'Supabase session refresh token',
    type: 'Essential',
    duration: '1 year',
  },
  {
    name: '__stripe_mid',
    purpose: 'Stripe fraud prevention and payment processing',
    type: 'Essential',
    duration: '1 year',
  },
  {
    name: '__stripe_sid',
    purpose: 'Stripe payment session identifier',
    type: 'Essential',
    duration: '30 minutes',
  },
  {
    name: '_ga',
    purpose: 'Google Analytics unique visitor identifier',
    type: 'Analytics',
    duration: '2 years',
  },
  {
    name: '_ga_*',
    purpose: 'Google Analytics session state',
    type: 'Analytics',
    duration: '2 years',
  },
  {
    name: '_gid',
    purpose: 'Google Analytics daily unique visitor identifier',
    type: 'Analytics',
    duration: '24 hours',
  },
  {
    name: '_gat',
    purpose: 'Google Analytics request throttling',
    type: 'Analytics',
    duration: '1 minute',
  },
  {
    name: '_gcl_au',
    purpose: 'Google Ads conversion tracking',
    type: 'Marketing',
    duration: '90 days',
  },
];

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-tp-ink sm:text-5xl">
            Cookie Policy
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-muted">
            This policy explains how TailorPic uses cookies and similar
            technologies to recognise you when you visit our website.
          </p>
          <p className="mt-4 text-sm text-tp-muted">
            Last updated: September 2026
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* What Are Cookies */}
            <div>
              <h2 className="text-2xl font-bold text-tp-ink">
                What Are Cookies
              </h2>
              <div className="mt-1 h-px bg-tp-line" />
              <p className="mt-4 text-sm leading-relaxed text-tp-muted">
                Cookies are small text files that are placed on your computer or
                mobile device when you visit a website. They are widely used to
                make websites work more efficiently, provide a better browsing
                experience, and supply reporting information to the website
                operator. Cookies set by the website owner (in this case,
                TailorPic) are called &quot;first-party cookies.&quot; Cookies
                set by parties other than the website owner are called
                &quot;third-party cookies.&quot;
              </p>
            </div>

            {/* Types of Cookies We Use */}
            <div>
              <h2 className="text-2xl font-bold text-tp-ink">
                Types of Cookies We Use
              </h2>
              <div className="mt-1 h-px bg-tp-line" />

              <div className="mt-6 space-y-6">
                <div className="rounded-2xl border border-tp-line bg-white p-6">
                  <h3 className="text-base font-semibold text-tp-ink">
                    Essential Cookies
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    These cookies are strictly necessary for the website to
                    function. They enable core features such as user
                    authentication, session management, and payment processing.
                    Without these cookies, the services you have requested cannot
                    be provided. Essential cookies cannot be disabled.
                  </p>
                </div>

                <div className="rounded-2xl border border-tp-line bg-white p-6">
                  <h3 className="text-base font-semibold text-tp-ink">
                    Analytics Cookies
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    These cookies help us understand how visitors interact with
                    our website by collecting and reporting information
                    anonymously. They allow us to measure traffic, identify the
                    most popular pages, and improve the overall user experience.
                    You may opt out of analytics cookies without affecting
                    essential site functionality.
                  </p>
                </div>

                <div className="rounded-2xl border border-tp-line bg-white p-6">
                  <h3 className="text-base font-semibold text-tp-ink">
                    Marketing Cookies
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    These cookies are used to track visitors across websites in
                    order to display relevant advertisements. They are also used
                    to measure the effectiveness of our advertising campaigns.
                    Marketing cookies are set only with your consent and can be
                    disabled at any time through your browser settings.
                  </p>
                </div>
              </div>
            </div>

            {/* Cookie Table */}
            <div>
              <h2 className="text-2xl font-bold text-tp-ink">
                Cookies We Use
              </h2>
              <div className="mt-1 h-px bg-tp-line" />
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-tp-line">
                      <th className="pb-3 pr-4 text-left font-semibold text-tp-ink">
                        Cookie Name
                      </th>
                      <th className="pb-3 pr-4 text-left font-semibold text-tp-ink">
                        Purpose
                      </th>
                      <th className="pb-3 pr-4 text-left font-semibold text-tp-ink">
                        Type
                      </th>
                      <th className="pb-3 text-left font-semibold text-tp-ink">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookieTable.map((cookie) => (
                      <tr
                        key={cookie.name}
                        className="border-b border-tp-line/50"
                      >
                        <td className="py-3 pr-4 font-mono text-xs text-tp-ink">
                          {cookie.name}
                        </td>
                        <td className="py-3 pr-4 text-tp-muted">
                          {cookie.purpose}
                        </td>
                        <td className="py-3 pr-4 text-tp-muted">
                          {cookie.type}
                        </td>
                        <td className="py-3 text-tp-muted">
                          {cookie.duration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div>
              <h2 className="text-2xl font-bold text-tp-ink">
                Third-Party Cookies
              </h2>
              <div className="mt-1 h-px bg-tp-line" />
              <p className="mt-4 text-sm leading-relaxed text-tp-muted">
                In addition to our own cookies, we use cookies from the
                following trusted third-party services:
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-tp-muted">
                <li>
                  <span className="font-medium text-tp-ink">
                    Google Analytics
                  </span>{' '}
                  &mdash; We use Google Analytics to understand how visitors use
                  our site. Google Analytics collects information about page
                  visits, time on site, and referral sources. This data is
                  aggregated and anonymous. You can learn more about Google
                  Analytics cookies at{' '}
                  <a
                    href="https://policies.google.com/technologies/cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-tp-bronze-ink underline underline-offset-2"
                  >
                    Google&apos;s Privacy &amp; Terms
                  </a>
                  .
                </li>
                <li>
                  <span className="font-medium text-tp-ink">Stripe</span>{' '}
                  &mdash; We use Stripe to process payments securely. Stripe
                  places cookies to detect fraud and ensure safe transactions.
                  You can review Stripe&apos;s cookie usage in their{' '}
                  <a
                    href="https://stripe.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-tp-bronze-ink underline underline-offset-2"
                  >
                    Privacy Policy
                  </a>
                  .
                </li>
                <li>
                  <span className="font-medium text-tp-ink">Supabase</span>{' '}
                  &mdash; We use Supabase for authentication and database
                  services. Supabase sets cookies to manage your login session
                  securely. Learn more at{' '}
                  <a
                    href="https://supabase.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-tp-bronze-ink underline underline-offset-2"
                  >
                    Supabase Privacy Policy
                  </a>
                  .
                </li>
              </ul>
            </div>

            {/* How to Manage Cookies */}
            <div>
              <h2 className="text-2xl font-bold text-tp-ink">
                How to Manage Cookies
              </h2>
              <div className="mt-1 h-px bg-tp-line" />
              <p className="mt-4 text-sm leading-relaxed text-tp-muted">
                Most web browsers allow you to control cookies through their
                settings. You can set your browser to refuse all or some cookies,
                or to alert you when cookies are being sent. Please note that if
                you disable or refuse cookies, some parts of the website may
                become inaccessible or not function properly.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-tp-muted">
                Here is how to manage cookies in the most common browsers:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-tp-muted">
                <li>
                  <span className="font-medium text-tp-ink">
                    Google Chrome:
                  </span>{' '}
                  Settings &gt; Privacy and Security &gt; Cookies and other site
                  data
                </li>
                <li>
                  <span className="font-medium text-tp-ink">
                    Mozilla Firefox:
                  </span>{' '}
                  Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data
                </li>
                <li>
                  <span className="font-medium text-tp-ink">Safari:</span>{' '}
                  Preferences &gt; Privacy &gt; Manage Website Data
                </li>
                <li>
                  <span className="font-medium text-tp-ink">
                    Microsoft Edge:
                  </span>{' '}
                  Settings &gt; Cookies and site permissions &gt; Cookies and
                  site data
                </li>
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-tp-muted">
                To opt out of Google Analytics tracking across all websites, you
                can install the{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-tp-bronze-ink underline underline-offset-2"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-2xl font-bold text-tp-ink">
                Your Rights Under GDPR
              </h2>
              <div className="mt-1 h-px bg-tp-line" />
              <p className="mt-4 text-sm leading-relaxed text-tp-muted">
                If you are located in the European Economic Area (EEA) or the
                United Kingdom, you have certain rights regarding your personal
                data under the General Data Protection Regulation (GDPR). These
                include the right to access, correct, or delete your personal
                data, and the right to withdraw consent for non-essential cookies
                at any time. Exercising these rights will not affect the
                lawfulness of processing carried out before withdrawal.
              </p>
            </div>

            {/* Changes to This Policy */}
            <div>
              <h2 className="text-2xl font-bold text-tp-ink">
                Changes to This Policy
              </h2>
              <div className="mt-1 h-px bg-tp-line" />
              <p className="mt-4 text-sm leading-relaxed text-tp-muted">
                We may update this Cookie Policy from time to time to reflect
                changes in technology, legislation, or our business practices.
                When we make changes, we will update the &quot;Last updated&quot;
                date at the top of this page. We encourage you to review this
                policy periodically.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-bold text-tp-ink">Contact Us</h2>
              <div className="mt-1 h-px bg-tp-line" />
              <p className="mt-4 text-sm leading-relaxed text-tp-muted">
                If you have any questions about our use of cookies or this
                policy, please contact us at{' '}
                <a
                  href="mailto:support@tailorpic.com"
                  className="font-medium text-tp-bronze-ink underline underline-offset-2"
                >
                  support@tailorpic.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
