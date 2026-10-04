import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { Camera, Sparkles, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Button } from '@/components/ui/button';
import { getActiveCategories, getCategoryBySlug } from '@/config/categories';
import { getCategoryContent } from '@/config/category-content';
import { getCategoryVisuals, getCategoryImage, categoryVisuals } from '@/config/category-visuals';
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
    title: { absolute: cat.seoTitle },
    description: cat.seoDescription,
    alternates: { canonical: `/${cat.slug}` },
    openGraph: generateOGMetadata({ title: cat.seoTitle, description: cat.seoDescription, path: `/${cat.slug}` }),
    twitter: generateTwitterMetadata({ title: cat.seoTitle, description: cat.seoDescription }),
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);

  if (!cat || !cat.active) {
    notFound();
  }

  const content = getCategoryContent(cat.id);
  const visuals = getCategoryVisuals(cat.id);
  const fallbackSrc = `/images/categories/${cat.id}.jpg`;
  const heroAsset = visuals?.heroDesktop ?? getCategoryImage(cat.id, 'heroDesktop');
  const heroSrc = heroAsset?.src ?? fallbackSrc;
  const beforeAsset = visuals?.beforeAfter?.before;
  const afterAsset = visuals?.beforeAfter?.after;
  const beforeSrc = beforeAsset?.src ?? heroSrc;
  const afterSrc = afterAsset?.src ?? heroSrc;
  const galleryItems = visuals?.gallery ?? [];
  const lowestPrice = Math.min(...cat.packages.map((p) => p.price));

  const allCategories = getActiveCategories();
  const relatedCategories = allCategories
    .filter((c) => c.id !== cat.id)
    .slice(0, 6);

  // Pick top 3 packages for the pricing teaser: entry, recommended, and one more
  const recommended = cat.packages.find((p) => p.recommended);
  const entry = cat.packages[0];
  const teaserPackages = recommended
    ? [
        entry,
        recommended,
        cat.packages[cat.packages.length - 1] !== recommended
          ? cat.packages[cat.packages.length - 1]
          : cat.packages[cat.packages.length - 2],
      ].filter((p, i, arr) => p && arr.indexOf(p) === i)
    : cat.packages.slice(0, 3);

  // Use first 3 benefits for hero bullets
  const heroBenefits = content?.benefits.slice(0, 3) ?? [];

  // FAQ items — category-specific or generic fallback
  const faqItems = content?.faqItems ?? [
    {
      question: 'How many photos do I need to upload?',
      answer: `Upload ${cat.minPhotos}–${cat.maxPhotos} clear photos with varied angles, expressions, and lighting for best results.`,
    },
    {
      question: 'How long does it take?',
      answer: 'About 2 hours from upload to download. You will receive an email notification as soon as your photos are ready.',
    },
    {
      question: 'Can I get a refund?',
      answer: 'Yes, we offer a satisfaction guarantee. If you are not satisfied with your results, contact our support team for a full refund.',
    },
    {
      question: 'What resolution are the photos?',
      answer: 'All photos are high-resolution, suitable for both print and web use. Premium packages include 4K resolution output.',
    },
  ];

  const useCases = content?.useCases ?? [];
  const howItWorks = content?.howItWorks ?? [
    { step: '1', title: 'Upload Your Photos', description: cat.uploadInstructions },
    { step: '2', title: 'AI Creates Your Photos', description: `Our AI analyzes your photos and generates ${cat.outputLabel} tailored to your preferences.` },
    { step: '3', title: 'Preview & Choose', description: 'Review your results and pick your favorites from multiple options.' },
    { step: '4', title: 'Download & Use', description: `Get high-quality ${cat.outputLabel} ready for immediate use. Download in multiple formats.` },
  ];

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: cat.name,
    description: cat.seoDescription,
    image: `${siteConfig.url}${heroSrc}`,
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

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-tp-paper">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />

        <div className="relative mx-auto max-w-tp-site px-4 pb-0 pt-24 sm:px-6 sm:pt-32 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-sm text-tp-muted">
            <Link href="/" className="transition-colors hover:text-tp-ink">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="text-tp-ink">{cat.name}</span>
          </nav>

          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Left: Copy */}
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-tp-line bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">
                <span className="inline-block w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={categoryVisuals[cat.id]?.megaMenu?.src ?? `/images/categories/${cat.id}.jpg`}
                    alt=""
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    sizes="20px"
                  />
                </span>
                {cat.name}
              </div>

              <h1 className="font-display text-4xl font-normal tracking-tight text-tp-black sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                {cat.seoTitle.replace(' | TailorPic', '')}
              </h1>

              <p className="mt-5 text-lg leading-relaxed text-tp-muted">
                {cat.description}
              </p>

              {/* Hero benefits checklist */}
              {heroBenefits.length > 0 && (
                <ul className="mt-7 space-y-3">
                  {heroBenefits.map((b) => (
                    <li key={b.title} className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-tp-success" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-tp-ink">{b.title}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href={`/auth/register?redirect=/${slug}`}>
                  <Button size="lg" variant="primary">
                    Get Started
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <span className="text-sm text-tp-muted">
                  From {formatPrice(lowestPrice, 'usd')} · 100% Satisfaction Guarantee
                </span>
              </div>
            </div>

            {/* Right: Image collage placeholder */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`overflow-hidden rounded-tp-card bg-tp-warm ${
                      i === 1 ? 'aspect-[3/4] col-span-1' :
                      i === 2 ? 'aspect-square col-span-1 mt-8' :
                      i === 3 ? 'aspect-square col-span-1' :
                      'aspect-[3/4] col-span-1 -mt-8'
                    }`}
                  >
                    <Image
                      src={heroSrc}
                      alt={heroAsset?.alt ?? `${cat.name} example ${i}`}
                      width={320}
                      height={i % 2 === 1 ? 427 : 320}
                      className="h-full w-full object-cover"
                      style={heroAsset?.desktopObjectPosition ? { objectPosition: heroAsset.desktopObjectPosition } : undefined}
                      sizes="(min-width: 1024px) 20vw, 0px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="relative mt-12 border-t border-tp-line/40 bg-tp-paper/80 py-6 backdrop-blur-sm sm:mt-16">
          <div className="mx-auto grid max-w-tp-site grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:gap-6 sm:px-6 lg:px-8">
            {[
              { icon: Camera, text: 'Studio-quality results using advanced AI' },
              { icon: Sparkles, text: 'Multiple styles and backgrounds' },
              { icon: Clock, text: 'Ready in about 2 hours' },
              { icon: ShieldCheck, text: 'Secure and private' },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-3">
                <item.icon className="h-5 w-5 flex-shrink-0 text-tp-bronze-ink" />
                <span className="text-sm leading-snug text-tp-muted">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE & AFTER ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-tp-site px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-2xl font-normal text-tp-black sm:text-3xl">
              Before &amp; After
              <span className="ml-3 text-base font-sans text-tp-muted">– See the Transformation</span>
            </h2>
          </div>

          <div className="mt-10 grid items-center gap-8 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-tp-card border border-tp-line bg-tp-paper">
              <div className="grid grid-cols-2">
                <div className="relative aspect-[3/4] bg-tp-warm">
                  <div className="absolute bottom-3 left-3 rounded-full bg-tp-black/70 px-3 py-1 text-xs font-medium text-white">
                    Before
                  </div>
                  <Image
                    src={beforeSrc}
                    alt={beforeAsset?.alt ?? `Before - ${cat.name}`}
                    fill
                    className="object-cover opacity-80 grayscale-[30%]"
                    style={(beforeAsset ?? heroAsset)?.desktopObjectPosition ? { objectPosition: (beforeAsset ?? heroAsset)?.desktopObjectPosition } : undefined}
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                </div>
                <div className="relative aspect-[3/4] bg-tp-warm">
                  <div className="absolute bottom-3 right-3 rounded-full bg-tp-bronze px-3 py-1 text-xs font-medium text-white">
                    After
                  </div>
                  <Image
                    src={afterSrc}
                    alt={afterAsset?.alt ?? `After - ${cat.name}`}
                    fill
                    className="object-cover"
                    style={(afterAsset ?? heroAsset)?.desktopObjectPosition ? { objectPosition: (afterAsset ?? heroAsset)?.desktopObjectPosition } : undefined}
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-tp-muted">
                Turn your everyday photos into stunning, professional results.
                Our AI enhances lighting, refines backgrounds, and creates {cat.outputLabel} that
                look like they were taken in a professional studio.
              </p>
              <Link
                href={`/samples`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-tp-bronze-ink transition-colors hover:text-tp-ink"
              >
                View More Examples
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SAMPLE GALLERY ── */}
      <section className="border-t border-tp-line/40 bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-tp-site px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-2xl font-normal text-tp-black sm:text-3xl">
              Sample Gallery
            </h2>
            <Link
              href="/samples"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-tp-bronze-ink transition-colors hover:text-tp-ink"
            >
              View More Examples
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => {
              const g = galleryItems.length > 0 ? galleryItems[i % galleryItems.length] : undefined;
              return (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-tp-button bg-tp-warm"
              >
                <Image
                  src={g?.src ?? fallbackSrc}
                  alt={g?.alt ?? `${cat.name} sample ${i + 1}`}
                  width={240}
                  height={240}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  style={g?.desktopObjectPosition ? { objectPosition: g.desktopObjectPosition } : undefined}
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                />
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PERFECT FOR (Use Cases) ── */}
      {useCases.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-tp-site px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-normal text-tp-black sm:text-3xl">
              Perfect For
            </h2>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {useCases.slice(0, 6).map((uc) => (
                <div
                  key={uc.title}
                  className="flex flex-col items-center rounded-tp-button border border-tp-line bg-tp-paper/60 px-4 py-5 text-center transition-shadow hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tp-warm text-tp-bronze-ink">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-tp-ink">{uc.title}</h3>
                  <p className="mt-1 text-xs text-tp-muted line-clamp-2">{uc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ── */}
      <section className="border-t border-tp-line/40 bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-tp-site px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-normal text-tp-black sm:text-3xl">
            How It Works
          </h2>

          <div className={`mt-12 grid gap-6 sm:gap-4 ${
            howItWorks.length === 4
              ? 'sm:grid-cols-4'
              : 'sm:grid-cols-3'
          }`}>
            {howItWorks.map((item, i) => (
              <div key={item.step} className="relative text-center">
                {/* Arrow connector (hidden on mobile, shown between items) */}
                {i < howItWorks.length - 1 && (
                  <div className="pointer-events-none absolute right-0 top-6 hidden translate-x-1/2 text-tp-line sm:block">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                )}

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tp-black text-lg font-bold text-tp-bronze">
                  {item.step}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-tp-ink sm:text-base">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TEASER ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-normal text-tp-black sm:text-3xl">
            Choose Your Package
          </h2>
          <p className="mt-3 text-center text-tp-muted">
            Choose the plan that fits your needs. Live pricing from TailorPic.
          </p>

          <div className={`mt-10 grid gap-5 ${
            teaserPackages.length <= 3
              ? 'sm:grid-cols-3'
              : 'sm:grid-cols-2 lg:grid-cols-4'
          }`}>
            {teaserPackages.map((pkg) => {
              const entryPrice = Math.min(...cat.packages.map((p) => p.price));
              const isEntry = pkg.price === entryPrice;

              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-tp-card border-2 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg ${
                    pkg.recommended
                      ? 'border-tp-bronze ring-2 ring-tp-beige/30'
                      : isEntry
                        ? 'border-tp-bronze/40'
                        : 'border-tp-line'
                  }`}
                >
                  {pkg.recommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-tp-black px-4 py-0.5 text-xs font-medium text-tp-bronze">
                      Most Popular
                    </span>
                  )}
                  {isEntry && !pkg.recommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-tp-bronze px-4 py-0.5 text-xs font-medium text-white">
                      Try It
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-tp-ink">{pkg.name}</h3>
                  <p className="mt-3 text-3xl font-bold text-tp-black">
                    {formatPrice(pkg.price, pkg.currency, true)}
                  </p>
                  <ul className="mt-5 space-y-2.5 text-sm text-tp-muted">
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 flex-shrink-0 text-tp-success" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="font-medium text-tp-ink">{pkg.outputCount} {cat.outputLabel}</span>
                    </li>
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <svg className="h-4 w-4 flex-shrink-0 text-tp-success" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/auth/register?redirect=/${slug}&package=${pkg.id}`} className="mt-6 block">
                    <Button
                      variant={pkg.recommended ? 'primary' : 'outline'}
                      size="md"
                      className="w-full"
                    >
                      {isEntry ? 'Try It' : 'Get Started'}
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-sm text-tp-muted">
            Simple, transparent pricing for everyone.{' '}
            <Link href="/pricing" className="font-medium text-tp-bronze-ink underline-offset-2 hover:underline">
              View all packages
            </Link>
          </p>
        </div>
      </section>

      {/* ── FAQ PREVIEW ── */}
      <section className="border-t border-tp-line/40 bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-2xl font-normal text-tp-black sm:text-3xl">
              FAQ Preview
            </h2>
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-tp-bronze-ink transition-colors hover:text-tp-ink"
            >
              View All FAQs
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 space-y-3">
            {faqItems.slice(0, 4).map((item) => (
              <details
                key={item.question}
                className="group rounded-tp-button border border-tp-line bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 font-medium text-tp-ink list-none [&::-webkit-details-marker]:hidden">
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

      {/* ── RELATED PHOTO TYPES ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-tp-site px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-2xl font-normal text-tp-black sm:text-3xl">
              Related Photo Types
            </h2>
            <span className="text-sm text-tp-muted">Explore other photo types you might like.</span>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {relatedCategories.map((related) => (
              <Link
                key={related.id}
                href={`/${related.slug}`}
                className="group overflow-hidden rounded-tp-card border border-tp-line bg-white transition-shadow hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden bg-tp-warm">
                  <Image
                    src={categoryVisuals[related.id]?.quickCard?.src ?? `/images/categories/${related.id}.jpg`}
                    alt={categoryVisuals[related.id]?.quickCard?.alt ?? related.name}
                    width={280}
                    height={210}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    style={categoryVisuals[related.id]?.quickCard?.desktopObjectPosition ? { objectPosition: categoryVisuals[related.id]?.quickCard?.desktopObjectPosition } : undefined}
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-tp-ink">{related.shortName}</h3>
                  <p className="mt-1 text-xs text-tp-muted line-clamp-1">{related.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-normal text-white sm:text-4xl">
            Turn Your Photos Into<br className="hidden sm:block" /> Something Extraordinary.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-tp-beige/80">
            Upload your photos and get AI-generated {cat.outputLabel} in hours, not days.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href={`/auth/register?redirect=/${slug}`}>
              <Button size="lg" variant="primary">
                Get Started
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-6 text-sm text-tp-beige/60">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-tp-bronze" />
                Fast results
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-tp-bronze" />
                Secure &amp; private
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-tp-bronze" />
                100% satisfaction
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
