import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { Mail, MessageSquare, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with ${siteConfig.name}. We're here to help with questions about AI photo generation, orders, and more.`,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contact Us | ${siteConfig.name}`,
    description: `Have questions? Reach out to the ${siteConfig.name} team. We respond within hours.`,
    url: `${siteConfig.url}/contact`,
  },
};

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'For general inquiries and support',
    detail: siteConfig.supportEmail,
    href: `mailto:${siteConfig.supportEmail}`,
    linkLabel: 'Send Email',
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Chat with our team in real time',
    detail: 'Available on the dashboard',
    href: '/dashboard',
    linkLabel: 'Open Dashboard',
  },
  {
    icon: Clock,
    title: 'Response Time',
    description: 'We aim to respond quickly',
    detail: 'Within a few hours on business days',
    href: null,
    linkLabel: null,
  },
];

const faqs = [
  {
    q: 'How long does it take to get my photos?',
    a: 'Most orders are completed within 1-2 hours. Complex styles may take a bit longer.',
  },
  {
    q: 'Can I get a refund if I am not satisfied?',
    a: 'Yes! We offer a 100% money-back guarantee within 14 days of your order. No questions asked.',
  },
  {
    q: 'How many photos do I need to upload?',
    a: 'We recommend uploading between 6 and 20 clear photos of yourself for the best results. The more variety, the better.',
  },
  {
    q: 'What happens to my uploaded photos?',
    a: 'Your privacy is our priority. All uploaded photos are encrypted and automatically deleted 30 days after delivery. We never share your data with third parties.',
  },
  {
    q: 'Can I use the generated photos commercially?',
    a: 'Absolutely. You receive full commercial rights on every image we generate. Use them on LinkedIn, your website, business cards, or anywhere else.',
  },
  {
    q: 'Do you offer team or bulk pricing?',
    a: 'Yes! Our Team Headshots category is designed for businesses. Contact us for custom enterprise pricing for larger teams.',
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Contact', url: `${siteConfig.url}/contact` },
      ]} />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Get in{' '}
            <span className="bg-gradient-to-r from-tp-bronze-ink to-tp-bronze bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            Have a question, feedback, or need help with your order?
            We are here to help and typically respond within a few hours.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black">
                    <Icon className="h-6 w-6 text-tp-bronze" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{method.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{method.description}</p>
                  <p className="mt-3 text-sm font-medium text-tp-bronze-ink">{method.detail}</p>
                  {method.href && method.linkLabel && (
                    <Link
                      href={method.href}
                      className="mt-4 inline-block text-sm font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-bronze transition-colors"
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

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Find answers to common questions below. Still need help? Email us anytime.
          </p>
          <div className="mt-12 space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-gray-900">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">Ready to Create Your Photos?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Skip the wait and get AI-generated photos in hours.
          </p>
          <div className="mt-8">
            <Link
              href="/dashboard/upload"
              className="inline-flex items-center justify-center rounded-xl bg-tp-black px-8 py-3 text-sm font-semibold text-tp-bronze shadow-sm transition-all hover:bg-tp-black/90"
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
