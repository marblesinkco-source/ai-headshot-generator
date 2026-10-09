import type { Metadata } from 'next';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { HelpContent } from '@/components/marketing/help-content';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';

/* ------------------------------------------------------------------ */
/*  Metadata (SSR)                                                    */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: { absolute: 'TailorPic Help Center: Support & Getting Started' },
  description:
    'Get help with TailorPic AI headshots: account setup, photo uploads, order support, team features, privacy and billing.',
  alternates: { canonical: '/help' },
  openGraph: generateOGMetadata({
    title: 'TailorPic Help Center: Support & Getting Started',
    description:
      'Get help with TailorPic AI headshots: account setup, photo uploads, order support, team features, privacy and billing.',
    path: '/help',
  }),
  twitter: generateTwitterMetadata({
    title: 'TailorPic Help Center: Support & Getting Started',
    description:
      'Get help with TailorPic AI headshots: account setup, photo uploads, order support, team features, privacy and billing.',
  }),
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
