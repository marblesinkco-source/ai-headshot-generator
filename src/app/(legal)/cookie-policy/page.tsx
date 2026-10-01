import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Cookie Policy | TailorPic',
  description:
    'Learn how TailorPic uses cookies and local storage: essential session cookies, and analytics cookies that are only set with your consent.',
  alternates: { canonical: '/cookie-policy' },
  openGraph: {
    title: 'Cookie Policy | TailorPic',
    description:
      'Learn how TailorPic uses cookies. Analytics cookies are only set with your explicit consent.',
    url: `${siteConfig.url}/cookie-policy`,
  },
};

type CookieRow = {
  name: string;
  purpose: string;
  type: 'Essential' | 'Analytics';
  provider: string;
  duration: string;
};

const cookieTable: CookieRow[] = [
  {
    name: 'sb-*-auth-token',
    purpose:
      'Keeps you signed in. Holds your Supabase authentication session and refresh token (may be split into numbered chunks such as .0 and .1).',
    type: 'Essential',
    provider: 'TailorPic / Supabase',
    duration: 'Up to 1 year',
  },
  {
    name: 'sb-*-auth-token-code-verifier',
    purpose:
      'Temporary value used to securely complete sign-in flows (for example, email links and OAuth).',
    type: 'Essential',
    provider: 'TailorPic / Supabase',
    duration: 'Short-lived',
  },
  {
    name: 'tp_cookie_consent',
    purpose:
      'Stores your cookie preferences (stored in your browser\'s localStorage, not a cookie).',
    type: 'Essential',
    provider: 'TailorPic',
    duration: 'Until you clear it',
  },
  {
    name: '_ga',
    purpose: 'Distinguishes unique visitors for Google Analytics.',
    type: 'Analytics',
    provider: 'Google',
    duration: '2 years',
  },
  {
    name: '_ga_*',
    purpose: 'Maintains Google Analytics session state.',
    type: 'Analytics',
    provider: 'Google',
    duration: '2 years',
  },
  {
    name: '_gid',
    purpose: 'Distinguishes unique visitors over a 24-hour period.',
    type: 'Analytics',
    provider: 'Google',
    duration: '24 hours',
  },
];

export default function CookiePolicyPage() {
  return (
    <article className="prose prose-gray max-w-none prose-headings:text-tp-ink prose-a:text-tp-bronze-ink">
      <h1 className="font-display">Cookie Policy</h1>
      <p className="lead">Last updated: October 1, 2026</p>

      <p>
        This policy explains how TailorPic (&quot;we&quot;, &quot;our&quot;, or
        &quot;us&quot;) uses cookies and similar technologies such as browser
        localStorage. Essential cookies are always active because the service
        cannot work without them. <strong>Analytics cookies are only set if you
        give explicit consent</strong>, and you can change your choice at any
        time.
      </p>

      <h2 className="font-display">What Are Cookies</h2>
      <p>
        Cookies are small text files placed on your device when you visit a
        website. Cookies set by us are &quot;first-party cookies&quot;; cookies
        set by other parties (such as Google) are &quot;third-party
        cookies&quot;. Similar technologies, such as localStorage, store small
        pieces of data in your browser.
      </p>

      <h2 className="font-display">Types of Cookies We Use</h2>

      <h3>Essential</h3>
      <p>
        These are strictly necessary to run the site and cannot be switched off.
        We use them to keep you signed in (Supabase authentication session
        cookies, named <code>sb-*</code>) and to remember your cookie
        preferences (<code>tp_cookie_consent</code>, stored in localStorage).
        They are not used for tracking or advertising.
      </p>

      <h3>Analytics</h3>
      <p>
        We use Google Analytics to understand how visitors use our site, for
        example which pages are visited and how people arrive. Analytics
        cookies (<code>_ga</code>, <code>_ga_*</code>, <code>_gid</code>) are{' '}
        <strong>only set after you opt in</strong>. We use Google Consent Mode
        v2: analytics storage is denied by default, and Google Analytics is only
        granted permission to store cookies once you accept analytics cookies
        in our consent banner. If you reject analytics or do not make a choice,
        these cookies are not set.
      </p>

      <h3>Marketing</h3>
      <p>
        We do not currently use any marketing or advertising cookies. Our
        consent banner includes a Marketing option so that our consent framework
        is ready should we introduce such services in the future. Selecting it
        today does not set any additional cookies. If this changes, we will
        update this policy and ask for your consent first.
      </p>

      <h2 className="font-display">Cookies and Storage We Use</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-tp-line">
              <th className="pb-3 pr-4 text-left font-semibold text-tp-ink">Name</th>
              <th className="pb-3 pr-4 text-left font-semibold text-tp-ink">Purpose</th>
              <th className="pb-3 pr-4 text-left font-semibold text-tp-ink">Type</th>
              <th className="pb-3 pr-4 text-left font-semibold text-tp-ink">Provider</th>
              <th className="pb-3 text-left font-semibold text-tp-ink">Duration</th>
            </tr>
          </thead>
          <tbody>
            {cookieTable.map((cookie) => (
              <tr key={cookie.name} className="border-b border-tp-line/50 align-top">
                <td className="py-3 pr-4 font-mono text-xs text-tp-ink">{cookie.name}</td>
                <td className="py-3 pr-4 text-tp-muted">{cookie.purpose}</td>
                <td className="py-3 pr-4 text-tp-muted">
                  {cookie.type}
                  {cookie.type === 'Analytics' && (
                    <span className="block text-xs text-tp-bronze-ink">Consent required</span>
                  )}
                </td>
                <td className="py-3 pr-4 text-tp-muted">{cookie.provider}</td>
                <td className="py-3 text-tp-muted">{cookie.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-display">Third-Party Services</h2>
      <ul>
        <li>
          <strong>Google Analytics</strong> &mdash; Loaded only with your consent
          (see above). Learn more in{' '}
          <a
            href="https://policies.google.com/technologies/cookies"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s cookie information
          </a>
          .
        </li>
        <li>
          <strong>Supabase</strong> &mdash; Provides authentication. Its session
          cookies are set on our domain and are essential.
        </li>
        <li>
          <strong>Stripe</strong> &mdash; Payments are completed on
          Stripe&apos;s hosted checkout page. We do not set Stripe cookies on
          our site; any cookies Stripe sets on its own pages are governed by{' '}
          <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">
            Stripe&apos;s Privacy Policy
          </a>
          .
        </li>
      </ul>

      <h2 className="font-display">How to Manage Your Choices</h2>
      <p>
        When you first visit, our banner lets you accept all, reject all, or
        customize your preferences. Your choice is saved in localStorage under{' '}
        <code>tp_cookie_consent</code>. To change it, clear this item (or your
        site data) in your browser and the banner will appear again. When you
        withdraw analytics consent, Google Analytics is instructed to stop
        storing new analytics data; you can also delete existing cookies in your
        browser.
      </p>
      <p>
        You can also control cookies through your browser settings. Blocking
        essential cookies will prevent you from signing in.
      </p>
      <ul>
        <li><strong>Google Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies and other site data</li>
        <li><strong>Mozilla Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
        <li><strong>Safari:</strong> Settings &gt; Privacy &gt; Manage Website Data</li>
        <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions &gt; Cookies and site data</li>
      </ul>
      <p>
        You can also install the{' '}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Analytics Opt-out Browser Add-on
        </a>
        .
      </p>

      <h2 className="font-display">Your Rights Under GDPR</h2>
      <p>
        If you are in the European Economic Area or the United Kingdom, you have
        the right to access, correct, or delete your personal data, and to
        withdraw consent for non-essential cookies at any time. Withdrawing
        consent does not affect the lawfulness of processing carried out before
        withdrawal.
      </p>

      <h2 className="font-display">Changes to This Policy</h2>
      <p>
        We may update this policy as our services or legal requirements change.
        We will update the &quot;Last updated&quot; date above when we do.
      </p>

      <h2 className="font-display">Contact Us</h2>
      <p>
        Questions about our use of cookies? Email{' '}
        <a href="mailto:support@tailorpic.com">support@tailorpic.com</a>.
      </p>
    </article>
  );
}
