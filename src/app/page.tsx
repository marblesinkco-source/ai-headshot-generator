import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import dynamic from 'next/dynamic';
import { Header } from '@/components/marketing/header';
import { Hero } from '@/components/marketing/hero';
import { BeforeAfterShowcase } from '@/components/marketing/before-after-showcase';
import { Categories } from '@/components/marketing/categories';
import { faqs } from '@/config/faqs';
import { Footer } from '@/components/marketing/footer';
import { WebsiteSchema, FAQSchema, SoftwareApplicationSchema } from '@/components/structured-data';

export const metadata: Metadata = {
  title: 'TailorPic — AI Headshots & Professional Photos | From $1.99',
  description:
    'Get studio-quality AI headshots in minutes. Multiple styles for business, LinkedIn & creative use. From $1.99.',
  openGraph: generateOGMetadata({ title: 'TailorPic — AI Headshots & Professional Photos | From $1.99', description:
      'Upload a few selfies, get studio-quality AI headshots. Professional, creative & business styles.', path: '/' }),
  twitter: generateTwitterMetadata({ title: 'TailorPic — AI Headshots & Professional Photos | From $1.99', description:
      'Upload a few selfies, get studio-quality AI headshots. Starting at $1.99.' }),
  alternates: { canonical: '/' },
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
const VsStudio = dynamic(
  () => import('@/components/marketing/vs-studio').then((m) => m.VsStudio),
  { loading: () => <SectionSkeleton height="h-[600px] md:h-[500px]" /> }
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
const ScrollProgress = dynamic(
  () => import('@/components/marketing/scroll-progress').then((m) => m.ScrollProgress)
);
const AnimatedStats = dynamic(
  () => import('@/components/marketing/animated-stats').then((m) => m.AnimatedStats),
  { loading: () => <SectionSkeleton height="h-[200px] sm:h-[240px]" /> }
);

export default function LandingPage() {
  return (
    <>
    <ScrollProgress />
    <Header />
    <main id="main-content" className="min-h-screen">
      <WebsiteSchema />
      <FAQSchema items={faqs} />
      <SoftwareApplicationSchema />

      {/* 2. Hero */}
      <Hero />

      {/* 3. Before / After Showcase */}
      <BeforeAfterShowcase />

      {/* 3.5. Animated Stats */}
      <AnimatedStats />

      {/* 4. How It Works */}
      <HowItWorks />

      {/* 5. Categories */}
      <Categories />

      {/* 5.5. TailorPic vs Studio Comparison */}
      <div className="mx-auto max-w-4xl px-8" aria-hidden="true"><div className="gold-line" /></div>
      <VsStudio />

      {/* Section divider */}
      <div className="mx-auto max-w-4xl px-8" aria-hidden="true"><div className="gold-line" /></div>

      {/* 6. Pricing */}
      <Pricing />

      {/* 7. Social Proof Bar */}
      <SocialProofBar />

      {/* 8. Guarantee + Trust */}
      <GuaranteeSection />
      <TrustBadges />

      {/* Section divider */}
      <div className="mx-auto max-w-4xl px-8" aria-hidden="true"><div className="gold-line" /></div>

      {/* 9. Review Platforms */}
      <ReviewPlatforms />

      {/* 10. FAQ */}
      <FAQ />

      {/* 11. Final CTA */}
      <CTABanner />

      {/* 12. Sticky CTA (fixed bottom bar) */}
      <StickyCTA />

    </main>
    {/* 13. Footer */}
    <Footer />
    </>
  );
}
