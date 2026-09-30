import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'AI Photo Samples & Gallery | TailorPic',
  description: `Browse real examples of ${siteConfig.name} AI-generated photos across all categories. See what AI can create for LinkedIn, Corporate, Dating, Real Estate, and more.`,
  alternates: { canonical: '/samples' },
  openGraph: {
    title: `AI Photo Samples & Gallery | ${siteConfig.name}`,
    description: `Browse real examples of ${siteConfig.name} AI-generated photos across all categories.`,
    url: `${siteConfig.url}/samples`,
  },
};

export default function SamplesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
