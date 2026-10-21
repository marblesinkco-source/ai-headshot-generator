import Image from 'next/image';
import { cn } from '@/lib/utils';

const BRAND_WEB = '/brand/tailorpic/web';

/** Brand portrait pool used by industry pages in place of stock photos. */
const BRAND_PORTRAITS = [
  { src: `${BRAND_WEB}/after-ozlem.jpg`, alt: 'Professional portrait' },
  { src: `${BRAND_WEB}/after-murat.jpg`, alt: 'Corporate portrait' },
  { src: `${BRAND_WEB}/after-tarkan.jpg`, alt: 'Executive portrait' },
  { src: `${BRAND_WEB}/after-ahmet.jpg`, alt: 'Business portrait' },
  { src: `${BRAND_WEB}/after-alpaslan.jpg`, alt: 'Creative portrait' },
  { src: `${BRAND_WEB}/after-mert.jpg`, alt: 'Editorial portrait' },
  { src: `${BRAND_WEB}/after-ozan.jpg`, alt: 'Modern portrait' },
  { src: `${BRAND_WEB}/after-halil.jpg`, alt: 'Lifestyle portrait' },
  { src: `${BRAND_WEB}/after-mustafa.jpg`, alt: 'Professional portrait' },
];

/**
 * Renders a small circular/rounded photo in place of a Lucide icon
 * on industry pages. Deterministically selects a portrait from the
 * brand collection based on the industry slug + a seed string, so the same
 * page always shows the same photos but different cards show different ones.
 *
 * Server component — no hooks, no 'use client'.
 */
export function ContentPhoto({
  slug,
  index = 0,
  seed,
  alt = 'Professional portrait',
  className,
}: {
  /** Industry slug (e.g. "doctors", "photographers") */
  slug: string;
  /** Numeric index (legacy, still works) */
  index?: number;
  /** A unique string per card (e.g. title). When provided, overrides index for hashing. */
  seed?: string;
  /** Accessible alt text */
  alt?: string;
  /** Tailwind classes for size and border-radius (e.g. "h-12 w-12 rounded-xl") */
  className?: string;
}) {
  // Deterministic hash from slug
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }

  if (seed) {
    // Hash the seed string for per-card uniqueness
    let seedHash = 0;
    for (let i = 0; i < seed.length; i++) {
      seedHash = ((seedHash << 5) - seedHash + seed.charCodeAt(i)) | 0;
    }
    hash = Math.abs((hash + seedHash) % BRAND_PORTRAITS.length);
  } else {
    // Spread indices using a prime multiplier so adjacent cards look different
    hash = Math.abs((hash + index * 7) % BRAND_PORTRAITS.length);
  }

  const photo = BRAND_PORTRAITS[hash];

  return (
    <div className={cn('overflow-hidden', className)}>
      <Image
        src={photo.src}
        alt={alt}
        width={100}
        height={100}
        sizes="(max-width: 640px) 50vw, 100px"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
