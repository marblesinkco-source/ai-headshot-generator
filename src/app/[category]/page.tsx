import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
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
import { ProductSchema } from '@/components/structured-data';

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
    openGraph: {
      title: `${cat.seoTitle} | ${siteConfig.name}`,
      description: cat.seoDescription,
      url: `${siteConfig.url}/${cat.slug}`,
      siteName: siteConfig.name,
      type: 'website',
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

  return (
    <main className="min-h-screen">
      <ProductSchema
        name={cat.name}
        description={cat.seoDescription}
        price={lowestPrice}
        category="AI Photo Generation"
        slug={cat.slug}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className={`pointer-events-none absolute -top-24 right-0 h-[500px] w-[500px] rounded-full ${cat.color.replace('brand', 'brand')}/10 blur-3xl`} />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-tp-line bg-tp-paper px-4 py-1.5 text-sm font-medium text-tp-bronze-ink">
              <span className="text-lg">{cat.icon}</span>
              {cat.name}
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              {cat.seoTitle}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              {cat.description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href={`/dashboard/upload?category=${cat.id}`}>
                <Button size="lg">
                  Get Your {cat.outputLabel}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works for this category */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">
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
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Choose Your Package
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Select the plan that fits your needs.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            {cat.packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-2xl border-2 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg ${
                  pkg.recommended ? 'border-tp-bronze ring-2 ring-tp-beige/30' : 'border-gray-200'
                }`}
              >
                {pkg.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-tp-black px-4 py-0.5 text-xs font-medium text-tp-bronze whitespace-nowrap">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold text-gray-900">{pkg.name}</h3>
                <p className="mt-3 text-4xl font-bold text-gray-900">
                  {formatPrice(pkg.price, pkg.currency)}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {pkg.outputCount} {cat.outputLabel}
                  </li>
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/dashboard/upload?category=${cat.id}`} className="block mt-8">
                  <Button
                    variant={pkg.recommended ? 'primary' : 'outline'}
                    size="md"
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload requirements */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Photo Requirements
          </h2>
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold text-gray-900">Upload Guidelines</h3>
                <p className="mt-2 text-sm text-gray-600">{cat.uploadInstructions}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Photo Count</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Upload between {cat.minPhotos} and {cat.maxPhotos} photos for best results.
                  More photos give the AI more to work with.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready for Your {cat.name}?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Upload your photos and get AI-generated results in hours.
          </p>
          <div className="mt-8">
            <Link href={`/dashboard/upload?category=${cat.id}`}>
              <Button size="lg">Get Started Now</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
