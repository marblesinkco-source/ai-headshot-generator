import Link from 'next/link';
import Image from 'next/image';
import { getActiveCategories, CATEGORY_GROUPS } from '@/config/categories';

// Premium Unsplash photos — each category has a unique, high-impact image
// All photos are free for commercial use (Unsplash License)
const CATEGORY_IMAGES: Record<string, { src: string; alt: string }> = {
  headshots: {
    src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop&crop=face&q=80',
    alt: 'Professional woman in business attire',
  },
  dating: {
    src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=600&fit=crop&crop=face&q=80',
    alt: 'Confident woman smiling warmly',
  },
  'pet-portraits': {
    src: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?w=800&h=600&fit=crop&crop=entropy&q=80',
    alt: 'Adorable golden retriever portrait',
  },
  'family-portraits': {
    src: 'https://images.unsplash.com/photo-1598887048474-3e0be05bd11f?w=800&h=600&fit=crop&crop=faces&q=80',
    alt: 'Happy family portrait together',
  },
  'ecommerce-product': {
    src: 'https://images.unsplash.com/photo-1611149974482-764b0c2a211a?w=800&h=600&fit=crop&crop=entropy&q=80',
    alt: 'Elegant product photography setup',
  },
  'linkedin-team': {
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&crop=faces&q=80',
    alt: 'Corporate team collaborating in modern office',
  },
  'couple-engagement': {
    src: 'https://images.unsplash.com/photo-1556229868-7b2d4b56b909?w=800&h=600&fit=crop&crop=faces&q=80',
    alt: 'Romantic couple engagement portrait',
  },
  graduation: {
    src: 'https://images.unsplash.com/photo-1618355776464-8666794d2520?w=800&h=600&fit=crop&crop=face&q=80',
    alt: 'Proud graduate celebrating achievement',
  },
  'baby-shower': {
    src: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=800&h=600&fit=crop&crop=entropy&q=80',
    alt: 'Sweet newborn baby portrait',
  },
  'holiday-cards': {
    src: 'https://images.unsplash.com/photo-1544546491-1ecfecfcc75a?w=800&h=600&fit=crop&crop=faces&q=80',
    alt: 'Warm family moment by the Christmas tree',
  },
  'real-estate': {
    src: 'https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=800&h=600&fit=crop&crop=entropy&q=80',
    alt: 'Luxurious modern living room interior',
  },
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
          From professional headshots to virtual staging — choose your category and let AI create stunning results tailored to you.
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
                  const image = CATEGORY_IMAGES[cat.id];

                  return (
                    <Link
                      key={cat.id}
                      href={`/${cat.slug}`}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-tp-line bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-tp-bronze/15 hover:border-tp-bronze/50"
                    >
                      {/* Image area with overlay gradient */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-tp-paper">
                        {image ? (
                          <>
                            <Image
                              src={image.src}
                              alt={image.alt}
                              width={800}
                              height={600}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                              unoptimized
                            />
                            {/* Subtle bottom gradient for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </>
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
                          <span className="text-tp-bronze text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-0.5">
                            Explore &rarr;
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
