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

// Below-the-fold sections: lazy load for performance
const SocialProofBar = dynamic(
  () => import('@/components/marketing/social-proof-bar').then((m) => m.SocialProofBar),
  { loading: () => <SectionSkeleton height="h-[100px] sm:h-[120px]" /> }
);
const BeforeAfterShowcase = dynamic(
  () => import('@/components/marketing/before-after-showcase').then((m) => m.BeforeAfterShowcase),
  { loading: () => <SectionSkeleton height="h-[500px] md:h-[400px]" /> }
);
const HowItWorks = dynamic(
  () => import('@/components/marketing/how-it-works').then((m) => m.HowItWorks),
  { loading: () => <SectionSkeleton height="h-[600px] md:h-[400px]" /> }
);
const Pricing = dynamic(
  () => import('@/components/marketing/pricing').then((m) => m.Pricing),
  { loading: () => <SectionSkeleton height="h-[800px] md:h-[600px]" /> }
);
const ReviewPlatforms = dynamic(
  () => import('@/components/marketing/review-platforms').then((m) => m.ReviewPlatforms),
  { loading: () => <SectionSkeleton height="h-[140px]" /> }
);
const GuaranteeSection = dynamic(
  () => import('@/components/marketing/guarantee-section').then((m) => m.GuaranteeSection),
  { loading: () => <SectionSkeleton height="h-[400px] md:h-[320px]" /> }
);
const TrustBadges = dynamic(
  () => import('@/components/marketing/trust-badges').then((m) => m.TrustBadges),
  { loading: () => <SectionSkeleton height="h-[200px]" /> }
);
const FAQ = dynamic(
  () => import('@/components/marketing/faq').then((m) => m.FAQ),
  { loading: () => <SectionSkeleton height="h-[560px]" /> }
);
const CTABanner = dynamic(
  () => import('@/components/marketing/cta-banner').then((m) => m.CTABanner),
  { loading: () => <SectionSkeleton height="h-64" /> }
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

      {/* 2. Hero */}
      <Hero />

      {/* 3. Social Proof Bar */}
      <SocialProofBar />

      {/* 4. Before / After Showcase */}
      <BeforeAfterShowcase />

      {/* 5. How It Works */}
      <HowItWorks />

      {/* 6. Categories */}
      <Categories />

      {/* 7. Pricing */}
      <Pricing />

      {/* 8. Review Platforms */}
      <ReviewPlatforms />

      {/* 9. Guarantee + Trust */}
      <GuaranteeSection />
      <TrustBadges />

      {/* 10. FAQ */}
      <FAQ />

      {/* 11. Final CTA */}
      <CTABanner />

      {/* 12. Sticky CTA (fixed bottom bar) */}
      <StickyCTA />

      {/* 13. Footer */}
      <Footer />
    </main>
  );
}
