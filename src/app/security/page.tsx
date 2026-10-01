import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { FAQSchema, BreadcrumbSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import {
  ShieldCheck,
  Lock,
  Trash2,
  FileCheck,
  Server,
  CheckCircle,
  Globe,
  CreditCard,
  EyeOff,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

const TITLE = `Security & Data Protection | ${siteConfig.name}`;
const DESCRIPTION =
  'Your photos are personal data. TailorPic is designed to protect them with encryption, automatic 30-day deletion, no data selling, full commercial rights, and GDPR compliance tools.';

export const metadata: Metadata = {
  title: 'Security & Data Protection',
  description: DESCRIPTION,
  alternates: { canonical: '/security' },
  openGraph: generateOGMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: '/security',
  }),
  twitter: generateTwitterMetadata({
    title: TITLE,
    description: DESCRIPTION,
  }),
};

type FeatureCard = { icon: LucideIcon; title: string; description: string };

const featureCards: FeatureCard[] = [
  {
    icon: ShieldCheck,
    title: 'Built with Security in Mind',
    description:
      'Your photos and personal information are designed to be protected at every stage of the headshot generation process, from upload through delivery.',
  },
  {
    icon: Lock,
    title: 'Encrypted Storage & Transfer',
    description:
      'Data is encrypted at rest and in transit using industry-standard protocols. Your photos are stored securely on managed cloud infrastructure.',
  },
  {
    icon: Trash2,
    title: 'Automatic 30-Day Deletion',
    description:
      'Your uploaded photos, AI model, and generated headshots are automatically deleted from our servers within 30 days of delivery. Request immediate deletion anytime.',
  },
  {
    icon: EyeOff,
    title: 'No Data Selling, Ever',
    description:
      'We never sell, share, or monetize your photos or likeness. Your photos are used only to generate your headshots -- nothing else.',
  },
  {
    icon: FileCheck,
    title: 'Full Commercial Rights',
    description:
      'Every headshot you receive comes with full commercial usage rights. Use them on your website, LinkedIn, business cards, and marketing materials.',
  },
  {
    icon: Globe,
    title: 'GDPR & Privacy Tools',
    description:
      'Request access to, correction of, or deletion of your personal data at any time. We honor GDPR (EU) and CCPA (California) data subject requests.',
  },
];

const trustBarItems = [
  { icon: Trash2, label: 'Photos Auto-Deleted' },
  { icon: EyeOff, label: 'No Data Selling' },
  { icon: Globe, label: 'GDPR Tools' },
  { icon: FileCheck, label: 'Full Commercial Rights' },
];

const securityFaqs = [
  {
    question: 'How long does TailorPic keep my photos?',
    answer:
      'Your uploaded photos, AI model, and generated headshots are automatically deleted from our servers within 30 days of delivery. You can also request immediate deletion at any time by contacting our support team.',
  },
  {
    question: 'Does TailorPic sell or share my photos?',
    answer:
      'No. We never sell or share your photos with third parties. Your photos are used solely to generate your headshots and for no other purpose.',
  },
  {
    question: 'What rights do I have over my generated headshots?',
    answer:
      'You receive full commercial rights to every headshot we generate for you. Use them on your website, LinkedIn profile, business cards, email signatures, and any other professional context.',
  },
  {
    question: 'Is TailorPic GDPR compliant?',
    answer:
      'Yes. We honor GDPR (EU) and CCPA (California) data subject requests, including access, correction, and deletion of your personal data. We also offer a Data Processing Agreement for businesses that require one.',
  },
  {
    question: 'How are payments handled?',
    answer:
      'Payments are processed by Stripe, a PCI-DSS Level 1 certified payment processor. Your card details are never stored on our servers.',
  },
  {
    question: 'How do I request deletion of my data?',
    answer:
      'Contact our support team at any time to request immediate deletion of your photos, AI model, and personal data. We process deletion requests promptly.',
  },
];

const resources = [
  { href: '/dpa', title: 'Data Processing Agreement', text: 'Our obligations as a data processor under GDPR.' },
  { href: '/subprocessors', title: 'Subprocessors', text: 'The vendors that process data on our behalf.' },
  { href: '/privacy', title: 'Privacy Policy', text: 'What we collect and how we use it.' },
];

export default function SecurityPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <FAQSchema items={securityFaqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Security', url: `${siteConfig.url}/security` },
        ]}
      />
      <Header />

      {/* Hero - Dark */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <ShieldCheck className="h-4 w-4" />
              Security & Privacy
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Your Face, Your Data,{' '}
              <span className="not-italic text-tp-bronze">Your Control</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Your face is personal data. We treat it that way. TailorPic is designed to
              protect your photos with encryption, automatic deletion, and a strict
              no-selling policy -- so you can get professional headshots with confidence.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="gap-2">
                  Get Your Headshot
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dpa">
                <Button variant="outline" size="lg" className="border-tp-beige/30 text-tp-beige hover:bg-tp-beige/10">
                  Review the DPA
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          {trustBarItems.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-tp-bronze" />
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ['30 Days', 'Auto-deletion timeline'],
              ['Zero', 'Photos sold or shared'],
              ['100%', 'Commercial rights included'],
              ['GDPR', 'Compliance tools built in'],
            ].map(([k, v]) => (
              <div key={k} className="rounded-tp-card border border-tp-line bg-white p-5 text-center">
                <dt className="font-display text-2xl text-tp-ink sm:text-3xl">{k}</dt>
                <dd className="mt-1 text-xs text-tp-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
              How We Protect Your Data
            </h2>
            <p className="mt-4 text-lg text-tp-muted">
              Security is not an afterthought. Every feature is designed with your privacy in mind.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black">
                  <Icon className="h-6 w-6 text-tp-bronze" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-tp-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional details: Payments + Infrastructure */}
      <section className="bg-tp-black py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-tp-card border border-tp-beige/10 bg-tp-ink p-8">
              <CreditCard className="h-8 w-8 text-tp-bronze" />
              <h3 className="mt-4 font-display text-xl font-normal text-tp-paper">Secure Payments</h3>
              <p className="mt-3 text-sm leading-relaxed text-tp-beige/70">
                Payments are processed by Stripe, a PCI-DSS Level 1 certified payment processor.
                Your card details are never stored on our servers. We never see your full card number.
              </p>
            </div>
            <div className="rounded-tp-card border border-tp-beige/10 bg-tp-ink p-8">
              <Server className="h-8 w-8 text-tp-bronze" />
              <h3 className="mt-4 font-display text-xl font-normal text-tp-paper">Cloud Infrastructure</h3>
              <p className="mt-3 text-sm leading-relaxed text-tp-beige/70">
                TailorPic runs on managed cloud infrastructure with industry-standard security practices.
                Our subprocessors are listed publicly so you can review which vendors handle your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Resources */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
            Compliance
          </p>
          <h2 className="mt-2 font-display text-3xl font-normal text-tp-ink sm:text-4xl">
            Documents Your Team Can Review
          </h2>
          <p className="mt-3 max-w-2xl text-tp-muted">
            We honor GDPR and CCPA data subject requests. For vendor reviews, start with these pages.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {resources.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group rounded-tp-card border border-tp-line bg-white p-6 transition-colors hover:border-tp-bronze"
              >
                <h3 className="text-base font-semibold text-tp-ink">{r.title}</h3>
                <p className="mt-2 text-sm text-tp-muted">{r.text}</p>
                <span className="mt-4 inline-block text-sm font-medium text-tp-bronze-ink underline-offset-2 group-hover:underline">
                  Read more
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 rounded-tp-card border border-tp-line bg-tp-beige p-6">
            <h3 className="text-base font-semibold text-tp-ink">Vulnerability Reporting</h3>
            <p className="mt-2 text-sm leading-relaxed text-tp-muted">
              If you discover a security issue, please report it responsibly to{' '}
              <a
                href="mailto:security@tailorpic.com"
                className="font-medium text-tp-bronze-ink underline underline-offset-2"
              >
                security@tailorpic.com
              </a>
              . We take every report seriously.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-tp-line bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-normal text-tp-ink sm:text-4xl">
            Security FAQ
          </h2>
          <div className="mt-12 divide-y divide-tp-line rounded-tp-card border border-tp-line bg-white">
            {securityFaqs.map((f) => (
              <details key={f.question} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-medium text-tp-ink">{f.question}</span>
                  <span
                    aria-hidden="true"
                    className="text-xl leading-none text-tp-bronze-ink transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-tp-muted">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
            Ready for Professional Headshots?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get studio-quality AI headshots with the peace of mind that your photos are
            protected, never shared, and automatically deleted.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="gap-2">
                Get Your Professional Headshot
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-tp-muted">
            No subscription required. 14-day money-back guarantee.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
