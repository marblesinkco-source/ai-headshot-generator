import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { ShieldCheck, Clock, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Refund Policy | TailorPic',
  description:
    'Our 14-day money-back guarantee ensures you love your AI-generated photos. Learn about our hassle-free refund process.',
  alternates: { canonical: '/refund-policy' },
  openGraph: {
    title: 'Refund Policy | TailorPic',
    description:
      'Our 14-day money-back guarantee ensures you love your AI-generated photos.',
    url: `${siteConfig.url}/refund-policy`,
  },
};

const faqs = [
  {
    question: 'What if I am only partially satisfied with my photos?',
    answer:
      'If some photos did not meet your expectations, contact us and we will work with you to regenerate them at no extra cost. If you are still not satisfied, you can request a full refund within the 14-day window.',
  },
  {
    question: 'Can I get a refund after 14 days?',
    answer:
      'Refund requests made after 14 days are reviewed on a case-by-case basis. We aim to be fair in every situation, so please reach out and we will do our best to help.',
  },
  {
    question: 'How will I receive my refund?',
    answer:
      'Refunds are issued to the original payment method used at checkout. Credit card refunds typically appear within 5-7 business days, though your bank may take additional time to process.',
  },
  {
    question: 'Do I need to delete my photos to get a refund?',
    answer:
      'No, you do not need to delete your photos to request a refund. However, our refund policy does not cover photos that have already been downloaded and used commercially.',
  },
];

export default function RefundPolicyPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-tp-card bg-tp-black">
            <ShieldCheck className="h-8 w-8 text-tp-bronze" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-tp-ink sm:text-5xl">
            Our Refund Policy
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-muted">
            We stand behind every photo. If you are not completely satisfied,
            we will make it right.
          </p>
        </div>
      </section>

      {/* Policy Details */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {/* 14-Day Guarantee */}
            <div className="rounded-tp-card border border-tp-line bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black">
                <ShieldCheck className="h-6 w-6 text-tp-bronze" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-tp-ink">
                14-Day Money-Back Guarantee
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                Not satisfied with your AI-generated photos? Request a full
                refund within 14 days of your purchase. No questions asked, no
                hoops to jump through.
              </p>
            </div>

            {/* How to Request */}
            <div className="rounded-tp-card border border-tp-line bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black">
                <Mail className="h-6 w-6 text-tp-bronze" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-tp-ink">
                How to Request a Refund
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                Simply email us at{' '}
                <a
                  href="mailto:support@tailorpic.com"
                  className="font-medium text-tp-bronze-ink underline underline-offset-2"
                >
                  support@tailorpic.com
                </a>{' '}
                with your order number and the reason for your request. Our team
                will take care of the rest.
              </p>
            </div>

            {/* Processing Time */}
            <div className="rounded-tp-card border border-tp-line bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black">
                <Clock className="h-6 w-6 text-tp-bronze" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-tp-ink">
                Processing Time
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                Refunds are processed within 5-7 business days after approval.
                You will receive an email confirmation once the refund has been
                issued to your original payment method.
              </p>
            </div>

            {/* What's Covered */}
            <div className="rounded-tp-card border border-tp-line bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black">
                <ArrowRight className="h-6 w-6 text-tp-bronze" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-tp-ink">
                Coverage & Exceptions
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-tp-muted">
                <div>
                  <p className="font-medium text-tp-ink">What is covered:</p>
                  <p>All photo packages purchased through TailorPic.</p>
                </div>
                <div>
                  <p className="font-medium text-tp-ink">Exceptions:</p>
                  <p>
                    Photos that have already been downloaded and used
                    commercially are not eligible for a refund.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-tp-line bg-tp-paper py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-tp-ink">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-tp-muted">
            Common questions about our refund process.
          </p>
          <div className="mt-12 space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-tp-card border border-tp-line bg-white p-6"
              >
                <h3 className="text-base font-semibold text-tp-ink">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-tp-ink">
            Questions? Contact Us
          </h2>
          <p className="mt-4 text-lg text-tp-muted">
            Our support team is here to help with any questions about refunds or
            your order.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
