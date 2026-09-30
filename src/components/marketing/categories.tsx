import Link from 'next/link';
import { getActiveCategories, CATEGORY_GROUPS } from '@/config/categories';

export function Categories() {
  const categories = getActiveCategories();

  return (
    <section id="categories" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">
            Choose Your Photo Type
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-tailor-black sm:text-4xl">
            AI Photos for Every Occasion
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From professional headshots to pet portraits — choose your category and let AI create stunning results.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          {CATEGORY_GROUPS.map((group) => {
            const groupCategories = categories.filter((c) =>
              group.categories.includes(c.id)
            );
            if (groupCategories.length === 0) return null;

            return (
              <div key={group.label}>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-400">
                  {group.label}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {groupCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/${cat.slug}`}
                      className="group relative overflow-hidden rounded-2xl border border-brand-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-brand-300 hover:-translate-y-0.5"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{cat.icon}</span>
                        <div>
                          <h4 className="font-semibold text-tailor-black group-hover:text-brand-600 transition-colors">
                            {cat.name}
                          </h4>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {cat.tagline}
                          </p>
                          <p className="mt-3 text-sm font-medium text-brand-500">
                            From ${((cat.packages[0]?.price || 0) / 100).toFixed(0)} &rarr;
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
