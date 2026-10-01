import { Header } from '@/components/marketing/header';
import { Hero } from '@/components/marketing/hero';
import { PressLogos } from '@/components/marketing/press-logos';
import { TrustStrip } from '@/components/marketing/trust-strip';
import { TrustBadges } from '@/components/marketing/trust-badges';
import { StatsCounter } from '@/components/marketing/stats-counter';
import { Categories } from '@/components/marketing/categories';
import { HowItWorks } from '@/components/marketing/how-it-works';
import { ComparisonTable } from '@/components/marketing/comparison-table';
import { Pricing } from '@/components/marketing/pricing';
import { Testimonials } from '@/components/marketing/testimonials';
import { FAQ } from '@/components/marketing/faq';
import { faqs } from '@/config/faqs';
import { CTABanner } from '@/components/marketing/cta-banner';
import { Footer } from '@/components/marketing/footer';
import { StickyCTA } from '@/components/marketing/sticky-cta';
import { OrganizationSchema, WebsiteSchema, FAQSchema, SoftwareApplicationSchema, HowToSchema } from '@/components/structured-data';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
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
      <TrustStrip />
      <HowItWorks />
      <ComparisonTable />
      <Pricing />
      <TrustBadges />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
      <StickyCTA />
    </main>
  );
}
