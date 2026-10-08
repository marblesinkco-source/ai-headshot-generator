import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';

export const metadata: Metadata = {
  title: { absolute: 'Terms of Service: Rules for Using the TailorPic Platform' },
  description: 'Read the TailorPic terms of service: the rules and guidelines for using our AI photo platform. Please review them before you create an account or order.',
  alternates: { canonical: '/terms' },
  openGraph: generateOGMetadata({ title: 'Terms of Service: Rules for Using the TailorPic Platform', description: 
      'Read the TailorPic terms of service: the rules and guidelines for using our AI photo platform. Please review them before you create an account or order.', path: '/terms' }),
  twitter: generateTwitterMetadata({ title: 'Terms of Service: Rules for Using the TailorPic Platform', description: 
      'Read the TailorPic terms of service: the rules and guidelines for using our AI photo platform. Please review them before you create an account or order.' }),
};

export default function TermsPage() {
  return (
    <article className="prose max-w-none text-tp-muted prose-headings:text-tp-ink prose-a:text-tp-bronze-ink prose-strong:text-tp-ink">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Terms of Service: Rules for Using the TailorPic Platform', url: `${siteConfig.url}/terms` },
        ]}
      />
      <h1>Terms of Service</h1>
      <p className="lead">Last updated: October 7, 2026</p>

      <p>
        These Terms of Service (&quot;Terms&quot;) govern your use of TailorPic (&quot;Service&quot;),
        operated by TailorPic (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing or using
        our Service, you agree to be bound by these Terms.
      </p>

      <h2>1. Service Description</h2>
      <p>
        TailorPic is an AI-powered photo generation platform that creates professional photos,
        headshots, portraits, and other visual content based on images you upload. Our service uses
        artificial intelligence to generate customized outputs across multiple categories.
      </p>

      <h2>2. Account Registration</h2>
      <ul>
        <li>You must be at least 18 years old to use this Service.</li>
        <li>You are responsible for maintaining the security of your account credentials.</li>
        <li>You must provide accurate and complete information during registration.</li>
        <li>One person may not maintain more than one account.</li>
      </ul>

      <h2>3. Acceptable Use</h2>
      <p>You agree NOT to:</p>
      <ul>
        <li>Upload photos of people without their consent</li>
        <li>Generate content that is illegal, harmful, or violates others&apos; rights</li>
        <li>Create deepfakes or misleading content intended to deceive</li>
        <li>Use the Service for harassment, fraud, or any unlawful purpose</li>
        <li>Attempt to reverse-engineer our AI models or systems</li>
        <li>Resell or redistribute generated content as a competing service</li>
        <li>Upload content that contains malware or harmful code</li>
      </ul>

      <h2>4. Orders & Payments</h2>
      <ul>
        <li>All prices are listed in USD unless otherwise stated.</li>
        <li>Payment is required before AI processing begins.</li>
        <li>Payments are processed securely through Stripe.</li>
        <li>Prices may change at any time; existing orders are honored at their purchase price.</li>
      </ul>

      <h2>5. Quality Commitment</h2>
      <p>
        We are committed to delivering studio-quality results. If you are not satisfied with your AI-generated headshots:
      </p>
      <ul>
        <li><strong>Regeneration:</strong> You may regenerate photos within your purchased package at no additional cost.</li>
        <li><strong>Quality issues:</strong> If generated results are significantly below expected quality, contact our support team and we will work with you to resolve the issue.</li>
        <li><strong>Technical failures:</strong> If we are unable to deliver results due to technical issues on our end, we will re-process your order at no cost.</li>
      </ul>
      <p>
        For any concerns about your order, contact us at{' '}
        <a href="mailto:support@tailorpic.com">support@tailorpic.com</a>.
      </p>

      <h2>6. Refund Policy & Right of Withdrawal</h2>
      <p>
        TailorPic provides a personalized digital service. AI photo generation is initiated immediately
        upon purchase at your express request, as confirmed by the consent checkbox during checkout.
      </p>
      <ul>
        <li>
          <strong>Right of withdrawal waiver:</strong> By confirming your purchase, you expressly request
          that AI processing begins immediately and acknowledge that you lose your right of withdrawal /
          cooling-off period once processing has commenced, in accordance with EU Consumer Rights Directive
          2011/83/EU, Article 16(a), and equivalent applicable laws.
        </li>
        <li>
          <strong>No refunds after processing begins:</strong> Once AI processing has started (which occurs
          immediately after payment), no refund, chargeback, credit, or compensation will be issued,
          regardless of the reason — including but not limited to dissatisfaction with AI-generated results,
          internet or service interruption, browser or device malfunction, session timeout, accidental purchase,
          change of mind, or any other technical or personal circumstance.
        </li>
        <li>
          <strong>AI output variability:</strong> AI-generated photos are produced through automated,
          personalized algorithms. Results may vary and are not guaranteed to match specific expectations.
          Output variability is inherent to the service and does not constitute a defect or ground for refund.
        </li>
        <li>
          <strong>Technical failures on our end:</strong> If we are unable to deliver any results due to a
          confirmed technical failure solely on our side (not related to your internet connection, browser,
          or device), we will re-process your order at no additional cost. This is the sole remedy available.
        </li>
        <li>
          <strong>Chargebacks:</strong> Filing a fraudulent chargeback after expressly consenting to
          immediate processing constitutes a breach of these Terms and may result in account suspension
          and pursuit of the disputed amount.
        </li>
      </ul>

      <h2>7. Intellectual Property</h2>
      <h3>Your Content</h3>
      <p>
        You retain ownership of the photos you upload. By uploading, you grant us a limited license
        to process these photos solely for generating your requested outputs.
      </p>
      <h3>Generated Content</h3>
      <p>
        You own the AI-generated images created from your order. You may use them for personal and
        commercial purposes, including social media profiles, business websites, and marketing materials.
      </p>
      <h3>Our Service</h3>
      <p>
        The Service, including its design, code, AI models, and branding, remains our intellectual property.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, TailorPic shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages arising from your use of the Service.
        Our total liability shall not exceed the amount you paid for the specific order in question.
      </p>

      <h2>9. Service Availability</h2>
      <p>
        We strive for high availability but do not guarantee uninterrupted access. We may modify,
        suspend, or discontinue the Service at any time with reasonable notice. Scheduled maintenance
        will be communicated in advance when possible.
      </p>

      <h2>10. Account Termination</h2>
      <p>
        We may suspend or terminate your account if you violate these Terms. You may delete your
        account at any time through your dashboard settings. Upon termination, your data will be
        deleted in accordance with our Privacy Policy.
      </p>

      <h2>11. Changes to Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the Service after changes
        constitutes acceptance. We will notify users of material changes via email or in-app notification.
      </p>

      <h2>12. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with applicable laws, without
        regard to conflict of law principles.
      </p>

      <h2>13. Contact</h2>
      <p>
        For questions about these Terms, please contact us at{' '}
        <a href="mailto:support@tailorpic.com">support@tailorpic.com</a>.
      </p>
    </article>
  );
}
