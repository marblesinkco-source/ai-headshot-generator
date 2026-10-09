'use client';

import Script from 'next/script';

/**
 * Loads Paddle.js and initializes it with the client-side token.
 * Include this component in any layout where checkout may happen (e.g., dashboard).
 *
 * Paddle.js is loaded from https://cdn.paddle.com/paddle/v2/paddle.js
 * It creates a global `Paddle` object.
 */
export default function PaddleScript() {
  const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
  const environment = process.env.NEXT_PUBLIC_PADDLE_ENV || 'sandbox';

  if (!clientToken) return null;

  return (
    <Script
      src="https://cdn.paddle.com/paddle/v2/paddle.js"
      strategy="lazyOnload"
      onLoad={() => {
        const w = window as unknown as {
          Paddle?: {
            Environment: { set: (env: string) => void };
            Setup: (opts: { token: string }) => void;
          };
        };
        if (w.Paddle) {
          if (environment === 'sandbox') {
            w.Paddle.Environment.set('sandbox');
          }
          w.Paddle.Setup({ token: clientToken });
        }
      }}
    />
  );
}
