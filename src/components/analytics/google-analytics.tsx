'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics 4 with Consent Mode v2.
 * - Defaults analytics/ad consent to 'denied' before gtag.js loads.
 * - Re-applies a previously stored choice (localStorage `tp_cookie_consent`)
 *   on every load; the CookieConsent component handles later updates.
 * - Sends page_view manually on route changes (send_page_view is disabled).
 * Renders nothing when NEXT_PUBLIC_GA_MEASUREMENT_ID is not set.
 */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!GA_ID || !pathname) return;
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    if (typeof window.gtag !== 'function') return;
    const search = window.location.search;
    window.gtag('event', 'page_view', {
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  if (!GA_ID) return null;

  const initScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
try {
  var raw = localStorage.getItem('tp_cookie_consent');
  if (raw) {
    var c = JSON.parse(raw);
    gtag('consent', 'update', {
      analytics_storage: c.analytics ? 'granted' : 'denied',
      ad_storage: c.marketing ? 'granted' : 'denied',
      ad_user_data: c.marketing ? 'granted' : 'denied',
      ad_personalization: c.marketing ? 'granted' : 'denied'
    });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', ${JSON.stringify(GA_ID)}, { send_page_view: false });
`;

  return (
    <>
      <Script id="ga-consent-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: initScript }} />
      <Script
        id="ga-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`}
        strategy="afterInteractive"
        onLoad={() => {
          // Initial page view (route-change effect ran before gtag.js existed).
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'page_view', {
              page_path: window.location.pathname + window.location.search,
              page_location: window.location.href,
              page_title: document.title,
            });
            lastPath.current = window.location.pathname;
          }
        }}
      />
    </>
  );
}
