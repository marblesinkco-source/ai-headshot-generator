'use client';

import { useCallback, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  try {
    let sid = sessionStorage.getItem('tp_session_id');
    if (!sid) {
      sid = crypto.randomUUID();
      sessionStorage.setItem('tp_session_id', sid);
    }
    return sid;
  } catch {
    return crypto.randomUUID();
  }
}

function getDeviceType(): string {
  if (typeof window === 'undefined') return 'desktop';
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

/** Check whether the visitor has granted analytics consent via the cookie banner. */
function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem('tp_cookie_consent');
    if (!raw) return false; // no decision yet → do not track
    const consent = JSON.parse(raw) as { analytics?: boolean };
    return consent.analytics === true;
  } catch {
    return false;
  }
}

async function sendEvent(data: Record<string, unknown>) {
  // Respect the same cookie-consent toggle that controls Google Analytics
  if (!hasAnalyticsConsent()) return;

  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      keepalive: true, // ensures the request completes even on page unload
    });
  } catch {
    // Silent fail — never block UX for analytics
  }
}

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const startTime = useRef(Date.now());
  const lastPath = useRef('');

  // Auto-track page views
  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    startTime.current = Date.now();

    const sessionId = getSessionId();
    sendEvent({
      type: 'page_view',
      sessionId,
      pagePath: pathname,
      referrer: document.referrer || null,
      utmSource: searchParams.get('utm_source'),
      utmMedium: searchParams.get('utm_medium'),
      utmCampaign: searchParams.get('utm_campaign'),
      deviceType: getDeviceType(),
    });

    // Track duration on unload
    const handleUnload = () => {
      const duration = Date.now() - startTime.current;
      sendEvent({
        type: 'page_view',
        sessionId,
        pagePath: pathname,
        durationMs: duration,
        deviceType: getDeviceType(),
      });
    };

    // Use visibilitychange instead of unload for better reliability
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        handleUnload();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [pathname, searchParams]);

  const trackClick = useCallback((elementId: string, elementType: string = 'button', metadata?: Record<string, unknown>) => {
    sendEvent({
      type: 'click',
      sessionId: getSessionId(),
      pagePath: pathname,
      elementId,
      elementType,
      metadata,
    });
  }, [pathname]);

  const trackConversion = useCallback((eventType: string, options?: {
    categoryId?: string;
    packageId?: string;
    revenueCents?: number;
    metadata?: Record<string, unknown>;
  }) => {
    sendEvent({
      type: 'conversion',
      sessionId: getSessionId(),
      pagePath: pathname,
      eventType,
      ...options,
    });
  }, [pathname]);

  return { trackClick, trackConversion };
}
