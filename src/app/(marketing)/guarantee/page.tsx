import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ShieldCheck,
  Clock,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Mail,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '14-Day Money-Back Guarantee | TailorPic',
  description:
    'TailorPic offers a 14-day money-back guarantee on all purchases. Not satisfied with your AI headshots? Request a full refund within 14 days — no hassle.',
  alternates: { canonical: '/guarantee' },
  openGraph: {
    title: `14-Day Money-Back Guarantee | ${siteConfig.name}`,
    description:
      'Try TailorPic risk-free. If you are not happy with your AI headshots, request a full refund within 14 days of purchase.',
    url: `${siteConfig.url}/guarantee`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `14-Day Money-Back Guarantee | ${siteConfig.name}`,
    description:
      'Try TailorPic risk-free. If you are not happy with your AI headshots, request a full refund within 14 days of purchase.',
    images: [siteConfig.ogImage],
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const refundSteps = [
  {
    step: '1',
    icon: CreditCard,
    title: 'Contact Us',
    desc: 'Not satisfied? Send an email to support@tailorpic.com with the subject line "Refund Request" and include your order ID.',
  },
  {
    step: '2',
    icon: Clock,
    title: 'We Review Your Request',
    desc: 'Our team will review your request and confirm eligibility. We aim to respond within one business day.',
  },
  {
    step: '3',
    icon: CheckCircle,
    title: 'Refund Processed',
    desc: 'Once approved, your refund is processed to the original payment method. It typically appears within 5-10 business days.',
  },
];

const coveredItems = [
  'Full refund within 14 days of purchase',
  'Applies to all headshot packages',
  'No questions asked for first-time refund requests',
  'Refund issued to your original payment method',
];

const notCoveredItems = [
  {
    title: 'Credits partially or fully used',
    desc: 'If you have already used a portion of your purchased credits to generate headshots, those used credits are not eligible for a refund.',
  },
  {
    title: 'Requests made after 14 days',
    desc: 'Refund requests submitted more than 14 days after the original purchase date cannot be honored.',
  },
  {
    title: 'Account abuse or fraud',
    desc: 'Accounts flagged for abusive behavior, such as repeated refund requests across multiple accounts, are not eligible.',
  },
];

const faqItems = [
  {
    q: 'How do I request a refund?',
    a: `Email ${siteConfig.supportEmail} within 14 days of purchase with the subject line "Refund Request" and include your order ID. There is no form to fill out and no need to explain in detail.`,
  },
  {
    q: 'When will I get my money back?',
    a: 'Once we approve your request, the refund is sent to your original payment method. Depending on your bank or card issuer, it typically appears within 5-10 business days.',
  },
  {
    q: 'What if I have already downloaded my photos?',
    a: 'Downloading your photos does not stop you from asking. Contact us within 14 days of purchase and we will review your request under the terms on this page, including the note on used credits.',
  },
  {
    q: 'Can I get a partial refund?',
    a: 'Our guarantee covers a full refund within 14 days of purchase, provided credits have not been used. If you have used some credits, we evaluate partial refund requests on a case-by-case basis.',
  },
  {
    q: 'What if I purchased a team plan?',
    a: `Team and enterprise plans are also covered by our 14-day guarantee. Contact us at ${siteConfig.supportEmail} and we will work with you to resolve any concerns.`,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function GuaranteePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Money-Back Guarantee', url: `${siteConfig.url}/guarantee` },
        ]}
      />
      <FAQSchema
        items={faqItems.map((item) => ({ question: item.q, answer: item.a }))}
      />
      <Header />

      {/* ── Hero ── */}
      <section className="relative bg-tp-black py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C9A98A_0%,transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-tp-bronze/30 bg-tp-bronze/10">
            <ShieldCheck className="h-12 w-12 text-tp-bronze" strokeWidth={1.5} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-tp-bronze mb-4">
            Risk-Free Purchase
          </p>
          <h1 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            14-Day Money-Back Guarantee
          </h1>
          <p className="mt-5 text-lg text-tp-beige/70 max-w-2xl mx-auto leading-relaxed">
            Not satisfied? Contact us within 14 days for a full refund. No
            questions asked. Try TailorPic for a one-time $9.90 and know you
            are covered.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/auth/register"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-tp-bronze text-tp-black hover:bg-tp-bronze/90'
              )}
            >
              Try TailorPic Risk-Free <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-tp-beige/80 hover:text-white"
            >
              <Mail className="h-4 w-4" /> {siteConfig.supportEmail}
            </a>
          </div>
        </div>
      </section>

      {/* ── What's Covered ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
              Our Promise
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              What&apos;s Covered
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              Every purchase is protected by our 14-day money-back guarantee.
            </p>
          </div>
          <div className="mx-auto max-w-lg">
            <div className="rounded-tp-card border border-tp-line bg-white p-7">
              <ShieldCheck className="h-8 w-8 text-tp-bronze mb-4" />
              <h3 className="text-lg font-semibold text-tp-ink mb-3">
                Full Refund Guarantee
              </h3>
              <ul className="space-y-2.5">
                {coveredItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-tp-muted"
                  >
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── How to Request a Refund ── */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              How to Request a Refund
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              Three simple steps to get your money back.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {refundSteps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-tp-card bg-tp-black mb-4">
                  <s.icon className="h-6 w-6 text-tp-bronze" />
                </div>
                <h3 className="text-lg font-semibold text-tp-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's NOT Covered ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              What&apos;s Not Covered
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              To keep things fair for everyone, there are a few exceptions.
            </p>
          </div>
          <div className="mx-auto max-w-2xl space-y-4">
            {notCoveredItems.map((item) => (
              <div
                key={item.title}
                className="rounded-tp-card border border-tp-line bg-white p-6"
              >
                <h3 className="text-sm font-semibold text-tp-ink">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm text-tp-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="group rounded-tp-card border border-tp-line bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-semibold text-tp-ink">
                  {item.q}
                  <ChevronDown className="h-4 w-4 text-tp-muted transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-5 text-sm text-tp-muted leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-white">
            Start with Confidence
          </h2>
          <p className="mt-4 text-tp-beige/60">
            Your purchase is protected by our 14-day money-back guarantee. Try
            TailorPic risk-free today.
          </p>
          <div className="mt-8">
            <Link
              href="/auth/register"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-tp-bronze text-tp-black hover:bg-tp-bronze/90'
              )}
            >
              Get Started for $9.90 <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-sm text-tp-beige/50">
              One-time payment. 14-day money-back guarantee.{' '}
              <Link href="/pricing" className="underline underline-offset-2 hover:text-tp-beige">
                See pricing
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
