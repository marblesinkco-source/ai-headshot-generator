import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

export const metadata: Metadata = {
  title: { absolute: 'AI Photo Samples & Gallery: See TailorPic AI Results' },
  description: `Browse examples of ${siteConfig.name} AI-generated photos across all categories. See what AI can create for LinkedIn, Corporate, Dating, Real Estate, and more.`,
  alternates: { canonical: '/samples' },
  robots: { index: true, follow: true },
  openGraph: generateOGMetadata({
    title: 'AI Photo Samples & Gallery: See TailorPic AI Results',
    description: `Browse examples of ${siteConfig.name} AI-generated photos across all categories.`,
    path: '/samples',
  }),
  twitter: generateTwitterMetadata({
    title: 'AI Photo Samples & Gallery: See TailorPic AI Results',
    description: `Browse examples of ${siteConfig.name} AI-generated photos across all categories.`,
  }),
};

export default function SamplesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
