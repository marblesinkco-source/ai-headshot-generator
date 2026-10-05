import type { Metadata, Viewport } from 'next';
import { Manrope, Instrument_Serif } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { siteConfig } from '@/config/site';
import { ToastProvider } from '@/components/ui/toaster';
import { CookieConsent } from '@/components/cookie-consent';
import { ExitIntentPopupLazy } from '@/components/marketing/exit-intent-popup-lazy';
import { OrganizationSchema } from '@/components/structured-data';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { AnalyticsProvider } from '@/components/analytics-provider';
import { Suspense } from 'react';
import { LiveChat } from '@/components/marketing/live-chat';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

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
  // Manifest is served by src/app/manifest.ts (/manifest.webmanifest); Next auto-links it.
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: siteConfig.name,
  },
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

// Next 14: themeColor must live in the viewport export (metadata.themeColor is deprecated).
export const viewport: Viewport = {
  themeColor: '#1A1A1A',
};

const SUPABASE_ORIGIN = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin
  : null;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        {/* Instrument Serif now self-hosted via next/font — no external stylesheet needed */}
        {SUPABASE_ORIGIN && (
          <>
            <link rel="preconnect" href={SUPABASE_ORIGIN} crossOrigin="anonymous" />
            <link rel="dns-prefetch" href={SUPABASE_ORIGIN} />
          </>
        )}
        {/* Stripe + analytics are only needed later (checkout / after consent): dns-prefetch only */}
        <link rel="dns-prefetch" href="https://js.stripe.com" />
        <link rel="dns-prefetch" href="https://api.stripe.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="min-h-screen bg-tp-paper font-sans antialiased text-tp-ink">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-tp-black focus:px-4 focus:py-2 focus:text-tp-bronze focus:outline-none">
          Skip to content
        </a>
        {/* Organization JSON-LD (site-wide) */}
        <OrganizationSchema />
        {/* GA4 + Consent Mode v2 — only renders when NEXT_PUBLIC_GA_MEASUREMENT_ID is set */}
        <GoogleAnalytics />
        <ToastProvider>
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
          <CookieConsent />
          <ExitIntentPopupLazy />
        </ToastProvider>
        {/* Tawk.to live chat — only loads when NEXT_PUBLIC_TAWKTO_ID is set */}
        <Suspense fallback={null}>
          <LiveChat />
        </Suspense>
        {/* Vercel Analytics — only loads when NEXT_PUBLIC_VERCEL_ANALYTICS_ID is set */}
        {process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID && (
          <Script
            src="/_vercel/insights/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
