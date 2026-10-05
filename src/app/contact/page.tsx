import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { ContactForm } from '@/components/marketing/contact-form';
import { Mail, Clock, Building2, Lock, MailX, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'Contact TailorPic: Sales, Support, Press & Partnerships' },
  description: `Contact ${siteConfig.name} for pre-sales questions, order support, team and enterprise pricing, press, or partnerships. We aim to respond within 1 business day.`,
  alternates: { canonical: '/contact' },
  openGraph: generateOGMetadata({ title: `Contact Us | ${siteConfig.name}`, description: `Questions about AI headshots, orders, teams or partnerships? Message the ${siteConfig.name} team. We aim to respond within 1 business day.`, path: '/contact' }),
  twitter: generateTwitterMetadata({ title: `Contact Us | ${siteConfig.name}`, description: `Message the ${siteConfig.name} team. We aim to respond within 1 business day.` }),
};

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: 'General inquiries, orders and support',
    detail: siteConfig.supportEmail,
    href: `mailto:${siteConfig.supportEmail}`,
    linkLabel: 'Send an email',
  },
  {
    icon: Building2,
    title: 'Teams and Enterprise',
    description: 'Headshots for teams, custom pricing, invoicing',
    detail: 'Choose "Sales / Enterprise" in the form',
    href: '/enterprise',
    linkLabel: 'See enterprise options',
  },
  {
    icon: Clock,
    title: 'Response time',
    description: 'We read every message',
    detail: 'We aim to respond within 1 business day',
    href: null,
    linkLabel: null,
  },
];

const trustSignals = [
  { icon: Lock, title: 'Secure submission', text: 'Your message is sent over an encrypted connection.' },
  { icon: MailX, title: 'No spam', text: 'We only use your email to reply to your message.' },
  { icon: ShieldCheck, title: 'Your data stays private', text: 'We never share your details with third parties.' },
];

const faqs = [
  {
    q: 'How long does it take to get my photos?',
    a: 'Most orders are ready in under 2 hours. Complex styles may take a bit longer.',
  },
  {
    q: 'Can I get a refund if I am not satisfied?',
    a: 'Yes. We offer a satisfaction guarantee. Contact our support team for details.',
  },
  {
    q: 'How many photos do I need to upload?',
    a: 'Upload 4 to 10 clear selfies that follow our photo guidelines. More variety in angles, lighting and expression gives better results.',
  },
  {
    q: 'What happens to my uploaded photos?',
    a: 'Your photos are encrypted in transit and at rest, and automatically deleted 30 days after delivery. You can also request earlier deletion by contacting support. We never share your data with third parties.',
  },
  {
    q: 'Can I use the generated photos commercially?',
    a: 'Yes. You receive full commercial rights to the images generated for you, including LinkedIn, your website, business cards and print.',
  },
  {
    q: 'Do you offer team or bulk pricing?',
    a: 'Yes. Our team offering is built for businesses. Select "Sales / Enterprise" in the form above and tell us your team size, and we will follow up with options.',
  },
];

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Contact', url: `${siteConfig.url}/contact` },
      ]} />
      <FAQSchema items={faqs.map((f) => ({ question: f.q, answer: f.a }))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: `Contact ${siteConfig.name}`,
            url: `${siteConfig.url}/contact`,
            mainEntity: {
              '@type': 'Organization',
              name: siteConfig.name,
              contactPoint: {
                '@type': 'ContactPoint',
                email: siteConfig.supportEmail,
                contactType: 'customer support',
                availableLanguage: ['English', 'Turkish'],
              },
            },
          }),
        }}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <h1 className="font-display font-normal text-5xl tracking-tight text-tp-ink sm:text-6xl">
            Get in{' '}
            <span className="bg-gradient-to-r from-tp-bronze-ink to-tp-bronze bg-clip-text text-transparent">
              touch
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-muted">
            Questions before you order, help with an existing order, or interested in headshots for your team?
            Tell us what you need and we will point you to the right person.
          </p>
          <p className="mt-4 text-sm font-medium text-tp-bronze-ink">
            We aim to respond within 1 business day.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="pb-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.title}
                  className="rounded-tp-card border border-tp-line bg-white p-7 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-black">
                    <Icon className="h-6 w-6 text-tp-bronze" aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 font-display font-normal text-lg text-tp-ink">{method.title}</h2>
                  <p className="mt-1 text-sm text-tp-muted">{method.description}</p>
                  <p className="mt-3 text-sm font-medium text-tp-bronze-ink">{method.detail}</p>
                  {method.href && method.linkLabel && (
                    <Link
                      href={method.href}
                      className="mt-4 inline-block text-sm font-medium text-tp-bronze-ink underline underline-offset-2 transition-colors hover:text-tp-ink"
                    >
                      {method.linkLabel} &rarr;
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-display font-normal text-4xl text-tp-ink">Send us a message</h2>
            <p className="mt-3 text-tp-muted">
              Pick a topic so your message reaches the right team. Fields marked with * are required.
            </p>
            <p className="mt-3 text-sm text-tp-muted">
              Looking for a quick answer? <Link href="/help" className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-ink">Check our Help Center</Link> first.
            </p>
          </div>
          <ContactForm />
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {trustSignals.map((t) => {
              const Icon = t.icon;
              return (
                <li key={t.title} className="flex items-start gap-3 rounded-tp-button bg-tp-paper p-4">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-tp-ink">{t.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-tp-muted">{t.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-center text-xs text-tp-muted">
            By submitting this form you agree to our{' '}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-tp-ink">Privacy Policy</Link>.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-tp-paper py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display font-normal text-4xl text-tp-ink">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-center text-tp-muted">
            Quick answers to common pre-sales questions. Can&apos;t find yours? Use the form above or email{' '}
            <a href={`mailto:${siteConfig.supportEmail}`} className="font-medium text-tp-bronze-ink underline underline-offset-2">
              {siteConfig.supportEmail}
            </a>.
          </p>
          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-tp-card border border-tp-line bg-white p-6 shadow-sm open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-tp-ink [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span aria-hidden="true" className="text-tp-bronze-ink transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-tp-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display font-normal text-4xl text-tp-ink">Ready to create your photos?</h2>
          <p className="mt-4 text-lg text-tp-muted">
            Upload your selfies and get studio-quality AI photos, backed by our satisfaction guarantee.
          </p>
          <div className="mt-8">
            <Link
              href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
              className="inline-flex items-center justify-center rounded-tp-button bg-tp-black px-8 py-3 text-sm font-semibold text-tp-bronze shadow-sm transition-all hover:bg-tp-black/90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
