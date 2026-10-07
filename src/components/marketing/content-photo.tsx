import Image from 'next/image';
import { square, STOCK_PORTRAITS } from '@/config/stock-portraits';
import { cn } from '@/lib/utils';

/**
 * Renders a small circular/rounded photo in place of a Lucide icon
 * on industry pages. Deterministically selects a portrait from the
 * collection based on the industry slug + a seed string, so the same
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
    hash = Math.abs((hash + seedHash) % STOCK_PORTRAITS.length);
  } else {
    // Spread indices using a prime multiplier so adjacent cards look different
    hash = Math.abs((hash + index * 7) % STOCK_PORTRAITS.length);
  }

  const photo = STOCK_PORTRAITS[hash];

  return (
    <div className={cn('overflow-hidden', className)}>
      <Image
        src={square(photo.id)}
        alt={alt}
        width={100}
        height={100}
        sizes="(max-width: 640px) 50vw, 100px"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
