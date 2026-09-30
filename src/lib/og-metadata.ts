import type { Metadata } from 'next';

export const OG_BASE_URL = 'https://www.tailorpic.com';

export type OGPageType = 'blog' | 'vs' | 'industry' | 'style' | 'usecase' | 'glossary' | 'default';

/** Build the absolute dynamic OG image URL. */
export function buildOGImageUrl(params: { title: string; type?: string; subtitle?: string }): string {
  const q = new URLSearchParams();
  q.set('title', params.title);
  q.set('type', params.type || 'default');
  if (params.subtitle) q.set('subtitle', params.subtitle);
  return `${OG_BASE_URL}/api/og?${q.toString()}`;
}

export function generateOGMetadata(params: {
  title: string;
  description: string;
  type?: OGPageType;
  subtitle?: string;
  path: string;
}): Metadata['openGraph'] {
  const { title, description, type = 'default', subtitle, path } = params;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return {
    type: type === 'blog' ? 'article' : 'website',
    locale: 'en_US',
    siteName: 'TailorPic',
    url: `${OG_BASE_URL}${normalizedPath}`,
    title,
    description,
    images: [
      {
        url: buildOGImageUrl({ title, type, subtitle }),
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };
}

export function generateTwitterMetadata(params: {
  title: string;
  description: string;
  type?: string;
}): Metadata['twitter'] {
  const { title, description, type = 'default' } = params;
  return {
    card: 'summary_large_image',
    site: '@tailorpic',
    title,
    description,
    images: [buildOGImageUrl({ title, type })],
  };
}
