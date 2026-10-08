'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { getBlogCover } from '@/config/stock-portraits';

export interface BlogListingPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  readingTime: string;
}

function BlogCover({ slug, title, className }: { slug: string; title?: string; className?: string }) {
  const coverUrl = getBlogCover(slug);
  return (
    <div className={`relative overflow-hidden bg-tp-paper ${className ?? ''}`}>
      <Image
        src={coverUrl}
        alt={title ? `Cover image for ${title}` : ''}
        fill
        sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

const ALL = 'All';

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
          className="w-full flex-1 rounded-tp-button border border-tp-line bg-white px-4 py-2.5 text-sm text-tp-ink placeholder:text-tp-muted/80 focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/40"
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
          <BlogCover slug={featured.slug} title={featured.title} className="aspect-[16/9] md:aspect-auto md:min-h-[320px]" />
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
            <BlogCover slug={post.slug} title={post.title} className="aspect-[16/9] rounded-t-tp-card" />
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
