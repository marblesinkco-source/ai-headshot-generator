import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { siteConfig } from '@/config/site';
import { getAllBlogPosts } from '@/config/blog';
import { BlogListing } from '@/components/blog/blog-listing';
import { BreadcrumbSchema } from '@/components/structured-data';
import { ArrowRight, Camera, Sparkles, BookOpen } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: { absolute: 'TailorPic Blog: AI Headshot Tips, Guides & Comparisons' },
  keywords: ['AI headshots', 'LinkedIn headshot tips', 'AI photography guides', 'professional headshots', 'AI headshot alternatives'],
  authors: [{ name: `${siteConfig.name} Team` }],
  description: 'Tips, guides and insights about AI photography from TailorPic. Learn how to get the most from AI-generated headshots, profile photos and team photos.',
  alternates: { canonical: '/blog' },
  openGraph: generateOGMetadata({ title: `Blog | ${siteConfig.name}`, description: `Tips, guides, and insights about AI photography from ${siteConfig.name}.`, path: '/blog' }),
  twitter: generateTwitterMetadata({ title: `Blog | ${siteConfig.name}`, description: `Tips, guides, and insights about AI photography from ${siteConfig.name}.` }),
};

/* Placeholder posts shown when the CMS / config has no entries yet. */
const placeholderPosts = [
  {
    slug: '#',
    title: '10 Tips for the Perfect LinkedIn Headshot',
    description: 'Your LinkedIn photo is your digital handshake. Learn what recruiters actually notice and how to make a strong first impression.',
    publishedAt: '2025-09-28',
    tags: ['LinkedIn', 'Tips'],
    readingTime: '6 min read',
  },
  {
    slug: '#',
    title: 'AI Headshots vs. Studio Photography: Which Is Right for You?',
    description: 'We break down cost, convenience, and quality so you can decide between an AI-generated headshot and a traditional photo session.',
    publishedAt: '2025-09-20',
    tags: ['Comparison', 'AI Photography'],
    readingTime: '8 min read',
  },
  {
    slug: '#',
    title: 'What to Wear for a Professional Headshot',
    description: 'Outfit choice matters more than you think. Here are wardrobe guidelines for every industry, from finance to creative fields.',
    publishedAt: '2025-09-14',
    tags: ['Tips', 'Style'],
    readingTime: '5 min read',
  },
  {
    slug: '#',
    title: 'How to Build a Consistent Team Photo Library',
    description: 'Mismatched headshots hurt your brand. See how companies align lighting, backgrounds, and style across every team member.',
    publishedAt: '2025-09-08',
    tags: ['Teams', 'Branding'],
    readingTime: '7 min read',
  },
  {
    slug: '#',
    title: 'The Psychology Behind Profile Photos That Get Results',
    description: 'Research shows certain expressions, angles, and colours boost trust and click-through. We summarise the science.',
    publishedAt: '2025-08-30',
    tags: ['Research', 'Branding'],
    readingTime: '6 min read',
  },
  {
    slug: '#',
    title: 'From Selfie to Studio Quality: A Step-by-Step Guide',
    description: 'Turn an ordinary phone selfie into a polished professional photo using free tools and a few clever techniques.',
    publishedAt: '2025-08-22',
    tags: ['DIY', 'Tips'],
    readingTime: '5 min read',
  },
];

export default function BlogPage() {
  const allPosts = getAllBlogPosts();
  const posts = allPosts.map(({ slug, title, description, publishedAt, tags, readingTime }) => ({
    slug,
    title,
    description,
    publishedAt,
    tags,
    readingTime,
  }));

  const hasPosts = posts.length > 0;
  const displayPosts = hasPosts ? posts : placeholderPosts;

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${siteConfig.name} Blog`,
    url: `${siteConfig.url}/blog`,
    description: `Tips, guides, and insights about AI photography from ${siteConfig.name}.`,
    publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    blogPost: allPosts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      url: `${siteConfig.url}/blog/${p.slug}`,
      datePublished: p.publishedAt,
      ...(p.updatedAt ? { dateModified: p.updatedAt } : {}),
      author: { '@type': 'Organization', name: p.author },
      keywords: p.tags.join(', '),
    })),
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd).replace(/</g, '\\u003c') }}
      />
      <BreadcrumbSchema items={[{ name: 'Home', url: siteConfig.url }, { name: 'Blog', url: siteConfig.url + '/blog' }]} />
      <Header />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-tp-line/40 bg-tp-paper pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-tp-bronze-ink">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            Insights &amp; Guides
          </span>

          <h1 className="font-display text-4xl font-normal tracking-tight text-tp-ink sm:text-5xl lg:text-6xl">
            The{' '}
            <span className="bg-gradient-to-r from-tp-bronze-ink to-tp-bronze bg-clip-text text-transparent">
              TailorPic
            </span>{' '}
            Blog
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-muted">
            Expert tips on professional headshots, AI photography, and personal branding.
            Everything you need to look your best online.
          </p>

          {/* Topic pills */}
          <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-2">
            {['Headshot Tips', 'LinkedIn Photos', 'AI Photography', 'Personal Branding'].map(
              (topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-1.5 rounded-full border border-tp-line bg-white px-3.5 py-1.5 text-xs font-medium text-tp-ink"
                >
                  <Sparkles className="h-3 w-3 text-tp-bronze" aria-hidden="true" />
                  {topic}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── Posts ── */}
      <section className="pb-20 pt-12 sm:pt-16">
        {hasPosts ? (
          <BlogListing posts={posts} />
        ) : (
          /* Placeholder grid when no real posts exist */
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            {/* Featured placeholder */}
            <article className="group relative overflow-hidden rounded-tp-card border border-tp-line bg-white shadow-sm">
              <div className="grid md:grid-cols-2">
                <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-tp-paper via-tp-beige/30 to-tp-bronze/10 md:aspect-auto md:min-h-[320px]">
                  <Camera className="h-16 w-16 text-tp-bronze/20" aria-hidden="true" />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <span className="mb-3 inline-block w-fit rounded-tp-button bg-tp-bronze px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    Featured Post
                  </span>
                  <h2 className="font-display text-2xl font-normal tracking-tight text-tp-ink sm:text-3xl">
                    {displayPosts[0].title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-tp-muted">
                    {displayPosts[0].description}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-tp-muted">
                    <time dateTime={displayPosts[0].publishedAt}>
                      {formatDate(displayPosts[0].publishedAt)}
                    </time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{displayPosts[0].readingTime}</span>
                  </div>
                  <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-tp-button bg-tp-bronze/20 px-5 py-2.5 text-sm font-semibold text-tp-bronze-ink">
                    Coming Soon
                  </span>
                </div>
              </div>
            </article>

            {/* Placeholder grid */}
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {displayPosts.slice(1).map((post, i) => (
                <div
                  key={i}
                  className="group rounded-tp-card border border-tp-line bg-white shadow-sm"
                >
                  <div className="flex aspect-[16/9] items-center justify-center rounded-t-[18px] bg-gradient-to-br from-tp-paper via-tp-beige/30 to-tp-bronze/10">
                    <Camera className="h-10 w-10 text-tp-bronze/20" aria-hidden="true" />
                  </div>
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
                    <h3 className="font-display text-lg font-normal text-tp-ink line-clamp-2">
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
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Newsletter Section ── */}
      <section className="border-y border-tp-line bg-tp-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-tp-bronze-ink">
            Newsletter
          </span>
          <h2 className="font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
            Subscribe to our newsletter
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-tp-muted">
            Subscribe to our newsletter for professional image tips. Get actionable
            advice on headshots, personal branding, and AI photography delivered
            straight to your inbox.
          </p>
          <form
            action="/api/newsletter"
            method="POST"
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="blog-page-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="blog-page-newsletter-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full flex-1 rounded-tp-button border border-tp-line bg-white px-4 py-3 text-sm text-tp-ink placeholder:text-tp-muted/80 focus:border-tp-bronze focus:outline-none focus:ring-2 focus:ring-tp-bronze/30"
            />
            <button
              type="submit"
              className="rounded-tp-button bg-tp-black px-6 py-3 text-sm font-semibold text-tp-paper shadow-md shadow-tp-black/15 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-xs text-tp-muted">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-tp-ink">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <h2 className="font-display text-3xl font-normal tracking-tight text-tp-paper sm:text-4xl">
            Ready to upgrade your professional image?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-tp-beige/70">
            Get studio-quality AI headshots in minutes. Upload a few selfies, choose your
            style, and let TailorPic do the rest.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/register"
              className="group inline-flex items-center gap-3 rounded-tp-button border border-tp-bronze bg-tp-bronze px-8 py-3.5 text-sm font-semibold text-tp-black shadow-md shadow-tp-bronze/20 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              href="/samples"
              className="inline-flex items-center justify-center rounded-tp-button border border-tp-beige/30 px-6 py-3.5 text-sm font-medium text-tp-beige/80 transition-colors hover:border-tp-beige/60 hover:text-tp-paper"
            >
              View Samples
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
