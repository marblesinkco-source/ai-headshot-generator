import type { Metadata } from 'next';
import Link from 'next/link';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: 'Refund & Satisfaction Policy | TailorPic' },
  description:
    'Learn about TailorPic\'s quality commitment, regeneration policy, and refund terms.',
  openGraph: generateOGMetadata({
    title: 'Refund & Satisfaction Policy | TailorPic',
    description:
      'Learn about TailorPic\'s quality commitment, regeneration policy, and refund terms.',
    path: '/refund-policy',
  }),
  twitter: generateTwitterMetadata({
    title: 'Refund & Satisfaction Policy | TailorPic',
    description:
      'Learn about TailorPic\'s quality commitment, regeneration policy, and refund terms.',
  }),
  alternates: { canonical: '/refund-policy' },
};

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.tailorpic.com' },
          { name: 'Refund Policy', url: 'https://www.tailorpic.com/refund-policy' },
        ]}
      />
      <main
        id="main-content"
        className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <h1 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
          Refund &amp; Satisfaction Policy
        </h1>
        <p className="mt-4 text-sm text-tp-muted">
          Last updated: October 21, 2026
        </p>

        <div className="prose-tp mt-10 space-y-8 text-sm leading-relaxed text-tp-muted [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-tp-ink [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-tp-ink [&_strong]:text-tp-ink [&_a]:text-tp-bronze-ink [&_a]:underline">

          <h2>Quality Commitment</h2>
          <p>
            We are committed to delivering studio-quality results. If you are not satisfied
            with your AI-generated headshots, the following remedies are available:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>One (1) complimentary retry:</strong> If you are not satisfied with your
              initial results, you are entitled to exactly one (1) free regeneration using your
              original uploaded photos. This retry is your sole and exclusive remedy.
            </li>
            <li>
              <strong>Dedicated support:</strong> You may contact our support team at{' '}
              <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a> for
              assistance. Support does not include monetary refunds.
            </li>
            <li>
              <strong>Technical failures:</strong> Free re-processing is provided only for
              confirmed technical failures on TailorPic&apos;s side.
            </li>
          </ul>

          <h2>Refund Terms</h2>
          <p>
            TailorPic provides a personalized digital service. AI photo generation begins
            immediately upon purchase at your express request, as confirmed during checkout.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>No refunds, no chargebacks, no credits, no monetary compensation:</strong>{' '}
              Processing begins immediately upon payment. Once processing begins, no refund,
              chargeback, credit, or monetary compensation of any kind will be issued, regardless
              of the reason, including change of mind or accidental purchase.
            </li>
            <li>
              <strong>One free retry is the only remedy:</strong> The one (1) complimentary retry
              described above is the only remedy available.
            </li>
            <li>
              <strong>Dissatisfaction is not grounds for a refund:</strong> Dissatisfaction with
              AI-generated results is not grounds for a refund.
            </li>
            <li>
              <strong>Chargebacks:</strong> Any chargeback initiated after agreeing to these
              terms may result in account suspension and collection of associated fees.
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
          <div className="relative overflow-x-auto">
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
                  <td className="py-3">One (1) complimentary retry — your sole remedy</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Technical failure on our side</td>
                  <td className="py-3">Free re-processing</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Change of mind / accidental purchase</td>
                  <td className="py-3">No refund — processing begins immediately</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">After your free retry</td>
                  <td className="py-3">Dedicated support (no monetary refunds)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Chargeback Policy</h2>
          <p>
            By completing a purchase, you confirm that you have read and agreed to these terms,
            including the immediate start of processing and the absence of refunds.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Unauthorized chargebacks may result in account termination.</li>
            <li>
              TailorPic reserves the right to dispute any chargeback and to recover associated
              fees.
            </li>
          </ul>

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
