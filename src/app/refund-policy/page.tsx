import type { Metadata } from 'next';
import Link from 'next/link';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';

export const metadata: Metadata = {
  title: 'Refund & Satisfaction Policy — TailorPic',
  description:
    'Learn about TailorPic\'s satisfaction guarantee, regeneration policy, and refund terms.',
  openGraph: generateOGMetadata({
    title: 'Refund & Satisfaction Policy — TailorPic',
    description:
      'Learn about TailorPic\'s satisfaction guarantee, regeneration policy, and refund terms.',
    path: '/refund-policy',
  }),
  twitter: generateTwitterMetadata({
    title: 'Refund & Satisfaction Policy — TailorPic',
    description:
      'Learn about TailorPic\'s satisfaction guarantee, regeneration policy, and refund terms.',
  }),
  alternates: { canonical: '/refund-policy' },
};

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <h1 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
          Refund &amp; Satisfaction Policy
        </h1>
        <p className="mt-4 text-sm text-tp-muted">
          Last updated: October 8, 2026
        </p>

        <div className="prose-tp mt-10 space-y-8 text-sm leading-relaxed text-tp-muted [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-tp-ink [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-tp-ink [&_strong]:text-tp-ink [&_a]:text-tp-bronze-ink [&_a]:underline">

          <h2>Satisfaction Guarantee</h2>
          <p>
            We are committed to delivering studio-quality results. If you are not satisfied
            with your AI-generated headshots, we offer the following remedies:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Regeneration at no extra cost:</strong> You may regenerate photos within
              your purchased package as many times as needed until you are satisfied.
            </li>
            <li>
              <strong>Dedicated support:</strong> If the results do not meet your expectations
              after regeneration, contact our support team at{' '}
              <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a> and
              we will work with you to resolve the issue.
            </li>
            <li>
              <strong>Technical failures:</strong> If we are unable to deliver any results due
              to a confirmed technical failure on our side, we will re-process your order at no
              additional cost.
            </li>
          </ul>

          <h2>Refund Terms</h2>
          <p>
            TailorPic provides a personalized digital service. AI photo generation begins
            immediately upon purchase at your express request, as confirmed during checkout.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>No refunds after processing begins:</strong> Once AI processing has
              started (which occurs immediately after payment), no monetary refund,
              chargeback, credit, or compensation will be issued. This applies regardless of
              the reason, including dissatisfaction with results, change of mind, or accidental
              purchase.
            </li>
            <li>
              <strong>Right of withdrawal waiver:</strong> By confirming your purchase, you
              expressly request that processing begins immediately and acknowledge the loss of
              your right of withdrawal, in accordance with applicable consumer protection laws
              (including EU Directive 2011/83/EU, Article 16(a)).
            </li>
            <li>
              <strong>AI output variability:</strong> AI-generated photos are produced through
              automated algorithms. Results may vary and are not guaranteed to match specific
              expectations. This variability is inherent to the service and does not constitute
              a defect.
            </li>
          </ul>

          <h2>Your Remedies at a Glance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-tp-line">
                  <th className="pb-3 pr-4 font-semibold text-tp-ink">Situation</th>
                  <th className="pb-3 font-semibold text-tp-ink">What We Offer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tp-line">
                <tr>
                  <td className="py-3 pr-4">Not happy with results</td>
                  <td className="py-3">Unlimited regeneration within your package</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Still unsatisfied after regeneration</td>
                  <td className="py-3">Dedicated support to find a resolution</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Technical failure on our side</td>
                  <td className="py-3">Free re-processing of your order</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Change of mind / accidental purchase</td>
                  <td className="py-3">No refund once processing has begun</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Contact Us</h2>
          <p>
            For any questions about this policy or to request assistance with your order,
            email us at{' '}
            <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.
            We aim to respond within one business day.
          </p>
          <p>
            For the complete legal terms, see our{' '}
            <Link href="/terms">Terms of Service</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
