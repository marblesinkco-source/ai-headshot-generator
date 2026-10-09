import type { Metadata } from 'next';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { HelpContent } from '@/components/marketing/help-content';
import { siteConfig } from '@/config/site';

/* ------------------------------------------------------------------ */
/*  Metadata (SSR)                                                    */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: 'TailorPic Help Center: Support & Getting Started',
  description:
    'Get help with TailorPic AI headshots: account setup, photo uploads, order support, team features, privacy and billing.',
  alternates: { canonical: `${siteConfig.url}/help` },
  openGraph: {
    title: 'TailorPic Help Center: Support & Getting Started',
    description:
      'Get help with TailorPic AI headshots: account setup, photo uploads, order support, team features, privacy and billing.',
    url: `${siteConfig.url}/help`,
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TailorPic Help Center: Support & Getting Started',
    description:
      'Get help with TailorPic AI headshots: account setup, photo uploads, order support, team features, privacy and billing.',
  },
};

/* ------------------------------------------------------------------ */
/*  Page (Server Component)                                           */
/* ------------------------------------------------------------------ */

export default function HelpCenterPage() {
  return (
    <main id="main-content" className="min-h-screen">
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
