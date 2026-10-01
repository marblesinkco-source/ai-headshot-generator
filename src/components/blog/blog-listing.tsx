'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface BlogListingPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  readingTime: string;
}

/* ---------- Tag-based decorative SVG covers ---------- */

const BRAND = {
  paper: '#F8F5EF',
  beige: '#DCCDBB',
  bronze: '#C9A98A',
  bronzeInk: '#76563D',
  ink: '#171613',
  muted: '#5F5A54',
  line: '#DFD6CC',
};

function CameraPattern() {
  return (
    <>
      {/* Viewfinder / portrait frame */}
      <rect x="70" y="50" width="60" height="70" rx="6" fill="none" stroke={BRAND.bronzeInk} strokeWidth="2" opacity="0.5" />
      <circle cx="100" cy="78" r="16" fill="none" stroke={BRAND.bronze} strokeWidth="2" opacity="0.6" />
      <circle cx="100" cy="78" r="8" fill={BRAND.bronze} opacity="0.25" />
      {/* Shoulders silhouette */}
      <ellipse cx="100" cy="110" rx="28" ry="14" fill={BRAND.beige} opacity="0.5" />
      {/* Decorative dots */}
      <circle cx="40" cy="35" r="3" fill={BRAND.bronze} opacity="0.3" />
      <circle cx="160" cy="35" r="3" fill={BRAND.bronze} opacity="0.3" />
      <circle cx="40" cy="125" r="3" fill={BRAND.bronze} opacity="0.3" />
      <circle cx="160" cy="125" r="3" fill={BRAND.bronze} opacity="0.3" />
      {/* Corner accents */}
      <line x1="30" y1="30" x2="50" y2="30" stroke={BRAND.line} strokeWidth="1.5" opacity="0.6" />
      <line x1="30" y1="30" x2="30" y2="50" stroke={BRAND.line} strokeWidth="1.5" opacity="0.6" />
      <line x1="170" y1="130" x2="150" y2="130" stroke={BRAND.line} strokeWidth="1.5" opacity="0.6" />
      <line x1="170" y1="130" x2="170" y2="110" stroke={BRAND.line} strokeWidth="1.5" opacity="0.6" />
    </>
  );
}

function SplitPattern() {
  return (
    <>
      {/* Two halves with a divider */}
      <rect x="30" y="40" width="55" height="80" rx="8" fill={BRAND.beige} opacity="0.4" />
      <rect x="115" y="40" width="55" height="80" rx="8" fill={BRAND.bronze} opacity="0.2" />
      {/* VS divider */}
      <line x1="100" y1="35" x2="100" y2="125" stroke={BRAND.bronzeInk} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
      <circle cx="100" cy="80" r="12" fill={BRAND.paper} stroke={BRAND.bronzeInk} strokeWidth="1.5" opacity="0.6" />
      {/* Abstract face silhouettes */}
      <circle cx="57" cy="65" r="10" fill={BRAND.bronzeInk} opacity="0.15" />
      <circle cx="143" cy="65" r="10" fill={BRAND.bronzeInk} opacity="0.15" />
      {/* Arrows */}
      <line x1="40" y1="100" x2="70" y2="100" stroke={BRAND.bronze} strokeWidth="1.5" opacity="0.4" />
      <line x1="130" y1="100" x2="160" y2="100" stroke={BRAND.bronze} strokeWidth="1.5" opacity="0.4" />
    </>
  );
}

function GridPattern() {
  return (
    <>
      {/* People grid - 3x2 abstract avatars */}
      {[0, 1, 2].map((col) =>
        [0, 1].map((row) => (
          <g key={`${col}-${row}`}>
            <rect
              x={45 + col * 40}
              y={40 + row * 45}
              width="30"
              height="35"
              rx="6"
              fill={BRAND.beige}
              opacity={0.3 + (col + row) * 0.1}
            />
            <circle
              cx={60 + col * 40}
              cy={52 + row * 45}
              r="7"
              fill={BRAND.bronzeInk}
              opacity={0.15 + row * 0.05}
            />
          </g>
        )),
      )}
      {/* Connecting lines */}
      <line x1="60" y1="75" x2="100" y2="75" stroke={BRAND.line} strokeWidth="1" opacity="0.5" />
      <line x1="100" y1="75" x2="140" y2="75" stroke={BRAND.line} strokeWidth="1" opacity="0.5" />
      <line x1="100" y1="40" x2="100" y2="120" stroke={BRAND.line} strokeWidth="1" opacity="0.3" />
    </>
  );
}

function GraphPattern() {
  return (
    <>
      {/* Axes */}
      <line x1="40" y1="120" x2="160" y2="120" stroke={BRAND.muted} strokeWidth="1.5" opacity="0.3" />
      <line x1="40" y1="120" x2="40" y2="35" stroke={BRAND.muted} strokeWidth="1.5" opacity="0.3" />
      {/* Bar chart */}
      <rect x="55" y="85" width="14" height="35" rx="2" fill={BRAND.beige} opacity="0.6" />
      <rect x="78" y="65" width="14" height="55" rx="2" fill={BRAND.bronze} opacity="0.5" />
      <rect x="101" y="50" width="14" height="70" rx="2" fill={BRAND.bronzeInk} opacity="0.3" />
      <rect x="124" y="70" width="14" height="50" rx="2" fill={BRAND.bronze} opacity="0.4" />
      {/* Trend line */}
      <polyline
        points="62,80 85,60 108,45 131,65"
        fill="none"
        stroke={BRAND.bronzeInk}
        strokeWidth="2"
        opacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dots on line */}
      <circle cx="62" cy="80" r="3" fill={BRAND.bronzeInk} opacity="0.5" />
      <circle cx="85" cy="60" r="3" fill={BRAND.bronzeInk} opacity="0.5" />
      <circle cx="108" cy="45" r="3" fill={BRAND.bronzeInk} opacity="0.5" />
      <circle cx="131" cy="65" r="3" fill={BRAND.bronzeInk} opacity="0.5" />
    </>
  );
}

function ToolsPattern() {
  return (
    <>
      {/* Wrench shape */}
      <rect x="55" y="55" width="8" height="50" rx="3" fill={BRAND.bronze} opacity="0.35" transform="rotate(-30 59 80)" />
      <circle cx="55" cy="50" r="10" fill="none" stroke={BRAND.bronze} strokeWidth="2.5" opacity="0.35" />
      {/* Gear */}
      <circle cx="130" cy="70" r="16" fill="none" stroke={BRAND.bronzeInk} strokeWidth="2" opacity="0.3" />
      <circle cx="130" cy="70" r="8" fill={BRAND.beige} opacity="0.4" />
      {/* Gear teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <rect
          key={angle}
          x="128"
          y="52"
          width="4"
          height="6"
          rx="1"
          fill={BRAND.bronzeInk}
          opacity="0.25"
          transform={`rotate(${angle} 130 70)`}
        />
      ))}
      {/* Decorative dots */}
      <circle cx="90" cy="110" r="2.5" fill={BRAND.bronze} opacity="0.3" />
      <circle cx="100" cy="110" r="2.5" fill={BRAND.bronze} opacity="0.2" />
      <circle cx="110" cy="110" r="2.5" fill={BRAND.bronze} opacity="0.3" />
    </>
  );
}

function AbstractPattern() {
  return (
    <>
      {/* Overlapping circles */}
      <circle cx="80" cy="70" r="30" fill={BRAND.beige} opacity="0.35" />
      <circle cx="110" cy="65" r="24" fill={BRAND.bronze} opacity="0.2" />
      <circle cx="95" cy="95" r="18" fill={BRAND.bronzeInk} opacity="0.1" />
      {/* Scattered dots */}
      <circle cx="45" cy="45" r="3" fill={BRAND.bronze} opacity="0.3" />
      <circle cx="155" cy="50" r="4" fill={BRAND.beige} opacity="0.5" />
      <circle cx="150" cy="115" r="3" fill={BRAND.bronze} opacity="0.25" />
      <circle cx="50" cy="110" r="2" fill={BRAND.bronzeInk} opacity="0.2" />
      {/* Horizontal lines */}
      <line x1="40" y1="130" x2="80" y2="130" stroke={BRAND.line} strokeWidth="1" opacity="0.4" />
      <line x1="120" y1="35" x2="160" y2="35" stroke={BRAND.line} strokeWidth="1" opacity="0.4" />
    </>
  );
}

type BlogCoverVariant = 'camera' | 'split' | 'grid' | 'graph' | 'tools' | 'abstract';

function tagToVariant(tags: string[]): BlogCoverVariant {
  const first = (tags[0] ?? '').toLowerCase();
  if (['linkedin', 'tips'].some((k) => first.includes(k))) return 'camera';
  if (['comparison', 'ai photography'].some((k) => first.includes(k))) return 'split';
  if (['teams', 'branding', 'team'].some((k) => first.includes(k))) return 'grid';
  if (['research'].some((k) => first.includes(k))) return 'graph';
  if (['diy'].some((k) => first.includes(k))) return 'tools';
  return 'abstract';
}

const VARIANT_MAP: Record<BlogCoverVariant, () => JSX.Element> = {
  camera: CameraPattern,
  split: SplitPattern,
  grid: GridPattern,
  graph: GraphPattern,
  tools: ToolsPattern,
  abstract: AbstractPattern,
};

function BlogCover({ tags, className }: { tags: string[]; className?: string }) {
  const variant = tagToVariant(tags);
  const Pattern = VARIANT_MAP[variant];
  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-tp-paper via-tp-beige/30 to-tp-bronze/10 ${className ?? ''}`}>
      <svg
        viewBox="0 0 200 160"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full max-h-40 max-w-[250px]"
        aria-hidden="true"
        role="presentation"
      >
        <Pattern />
      </svg>
    </div>
  );
}

const ALL = 'All';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function NewsletterCta() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setMessage(data?.error || 'Something went wrong. Please try again.');
        return;
      }
      setStatus('success');
      setMessage('Thanks for subscribing. Check your inbox for a welcome email.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="my-12 rounded-tp-card border border-tp-line bg-tp-paper p-8 text-center sm:p-10"
    >
      <h2
        id="newsletter-heading"
        className="font-display text-2xl font-normal tracking-tight text-tp-ink sm:text-3xl"
      >
        Stay Updated
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-tp-muted sm:text-base">
        Get new guides and tips on AI photography delivered to your inbox. Unsubscribe anytime.
      </p>
      <form
        onSubmit={onSubmit}
        className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="blog-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="blog-newsletter-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="w-full flex-1 rounded-tp-button border border-tp-line bg-white px-4 py-2.5 text-sm text-tp-ink placeholder:text-tp-muted focus:border-tp-bronze focus:outline-none focus:ring-2 focus:ring-tp-bronze/30"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-tp-button bg-tp-bronze px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tp-bronze-ink disabled:opacity-60"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      <p
        role="status"
        aria-live="polite"
        className={`mt-3 min-h-[1.25rem] text-sm ${
          status === 'error' ? 'text-tp-ink' : 'text-tp-bronze-ink'
        }`}
      >
        {message}
      </p>
    </section>
  );
}

export function BlogListing({ posts }: { posts: BlogListingPost[] }) {
  const [active, setActive] = useState(ALL);

  const [featured, ...rest] = posts;

  const tags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return [ALL, ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  const filtered = useMemo(
    () => (active === ALL ? rest : rest.filter((p) => p.tags.includes(active))),
    [rest, active],
  );

  if (!featured) {
    return (
      <p className="py-12 text-center text-tp-muted">No blog posts yet. Check back soon!</p>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      {/* Featured post */}
      <article className="group relative overflow-hidden rounded-tp-card border border-tp-line bg-white shadow-sm transition-all hover:border-tp-bronze/40 hover:shadow-lg">
        <div className="grid md:grid-cols-2">
          <BlogCover tags={featured.tags} className="aspect-[16/9] md:aspect-auto md:min-h-[320px]" />
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <span className="mb-3 inline-block w-fit rounded-tp-button bg-tp-bronze px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Featured Post
            </span>
            <div className="mb-3 flex flex-wrap gap-2">
              {featured.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-tp-button bg-tp-paper px-2.5 py-0.5 text-[11px] font-medium text-tp-bronze-ink"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="font-display text-2xl font-normal tracking-tight text-tp-ink transition-colors group-hover:text-tp-bronze-ink sm:text-3xl lg:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-tp-muted">
              {featured.description}
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-tp-muted">
              <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span>{featured.readingTime}</span>
            </div>
            <Link
              href={`/blog/${featured.slug}`}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-tp-button bg-tp-bronze px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tp-bronze-ink after:absolute after:inset-0 after:content-['']"
            >
              Read More
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>

      {/* Newsletter */}
      <NewsletterCta />

      {/* Category filters */}
      <div
        role="group"
        aria-label="Filter posts by category"
        className="mb-8 flex flex-wrap gap-2"
      >
        {tags.map((tag) => {
          const isActive = tag === active;
          return (
            <button
              key={tag}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(tag)}
              className={`rounded-tp-button border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-tp-bronze bg-tp-bronze text-white'
                  : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze/40 hover:text-tp-bronze-ink'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-tp-card border border-tp-line bg-white shadow-sm transition-all hover:border-tp-bronze/40 hover:shadow-lg"
          >
            <BlogCover tags={post.tags} className="aspect-[16/9] rounded-t-tp-card" />
            <div className="p-5">
              <div className="mb-3 flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-tp-button bg-tp-paper px-2.5 py-0.5 text-[11px] font-medium text-tp-bronze-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-display text-lg font-normal text-tp-ink transition-colors line-clamp-2 group-hover:text-tp-bronze-ink">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-tp-muted line-clamp-2">{post.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <time dateTime={post.publishedAt} className="text-xs text-tp-muted">
                  {formatDate(post.publishedAt)}
                </time>
                <span className="text-xs text-tp-muted">{post.readingTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-tp-muted">
          No posts in this category yet.
        </p>
      )}
    </div>
  );
}
