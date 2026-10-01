import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { siteConfig } from '@/config/site';
import { getAllBlogPosts } from '@/config/blog';
import { BlogListing } from '@/components/blog/blog-listing';
import { BreadcrumbSchema } from '@/components/structured-data';

export const metadata: Metadata = {
  title: 'Blog: AI Headshot Tips, Guides & Comparisons',
  keywords: ['AI headshots', 'LinkedIn headshot tips', 'AI photography guides', 'professional headshots', 'AI headshot alternatives'],
  authors: [{ name: `${siteConfig.name} Team` }],
  description: `Tips, guides, and insights about AI photography from ${siteConfig.name}. Learn how to get the most from AI-generated photos.`,
  alternates: { canonical: '/blog' },
  openGraph: generateOGMetadata({ title: `Blog | ${siteConfig.name}`, description: `Tips, guides, and insights about AI photography from ${siteConfig.name}.`, path: '/blog' }),
  twitter: generateTwitterMetadata({ title: `Blog | ${siteConfig.name}`, description: `Tips, guides, and insights about AI photography from ${siteConfig.name}.` }),
};

export default function BlogPage() {
  const allPosts = getAllBlogPosts();
  // Strip the large HTML `content` field so it is not serialized to the client.
  const posts = allPosts.map(({ slug, title, description, publishedAt, tags, readingTime }) => ({
    slug,
    title,
    description,
    publishedAt,
    tags,
    readingTime,
  }));

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
    <main id="main-content" className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd).replace(/</g, '\\u003c') }}
      />
      <BreadcrumbSchema items={[{ name: 'Home', url: siteConfig.url }, { name: 'Blog', url: siteConfig.url + '/blog' }]} />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <h1 className="font-display text-4xl font-normal tracking-tight text-tp-ink sm:text-5xl">
            The{' '}
            <span className="bg-gradient-to-r from-tp-bronze-ink to-tp-bronze bg-clip-text text-transparent">
              TailorPic
            </span>{' '}
            Blog
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-muted">
            Tips, tutorials, and insights on AI-powered photography. Learn how to get
            the best results and stay ahead of the curve.
          </p>
        </div>
      </section>

      <section className="pb-20">
        {posts.length > 0 ? (
          <BlogListing posts={posts} />
        ) : (
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
            <div className="rounded-tp-card border border-tp-line bg-tp-beige/40 p-10">
              <span className="inline-flex items-center rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-tp-bronze-ink">
                Coming soon
              </span>
              <h2 className="mt-5 font-display text-3xl font-normal text-tp-ink">
                Our first guides are on the way
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                In the meantime, explore our samples or see how TailorPic works.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/samples"
                  className="inline-flex items-center justify-center rounded-tp-button bg-tp-black px-6 py-3 text-sm font-medium text-tp-paper"
                >
                  View samples
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center rounded-tp-button border border-tp-line px-6 py-3 text-sm font-medium text-tp-ink"
                >
                  How it works
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
