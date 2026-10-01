import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { siteConfig } from '@/config/site';
import { getAllBlogPosts } from '@/config/blog';
import { ArrowRight } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/structured-data';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Tips, guides, and insights about AI photography from ${siteConfig.name}. Learn how to get the most from AI-generated photos.`,
  alternates: { canonical: '/blog' },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: `Tips, guides, and insights about AI photography from ${siteConfig.name}.`,
    url: `${siteConfig.url}/blog`,
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema items={[{ name: 'Home', url: siteConfig.url }, { name: 'Blog', url: siteConfig.url + '/blog' }]} />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            The{' '}
            <span className="bg-gradient-to-r from-tp-bronze-ink to-tp-bronze bg-clip-text text-transparent">
              TailorPic
            </span>{' '}
            Blog
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            Tips, tutorials, and insights on AI-powered photography. Learn how to get
            the best results and stay ahead of the curve.
          </p>
        </div>
      </section>

      {/* Blog posts grid */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg hover:border-tp-bronze/40"
              >
                {/* Cover image placeholder */}
                <div className="aspect-[16/9] rounded-t-2xl bg-gradient-to-br from-tp-paper via-tp-beige/30 to-tp-bronze/10 flex items-center justify-center">
                  <span className="text-3xl opacity-30">📝</span>
                </div>
                <div className="p-5">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-tp-paper px-2.5 py-0.5 text-[11px] font-medium text-tp-bronze-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-base font-semibold text-gray-900 group-hover:text-tp-bronze-ink transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-tp-muted">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="text-xs text-tp-muted">{post.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <p className="text-center text-gray-500 py-12">
              No blog posts yet. Check back soon!
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
