import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { siteConfig } from '@/config/site';
import { ToastProvider } from '@/components/ui/toaster';
import { CookieConsent } from '@/components/cookie-consent';
import { ExitIntentPopupLazy } from '@/components/marketing/exit-intent-popup-lazy';
import { OrganizationSchema } from '@/components/structured-data';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';

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
  themeColor: '#0B0B0B',
};

const FONT_CSS_URL =
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap';
const SUPABASE_ORIGIN = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin
  : null;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <head>
        {/* Instrument Serif: preconnect + non-chained stylesheet (replaces CSS @import, font-display: swap in URL) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONT_CSS_URL} />
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
          {children}
          <CookieConsent />
          <ExitIntentPopupLazy />
        </ToastProvider>
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
