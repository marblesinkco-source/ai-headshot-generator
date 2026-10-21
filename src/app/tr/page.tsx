import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import dynamic from 'next/dynamic';
import { Header } from '@/components/marketing/header';
import { Hero } from '@/components/marketing/hero';
import { Categories } from '@/components/marketing/categories';
import { faqs } from '@/config/faqs';
import { Footer } from '@/components/marketing/footer';
import { WebsiteSchema, FAQSchema, SoftwareApplicationSchema, HowToSchema } from '@/components/structured-data';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: `Selfie'lerden AI Vesikalık | TailorPic — ${BASE_PRICE_DISPLAY}'dan başlayan` },
  description:
    `Birkaç selfie yükleyin, LinkedIn, özgeçmiş ve kurumsal profiller için stüdyo kalitesinde AI vesikalık fotoğraflar alın. Tek seferlik ödeme, abonelik yok. ${BASE_PRICE_DISPLAY}'dan başlayan fiyatlarla.`,
  openGraph: {
    ...generateOGMetadata({
      title: `Selfie'lerden AI Vesikalık | TailorPic — ${BASE_PRICE_DISPLAY}'dan başlayan`,
      description: `Birkaç selfie yükleyin, stüdyo kalitesinde AI vesikalık fotoğraflar alın. Tek seferlik ödeme ${BASE_PRICE_DISPLAY}'dan başlayan.`,
      path: '/tr',
    }),
    locale: 'tr_TR',
  },
  twitter: generateTwitterMetadata({
    title: `Selfie'lerden AI Vesikalık | TailorPic — ${BASE_PRICE_DISPLAY}'dan başlayan`,
    description: `Birkaç selfie yükleyin, stüdyo kalitesinde AI vesikalık fotoğraflar alın. Tek seferlik ödeme ${BASE_PRICE_DISPLAY}'dan başlayan.`,
  }),
  alternates: {
    canonical: '/tr',
    languages: {
      en: '/',
      tr: '/tr',
    },
  },
};

function SectionSkeleton({ height }: { height: string }) {
  return <div aria-hidden="true" className={height} />;
}

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
const BeforeAfterShowcase = dynamic(
  () => import('@/components/marketing/before-after-showcase').then((m) => m.BeforeAfterShowcase),
  { loading: () => <SectionSkeleton height="h-[600px] md:h-[500px]" /> }
);
const InstantPreviewDemo = dynamic(
  () => import('@/components/marketing/instant-preview-demo').then((m) => m.InstantPreviewDemo),
  { loading: () => <SectionSkeleton height="h-[700px] md:h-[600px]" /> }
);
const AnimatedStats = dynamic(
  () => import('@/components/marketing/animated-stats').then((m) => m.AnimatedStats),
  { loading: () => <SectionSkeleton height="h-[200px]" /> }
);
const SocialProofTicker = dynamic(
  () => import('@/components/marketing/social-proof-ticker').then((m) => m.SocialProofTicker)
);
const WhoItsFor = dynamic(
  () => import('@/components/marketing/who-its-for').then((m) => m.WhoItsFor),
  { loading: () => <SectionSkeleton height="h-[500px] md:h-[420px]" /> }
);

export default function TurkishLandingPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <WebsiteSchema />
        <FAQSchema items={faqs} />
        <SoftwareApplicationSchema />
        <HowToSchema />

        <Hero />
        <FeaturedLogos />
        <AnimatedStats />
        <BeforeAfterShowcase />
        <InstantPreviewDemo />
        <AIProcessDemo />
        <Categories />
        <WhoItsFor />
        <SocialProofTicker />
        <div className="mx-auto max-w-4xl px-8" aria-hidden="true"><div className="gold-line" /></div>
        <Pricing />
        <VsStudio />
        <HeadshotInContext />
        <div className="mx-auto max-w-4xl px-8" aria-hidden="true"><div className="gold-line" /></div>
        <GuaranteeSection />
        <FAQ />
        <CTABanner />
        <StickyCTA />
      </main>
      <Footer />
    </>
  );
}
