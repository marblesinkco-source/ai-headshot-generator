import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield,
  Lock,
  Eye,
  Trash2,
  Server,
  Upload,
  Cpu,
  Download,
  ShieldCheck,
  Ban,
  FileText,
  Mail,
  ChevronDown,
} from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { PAYMENT_PROVIDER } from '@/config/pricing';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const PAGE_TITLE = 'Trust Center: Security & Privacy | TailorPic';
const PAGE_DESC =
  'How TailorPic handles your photos: purpose-limited use, encrypted transfers, automatic deletion of training data, and no selling of your data.';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESC,
  alternates: { canonical: '/trust' },
  openGraph: generateOGMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESC,
    path: '/trust',
  }),
  twitter: generateTwitterMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESC,
  }),
};

const controlPoints = [
  {
    icon: Eye,
    title: 'Used only for generation',
    desc: 'Photos you upload are used to create the images you ordered. We do not use them for advertising or unrelated purposes.',
  },
  {
    icon: Trash2,
    title: 'Deletion on request',
    desc: 'You can delete generated images from your account, and you can ask us to delete your personal data and account at any time.',
  },
  {
    icon: FileText,
    title: 'Clear policies',
    desc: 'Our Privacy Policy, Data Processing Agreement and sub-processor list describe what we collect and who handles it.',
  },
];

const journey = [
  {
    icon: Upload,
    title: 'Upload',
    desc: 'You upload your photos over an encrypted HTTPS connection.',
  },
  {
    icon: Cpu,
    title: 'AI processing',
    desc: 'Photos are processed by our AI provider to create a temporary model and generate your images.',
  },
  {
    icon: Download,
    title: 'Delivery',
    desc: 'Your generated images appear in your account for you to review and download.',
  },
  {
    icon: Trash2,
    title: 'Deletion',
    desc: 'Uploaded photos, training data, temporary models and generated images are automatically deleted 30 days after delivery. You can delete them sooner from your dashboard or request account deletion.',
  },
];

const infra = [
  {
    icon: Server,
    title: 'Managed cloud hosting',
    desc: 'TailorPic runs on established cloud platforms rather than self-managed servers. Our sub-processors and what they do are listed publicly.',
  },
  {
    icon: Lock,
    title: 'Encryption in transit',
    desc: 'Traffic between your browser and TailorPic uses HTTPS (TLS).',
  },
  {
    icon: ShieldCheck,
    title: 'Encrypted storage at rest',
    desc: 'Data is stored with managed cloud providers that encrypt stored data at rest.',
  },
  {
    icon: Shield,
    title: `Payments handled by ${PAYMENT_PROVIDER.name}`,
    desc: `Card payments are processed by ${PAYMENT_PROVIDER.name}. We do not store your card details.`,
  },
];

const privacy = [
  {
    icon: Ban,
    title: 'We do not sell your data',
    desc: 'We do not sell your personal information or your photos.',
  },
  {
    icon: Eye,
    title: 'No general-purpose model training',
    desc: 'We do not use your photos to train general-purpose AI models. Your photos are used to generate your requested outputs. If this ever changes, it would require your consent.',
  },
  {
    icon: FileText,
    title: 'GDPR-aware practices',
    desc: 'We aim to honor requests for access, correction and deletion of personal data, and we offer a Data Processing Agreement for businesses.',
  },
];

const faqs = [
  {
    q: 'Are my photos used to train AI models?',
    a: 'Your photos are used to build a temporary model that generates your own headshots. We do not use them to train general-purpose AI models, and the training data and temporary models are automatically deleted 30 days after delivery.',
  },
  {
    q: 'Who can access my photos?',
    a: 'Your photos are available to you through your account. They are also handled by the service providers needed to run TailorPic, such as hosting, storage and AI processing. These are listed on our sub-processors page.',
  },
  {
    q: 'How do I delete my data?',
    a: `You can delete generated images from your account. To delete your personal data and account, email ${siteConfig.supportEmail} and we will process your request.`,
  },
  {
    q: 'Does TailorPic hold a security certification such as SOC 2 or ISO 27001?',
    a: 'No. We do not currently claim any formal security certification or audit report. This page describes the practices we follow, and we will not list a certification here unless we hold it.',
  },
  {
    q: 'Do you store my payment details?',
    a: `No. Payments are processed by ${PAYMENT_PROVIDER.name}, and card details are not stored on TailorPic servers.`,
  },
];

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Trust Center: Security & Privacy',
  description: PAGE_DESC,
  url: `${siteConfig.url}/trust`,
  inLanguage: 'en-US',
  datePublished: '2026-10-06',
  dateModified: '2026-10-06',
  author: { '@type': 'Organization', name: siteConfig.name },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/brand/tailorpic/logo/tailorpic-horizontal-bronze.svg`,
    },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/trust` },
};

export default function TrustPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Trust Center', url: `${siteConfig.url}/trust` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Header />

      {/* Hero */}
      <section className="bg-tp-black py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-tp-bronze/30 bg-tp-bronze/10">
            <Shield className="h-10 w-10 text-tp-bronze" strokeWidth={1.5} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-tp-bronze mb-4">
            Trust Center
          </p>
          <h1 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Security &amp; Privacy
          </h1>
          <p className="mt-5 text-lg text-tp-beige/70 max-w-2xl mx-auto leading-relaxed">
            Your photos are personal. Here is a plain description of how we
            handle them, what we do and do not do, and how to reach us with
            questions.
          </p>
        </div>
      </section>

      {/* Your Data, Your Control */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Your Data, Your Control
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              Photos are used to make your images, and you decide what stays.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {controlPoints.map((p) => (
              <div key={p.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <p.icon className="h-7 w-7 text-tp-bronze-ink mb-4" />
                <h3 className="text-base font-semibold text-tp-ink mb-2">{p.title}</h3>
                <p className="text-sm text-tp-muted leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Handle Your Photos */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              How We Handle Your Photos
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              From upload to deletion, in four steps.
            </p>
          </div>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((s, i) => (
              <li key={s.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-tp-black text-sm font-semibold text-tp-beige">
                    {i + 1}
                  </span>
                  <s.icon className="h-5 w-5 text-tp-bronze-ink" />
                </div>
                <h3 className="text-base font-semibold text-tp-ink mb-2">{s.title}</h3>
                <p className="text-sm text-tp-muted leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Infrastructure
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              Standard protections, built on managed cloud services.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {infra.map((p) => (
              <div key={p.title} className="flex gap-4 rounded-tp-card border border-tp-line bg-white p-6">
                <p.icon className="h-6 w-6 flex-shrink-0 text-tp-bronze-ink mt-0.5" />
                <div>
                  <h3 className="text-base font-semibold text-tp-ink mb-1">{p.title}</h3>
                  <p className="text-sm text-tp-muted leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-tp-muted">
            See the full list of providers on our{' '}
            <Link href="/subprocessors" className="text-tp-bronze-ink underline underline-offset-2">
              sub-processors page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Privacy by Design */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Privacy by Design
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              Commitments that shape how we build and operate TailorPic.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {privacy.map((p) => (
              <div key={p.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <p.icon className="h-7 w-7 text-tp-bronze-ink mb-4" />
                <h3 className="text-base font-semibold text-tp-ink mb-2">{p.title}</h3>
                <p className="text-sm text-tp-muted leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-tp-muted max-w-2xl mx-auto">
            We do not currently claim SOC 2, ISO 27001, HIPAA or any other
            formal certification. No method of transmission or storage is
            perfectly secure, so we describe our practices rather than promise
            absolutes.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Security Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-tp-card border border-tp-line bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-sm font-semibold text-tp-ink">
                  {f.q}
                  <ChevronDown className="h-4 w-4 flex-shrink-0 text-tp-muted transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-6 pb-5 text-sm text-tp-muted leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-tp-black py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-normal text-3xl text-white">
            Questions about your data?
          </h2>
          <p className="mt-3 text-tp-beige/70">
            Read the{' '}
            <Link href="/privacy" className="text-tp-bronze underline underline-offset-2">
              Privacy Policy
            </Link>{' '}
            or contact us directly.
          </p>
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="mt-6 inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-6 py-3 text-sm font-semibold text-tp-black hover:bg-tp-bronze/90"
          >
            <Mail className="h-4 w-4" /> {siteConfig.supportEmail}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
