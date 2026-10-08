import Link from 'next/link';
import Image from 'next/image';
import { getActiveCategories, CATEGORY_GROUPS } from '@/config/categories';
import { categoryVisuals } from '@/config/category-visuals';
import { CategoryFallbackIllustration } from '@/components/marketing/illustrations';
import { TEAM_PRICES } from '@/config/pricing';

// Tiny neutral beige 8x6 SVG placeholder shown while category images load
const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDYiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjYiIGZpbGw9IiNFOERGRDAiLz48L3N2Zz4=';

// Top categories get a "Popular" badge
const POPULAR_IDS = new Set<string>(['headshots', 'dating', 'pet-portraits']);

export function Categories() {
  const categories = getActiveCategories();

  return (
    <section id="categories" className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14 py-20 lg:py-24">
      <div className="text-center mb-10 lg:mb-14">
        <p className="uppercase text-[11px] font-semibold tracking-[0.25em] text-tp-bronze-ink mb-3">
          Choose Your Photo Type
        </p>
        <h2 className="font-display text-[30px] lg:text-[40px] leading-tight tracking-[-0.03em] font-normal text-tp-ink">
          AI Photos for Every Occasion
        </h2>
        <p className="mt-4 text-[15px] text-tp-muted max-w-lg mx-auto leading-relaxed">
          From professional headshots to creative portraits — choose your category and let AI create stunning results tailored to you.
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
              <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-tp-line pb-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-tp-bronze-ink">
                  {group.title}
                </h3>
                <span className="hidden sm:block text-[12px] text-tp-muted">
                  {group.description} &middot; {groupCategories.length}{' '}
                  {groupCategories.length === 1 ? 'category' : 'categories'}
                </span>
              </div>
              {/* Mobile: 2-col, Tablet: 3-col, Desktop: 4-col */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                {groupCategories.map((cat) => {
                  const vis = categoryVisuals[cat.id];
                  const image = vis?.quickCard;
                  const popular = POPULAR_IDS.has(cat.id);
                  const maxOutput = Math.max(0, ...cat.packages.map((p) => p.outputCount));
                  const isTeam = cat.id === 'linkedin-team';
                  const fromPrice = isTeam
                    ? (TEAM_PRICES.large.perPersonCents / 100).toFixed(0)
                    : ((cat.packages[0]?.price || 0) / 100)
                        .toFixed(2)
                        .replace(/\.00$/, '');

                  return (
                    <Link
                      key={cat.id}
                      href={`/${cat.slug}`}
                      className="scroll-fade-in group relative flex flex-col overflow-hidden rounded-tp-card border border-tp-line bg-tp-paper transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-tp-bronze hover:shadow-xl hover:shadow-tp-bronze/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      {/* Thumbnail area */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-tp-paper to-tp-beige">
                        {image ? (
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={800}
                            height={600}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                            sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={BLUR_DATA_URL}
                          />
                        ) : (
                          <CategoryFallbackIllustration
                            seed={Array.from(cat.id).reduce((a, ch) => a + ch.charCodeAt(0), 0)}
                            className="h-full w-full"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-tp-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        {popular && (
                          <span className="absolute left-2.5 top-2.5 rounded-full bg-tp-black px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-tp-bronze shadow-sm">
                            Popular
                          </span>
                        )}
                        {maxOutput > 0 && (
                          <span className="absolute bottom-2.5 right-2.5 rounded-full bg-tp-paper/95 px-2.5 py-1 text-[11px] font-semibold text-tp-bronze-ink shadow-sm">
                            Up to {maxOutput} {cat.outputLabel}
                          </span>
                        )}
                      </div>

                      {/* Text content */}
                      <div className="flex flex-1 flex-col p-3 sm:p-4">
                        <h4 className="text-[13px] sm:text-[15px] font-semibold text-tp-ink leading-tight transition-colors group-hover:text-tp-bronze-ink">
                          {cat.name}
                        </h4>
                        <p className="mt-1 line-clamp-2 text-[11px] sm:text-[12px] leading-relaxed text-tp-muted">
                          {cat.tagline}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-2 sm:pt-3">
                          <span className="text-[12px] sm:text-[13px] font-semibold text-tp-bronze-ink">
                            {isTeam ? `From $${fromPrice}/person` : `From $${fromPrice}`}
                          </span>
                          <span className="text-xs font-medium text-tp-bronze-ink opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100">
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

      <div className="mt-12 text-center">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 rounded-tp-button border border-tp-ink px-6 py-3 text-sm font-semibold text-tp-ink transition-colors duration-200 hover:bg-tp-ink hover:text-tp-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2"
        >
          View all categories &amp; pricing
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
