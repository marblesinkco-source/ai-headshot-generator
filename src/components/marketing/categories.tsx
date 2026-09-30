import Link from 'next/link';
import Image from 'next/image';
import { getActiveCategories, CATEGORY_GROUPS } from '@/config/categories';

// Map category IDs to brand asset thumbnails
const CATEGORY_THUMBNAILS: Record<string, string> = {
  headshots: '/brand/tailorpic/categories/category-headshots-800x600.webp',
  'linkedin-team': '/brand/tailorpic/categories/category-corporate-team-800x600.webp',
  dating: '/brand/tailorpic/categories/category-dating-800x600.webp',
  'pet-portraits': '/brand/tailorpic/categories/category-pets-800x600.webp',
  'ecommerce-product': '/brand/tailorpic/categories/category-product-photography-800x600.webp',
  'family-portraits': '/brand/tailorpic/categories/category-family-800x600.webp',
  'couple-engagement': '/brand/tailorpic/categories/category-couple-800x600.webp',
  graduation: '/brand/tailorpic/categories/category-graduation-800x600.webp',
  'baby-shower': '/brand/tailorpic/categories/category-baby-shower-800x600.webp',
  'holiday-cards': '/brand/tailorpic/categories/category-holiday-800x600.webp',
  'real-estate': '/brand/tailorpic/categories/category-real-estate-800x600.webp',
};

export function Categories() {
  const categories = getActiveCategories();

  return (
    <section id="categories" className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14 py-10 lg:py-16">
      <div className="text-center mb-12">
        <p className="uppercase text-[10px] font-semibold tracking-[0.25em] text-tp-bronze-ink mb-3">
          Choose Your Photo Type
        </p>
        <h2 className="font-display text-[33px] lg:text-[42px] leading-tight tracking-[-0.03em] font-normal">
          AI Photos for Every Occasion
        </h2>
        <p className="mt-4 text-[15px] text-tp-muted max-w-lg mx-auto">
          From professional headshots to pet portraits — choose your category and let AI create results tailored to you.
        </p>
      </div>

      <div className="space-y-14">
        {CATEGORY_GROUPS.map((group) => {
          const groupCategories = categories.filter((c) =>
            group.categories.includes(c.id)
          );
          if (groupCategories.length === 0) return null;

          return (
            <div key={group.title}>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-tp-bronze-ink">
                {group.title}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {groupCategories.map((cat) => {
                  const thumbnail = CATEGORY_THUMBNAILS[cat.id];

                  return (
                    <Link
                      key={cat.id}
                      href={`/${cat.slug}`}
                      className="group relative overflow-hidden rounded-2xl border border-tp-line bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-tp-bronze/10 hover:border-tp-bronze/40"
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-tp-beige/30">
                        {thumbnail ? (
                          <Image
                            src={thumbnail}
                            alt={cat.name}
                            width={800}
                            height={600}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-tp-paper to-tp-beige">
                            <span className="text-5xl">{cat.icon}</span>
                          </div>
                        )}
                        {/* Subtle gradient overlay at bottom for text readability */}
                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>

                      {/* Text content */}
                      <div className="p-4">
                        <h4 className="text-[14px] font-semibold text-tp-ink group-hover:text-tp-bronze-ink transition-colors">
                          {cat.name}
                        </h4>
                        <p className="text-[12px] text-tp-muted mt-1 line-clamp-2 leading-relaxed">
                          {cat.tagline}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[13px] font-semibold text-tp-bronze-ink">
                            From ${((cat.packages[0]?.price || 0) / 100).toFixed(0)}
                          </span>
                          <span className="text-[11px] font-medium text-tp-bronze group-hover:translate-x-0.5 transition-transform">
                            View &rarr;
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
