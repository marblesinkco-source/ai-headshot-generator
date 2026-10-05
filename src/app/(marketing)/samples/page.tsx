import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { categoryVisuals, type ImageAsset } from '@/config/category-visuals';
import { CATEGORIES } from '@/config/categories';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'AI Headshot Examples & Samples | TailorPic';
const description =
  'Browse AI-generated concept images for professional headshots, dating photos, team pages, graduation portraits and more, and see what TailorPic can create.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: 'https://www.tailorpic.com/samples' },
  openGraph: generateOGMetadata({ title, description, path: '/samples' }),
  twitter: generateTwitterMetadata({ title, description }),
};

const REGISTER_HREF = '/auth/register?redirect=%2Fdashboard%2Fupload';

interface GallerySection {
  id: string;
  slug: string;
  name: string;
  gallery: ImageAsset[];
}

interface PairSection {
  id: string;
  name: string;
  before: ImageAsset;
  after: ImageAsset;
}

// Only categories with more than one gallery image get a section.
const gallerySections: GallerySection[] = Object.entries(CATEGORIES).flatMap(([id, cat]) => {
  const visuals = categoryVisuals[id];
  if (!cat.active || !visuals || visuals.gallery.length <= 1) return [];
  return [{ id, slug: cat.slug, name: cat.name, gallery: visuals.gallery }];
});

const pairSections: PairSection[] = Object.entries(CATEGORIES).flatMap(([id, cat]) => {
  const pair = categoryVisuals[id]?.beforeAfter;
  if (!cat.active || !pair) return [];
  return [{ id, name: cat.name, before: pair.before, after: pair.after }];
});

export default function SamplesPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="min-h-screen bg-tp-paper">
        <div className="mx-auto max-w-[1320px] px-4 pt-6 sm:px-7 lg:px-14">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Samples' }]}
            currentPath="/samples"
          />
        </div>

        {/* Hero */}
        <section aria-labelledby="samples-heading" className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1320px] px-4 text-center sm:px-7 lg:px-14">
            <h1
              id="samples-heading"
              className="font-display text-[40px] font-normal leading-tight tracking-[-0.03em] text-tp-ink sm:text-[56px]"
            >
              See What TailorPic Creates
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-tp-muted sm:text-lg">
              Every portrait on this page is an AI-generated concept image, shown to illustrate the
              range of looks and styles. They are examples of what is possible, not customer
              testimonials. Your own results will depend on the photos you upload.
            </p>

            {/* Category filter: anchor links, no client JS */}
            <nav aria-label="Jump to a category" className="mt-8">
              <ul className="flex flex-wrap justify-center gap-2">
                {gallerySections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#samples-${s.slug}`}
                      className="inline-block rounded-tp-button border border-tp-line bg-white px-4 py-2 text-sm font-medium text-tp-ink transition-colors hover:border-tp-bronze hover:text-tp-bronze-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
                {pairSections.length > 0 && (
                  <li>
                    <a
                      href="#samples-before-after"
                      className="inline-block rounded-tp-button border border-tp-line bg-white px-4 py-2 text-sm font-medium text-tp-ink transition-colors hover:border-tp-bronze hover:text-tp-bronze-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze"
                    >
                      Before &amp; after
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </section>

        {/* Category galleries */}
        <div className="mx-auto max-w-[1320px] space-y-16 px-4 pb-16 sm:px-7 sm:pb-20 lg:px-14">
          {gallerySections.map((s) => (
            <section
              key={s.id}
              id={`samples-${s.slug}`}
              aria-labelledby={`samples-${s.slug}-heading`}
              className="scroll-mt-24"
            >
              <h2
                id={`samples-${s.slug}-heading`}
                className="font-display text-[28px] font-normal leading-tight tracking-[-0.02em] text-tp-ink sm:text-[36px]"
              >
                {s.name} Examples
              </h2>
              <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                {s.gallery.map((img, i) => (
                  <li key={`${img.src}-${i}`}>
                    <figure className="overflow-hidden rounded-tp-card border border-tp-line bg-white">
                      <div className="relative aspect-[3/4] bg-tp-beige">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          style={{ objectPosition: img.desktopObjectPosition }}
                          sizes="(min-width:768px) 33vw, 50vw"
                          loading="lazy"
                        />
                      </div>
                      <figcaption className="px-3 py-2 text-center text-xs text-tp-muted">
                        <span className="block font-medium text-tp-ink">{s.name}</span>
                        AI-generated concept image
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${s.slug}`}
                className="mt-4 inline-block rounded-tp-button text-sm font-medium text-tp-bronze-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze"
              >
                Learn more about {s.name} <span aria-hidden="true">&rarr;</span>
              </Link>
            </section>
          ))}

          {/* Before / after */}
          {pairSections.length > 0 && (
            <section
              id="samples-before-after"
              aria-labelledby="samples-before-after-heading"
              className="scroll-mt-24"
            >
              <h2
                id="samples-before-after-heading"
                className="font-display text-[28px] font-normal leading-tight tracking-[-0.02em] text-tp-ink sm:text-[36px]"
              >
                Before &amp; After
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-tp-muted">
                Illustrative comparisons: the &ldquo;before&rdquo; is a desaturated stand-in for an
                unprocessed casual snapshot. These are AI-generated concept images, not customer
                results.
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pairSections.map((p) => (
                  <li key={p.id}>
                    <figure className="overflow-hidden rounded-tp-card border border-tp-line bg-white">
                      <div className="grid grid-cols-2">
                        <div className="relative aspect-[3/4] bg-tp-beige">
                          <Image
                            src={p.before.src}
                            alt={p.before.alt}
                            fill
                            className="object-cover grayscale"
                            style={{ objectPosition: p.before.desktopObjectPosition }}
                            sizes="(min-width:1024px) 17vw, (min-width:768px) 25vw, 45vw"
                            loading="lazy"
                          />
                          <span className="absolute left-2 top-2 rounded-tp-button bg-tp-black/80 px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-tp-paper">
                            Before
                          </span>
                        </div>
                        <div className="relative aspect-[3/4] bg-tp-beige">
                          <Image
                            src={p.after.src}
                            alt={p.after.alt}
                            fill
                            className="object-cover"
                            style={{ objectPosition: p.after.desktopObjectPosition }}
                            sizes="(min-width:1024px) 17vw, (min-width:768px) 25vw, 45vw"
                            loading="lazy"
                          />
                          <span className="absolute left-2 top-2 rounded-tp-button bg-tp-bronze px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-tp-black">
                            After
                          </span>
                        </div>
                      </div>
                      <figcaption className="border-t border-tp-line px-3 py-3 text-center text-xs text-tp-muted">
                        <span className="block text-sm font-medium text-tp-ink">{p.name}</span>
                        AI-generated concept image
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* CTA */}
        <section aria-labelledby="samples-cta-heading" className="border-t border-tp-line bg-tp-beige py-16 sm:py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-7">
            <h2
              id="samples-cta-heading"
              className="font-display text-[30px] font-normal leading-tight tracking-[-0.02em] text-tp-ink sm:text-[40px]"
            >
              Ready to Create Your Own?
            </h2>
            <p className="mt-4 text-base text-tp-muted">
              Upload a few selfies and get polished portraits of yourself. Plans start from{' '}
              {BASE_PRICE_DISPLAY}.
            </p>
            <Link
              href={REGISTER_HREF}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-tp-button bg-tp-black px-8 text-base font-semibold text-tp-paper transition-colors hover:bg-tp-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze"
            >
              Create your headshots
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
