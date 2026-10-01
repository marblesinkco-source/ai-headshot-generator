import dynamic from 'next/dynamic';
import { Header } from '@/components/marketing/header';
import { Hero } from '@/components/marketing/hero';
import { PressLogos } from '@/components/marketing/press-logos';
import { TrustStrip } from '@/components/marketing/trust-strip';
import { TrustBadges } from '@/components/marketing/trust-badges';
import { Categories } from '@/components/marketing/categories';
import { HowItWorks } from '@/components/marketing/how-it-works';
import { Pricing } from '@/components/marketing/pricing';
import { faqs } from '@/config/faqs';
import { Footer } from '@/components/marketing/footer';
import { StickyCTA } from '@/components/marketing/sticky-cta';
import { OrganizationSchema, WebsiteSchema, FAQSchema, SoftwareApplicationSchema, HowToSchema } from '@/components/structured-data';

function SectionSkeleton({ height }: { height: string }) {
  return (
    <div aria-hidden="true" className={`mx-auto w-full max-w-[1320px] px-4 sm:px-7 lg:px-14 ${height}`}>
      <div className="h-full w-full animate-pulse rounded-2xl bg-tp-beige/60" />
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
const CTABanner = dynamic(
  () => import('@/components/marketing/cta-banner').then((m) => m.CTABanner),
  { loading: () => <SectionSkeleton height="h-64" /> }
);

export default function LandingPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <OrganizationSchema />
      <WebsiteSchema />
      <FAQSchema items={faqs} />
      <SoftwareApplicationSchema />
      <HowToSchema />
      <Header />
      <Hero />
      <PressLogos />
      <StatsCounter />
      <Categories />
      <TrustBadges />
      <TrustStrip />
      <HowItWorks />
      <ComparisonTable />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTABanner />
      <Footer />
      <StickyCTA />
    </main>
  );
}
