import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import dynamic from 'next/dynamic';
import { Header } from '@/components/marketing/header';
import { Hero } from '@/components/marketing/hero';
import { BeforeAfterShowcase } from '@/components/marketing/before-after-showcase';
import { Categories } from '@/components/marketing/categories';
import { faqs } from '@/config/faqs';
import { Footer } from '@/components/marketing/footer';
import { WebsiteSchema, FAQSchema, SoftwareApplicationSchema, HowToSchema } from '@/components/structured-data';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

export const metadata: Metadata = {
  title: { absolute: `AI Headshots From Your Selfies | TailorPic — From ${BASE_PRICE_DISPLAY}` },
  description:
    `Upload a few selfies and get studio-quality AI headshots for LinkedIn, resumes and more. One-time payment, no subscription. From ${BASE_PRICE_DISPLAY}.`,
  openGraph: generateOGMetadata({ title: `AI Headshots From Your Selfies | TailorPic — From ${BASE_PRICE_DISPLAY}`, description:
      `Upload a few selfies and get studio-quality AI headshots for LinkedIn, resumes and more. One-time payment from ${BASE_PRICE_DISPLAY}.`, path: '/' }),
  twitter: generateTwitterMetadata({ title: `AI Headshots From Your Selfies | TailorPic — From ${BASE_PRICE_DISPLAY}`, description:
      `Upload a few selfies and get studio-quality AI headshots for LinkedIn, resumes and more. One-time payment from ${BASE_PRICE_DISPLAY}.` }),
  alternates: { canonical: '/' },
};

function SectionSkeleton({ height }: { height: string }) {
  return (
    <div aria-hidden="true" className={`${height}`} />
  );
}

// Below-the-fold sections: lazy load for performance
const AIProcessDemo = dynamic(
  () => import('@/components/marketing/ai-process-demo').then((m) => m.AIProcessDemo),
  { loading: () => <SectionSkeleton height="h-[700px] md:h-[550px]" /> }
);
const HeadshotInContext = dynamic(
  () => import('@/components/marketing/headshot-in-context').then((m) => m.HeadshotInContext),
  { loading: () => <SectionSkeleton height="h-[500px] md:h-[400px]" /> }
);
const Pricing = dynamic(
  () => import('@/components/marketing/pricing').then((m) => m.Pricing),
  { loading: () => <SectionSkeleton height="h-[800px] md:h-[600px]" /> }
);
const VsStudio = dynamic(
  () => import('@/components/marketing/vs-studio').then((m) => m.VsStudio),
  { loading: () => <SectionSkeleton height="h-[600px] md:h-[500px]" /> }
);
const GuaranteeSection = dynamic(
  () => import('@/components/marketing/guarantee-section').then((m) => m.GuaranteeSection),
  { loading: () => <SectionSkeleton height="h-[400px] md:h-[320px]" /> }
);
const FAQ = dynamic(
  () => import('@/components/marketing/faq').then((m) => m.FAQ),
  { loading: () => <SectionSkeleton height="h-[560px]" /> }
);
const CTABanner = dynamic(
  () => import('@/components/marketing/cta-banner').then((m) => m.CTABanner),
  { loading: () => <SectionSkeleton height="h-64" /> }
);
const StickyCTA = dynamic(
  () => import('@/components/marketing/sticky-cta').then((m) => m.StickyCTA)
);
const ScrollProgress = dynamic(
  () => import('@/components/marketing/scroll-progress').then((m) => m.ScrollProgress)
);
const FeaturedLogos = dynamic(
  () => import('@/components/marketing/featured-logos').then((m) => m.FeaturedLogos),
  { loading: () => <SectionSkeleton height="h-[160px]" /> }
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
      <HowToSchema />

      {/* Hero */}
      <Hero />

      {/* Trust strip — logos */}
      <FeaturedLogos />

      {/* Before / After Showcase */}
      <BeforeAfterShowcase />

      {/* How It Works — animated demo */}
      <AIProcessDemo />

      {/* Categories */}
      <Categories />

      {/* Pricing — moved up for shorter decision path */}
      <div className="mx-auto max-w-4xl px-8" aria-hidden="true"><div className="gold-line" /></div>
      <Pricing />

      {/* TailorPic vs Studio Comparison */}
      <VsStudio />

      {/* Headshot in Context — platform mockups */}
      <HeadshotInContext />

      {/* Quality commitment */}
      <div className="mx-auto max-w-4xl px-8" aria-hidden="true"><div className="gold-line" /></div>
      <GuaranteeSection />

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <CTABanner />

      {/* Sticky CTA (fixed bottom bar) */}
      <StickyCTA />

    </main>
    {/* 13. Footer */}
    <Footer />
    </>
  );
}
