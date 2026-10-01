import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';
import { loadManropeFonts } from '@/lib/og-font';

export const runtime = 'edge';
export const alt = `${siteConfig.name} - ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const fonts = await loadManropeFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
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
            width: '72px',
            height: '4px',
            backgroundColor: '#C9A98A',
            marginBottom: '36px',
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 148,
            fontWeight: 700,
            color: '#F8F5EF',
            letterSpacing: '-4px',
            lineHeight: 1,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 44,
            color: '#C9A98A',
            marginTop: '28px',
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: '#F8F5EF',
            opacity: 0.65,
            marginTop: '24px',
            maxWidth: '900px',
          }}
        >
          {siteConfig.description}
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
