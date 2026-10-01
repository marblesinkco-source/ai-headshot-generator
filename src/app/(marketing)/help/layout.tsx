import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const DESCRIPTION = `Find answers about ${siteConfig.name}: getting started, photo guidelines, pricing, downloads, account management, privacy, and team features.`;

export const metadata: Metadata = {
  title: 'Help Center',
  description: DESCRIPTION,
  alternates: { canonical: '/help' },
  robots: { index: true, follow: true },
  openGraph: generateOGMetadata({
    title: `Help Center | ${siteConfig.name}`,
    description: DESCRIPTION,
    path: '/help',
  }),
  twitter: generateTwitterMetadata({
    title: `Help Center | ${siteConfig.name}`,
    description: DESCRIPTION,
  }),
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
