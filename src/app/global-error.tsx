'use client';

import { useEffect } from 'react';

// global-error replaces the root layout, so globals.css / Tailwind are NOT loaded here.
// Brand styling is therefore applied with inline styles using TailorPic tokens.
const tp = {
  black: '#0B0B0B',
  ink: '#171613',
  bronze: '#C9A98A',
  bronzeInk: '#76563D',
  paper: '#F8F5EF',
  muted: '#5F5A54',
  line: '#DFD6CC',
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: tp.paper,
          color: tp.ink,
          fontFamily: 'Manrope, Inter, Arial, system-ui, sans-serif',
        }}
      >
        <main
          id="main-content"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            style={{
              maxWidth: 480,
              width: '100%',
              textAlign: 'center',
              background: '#fff',
              border: `1px solid ${tp.line}`,
              borderRadius: 18,
              padding: '48px 32px',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: tp.bronzeInk,
              }}
            >
              TailorPic
            </p>
            <h1
              style={{
                margin: '20px 0 0',
                fontFamily: '"Instrument Serif", Georgia, "Times New Roman", serif',
                fontWeight: 400,
                fontSize: 40,
                lineHeight: 1.1,
                color: tp.black,
              }}
            >
              Something went wrong
            </h1>
            <p style={{ margin: '14px 0 0', fontSize: 16, lineHeight: 1.6, color: tp.muted }}>
              We hit an unexpected problem on our side. Your work is safe. Please try again, or head back home.
            </p>
            <div
              style={{
                marginTop: 32,
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                onClick={() => reset()}
                style={{
                  cursor: 'pointer',
                  border: 0,
                  borderRadius: 12,
                  background: tp.black,
                  color: tp.bronze,
                  padding: '12px 22px',
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: 'inherit',
                }}
              >
                Try again
              </button>
              {/* Plain anchor on purpose: forces a full reload and a clean state. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/"
                style={{
                  borderRadius: 12,
                  border: `1px solid ${tp.line}`,
                  background: '#fff',
                  color: tp.ink,
                  padding: '12px 22px',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Go home
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
