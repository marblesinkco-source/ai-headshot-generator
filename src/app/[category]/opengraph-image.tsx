import { ImageResponse } from 'next/og';
import { getActiveCategories } from '@/config/categories';
import { siteConfig } from '@/config/site';
import { loadManropeFonts } from '@/lib/og-font';

export const runtime = 'edge';
export const alt = `${siteConfig.name} AI photos`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ category: string }> | { category: string };
}

function formatStartingPrice(cents: number, currency: string): string {
  const amount = cents / 100;
  const value = Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
  return currency.toLowerCase() === 'usd'
    ? `$${value}`
    : `${value} ${currency.toUpperCase()}`;
}

export default async function Image({ params }: Props) {
  const { category: slug } = await params;
  const cat = getActiveCategories().find((c) => c.slug === slug);

  const name = cat?.name ?? siteConfig.name;
  const tagline = cat?.tagline ?? siteConfig.tagline;
  const lowest =
    cat && cat.packages.length > 0
      ? cat.packages.reduce((min, p) => (p.price < min.price ? p : min))
      : undefined;
  const price = lowest
    ? formatStartingPrice(lowest.price, lowest.currency)
    : undefined;

  const fonts = await loadManropeFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          backgroundColor: '#0B0B0B',
          backgroundImage:
            'linear-gradient(135deg, #0B0B0B 0%, #171613 60%, #2a2118 100%)',
          fontFamily: 'Manrope, sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '6px',
            backgroundColor: '#C9A98A',
            display: 'flex',
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 34,
            fontWeight: 700,
            color: '#C9A98A',
            letterSpacing: '2px',
          }}
        >
          {siteConfig.name}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              width: '72px',
              height: '4px',
              backgroundColor: '#C9A98A',
              marginBottom: '32px',
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: 88,
              fontWeight: 700,
              color: '#F8F5EF',
              letterSpacing: '-2px',
              lineHeight: 1.05,
              maxWidth: '1000px',
            }}
          >
            {name}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 36,
              color: '#F8F5EF',
              opacity: 0.75,
              marginTop: '24px',
              maxWidth: '950px',
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {price ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '14px 28px',
                border: '2px solid #C9A98A',
                borderRadius: '999px',
                fontSize: 30,
                color: '#C9A98A',
              }}
            >
              {`Starting at ${price}`}
            </div>
          ) : (
            <div style={{ display: 'flex' }} />
          )}
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              color: '#F8F5EF',
              opacity: 0.55,
            }}
          >
            tailorpic.com
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
