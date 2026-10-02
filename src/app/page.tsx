import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import dynamic from 'next/dynamic';
import { Header } from '@/components/marketing/header';
import { Hero } from '@/components/marketing/hero';
import { SocialProofBar } from '@/components/marketing/social-proof-bar';
import { CompanyLogos } from '@/components/marketing/company-logos';
import { Categories } from '@/components/marketing/categories';
import { HowItWorks } from '@/components/marketing/how-it-works';
import { Pricing } from '@/components/marketing/pricing';
import { faqs } from '@/config/faqs';
import { Footer } from '@/components/marketing/footer';
import { StickyCTA } from '@/components/marketing/sticky-cta';
import { WebsiteSchema, FAQSchema, SoftwareApplicationSchema, HowToSchema } from '@/components/structured-data';
import { BeforeAfterShowcase } from '@/components/marketing/before-after-showcase';

export const metadata: Metadata = {
  title: 'TailorPic — AI Headshots & Professional Photos | From $1.99',
  description:
    'Get studio-quality AI headshots in under 2 hours. Multiple styles for business, LinkedIn & creative use. Fast delivery. From $1.99.',
  openGraph: generateOGMetadata({ title: 'TailorPic — AI Headshots & Professional Photos | From $1.99', description:
      'Upload a few selfies, get studio-quality AI headshots in under 2 hours. Professional, creative & business styles.', path: '/' }),
  twitter: generateTwitterMetadata({ title: 'TailorPic — AI Headshots & Professional Photos | From $1.99', description:
      'Upload a few selfies, get studio-quality AI headshots in under 2 hours. Starting at $1.99.' }),
  alternates: { canonical: 'https://www.tailorpic.com' },
};

function SectionSkeleton({ height, dark }: { height: string; dark?: boolean }) {
  return (
    <div aria-hidden="true" className={`flex items-center justify-center ${height} ${dark ? 'bg-tp-ink' : ''}`}>
      <div className={`h-5 w-5 animate-spin rounded-full border-2 border-t-transparent ${dark ? 'border-tp-bronze/40' : 'border-tp-bronze/30'}`} />
    </div>
  );
}

// Below-the-fold sections: split into separate chunks (still SSR'd for SEO, JS loads lazily)
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
      <WebsiteSchema />
      <FAQSchema items={faqs} />
      <SoftwareApplicationSchema />
      <HowToSchema />
      <Header />
      <Hero />
      <SocialProofBar />
      <HowItWorks />
      <BeforeAfterShowcase />
      <Categories />
      <CompanyLogos />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTABanner />
      <Footer />
      <StickyCTA />
    </main>
  );
}
