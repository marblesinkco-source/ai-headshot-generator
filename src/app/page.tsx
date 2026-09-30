import { Header } from '@/components/marketing/header';
import { Hero } from '@/components/marketing/hero';
import { TrustStrip } from '@/components/marketing/trust-strip';
import { TrustBadges } from '@/components/marketing/trust-badges';
import { Categories } from '@/components/marketing/categories';
import { HowItWorks } from '@/components/marketing/how-it-works';
import { Pricing } from '@/components/marketing/pricing';
import { Testimonials } from '@/components/marketing/testimonials';
import { FAQ, faqs } from '@/components/marketing/faq';
import { CTABanner } from '@/components/marketing/cta-banner';
import { Footer } from '@/components/marketing/footer';
import { OrganizationSchema, WebsiteSchema, FAQSchema } from '@/components/structured-data';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <OrganizationSchema />
      <WebsiteSchema />
      <FAQSchema items={faqs} />
      <Header />
      <Hero />
      <Categories />
      <TrustStrip />
      <HowItWorks />
      <Pricing />
      <TrustBadges />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  );
}
