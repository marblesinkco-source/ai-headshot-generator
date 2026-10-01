import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Check,
  Lightbulb,
  Sparkles,
  Users,
} from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';
import { getPhotoStyle, getAllPhotoStyles } from '@/config/styles';
import { getCategoryBySlug } from '@/config/categories';
import { getBlogPost } from '@/config/blog';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { RelatedLinks } from '@/components/related-links';
import { getRelatedStyles } from '@/lib/internal-links';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPhotoStyles().map((style) => ({ slug: style.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const style = getPhotoStyle(slug);
  if (!style) return {};

  const title = `${style.name} — AI-Generated ${style.name} | ${siteConfig.name}`;
  return {
    title,
    description: style.metaDescription,
    alternates: { canonical: `/styles/${style.slug}` },
    openGraph: generateOGMetadata({
      title: style.name,
      description: style.metaDescription,
      type: 'style',
      path: `/styles/${style.slug}`,
    }),
    twitter: generateTwitterMetadata({
      title: style.name,
      description: style.metaDescription,
      type: 'style',
    }),
  };
}

export default async function StylePage({ params }: Props) {
  const { slug } = await params;
  const style = getPhotoStyle(slug);
  if (!style) notFound();

  const categories = style.relatedCategories
    .map((s) => getCategoryBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const posts = style.relatedBlogPosts
    .map((s) => getBlogPost(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const relatedStyles = getRelatedStyles(slug);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: style.name,
    description: style.metaDescription,
    brand: { '@type': 'Brand', name: siteConfig.name },
    category: 'AI Photo Style',
    url: `${siteConfig.url}/styles/${style.slug}`,
    offers: {
      '@type': 'Offer',
      price: 9.9,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: siteConfig.name },
    },
  };

  return (
    <main id="main-content" className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Photo Styles', url: `${siteConfig.url}/styles` },
          { name: style.name, url: `${siteConfig.url}/styles/${style.slug}` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="bg-tp-paper py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-tp-muted">
            <Link href="/styles" className="hover:text-tp-bronze-ink">
              Photo Styles
            </Link>
            <span className="mx-2">/</span>
            <span className="text-tp-ink">{style.name}</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
            Photo Style
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-tp-ink sm:text-5xl">
            {style.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-tp-muted">
            {style.description}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base text-tp-muted">
            {style.heroText}
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/auth/register"
              className={buttonVariants({ variant: 'primary', size: 'lg' })}
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl tracking-tight text-tp-ink">
            What Makes {style.name} Different
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {style.features.map((feature) => (
              <div
                key={feature}
                className="rounded-tp-card border border-tp-line bg-white p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-beige">
                  <Sparkles className="h-5 w-5 text-tp-bronze-ink" />
                </div>
                <p className="text-sm leading-relaxed text-tp-ink">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal for */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            <Users className="h-6 w-6 text-tp-bronze-ink" />
            <h2 className="font-display text-3xl tracking-tight text-tp-ink">
              Ideal For
            </h2>
          </div>
          <ul className="mt-8 space-y-3">
            {style.idealFor.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-tp-card border border-tp-line bg-white p-4"
              >
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-tp-bronze-ink" />
                <span className="text-tp-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            <Lightbulb className="h-6 w-6 text-tp-bronze-ink" />
            <h2 className="font-display text-3xl tracking-tight text-tp-ink">
              Tips for Best Results
            </h2>
          </div>
          <ol className="mt-8 space-y-4">
            {style.tips.map((tip, i) => (
              <li key={tip} className="flex items-start gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-tp-ink text-sm font-semibold text-tp-bronze">
                  {i + 1}
                </span>
                <p className="pt-1 text-tp-muted">{tip}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Related categories */}
      {categories.length > 0 && (
        <section className="bg-tp-paper py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-3xl tracking-tight text-tp-ink">
              Related Photo Categories
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="group rounded-tp-card border border-tp-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-tp-bronze hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-tp-ink">{cat.name}</h3>
                  <p className="mt-2 text-sm text-tp-muted">{cat.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-tp-bronze-ink">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related blog posts */}
      {posts.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2">
              <BookOpen className="h-6 w-6 text-tp-bronze-ink" />
              <h2 className="font-display text-3xl tracking-tight text-tp-ink">
                Related Guides
              </h2>
            </div>
            <ul className="mt-8 space-y-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center justify-between gap-4 rounded-tp-card border border-tp-line bg-white p-4 transition-colors hover:border-tp-bronze"
                  >
                    <span className="font-medium text-tp-ink">{post.title}</span>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-tp-bronze-ink" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-tp-ink py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl tracking-tight text-white">
            Get Your {style.name} Today
          </h2>
          <p className="mt-4 text-tp-beige">
            Upload a few selfies and receive studio-quality results in minutes.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/auth/register"
              className={buttonVariants({ variant: 'primary', size: 'lg' })}
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {relatedStyles.length > 0 && (
        <RelatedLinks links={relatedStyles} title="Explore More Styles" />
      )}

      <Footer />
    </main>
  );
}
