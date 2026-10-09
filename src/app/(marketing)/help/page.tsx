import type { Metadata } from 'next';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { FAQSchema, BreadcrumbSchema } from '@/components/structured-data';
import { HelpContent, allFaqItems } from '@/components/marketing/help-content';
import { siteConfig } from '@/config/site';

/* ------------------------------------------------------------------ */
/*  Metadata (SSR)                                                    */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: 'Help Center — AI Headshot FAQ | TailorPic',
  description:
    'Find answers to common questions about TailorPic AI headshots: getting started, photo uploads, pricing, team features, privacy and more.',
  alternates: { canonical: `${siteConfig.url}/help` },
  openGraph: {
    title: 'Help Center — AI Headshot FAQ | TailorPic',
    description:
      'Find answers to common questions about TailorPic AI headshots: getting started, photo uploads, pricing, team features, privacy and more.',
    url: `${siteConfig.url}/help`,
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Help Center — AI Headshot FAQ | TailorPic',
    description:
      'Find answers to common questions about TailorPic AI headshots: getting started, photo uploads, pricing, team features, privacy and more.',
  },
};

/* ------------------------------------------------------------------ */
/*  Page (Server Component)                                           */
/* ------------------------------------------------------------------ */

export default function HelpCenterPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <FAQSchema items={allFaqItems} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Help Center', url: `${siteConfig.url}/help` },
        ]}
      />
      <Header />
      <HelpContent />
      <Footer />
    </main>
  );
}
