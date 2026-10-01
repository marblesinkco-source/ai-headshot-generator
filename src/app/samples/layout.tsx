import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'AI Photo Samples & Gallery',
  description: `Browse example of ${siteConfig.name} AI-generated photos across all categories. See what AI can create for LinkedIn, Corporate, Dating, Real Estate, and more.`,
  alternates: { canonical: '/samples' },
  robots: { index: true, follow: true },
  openGraph: {
    title: `AI Photo Samples & Gallery | ${siteConfig.name}`,
    description: `Browse example of ${siteConfig.name} AI-generated photos across all categories.`,
    url: `${siteConfig.url}/samples`,
  },
};

export default function SamplesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
