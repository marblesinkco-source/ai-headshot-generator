import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { DollarSign, Clock, ShieldCheck, Trash2 } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Button } from '@/components/ui/button';
import {
  getActiveCategories,
  getCategoryBySlug,
  type CategoryId,
} from '@/config/categories';
import { siteConfig } from '@/config/site';
import { formatPrice } from '@/lib/utils';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getActiveCategories().map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};

  return {
    title: cat.seoTitle,
    description: cat.seoDescription,
    alternates: { canonical: `/${cat.slug}` },
    openGraph: {
      title: `${cat.seoTitle} | ${siteConfig.name}`,
      description: cat.seoDescription,
      url: `${siteConfig.url}/${cat.slug}`,
      siteName: siteConfig.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cat.seoTitle} | ${siteConfig.name}`,
      description: cat.seoDescription,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);

  if (!cat || !cat.active) {
    notFound();
  }

  const lowestPrice = Math.min(...cat.packages.map((p) => p.price));

  const allCategories = getActiveCategories();
  const relatedCategories = allCategories
    .filter((c) => c.id !== cat.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const faqItems = [
    {
      question: 'How many photos do I need to upload?',
      answer:
        'Upload 10-20 clear selfies with varied angles, expressions, and lighting. The more variety you provide, the better results our AI can generate.',
    },
    {
      question: 'How long does it take?',
      answer:
        'About 2 hours from upload to download. You will receive an email notification as soon as your photos are ready.',
    },
    {
      question: 'Can I get a refund?',
      answer:
        'Yes, we offer a 14-day money-back guarantee. If you are not satisfied with your results, contact our support team for a full refund.',
    },
    {
      question: 'What resolution are the photos?',
      answer:
        'All photos are high-resolution, suitable for both print and web use. Premium packages include 4K resolution output.',
    },
  ];

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: cat.name,
    description: cat.seoDescription,
    image: `${siteConfig.url}/images/categories/${cat.id}.jpg`,
    sku: cat.id,
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    category: 'AI Photo Generation',
    url: `${siteConfig.url}/${cat.slug}`,
    offers: {
      '@type': 'Offer',
      price: lowestPrice / 100,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'US',
        returnPolicyCategory:
          'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
  };

  return (
    <main id="main-content" className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: cat.name, url: `${siteConfig.url}/${cat.slug}` },
      ]} />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 bg-tp-paper">
        <div className="pointer-events-none absolute inset-0 bg-grid" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-tp-line bg-white px-4 py-1.5 text-sm font-medium text-tp-bronze-ink">
              <span className="text-lg">{cat.icon}</span>
              {cat.name}
            </div>

            <h1 className="font-display text-4xl font-normal tracking-tight text-tp-black sm:text-5xl">
              {cat.seoTitle}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-tp-muted">
              {cat.description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/auth/register">
                <Button size="lg" variant="primary">
                  Get Your {cat.outputLabel}
                </Button>
              </Link>
              <span className="text-sm text-tp-muted">
                Starting from {formatPrice(lowestPrice, 'usd')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works for this category */}
      <section className="bg-white py-20 border-t border-tp-line/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-normal text-tp-black">
            How It Works
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Upload Photos',
                desc: cat.uploadInstructions,
              },
              {
                step: '2',
                title: 'AI Creates Your Photos',
                desc: `Our AI analyzes your photos and generates ${cat.outputLabel} tailored to your preferences.`,
              },
              {
                step: '3',
                title: 'Download & Use',
                desc: `Get high-quality ${cat.outputLabel} ready for immediate use. Download in multiple formats.`,
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tp-black text-lg font-bold text-tp-bronze">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-tp-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-tp-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-tp-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-normal text-tp-black">
            Choose Your Package
          </h2>
          <p className="mt-4 text-center text-tp-muted">
            Select the plan that fits your needs.
          </p>

          <div className={`mt-12 grid gap-5 max-w-5xl mx-auto ${
            cat.packages.length <= 3
              ? 'sm:grid-cols-3'
              : 'sm:grid-cols-2 lg:grid-cols-4'
          }`}>
            {cat.packages.map((pkg) => {
              const isExpress = pkg.name === 'Express';

              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-tp-card border-2 bg-white p-6 lg:p-8 shadow-sm transition-shadow hover:shadow-lg ${
                    pkg.recommended
                      ? 'border-tp-bronze ring-2 ring-tp-beige/30'
                      : isExpress
                        ? 'border-tp-bronze/40'
                        : 'border-tp-line'
                  }`}
                >
                  {pkg.recommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-tp-black px-4 py-0.5 text-xs font-medium text-tp-bronze whitespace-nowrap">
                      Most Popular
                    </span>
                  )}
                  {isExpress && !pkg.recommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-tp-bronze px-4 py-0.5 text-xs font-medium text-white whitespace-nowrap">
                      Try It
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-tp-ink">{pkg.name}</h3>
                  <p className="mt-3 text-3xl lg:text-4xl font-bold text-tp-black">
                    {formatPrice(pkg.price, pkg.currency)}
                  </p>
                  <ul className="mt-5 space-y-2.5 text-sm text-tp-muted">
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="font-medium text-tp-ink">{pkg.outputCount} {cat.outputLabel}</span>
                    </li>
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/register" className="block mt-6">
                    <Button
                      variant={pkg.recommended ? 'primary' : 'outline'}
                      size="md"
                      className="w-full"
                    >
                      {isExpress ? 'Try Express' : 'Get Started'}
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-tp-paper py-12 border-t border-tp-line/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {[
              { icon: DollarSign, text: '$9.90 one-time, no subscription' },
              { icon: Clock, text: 'Ready in ~2 hours' },
              { icon: ShieldCheck, text: '14-day money-back guarantee' },
              { icon: Trash2, text: 'Your data deleted within 30 days' },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-3">
                <item.icon className="h-5 w-5 flex-shrink-0 text-tp-bronze-ink mt-0.5" />
                <span className="text-sm text-tp-muted">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload requirements */}
      <section className="bg-white py-20 border-t border-tp-line/40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-normal text-tp-black">
            Photo Requirements
          </h2>
          <div className="mt-8 rounded-tp-card border border-tp-line bg-tp-paper p-8 shadow-sm">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold text-tp-ink">Upload Guidelines</h3>
                <p className="mt-2 text-sm text-tp-muted">{cat.uploadInstructions}</p>
              </div>
              <div>
                <h3 className="font-semibold text-tp-ink">Photo Count</h3>
                <p className="mt-2 text-sm text-tp-muted">
                  Upload between {cat.minPhotos} and {cat.maxPhotos} photos for best results.
                  More photos give the AI more to work with.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-tp-paper">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-normal text-tp-black">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-tp-button border border-tp-line bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 text-tp-ink font-medium list-none [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-tp-muted transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-sm leading-relaxed text-tp-muted">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related categories */}
      <section className="bg-white py-20 border-t border-tp-line/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-normal text-tp-black">
            Explore Other Styles
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {relatedCategories.map((related) => (
              <Link
                key={related.id}
                href={`/${related.slug}`}
                className="group overflow-hidden rounded-tp-card border border-tp-line bg-white transition-shadow hover:shadow-lg"
              >
                <div className="aspect-[16/9] overflow-hidden bg-tp-beige">
                  <Image
                    src={`/images/categories/${related.id}.jpg`}
                    alt={related.name}
                    width={480}
                    height={270}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-tp-ink">{related.name}</h3>
                  <p className="mt-1 text-sm text-tp-muted line-clamp-2">
                    {related.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-tp-paper">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-normal text-tp-black">
            Ready for Your {cat.name}?
          </h2>
          <p className="mt-4 text-lg text-tp-muted">
            Upload your photos and get AI-generated results in hours.
          </p>
          <div className="mt-8">
            <Link href="/auth/register">
              <Button size="lg" variant="primary">Get Started Now</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
