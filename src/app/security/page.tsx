import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import {
  ShieldCheck,
  Lock,
  Server,
  Eye,
  Trash2,
  Globe,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Security & Data Protection | TailorPic',
  description:
    'Learn how TailorPic protects your data with AES-256 encryption, automatic photo deletion, GDPR compliance, and responsible AI practices.',
  alternates: { canonical: '/security' },
  openGraph: {
    title: 'Security & Data Protection | TailorPic',
    description:
      'Learn how TailorPic protects your data with encryption, automatic photo deletion, and responsible AI practices.',
    url: `${siteConfig.url}/security`,
  },
};

const securityFeatures = [
  {
    icon: Lock,
    title: 'Data Encryption',
    description:
      'All data is encrypted at rest using AES-256 and in transit using TLS 1.3. Your photos and personal information are protected with industry-standard encryption at every stage.',
  },
  {
    icon: Server,
    title: 'Secure Infrastructure',
    description:
      'TailorPic is hosted on secure cloud infrastructure with automated backups, network isolation, and continuous monitoring. Our systems are designed for high availability and resilience.',
  },
  {
    icon: Trash2,
    title: 'Photo Privacy & Auto-Deletion',
    description:
      'Your uploaded photos are used solely for generating your AI headshots. All original uploads and training data are automatically and permanently deleted within 30 days of delivery.',
  },
  {
    icon: Eye,
    title: 'Access Control',
    description:
      'We enforce role-based access controls across our internal systems. All access to customer data is logged and audited. Only authorized personnel can access production data, and only when necessary.',
  },
  {
    icon: ShieldCheck,
    title: 'Payment Security',
    description:
      'All payments are processed by Stripe, a PCI-DSS Level 1 certified payment processor. TailorPic never stores your credit card numbers or sensitive payment details on our servers.',
  },
  {
    icon: Globe,
    title: 'GDPR & CCPA Compliance',
    description:
      'We respect your privacy rights. You can request access to, correction of, or deletion of your personal data at any time. We honor GDPR (EU) and CCPA (California) data subject requests promptly.',
  },
];

export default function SecurityPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-tp-black">
            <ShieldCheck className="h-8 w-8 text-tp-bronze" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Security & Data Protection
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            Your privacy is not an afterthought — it is built into everything we
            do. Here is how we keep your data safe.
          </p>
        </div>
      </section>

      {/* Security Feature Cards */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {securityFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-tp-black">
                    <Icon className="h-6 w-6 text-tp-bronze" />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Policies */}
      <section className="border-t border-tp-line bg-gray-50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Our Commitments
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-gray-600">
            Beyond technical safeguards, we hold ourselves to clear principles.
          </p>

          <div className="mt-12 space-y-6">
            {/* Data Processing Agreement */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="text-base font-semibold text-gray-900">
                Data Processing Agreement
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Enterprise and business customers can request a Data Processing
                Agreement (DPA) that outlines how we handle your data, our
                obligations as a data processor, and your rights as a data
                controller. Contact us to receive a copy.
              </p>
              <div className="mt-4">
                <Link href="/contact">
                  <Button variant="outline" size="sm">
                    Request DPA
                  </Button>
                </Link>
              </div>
            </div>

            {/* Responsible AI */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="text-base font-semibold text-gray-900">
                Responsible AI
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                We do not sell facial data or biometric information to any third
                party. Your photos are never shared outside our platform. Our AI
                models are trained on diverse, ethically sourced datasets, and we
                continuously work to reduce bias in our outputs.
              </p>
            </div>

            {/* Vulnerability Reporting */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="text-base font-semibold text-gray-900">
                Vulnerability Reporting
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                If you discover a security vulnerability, please report it
                responsibly to{' '}
                <a
                  href="mailto:security@tailorpic.com"
                  className="font-medium text-tp-bronze-ink underline underline-offset-2"
                >
                  security@tailorpic.com
                </a>
                . We take every report seriously and will respond within 48
                hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Have Security Questions?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our team is happy to discuss our security practices in detail.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg">Contact Us</Button>
            </Link>
          </div>
          <p className="mt-8 text-xs text-tp-muted">
            Last updated: September 2026
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
