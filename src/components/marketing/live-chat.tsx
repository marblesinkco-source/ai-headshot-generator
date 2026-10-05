'use client';

import { useEffect } from 'react';

/**
 * Tawk.to live chat widget.
 *
 * Renders only when NEXT_PUBLIC_TAWKTO_ID is set in the environment.
 * The value should be the property ID from your Tawk.to dashboard,
 * formatted as "PROPERTY_ID/WIDGET_ID" (e.g. "abc123def/default").
 *
 * The script loads asynchronously after the page is interactive,
 * so it never blocks initial render or affects Core Web Vitals.
 */
export function LiveChat() {
  const tawkToId = process.env.NEXT_PUBLIC_TAWKTO_ID;

  useEffect(() => {
    if (!tawkToId) return;

    // Avoid injecting twice (e.g. React Strict Mode double-mount)
    if (document.getElementById('tawkto-script')) return;

    const script = document.createElement('script');
    script.id = 'tawkto-script';
    script.async = true;
    script.src = `https://embed.tawk.to/${tawkToId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Apply brand accent color once the widget API is ready
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).Tawk_API = (window as any).Tawk_API || {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).Tawk_API.customStyle = {
      visibility: {
        desktop: { position: 'br' }, // bottom-right
        mobile: { position: 'br' },
      },
    };

    document.head.appendChild(script);

    return () => {
      // Clean up on unmount (unlikely in root layout, but good practice)
      const el = document.getElementById('tawkto-script');
      if (el) el.remove();
    };
  }, [tawkToId]);

  // No visible DOM — the widget injects its own iframe
  return null;
}
