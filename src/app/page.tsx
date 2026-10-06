import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import dynamic from 'next/dynamic';
import { Header } from '@/components/marketing/header';
import { Hero } from '@/components/marketing/hero';
import { Categories } from '@/components/marketing/categories';
import { faqs } from '@/config/faqs';
import { Footer } from '@/components/marketing/footer';
import { WebsiteSchema, FAQSchema, SoftwareApplicationSchema, HowToSchema } from '@/components/structured-data';

export const metadata: Metadata = {
  title: 'TailorPic — AI Headshots & Professional Photos | From $1.99',
  description:
    'Get studio-quality AI headshots in minutes. Multiple styles for business, LinkedIn & creative use. From $1.99.',
  openGraph: generateOGMetadata({ title: 'TailorPic — AI Headshots & Professional Photos | From $1.99', description:
      'Upload a few selfies, get studio-quality AI headshots. Professional, creative & business styles.', path: '/' }),
  twitter: generateTwitterMetadata({ title: 'TailorPic — AI Headshots & Professional Photos | From $1.99', description:
      'Upload a few selfies, get studio-quality AI headshots. Starting at $1.99.' }),
  alternates: { canonical: 'https://www.tailorpic.com' },
};

function SectionSkeleton({ height }: { height: string }) {
  return (
    <div aria-hidden="true" className={`${height}`} />
  );
}

import StudioComparisonV2 from '@/components/marketing/studio-comparison-v2';

// Below-the-fold sections: lazy load for performance
const SocialProofBar = dynamic(
  () => import('@/components/marketing/social-proof-bar').then((m) => m.SocialProofBar),
  { loading: () => <SectionSkeleton height="h-[100px] sm:h-[120px]" /> }
);
const WhyTailorPic = dynamic(
  () => import('@/components/marketing/why-tailorpic').then((m) => m.WhyTailorPic),
  { loading: () => <SectionSkeleton height="h-[720px] md:h-[480px]" /> }
);
const StyleConfigurator = dynamic(
  () => import('@/components/marketing/style-configurator').then((m) => m.StyleConfigurator),
  { loading: () => <SectionSkeleton height="h-[600px] md:h-[500px]" /> }
);
const BeforeAfterShowcase = dynamic(
  () => import('@/components/marketing/before-after-showcase').then((m) => m.BeforeAfterShowcase),
  { loading: () => <SectionSkeleton height="h-[500px] md:h-[400px]" /> }
);
const SpeedComparison = dynamic(
  () => import('@/components/marketing/speed-comparison').then((m) => m.SpeedComparison),
  { loading: () => <SectionSkeleton height="h-[620px] md:h-[500px]" /> }
);
const SavingsCalculator = dynamic(
  () => import('@/components/marketing/savings-calculator').then((m) => m.SavingsCalculator),
  { loading: () => <SectionSkeleton height="h-[600px] md:h-[500px]" /> }
);
const HowItWorks = dynamic(
  () => import('@/components/marketing/how-it-works').then((m) => m.HowItWorks),
  { loading: () => <SectionSkeleton height="h-[600px] md:h-[400px]" /> }
);
const PhotoPrepGuide = dynamic(() => import('@/components/marketing/photo-prep-guide'), {
  loading: () => <SectionSkeleton height="h-[400px]" />,
});
const PackageQuiz = dynamic(() => import('@/components/marketing/package-quiz'), {
  loading: () => <SectionSkeleton height="h-[500px]" />,
  ssr: false,
});
const StatsCounter = dynamic(
  () => import('@/components/marketing/stats-counter').then((m) => m.StatsCounter),
  { loading: () => <SectionSkeleton height="h-[200px] sm:h-[240px]" /> }
);
const Pricing = dynamic(
  () => import('@/components/marketing/pricing').then((m) => m.Pricing),
  { loading: () => <SectionSkeleton height="h-[800px] md:h-[600px]" /> }
);
const TrustBadges = dynamic(
  () => import('@/components/marketing/trust-badges').then((m) => m.TrustBadges),
  { loading: () => <SectionSkeleton height="h-[200px]" /> }
);
const CompanyLogos = dynamic(
  () => import('@/components/marketing/company-logos').then((m) => m.CompanyLogos),
  { loading: () => <SectionSkeleton height="h-[120px]" /> }
);
const GuaranteeSection = dynamic(
  () => import('@/components/marketing/guarantee-section').then((m) => m.GuaranteeSection),
  { loading: () => <SectionSkeleton height="h-[400px] md:h-[320px]" /> }
);
const PrivacySection = dynamic(
  () => import('@/components/marketing/privacy-section').then((m) => m.PrivacySection),
  { loading: () => <SectionSkeleton height="h-[520px] md:h-[400px]" /> }
);
const FAQ = dynamic(
  () => import('@/components/marketing/faq').then((m) => m.FAQ),
  { loading: () => <SectionSkeleton height="h-[560px]" /> }
);
const CTABanner = dynamic(
  () => import('@/components/marketing/cta-banner').then((m) => m.CTABanner),
  { loading: () => <SectionSkeleton height="h-64" /> }
);
const UseCaseChips = dynamic(
  () => import('@/components/marketing/use-case-chips').then((m) => m.UseCaseChips),
  { loading: () => <SectionSkeleton height="h-[100px]" /> }
);
// Fixed-position mobile bar: no skeleton needed
const StickyCTA = dynamic(
  () => import('@/components/marketing/sticky-cta').then((m) => m.StickyCTA)
);

export default function LandingPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <WebsiteSchema />
      <FAQSchema items={faqs} />
      <SoftwareApplicationSchema />
      <HowToSchema />

      {/* 1. Header */}
      <Header />

      {/* 2. Hero — premium editorial image + 2 CTAs */}
      <Hero />

      {/* 3. Social Proof Bar — immediately after hero */}
      <SocialProofBar />

      {/* 3.5. Before / After Comparison — proof right after hero */}
      <BeforeAfterShowcase />

      {/* 4. Why TailorPic — differentiators early */}
      <WhyTailorPic />

      {/* 5. Quick Photo Type Chooser — 12 categories grouped */}
      <Categories />

      {/* 5.5. Use Case Chips — quick navigation by need */}
      <UseCaseChips />

      {/* 6. Style & Customization Preview */}
      <StyleConfigurator />

      {/* 7.5. Studio Comparison — AI vs Traditional */}
      <StudioComparisonV2 />

      {/* 8. Speed Comparison */}
      <SpeedComparison />

      {/* 9. Savings Calculator — cost argument reinforced */}
      <SavingsCalculator />

      {/* 10. How It Works */}
      <HowItWorks />

      {/* 10.2. Photo Prep Guide — how to prepare photos */}
      <PhotoPrepGuide />

      {/* 10.5. Stats at a Glance — animated counters */}
      <StatsCounter />

      {/* 10.8. Package Quiz — recommendation before plans */}
      <PackageQuiz />

      {/* 11. Pricing Overview */}
      <Pricing />

      {/* 11. Satisfaction Guarantee */}
      <GuaranteeSection />

      {/* 12. Trust & Integrations */}
      <TrustBadges />
      <CompanyLogos />

      {/* 12. Privacy & Security */}
      <PrivacySection />

      {/* 13. FAQ Preview */}
      <FAQ />

      {/* 14. Newsletter / Final CTA */}
      <CTABanner />

      {/* 15. Mobile sticky CTA (fixed bottom bar) */}
      <StickyCTA />

      {/* 16. Footer */}
      <Footer />
    </main>
  );
}
