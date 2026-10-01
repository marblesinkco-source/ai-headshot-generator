import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Accessibility Statement | TailorPic',
  description:
    'TailorPic is committed to making our website usable for everyone. Read about our WCAG 2.1 Level AA target, the accessibility features we have implemented, known limitations, and how to contact us.',
  alternates: { canonical: '/accessibility' },
  openGraph: {
    title: 'Accessibility Statement | TailorPic',
    description:
      'Our commitment to digital accessibility, our WCAG 2.1 Level AA target, known limitations, and how to report an accessibility issue.',
    url: `${siteConfig.url}/accessibility`,
    type: 'website',
    siteName: 'TailorPic',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accessibility Statement | TailorPic',
    description:
      'Our commitment to digital accessibility, our WCAG 2.1 Level AA target, known limitations, and how to report an accessibility issue.',
    images: [siteConfig.ogImage],
  },
};

const features = [
  {
    title: 'Keyboard navigation',
    text: 'Interactive elements such as links, buttons, menus and form fields are designed to be reachable and operable with a keyboard, with visible focus indicators.',
  },
  {
    title: 'Skip links',
    text: 'A "Skip to main content" link appears when you press Tab on page load, letting you bypass repeated navigation.',
  },
  {
    title: 'Alternative text',
    text: 'We provide text alternatives for meaningful images, and mark purely decorative images so assistive technology can ignore them.',
  },
  {
    title: 'Semantic HTML',
    text: 'Pages use landmarks (header, nav, main, footer), a logical heading structure and native form controls with labels to convey structure and meaning.',
  },
  {
    title: 'Color contrast',
    text: 'We choose text and interface colors with sufficient contrast against their backgrounds, and avoid relying on color alone to convey information.',
  },
  {
    title: 'Screen reader support',
    text: 'We use ARIA attributes where native HTML is not enough, and we test key pages with screen readers during development.',
  },
];

const limitations = [
  {
    title: 'AI-generated images',
    text: 'Generated headshots are produced in bulk, so they may carry only brief, general descriptions rather than detailed alternative text.',
  },
  {
    title: 'Photo upload and editing tools',
    text: 'Some interactive features, such as image cropping, previews and comparison views, may be harder to use with a keyboard or screen reader than the rest of the site.',
  },
  {
    title: 'Third-party services',
    text: 'Embedded or hosted services, such as payment checkout and sign-in, are provided by third parties. Their accessibility is outside our direct control.',
  },
  {
    title: 'Older or user-contributed content',
    text: 'Some older pages or content submitted by third parties may not yet meet every success criterion.',
  },
];

export default function AccessibilityPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Accessibility Statement', url: `${siteConfig.url}/accessibility` },
        ]}
      />
      <Header />

      <section className="border-b border-tp-line bg-white pt-16">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
            Accessibility
          </p>
          <h1 className="mt-3 text-4xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            Accessibility Statement
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-tp-muted">
            {siteConfig.name} is committed to making our website and service usable by as many
            people as possible, including people with disabilities.
          </p>
          <p className="mt-4 text-sm text-tp-muted">Last updated: October 2026</p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-tp-ink">Our commitment</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-tp-muted">
            <p>
              We believe everyone should be able to create professional photos with{' '}
              {siteConfig.name}. We treat accessibility as an ongoing part of how we design,
              build and review our product, not a one-time task.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-tp-line bg-tp-paper py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-tp-ink">Conformance target</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-tp-muted">
            <p>
              We strive to conform to the{' '}
              <a
                href="https://www.w3.org/TR/WCAG21/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-ink"
              >
                Web Content Accessibility Guidelines (WCAG) 2.1
              </a>{' '}
              at Level AA. These guidelines explain how to make web content more accessible.
            </p>
            <p>
              This is a goal we are working toward. We have not completed a third-party
              accessibility audit, and we do not claim full conformance at this time.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-tp-ink">
            Accessibility features
          </h2>
          <p className="mt-6 text-base leading-relaxed text-tp-muted">
            Measures we have taken to support accessibility:
          </p>
          <dl className="mt-6 space-y-5">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-tp-line bg-white p-5">
                <dt className="font-semibold text-tp-ink">{f.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-tp-muted">{f.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-y border-tp-line bg-tp-paper py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-tp-ink">Known limitations</h2>
          <p className="mt-6 text-base leading-relaxed text-tp-muted">
            Despite our efforts, some parts of the site may not yet be fully accessible. Areas we
            know need improvement:
          </p>
          <dl className="mt-6 space-y-5">
            {limitations.map((l) => (
              <div key={l.title} className="rounded-xl border border-tp-line bg-white p-5">
                <dt className="font-semibold text-tp-ink">{l.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-tp-muted">{l.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-tp-ink">
            Feedback and contact
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-tp-muted">
            <p>
              If you run into a barrier or need content in a different format, please let us
              know. Describe the page and the problem, and the assistive technology you use if
              relevant. We will review every report and try to respond promptly.
            </p>
            <p>
              <Link
                href="/contact"
                className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-ink"
              >
                Contact us about accessibility
              </Link>{' '}
              or email{' '}
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-ink"
              >
                {siteConfig.supportEmail}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
