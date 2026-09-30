import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/config/site';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

// Instrument Serif from Google Fonts doesn't support `next/font/google` well for italic-only,
// so we load it via CSS @import in globals.css and reference the variable here.

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [
      { url: '/brand/tailorpic/icons/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/tailorpic/icons/favicon.ico', sizes: 'any' },
    ],
    apple: '/brand/tailorpic/icons/profile-dark-180.png',
  },
  manifest: '/brand/tailorpic/icons/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: '/brand/tailorpic/web/og-tailorpic-1200x630.jpg', width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/brand/tailorpic/web/og-tailorpic-1200x630.jpg'],
    creator: siteConfig.links.twitter || undefined,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-tp-paper font-sans antialiased text-tp-ink">{children}</body>
    </html>
  );
}
