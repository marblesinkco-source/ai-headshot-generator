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

// Map category IDs to brand SVG icons
const CATEGORY_ICONS: Record<string, string> = {
  headshots: '/brand/tailorpic/categories/headshots-icon.svg',
  'linkedin-team': '/brand/tailorpic/categories/corporate-team-icon.svg',
  dating: '/brand/tailorpic/categories/dating-icon.svg',
  'pet-portraits': '/brand/tailorpic/categories/pets-icon.svg',
  'ecommerce-product': '/brand/tailorpic/categories/product-photography-icon.svg',
  'family-portraits': '/brand/tailorpic/categories/family-icon.svg',
  'couple-engagement': '/brand/tailorpic/categories/couple-icon.svg',
  graduation: '/brand/tailorpic/categories/graduation-icon.svg',
  'baby-shower': '/brand/tailorpic/categories/baby-shower-icon.svg',
  'holiday-cards': '/brand/tailorpic/categories/holiday-icon.svg',
  'real-estate': '/brand/tailorpic/categories/real-estate-icon.svg',
};

export function Categories() {
  const categories = getActiveCategories();

  return (
    <section id="categories" className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14 py-10 lg:py-16">
      <div className="text-center mb-10">
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

      <div className="space-y-12">
        {CATEGORY_GROUPS.map((group) => {
          const groupCategories = categories.filter((c) =>
            group.categories.includes(c.id)
          );
          if (groupCategories.length === 0) return null;

          return (
            <div key={group.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-tp-bronze-ink">
                {group.title}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {groupCategories.map((cat) => {
                  const thumbnail = CATEGORY_THUMBNAILS[cat.id];
                  const icon = CATEGORY_ICONS[cat.id];

                  return (
                    <Link
                      key={cat.id}
                      href={`/${cat.slug}`}
                      className="group flex items-center gap-3 border border-tp-line bg-[#FEFCF8] rounded-xl p-3 min-h-[84px] transition-all duration-150 hover:-translate-y-[3px] hover:border-tp-bronze-ink"
                    >
                      {/* Thumbnail or icon */}
                      {thumbnail ? (
                        <div className="w-[60px] h-[60px] rounded-lg overflow-hidden flex-shrink-0 bg-tp-beige">
                          <Image
                            src={thumbnail}
                            alt=""
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : icon ? (
                        <div className="w-[40px] h-[40px] flex-shrink-0">
                          <Image src={icon} alt="" width={96} height={96} className="w-full h-full" />
                        </div>
                      ) : (
                        <span className="text-2xl flex-shrink-0">{cat.icon}</span>
                      )}

                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13px] font-semibold text-tp-ink group-hover:text-tp-bronze-ink transition-colors truncate">
                          {cat.name}
                        </h4>
                        <p className="text-[10px] text-tp-muted truncate mt-0.5">
                          {cat.tagline}
                        </p>
                        <p className="text-[11px] font-medium text-tp-bronze-ink mt-1">
                          From ${((cat.packages[0]?.price || 0) / 100).toFixed(0)} &rarr;
                        </p>
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
