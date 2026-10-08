import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { Camera, Sparkles, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { SocialShare } from '@/components/marketing/social-share';
import { StylePreviewGrid } from '@/components/marketing/style-preview-grid';
import { HeadshotInContext } from '@/components/marketing/headshot-in-context';
import { PackageVisualizer } from '@/components/marketing/package-visualizer';
import { DataPrivacyStrip } from '@/components/marketing/data-privacy-strip';
import { getActiveCategories, getCategoryBySlug } from '@/config/categories';
import { getCategoryContent } from '@/config/category-content';
import { getCategoryVisuals, getCategoryImage, categoryVisuals } from '@/config/category-visuals';
import { siteConfig } from '@/config/site';
import { formatPrice } from '@/lib/utils';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';

interface Props {
  params: Promise<{ category: string }>;
}

/** Only pre-defined category slugs are valid; everything else → 404 */
export const dynamicParams = false;

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

  // Determine unique gallery images for collage (only use collage when 4+ unique images exist)
  const uniqueGallery = galleryItems.filter(
    (g, i, arr) => arr.findIndex((x) => x.src === g.src) === i,
  );
  const useCollage = uniqueGallery.length >= 4;
  const collageImages = useCollage ? uniqueGallery.slice(0, 4) : [];

  const lowestPrice = Math.min(...cat.packages.map((p) => p.price));
  // After signup, send people to the upload flow for THIS category (not back to this marketing page).
  const startHref = `/auth/register?redirect=${encodeURIComponent(`/dashboard/upload?category=${cat.id}`)}`;

  const allCategories = getActiveCategories();
  // Next six categories after this one (wraps), so each page links to a different set.
  const currentIndex = allCategories.findIndex((c) => c.id === cat.id);
  const relatedCategories = allCategories
    .filter((c) => c.id !== cat.id)
    .map((c, i, arr) => arr[(i + currentIndex) % arr.length])
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
      answer: 'Most orders are ready in about 2 hours. You will receive an email as soon as your photos are ready.',
    },
    {
      question: 'What if I am not happy with the results?',
      answer: 'Every package includes regenerations, and our support team will work with you until the results are right. See our Quality Promise for details.',
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
    image: heroSrc.startsWith('http') ? heroSrc : `${siteConfig.url}${heroSrc}`,
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
    },
  };

  return (
    <>
    <Header />
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

          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
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

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href={startHref} className={`${buttonVariants({ size: 'lg', variant: 'primary' })} w-full sm:w-auto`}>
                  Get Started
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
                <a href="#packages" className={`${buttonVariants({ size: 'lg', variant: 'outline' })} w-full sm:w-auto`}>
                  See Packages
                </a>
              </div>
              <p className="mt-4 text-sm text-tp-muted">
                From {formatPrice(lowestPrice, 'usd')} ·{' '}
                <Link href="/guarantee" className="underline-offset-2 transition-colors hover:text-tp-ink hover:underline">
                  Regenerations included
                </Link>
              </p>
            </div>

            {/* Mobile hero image */}
            <div className="lg:hidden mt-8 overflow-hidden rounded-2xl bg-tp-beige aspect-[4/3] max-h-[300px]">
              <Image
                src={heroSrc}
                alt={heroAsset?.alt ?? `${cat.name} example`}
                width={800}
                height={600}
                className="h-full w-full object-cover"
                style={{ objectPosition: heroAsset?.mobileObjectPosition ?? '50% 30%' }}
                sizes="100vw"
                priority
              />
            </div>

            {/* Desktop: Category hero image */}
            <div className="relative hidden lg:block">
              {useCollage ? (
                /* Collage — only when 4+ unique gallery images exist */
                <div className="grid grid-cols-2 gap-3">
                  {collageImages.map((img, i) => (
                    <div
                      key={i}
                      className={`overflow-hidden rounded-tp-card bg-tp-beige ${
                        i === 0 ? 'aspect-[4/5] col-span-1' :
                        i === 1 ? 'aspect-[5/4] col-span-1 mt-8' :
                        i === 2 ? 'aspect-[5/4] col-span-1' :
                        'aspect-[4/5] col-span-1 -mt-8'
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={400}
                        height={i % 2 === 0 ? 533 : 400}
                        className="h-full w-full object-cover"
                        style={{ objectPosition: img.desktopObjectPosition }}
                        sizes="(min-width: 1024px) 20vw, 0px"
                        priority={i < 2}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                /* Single large image — shows the category's own photo prominently */
                <div className="overflow-hidden rounded-[40px_18px_18px_18px] bg-tp-beige aspect-[3/4] max-h-[520px]">
                  <Image
                    src={heroSrc}
                    alt={heroAsset?.alt ?? `${cat.name} example`}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: heroAsset?.desktopObjectPosition ?? '50% 30%' }}
                    sizes="(min-width: 1024px) 40vw, 0px"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="relative mt-12 border-t border-tp-line/40 bg-tp-paper/80 py-6 backdrop-blur-sm sm:mt-16">
          <div className="mx-auto grid max-w-tp-site grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:gap-6 sm:px-6 lg:px-8">
            {[
              { icon: Camera, text: 'Studio-style results from your own photos' },
              { icon: Sparkles, text: 'Multiple styles and backgrounds' },
              { icon: Clock, text: 'Typically ready in about 2 hours' },
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

      {/* ── BENEFITS ── */}
      {content && content.benefits.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-tp-site px-4 sm:px-6 lg:px-8">
            <h2 className="max-w-2xl font-display text-2xl font-normal text-tp-black sm:text-3xl">
              {content.benefitsHeadline}
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {content.benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-tp-card border border-tp-line bg-tp-paper/60 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-tp-warm text-xl">
                    {b.icon}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-tp-ink">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EXAMPLE OUTPUT ── */}
      <section className="border-t border-tp-line/40 bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-tp-site px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-2xl font-normal text-tp-black sm:text-3xl">
              Example Transformation
              <span className="ml-3 font-sans text-base text-tp-muted">Illustrative concept</span>
            </h2>
          </div>

          <div className="mt-10 grid items-center gap-8 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-tp-card border border-tp-line bg-white">
              <div className="grid grid-cols-2">
                <div className="relative aspect-[3/4] bg-tp-warm">
                  <div className="absolute bottom-3 left-3 rounded-full bg-tp-black/70 px-3 py-1 text-xs font-medium text-white">
                    Original
                  </div>
                  <Image
                    src={beforeSrc}
                    alt={beforeAsset?.alt ?? `Before - ${cat.name}`}
                    fill
                    className="object-cover grayscale"
                    style={(beforeAsset ?? heroAsset)?.desktopObjectPosition ? { objectPosition: (beforeAsset ?? heroAsset)?.desktopObjectPosition } : undefined}
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                </div>
                <div className="relative aspect-[3/4] bg-tp-warm">
                  <div className="absolute bottom-3 right-3 rounded-full bg-tp-bronze px-3 py-1 text-xs font-medium text-white">
                    AI style
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
                Upload everyday photos and get {cat.outputLabel} styled to the look you choose.
                These examples are AI-generated concepts that show the kind of style on offer.
                They are not customer results, and your output will depend on your uploads.
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

      {/* ── STYLE PREVIEW (headshots only) ── */}
      {cat.id === 'headshots' && <StylePreviewGrid />}
      {cat.id === 'headshots' && <HeadshotInContext />}
      {cat.id === 'headshots' && <PackageVisualizer packages={cat.packages} />}

      {/* ── SAMPLE GALLERY (only when there are enough distinct images) ── */}
      {uniqueGallery.length >= 3 && (
      <section className="border-t border-tp-line/40 bg-white py-16 sm:py-20">
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
            {uniqueGallery.slice(0, 6).map((g, i) => {
              return (
              <div
                key={g.src}
                className="aspect-square overflow-hidden rounded-tp-button bg-tp-warm"
              >
                <Image
                  src={g.src}
                  alt={g.alt ?? `${cat.name} sample ${i + 1}`}
                  width={240}
                  height={240}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  style={g.desktopObjectPosition ? { objectPosition: g.desktopObjectPosition } : undefined}
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                />
              </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* ── PERFECT FOR (Use Cases) ── */}
      {useCases.length > 0 && (
        <section className="border-t border-tp-line/40 bg-tp-paper py-16 sm:py-20">
          <div className="mx-auto max-w-tp-site px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-normal text-tp-black sm:text-3xl">
              Perfect For
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3">
              {useCases.slice(0, 6).map((uc) => (
                <div
                  key={uc.title}
                  className="flex flex-col items-center rounded-tp-button border border-tp-line bg-white px-4 py-5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tp-warm text-tp-bronze-ink">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-tp-ink">{uc.title}</h3>
                  <p className="mt-1 text-sm text-tp-muted">{uc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ── */}
      <section className="border-t border-tp-line/40 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-tp-site px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-normal text-tp-black sm:text-3xl">
            How It Works
          </h2>

          <div className={`mt-12 grid gap-8 sm:gap-4 ${
            howItWorks.length === 4
              ? 'sm:grid-cols-2 lg:grid-cols-4'
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

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tp-black text-lg font-semibold text-tp-bronze">
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
      <section id="packages" className="scroll-mt-24 border-t border-tp-line/40 bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-normal text-tp-black sm:text-3xl">
            Choose Your Package
          </h2>
          <p className="mt-3 text-center text-tp-muted">
            Pick the package that fits. Prices are one-time, not a subscription.
          </p>

          <div className={`mt-10 grid gap-5 ${
            teaserPackages.length === 2
              ? 'mx-auto max-w-3xl md:grid-cols-2'
              : teaserPackages.length === 3
                ? 'md:grid-cols-3'
                : 'sm:grid-cols-2 lg:grid-cols-4'
          }`}>
            {teaserPackages.map((pkg) => {
              const entryPrice = Math.min(...cat.packages.map((p) => p.price));
              const isEntry = pkg.price === entryPrice;

              return (
                <div
                  key={pkg.id}
                  className={`relative flex flex-col rounded-tp-card border-2 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
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
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-tp-bronze-ink px-4 py-0.5 text-xs font-medium text-white">
                      {pkg.outputCount === 1 ? 'Try It' : 'Lowest Price'}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-tp-ink">{pkg.name}</h3>
                  <p className="mt-3 text-3xl font-semibold text-tp-black">
                    {formatPrice(pkg.price, pkg.currency, true)}
                  </p>
                  <ul className="mb-6 mt-5 space-y-2.5 text-sm text-tp-muted">
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
                  <Link
                    href={startHref}
                    className={`${buttonVariants({ variant: pkg.recommended ? 'primary' : 'outline', size: 'md' })} mt-auto w-full`}
                  >
                    {pkg.outputCount === 1 ? 'Try 1 Photo' : `Get ${pkg.name}`}
                  </Link>
                </div>
              );
            })}
          </div>

          <DataPrivacyStrip className="mx-auto mt-8 max-w-3xl" />

          <p className="mt-6 text-center text-sm text-tp-muted">
            Compare every package and what each includes.{' '}
            <Link href="/pricing" className="font-medium text-tp-bronze-ink underline-offset-2 hover:underline">
              View all packages
            </Link>
          </p>
        </div>
      </section>

      {/* ── FAQ PREVIEW ── */}
      <section className="border-t border-tp-line/40 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-2xl font-normal text-tp-black sm:text-3xl">
              Frequently Asked Questions
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
                className="group rounded-tp-button border border-tp-line bg-tp-paper/60 transition-colors hover:border-tp-bronze/50"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-tp-button px-5 py-4 font-medium text-tp-ink list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze sm:px-6 [&::-webkit-details-marker]:hidden">
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
                <div className="px-5 pb-5 text-sm leading-relaxed text-tp-muted sm:px-6">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED PHOTO TYPES ── */}
      <section className="border-t border-tp-line/40 bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-tp-site px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-2xl font-normal text-tp-black sm:text-3xl">
              Related Photo Types
            </h2>
            <span className="text-sm text-tp-muted">Explore other photo types you might like.</span>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {relatedCategories.map((related) => (
              <Link
                key={related.id}
                href={`/${related.slug}`}
                className="group overflow-hidden rounded-tp-card border border-tp-line bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
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
                  <p className="mt-1 text-xs text-tp-muted line-clamp-2">{related.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHARE ── */}
      <section className="border-t border-tp-line bg-tp-paper py-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 px-4 sm:px-6 lg:px-8">
          <span className="text-sm font-medium text-tp-ink">Share {cat.shortName}</span>
          <SocialShare url={`${siteConfig.url}/${cat.slug}`} title={cat.seoTitle} />
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-normal text-white sm:text-4xl">
            Ready to Create Your<br className="hidden sm:block" /> {cat.shortName}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-tp-beige/80">
            Upload your photos and get AI-generated {cat.outputLabel}, typically in about 2 hours.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href={startHref} className={`${buttonVariants({ size: 'lg', variant: 'primary' })} w-full sm:w-auto`}>
              Get Started
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-tp-beige/60">
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
                Regenerations included
              </span>
            </div>
          </div>
        </div>
      </section>

    </main>
    <Footer />
    </>
  );
}
