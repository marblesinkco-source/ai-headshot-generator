import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import dynamic from 'next/dynamic';
import { Header } from '@/components/marketing/header';
import { Hero } from '@/components/marketing/hero';
import { Categories } from '@/components/marketing/categories';
import { HowItWorks } from '@/components/marketing/how-it-works';
import { Pricing } from '@/components/marketing/pricing';
import { faqs } from '@/config/faqs';
import { Footer } from '@/components/marketing/footer';
import { WebsiteSchema, FAQSchema, SoftwareApplicationSchema, HowToSchema } from '@/components/structured-data';
import { BeforeAfterShowcase } from '@/components/marketing/before-after-showcase';
import { StyleConfigurator } from '@/components/marketing/style-configurator';
import { TrustBadges } from '@/components/marketing/trust-badges';
import { CompanyLogos } from '@/components/marketing/company-logos';

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
    <div aria-hidden="true" className={`flex items-center justify-center ${height}`}>
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent border-tp-bronze/30" />
    </div>
  );
}

// Below-the-fold sections: lazy load for performance
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
      <WebsiteSchema />
      <FAQSchema items={faqs} />
      <SoftwareApplicationSchema />
      <HowToSchema />

      {/* 1. Header */}
      <Header />

      {/* 2. Hero — premium editorial image + 2 CTAs */}
      <Hero />

      {/* 3. Quick Photo Type Chooser — 12 categories grouped */}
      <Categories />

      {/* 4. Style & Customization Preview */}
      <StyleConfigurator />

      {/* 5. Before / After Comparison */}
      <BeforeAfterShowcase />

      {/* 6. How It Works */}
      <HowItWorks />

      {/* 7. Pricing Overview */}
      <Pricing />

      {/* 8. Trust & Integrations */}
      <TrustBadges />
      <CompanyLogos />

      {/* 9. FAQ Preview */}
      <FAQ />

      {/* 10. Newsletter / Final CTA */}
      <CTABanner />

      {/* 11. Footer */}
      <Footer />
    </main>
  );
}
