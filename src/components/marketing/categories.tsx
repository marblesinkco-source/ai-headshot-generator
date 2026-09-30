import Link from 'next/link';
import Image from 'next/image';
import { getActiveCategories, CATEGORY_GROUPS } from '@/config/categories';

// Real photo thumbnails for ALL categories (AI-generated concept images from brand package)
const PHOTO_THUMBS: Record<string, string> = {
  headshots: '/brand/tailorpic/categories/thumb-headshots.webp',
  dating: '/brand/tailorpic/categories/thumb-dating.webp',
  'pet-portraits': '/brand/tailorpic/categories/thumb-pets.webp',
  'family-portraits': '/brand/tailorpic/categories/thumb-family.webp',
  'ecommerce-product': '/brand/tailorpic/categories/thumb-product-photography.webp',
  'linkedin-team': '/brand/tailorpic/categories/thumb-linkedin-team.webp',
  'couple-engagement': '/brand/tailorpic/categories/thumb-couple-engagement.webp',
  graduation: '/brand/tailorpic/categories/thumb-graduation.webp',
  'baby-shower': '/brand/tailorpic/categories/thumb-baby-shower.webp',
  'holiday-cards': '/brand/tailorpic/categories/thumb-holiday-cards.webp',
  'real-estate': '/brand/tailorpic/categories/thumb-real-estate.webp',
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
              {/* Mobile: 2-col, Tablet: 3-col, Desktop: 4-col */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
                {groupCategories.map((cat) => {
                  const photo = PHOTO_THUMBS[cat.id];

                  return (
                    <Link
                      key={cat.id}
                      href={`/${cat.slug}`}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-tp-line bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-tp-bronze/10 hover:border-tp-bronze/40"
                    >
                      {/* Image area */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-tp-paper">
                        {photo ? (
                          <Image
                            src={photo}
                            alt={cat.name}
                            width={400}
                            height={300}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-tp-paper to-tp-beige">
                            <span className="text-4xl sm:text-5xl">{cat.icon}</span>
                          </div>
                        )}
                      </div>

                      {/* Text content */}
                      <div className="flex flex-1 flex-col p-3 sm:p-4">
                        <h4 className="text-[13px] sm:text-[14px] font-semibold text-tp-ink leading-tight group-hover:text-tp-bronze-ink transition-colors">
                          {cat.name}
                        </h4>
                        <p className="hidden sm:block text-[11px] sm:text-[12px] text-tp-muted mt-1 line-clamp-2 leading-relaxed">
                          {cat.tagline}
                        </p>
                        <div className="mt-auto pt-2 sm:pt-3 flex items-center justify-between">
                          <span className="text-[12px] sm:text-[13px] font-semibold text-tp-bronze-ink">
                            From ${((cat.packages[0]?.price || 0) / 100).toFixed(0)}
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-medium text-tp-bronze group-hover:translate-x-0.5 transition-transform">
                            &rarr;
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
