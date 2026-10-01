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

/**
 * Fit a long headline into a ~60 character <title>. Prefers a natural break
 * (colon, dash, question mark) and falls back to the last whole word.
 * Returns the string unchanged when it already fits.
 */
export function clampTitle(title: string, max = 60): string {
  if (title.length <= max) return title;
  const head = title.slice(0, max + 1);
  const breaks = [': ', ' — ', ' - ', '? '];
  let cut = -1;
  for (const b of breaks) {
    const i = head.lastIndexOf(b);
    if (i >= 35) cut = Math.max(cut, b === '? ' ? i + 1 : i);
  }
  if (cut >= 35) return head.slice(0, cut).trim();
  const words = title.slice(0, max - 1).replace(/\s+\S*$/, '').replace(/[\s,:;&-]+$/, '');
  return `${words}…`;
}

/**
 * Fit a description into ~160 characters, ending on a sentence boundary when
 * possible, otherwise on the last whole word.
 */
export function clampDescription(description: string, max = 160): string {
  const text = description.trim();
  if (text.length <= max) return text;
  const head = text.slice(0, max);
  const sentenceEnd = Math.max(head.lastIndexOf('. '), head.lastIndexOf('? '), head.lastIndexOf('! '));
  if (sentenceEnd >= 110) return head.slice(0, sentenceEnd + 1);
  const words = text.slice(0, max - 1).replace(/\s+\S*$/, '').replace(/[\s,:;&-]+$/, '');
  return `${words}…`;
}
