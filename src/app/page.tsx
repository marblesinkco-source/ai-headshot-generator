import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import dynamic from 'next/dynamic';
import { Header } from '@/components/marketing/header';
import { Hero } from '@/components/marketing/hero';
import { SocialProofBar } from '@/components/marketing/social-proof-bar';
import { TrustStrip } from '@/components/marketing/trust-strip';
import { TrustBadges } from '@/components/marketing/trust-badges';
import { CompanyLogos } from '@/components/marketing/company-logos';
import { Categories } from '@/components/marketing/categories';
import { HowItWorks } from '@/components/marketing/how-it-works';
import { PrivacySection } from '@/components/marketing/privacy-section';
import { Pricing } from '@/components/marketing/pricing';
import { faqs } from '@/config/faqs';
import { Footer } from '@/components/marketing/footer';
import { StickyCTA } from '@/components/marketing/sticky-cta';
import { WebsiteSchema, FAQSchema, SoftwareApplicationSchema, HowToSchema } from '@/components/structured-data';
import { BeforeAfterShowcase } from '@/components/marketing/before-after-showcase';
import { DeliveryGuarantee } from '@/components/marketing/delivery-guarantee';
import { UseCaseChips } from '@/components/marketing/use-case-chips';
import { PhotoPrepGuide } from '@/components/marketing/photo-prep-guide';
import { GuaranteeStrip } from '@/components/marketing/guarantee-strip';

export const metadata: Metadata = {
  title: 'TailorPic — AI Headshots & Professional Photos | From $1.99',
  description:
    'Get studio-quality AI headshots in under 2 hours. Multiple styles for business, LinkedIn & creative use. Fast delivery, 14-day money-back guarantee. From $1.99.',
  openGraph: generateOGMetadata({ title: 'TailorPic — AI Headshots & Professional Photos | From $1.99', description: 
      'Upload a few selfies, get studio-quality AI headshots in under 2 hours. Professional, creative & business styles. 14-day money-back guarantee.', path: '/' }),
  twitter: generateTwitterMetadata({ title: 'TailorPic — AI Headshots & Professional Photos | From $1.99', description: 
      'Upload a few selfies, get studio-quality AI headshots in under 2 hours. Starting at $1.99 with a money-back guarantee.' }),
  alternates: { canonical: 'https://www.tailorpic.com' },
};

function SectionSkeleton({ height }: { height: string }) {
  return (
    <div aria-hidden="true" className={`mx-auto w-full max-w-[1320px] px-4 sm:px-7 lg:px-14 ${height}`}>
      <div className="h-full w-full animate-pulse rounded-tp-card bg-tp-beige/60" />
    </div>
  );
}

// Below-the-fold sections: split into separate chunks (still SSR'd for SEO, JS loads lazily)
const StatsCounter = dynamic(
  () => import('@/components/marketing/stats-counter').then((m) => m.StatsCounter),
  { loading: () => <SectionSkeleton height="h-40" /> }
);
const ComparisonTable = dynamic(
  () => import('@/components/marketing/comparison-table').then((m) => m.ComparisonTable),
  { loading: () => <SectionSkeleton height="h-[520px]" /> }
);
const Testimonials = dynamic(
  () => import('@/components/marketing/testimonials').then((m) => m.Testimonials),
  { loading: () => <SectionSkeleton height="h-[480px]" /> }
);
const FAQ = dynamic(
  () => import('@/components/marketing/faq').then((m) => m.FAQ),
  { loading: () => <SectionSkeleton height="h-[560px]" /> }
);
const SavingsHighlight = dynamic(
  () => import('@/components/marketing/savings-highlight').then((m) => m.SavingsHighlight),
  { loading: () => <SectionSkeleton height="h-[400px]" /> }
);
const CTABanner = dynamic(
  () => import('@/components/marketing/cta-banner').then((m) => m.CTABanner),
  { loading: () => <SectionSkeleton height="h-64" /> }
);
const PlanPicker = dynamic(
  () => import('@/components/marketing/plan-picker').then((m) => m.PlanPicker),
  { loading: () => <SectionSkeleton height="h-[420px]" /> }
);
const StyleShowcase = dynamic(
  () => import('@/components/marketing/style-showcase').then((m) => m.StyleShowcase),
  { loading: () => <SectionSkeleton height="h-[500px]" /> }
);
const SpeedComparison = dynamic(
  () => import('@/components/marketing/speed-comparison').then((m) => m.SpeedComparison),
  { loading: () => <SectionSkeleton height="h-[400px]" /> }
);

export default function LandingPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <WebsiteSchema />
      <FAQSchema items={faqs} />
      <SoftwareApplicationSchema />
      <HowToSchema />
      <Header />
      <Hero />
      <SocialProofBar />
      <GuaranteeStrip />
      <UseCaseChips />
      <StatsCounter />
      <Categories />
      <StyleShowcase />
      <TrustBadges />
      <TrustStrip />
      <BeforeAfterShowcase />
      <CompanyLogos />
      <HowItWorks />
      <SpeedComparison />
      <Testimonials />
      <ComparisonTable />
      <DeliveryGuarantee />
      <SavingsHighlight />
      <Pricing />
      <PlanPicker />
      <PhotoPrepGuide />
      <PrivacySection />
      <FAQ />
      <CTABanner />
      <Footer />
      <StickyCTA />
    </main>
  );
}
