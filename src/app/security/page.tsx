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
  Server,
  Trash2,
  Globe,
  CreditCard,
  FileText,
  Users,
  EyeOff,
  type LucideIcon,
} from 'lucide-react';

const TITLE = `Security & Data Protection | ${siteConfig.name}`;
const DESCRIPTION =
  'How TailorPic protects your photos: AES-256 encryption at rest, TLS 1.3 in transit, automatic deletion within 30 days, no selling or sharing of photos, and GDPR/CCPA compliance.';

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

type Item = { icon: LucideIcon; title: string; description: string };

const sections: { id: string; eyebrow: string; title: string; intro: string; items: Item[] }[] = [
  {
    id: 'infrastructure',
    eyebrow: 'Infrastructure',
    title: 'Encrypted by default',
    intro: 'Your photos and personal information are protected at every stage.',
    items: [
      {
        icon: Lock,
        title: 'Encryption at rest and in transit',
        description:
          'Data is encrypted at rest with AES-256 and in transit with TLS 1.3.',
      },
      {
        icon: Server,
        title: 'Secure cloud hosting',
        description:
          'TailorPic runs on managed cloud infrastructure. Our subprocessors are listed publicly so you can see which vendors handle your data.',
      },
      {
        icon: CreditCard,
        title: 'Payments handled by Stripe',
        description:
          'Payments are processed by Stripe, a PCI-DSS Level 1 certified payment processor. Your card details are never stored on our servers.',
      },
    ],
  },
  {
    id: 'data-handling',
    eyebrow: 'Data handling',
    title: 'Kept only as long as needed',
    intro: 'We retain your data to deliver your headshots, then remove it.',
    items: [
      {
        icon: Trash2,
        title: 'Automatic deletion within 30 days',
        description:
          'Your uploaded photos, your AI model, and your generated photos are automatically deleted from our servers within 30 days of delivery.',
      },
      {
        icon: FileText,
        title: 'Deletion on request',
        description:
          'You can ask for immediate deletion at any time by contacting support.',
      },
      {
        icon: Users,
        title: 'Purpose-limited use',
        description:
          'Your photos are used only to generate your headshots.',
      },
    ],
  },
  {
    id: 'privacy',
    eyebrow: 'Privacy',
    title: 'Your photos are yours',
    intro: 'We do not monetize your likeness.',
    items: [
      {
        icon: EyeOff,
        title: 'No selling or sharing of photos',
        description:
          'We never sell or share your photos with third parties.',
      },
      {
        icon: Globe,
        title: 'GDPR and CCPA rights',
        description:
          'You can request access to, correction of, or deletion of your personal data at any time. We honor GDPR (EU) and CCPA (California) data subject requests.',
      },
    ],
  },
];

const securityFaqs = [
  {
    question: 'How does TailorPic encrypt my photos?',
    answer:
      'Data is encrypted at rest with AES-256 and in transit with TLS 1.3.',
  },
  {
    question: 'How long does TailorPic keep my photos?',
    answer:
      'Your uploaded photos, AI model, and generated photos are automatically deleted from our servers within 30 days of delivery. You can request immediate deletion at any time by contacting support.',
  },
  {
    question: 'Does TailorPic sell or share my photos?',
    answer:
      'No. We never sell or share your photos with third parties. They are used only to generate your headshots.',
  },
  {
    question: 'Is TailorPic GDPR and CCPA compliant?',
    answer:
      'Yes. We honor GDPR (EU) and CCPA (California) data subject requests, including access, correction, and deletion of your personal data.',
  },
  {
    question: 'Does TailorPic store my credit card details?',
    answer:
      'No. Payments are processed by Stripe, a PCI-DSS Level 1 certified payment processor, and card details are never stored on our servers.',
  },
  {
    question: 'Can my company get a Data Processing Agreement?',
    answer:
      'Yes. See our Data Processing Agreement page, or contact us for business and enterprise requests.',
  },
  {
    question: 'How do I report a security vulnerability?',
    answer:
      'Email security@tailorpic.com. We take every report seriously.',
  },
];

const resources = [
  { href: '/dpa', title: 'Data Processing Agreement', text: 'Our obligations as a data processor.' },
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

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-tp-card bg-tp-black">
            <ShieldCheck className="h-8 w-8 text-tp-bronze" />
          </div>
          <h1 className="font-display text-4xl tracking-tight text-tp-ink sm:text-5xl">
            Security you can review, privacy you control
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-muted">
            Your face is personal data. We encrypt it, use it only to make your
            headshots, never sell or share it, and delete it within 30 days of delivery.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/dpa">
              <Button size="lg">Review the DPA</Button>
            </Link>
            <Link href="/subprocessors">
              <Button size="lg" variant="outline">View subprocessors</Button>
            </Link>
          </div>

          <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ['AES-256', 'Encryption at rest'],
              ['TLS 1.3', 'Encryption in transit'],
              ['30 days', 'Automatic deletion'],
              ['Never', 'Sold or shared'],
            ].map(([k, v]) => (
              <div key={k} className="rounded-tp-card border border-tp-line bg-white p-4">
                <dt className="font-display text-2xl text-tp-ink">{k}</dt>
                <dd className="mt-1 text-xs text-tp-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Sections */}
      {sections.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className={`scroll-mt-20 border-t border-tp-line py-16 sm:py-20 ${idx % 2 === 0 ? '' : 'bg-tp-paper'}`}
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              {section.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl text-tp-ink sm:text-4xl">{section.title}</h2>
            <p className="mt-3 max-w-2xl text-tp-muted">{section.intro}</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-tp-card border border-tp-line bg-white p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-tp-black">
                    <Icon className="h-5 w-5 text-tp-bronze" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Compliance */}
      <section id="compliance" className="scroll-mt-20 border-t border-tp-line py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
            Compliance
          </p>
          <h2 className="mt-2 font-display text-3xl text-tp-ink sm:text-4xl">
            Documents your team can review
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
            <h3 className="text-base font-semibold text-tp-ink">Vulnerability reporting</h3>
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
          <h2 className="font-display text-3xl text-tp-ink sm:text-4xl">Security FAQ</h2>
          <div className="mt-8 divide-y divide-tp-line rounded-tp-card border border-tp-line bg-white">
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
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-tp-ink">Have security questions?</h2>
          <p className="mt-4 text-lg text-tp-muted">
            Our team is happy to discuss our practices in detail.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg">Contact Us</Button>
            </Link>
          </div>
          <p className="mt-8 text-xs text-tp-muted">Last updated: September 2026</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
