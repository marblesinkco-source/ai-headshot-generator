import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { EmailCapture } from '@/components/marketing/email-capture';
import { siteConfig } from '@/config/site';
import { getBlogPost, getAllBlogPosts } from '@/config/blog';
import { ArticleSchema, BreadcrumbSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata, buildOGImageUrl, clampTitle, clampDescription } from '@/lib/og-metadata';
import { ArrowLeft, ArrowRight } from 'lucide-react';

function getRelatedPosts(currentSlug: string, currentTags: string[], count = 3) {
  const allPosts = getAllBlogPosts();
  return allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      ...p,
      relevance: p.tags.filter((t) => currentTags.includes(t)).length,
    }))
    .sort((a, b) => b.relevance - a.relevance || new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  // Keep <title> and meta description within search-result display limits.
  // The full headline and description stay on the page (h1 / OG / schema).
  const seoTitle = clampTitle(post.title);
  const seoDescription = clampDescription(post.description);

  return {
    title: seoTitle.length + ' | TailorPic'.length <= 60 ? seoTitle : { absolute: seoTitle },
    description: seoDescription,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: generateOGMetadata({
      title: post.title,
      description: post.description,
      type: 'blog',
      path: `/blog/${post.slug}`,
    }),
    twitter: generateTwitterMetadata({
      title: post.title,
      description: post.description,
      type: 'blog',
    }),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main id="main-content" className="min-h-screen">
      <ArticleSchema
        title={post.title}
        description={post.description}
        slug={post.slug}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        author={post.author}
        image={buildOGImageUrl({ title: post.title, type: 'blog' })}
        keywords={post.tags}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Blog', url: `${siteConfig.url}/blog` },
          { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
        ]}
      />
      <Header />

      <article className="pt-16">
        {/* Header */}
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-tp-bronze-ink hover:text-tp-bronze transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-tp-paper border border-tp-line px-3 py-1 text-xs font-medium text-tp-bronze-ink"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-tp-muted">
            <address className="not-italic">{post.author}</address>
            <span>&middot;</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <>
                <span>&middot;</span>
                <span>
                  Updated{' '}
                  <time dateTime={post.updatedAt}>
                    {new Date(post.updatedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                </span>
              </>
            )}
            <span>&middot;</span>
            <span>{post.readingTime}</span>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
          <div
            className="prose prose-gray max-w-none prose-headings:font-display prose-headings:font-normal prose-headings:text-tp-ink prose-p:text-tp-muted prose-p:leading-relaxed prose-a:text-tp-bronze-ink prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-tp-bronze prose-strong:text-tp-ink prose-li:text-tp-muted"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <EmailCapture variant="banner" className="mt-12" />
        </div>

        {/* Related Posts */}
        {(() => {
          const related = getRelatedPosts(post.slug, post.tags);
          if (related.length === 0) return null;
          return (
            <div className="border-t border-tp-line bg-white py-16">
              <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <h2 className="font-display text-2xl font-normal text-tp-ink mb-8">You might also like</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/blog/${rp.slug}`}
                      className="group rounded-tp-card border border-tp-line bg-white p-5 transition-all hover:border-tp-bronze/40 hover:shadow-md"
                    >
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {rp.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-tp-paper border border-tp-line px-2.5 py-0.5 text-[11px] font-medium text-tp-bronze-ink"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-sm font-bold text-tp-ink group-hover:text-tp-bronze-ink transition-colors line-clamp-2">
                        {rp.title}
                      </h3>
                      <p className="mt-2 text-xs text-tp-muted line-clamp-2">{rp.description}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-tp-bronze-ink group-hover:text-tp-bronze transition-colors">
                        Read more <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* CTA */}
        <div className="border-t border-tp-line bg-tp-paper py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-normal text-tp-ink">
              Ready to Try AI Photography?
            </h2>
            <p className="mt-3 text-tp-muted">
              Create professional-quality photos in minutes with TailorPic.
            </p>
            <Link
              href="/auth/register?redirect=/headshots"
              className="mt-6 inline-flex items-center justify-center rounded-tp-button bg-tp-black px-8 py-3 text-sm font-semibold text-tp-bronze shadow-sm transition-all hover:bg-tp-black/90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
