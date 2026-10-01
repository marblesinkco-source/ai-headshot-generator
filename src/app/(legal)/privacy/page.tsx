import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'TailorPic privacy policy — how we collect, use, and protect your data.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy',
    description:
      'TailorPic privacy policy — how we collect, use, and protect your data.',
    url: `${siteConfig.url}/privacy`,
    siteName: siteConfig.name,
    type: 'website',
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy',
    description:
      'TailorPic privacy policy — how we collect, use, and protect your data.',
    images: [siteConfig.ogImage],
  },
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-gray max-w-none">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Privacy Policy', url: `${siteConfig.url}/privacy` },
        ]}
      />
      <h1>Privacy Policy</h1>
      <p className="lead">Last updated: September 30, 2026</p>

      <p>
        TailorPic (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
        This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
        use our AI-powered photo generation service.
      </p>

      <h2>1. Information We Collect</h2>

      <h3>Personal Information</h3>
      <ul>
        <li><strong>Account Information:</strong> Name, email address, and password when you create an account.</li>
        <li><strong>Payment Information:</strong> Processed securely through Stripe. We do not store your credit card details.</li>
        <li><strong>Photos:</strong> Images you upload for AI processing.</li>
      </ul>

      <h3>Automatically Collected Information</h3>
      <ul>
        <li>IP address and browser type</li>
        <li>Device information and operating system</li>
        <li>Usage data and page interactions</li>
        <li>Cookies and similar tracking technologies</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To provide and maintain our AI photo generation service</li>
        <li>To process your orders and payments</li>
        <li>To train AI models on your uploaded photos (solely for generating your requested outputs)</li>
        <li>To send transactional emails (order confirmations, delivery notifications)</li>
        <li>To improve our service and user experience</li>
        <li>To respond to your inquiries and support requests</li>
      </ul>

      <h2>3. Photo Data & AI Processing</h2>
      <p>
        Your uploaded photos are used exclusively to generate the AI-powered images you request.
        We process your photos through third-party AI services (Replicate) to train temporary models
        that create your custom images. After processing:
      </p>
      <ul>
        <li>Training data and temporary models are deleted within 30 days of order completion</li>
        <li>Generated images are stored in your account until you delete them</li>
        <li>We do not use your photos to train general-purpose AI models</li>
        <li>We do not sell or share your photos with third parties for their own purposes</li>
      </ul>

      <h2>4. Third-Party Services</h2>
      <p>We use the following third-party services:</p>
      <ul>
        <li><strong>Supabase:</strong> Authentication and data storage</li>
        <li><strong>Stripe:</strong> Payment processing</li>
        <li><strong>Replicate:</strong> AI model training and inference</li>
        <li><strong>Resend:</strong> Transactional emails</li>
        <li><strong>Vercel:</strong> Hosting and content delivery</li>
      </ul>
      <p>Each service has its own privacy policy governing the use of your data.</p>

      <h2>5. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your data, including
        encryption in transit (TLS/SSL), secure authentication, and access controls. However, no method
        of electronic transmission or storage is 100% secure.
      </p>

      <h2>6. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your personal information</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion of your data and account</li>
        <li>Export your generated images</li>
        <li>Opt out of marketing communications</li>
      </ul>

      <h2>7. Data Retention</h2>
      <p>
        We retain your account information as long as your account is active. Uploaded photos used for
        AI training are deleted within 30 days of order completion. Generated images remain available
        until you delete them or close your account.
      </p>

      <h2>8. Children&apos;s Privacy</h2>
      <p>
        Our service is not intended for children under 13 years of age. We do not knowingly collect
        personal information from children under 13.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any changes by
        posting the new policy on this page and updating the &quot;Last updated&quot; date.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, please contact us at{' '}
        <a href="mailto:support@tailorpic.com">support@tailorpic.com</a>.
      </p>
    </article>
  );
}
