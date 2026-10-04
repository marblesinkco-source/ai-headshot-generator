import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { CITIES } from '@/config/city-content';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

export const metadata: Metadata = {
  title: `AI Headshots by City | ${siteConfig.name}`,
  description: `Get professional AI headshots in your city. TailorPic serves professionals across the US — no studio visit needed. Starting from ${BASE_PRICE_DISPLAY}.`,
  alternates: { canonical: '/locations' },
  openGraph: generateOGMetadata({
    title: `AI Headshots by City | ${siteConfig.name}`,
    description: `Get professional AI headshots in your city. Starting from ${BASE_PRICE_DISPLAY}.`,
    path: '/locations',
  }),
  twitter: generateTwitterMetadata({
    title: `AI Headshots by City | ${siteConfig.name}`,
    description: `Get professional AI headshots in your city. Starting from ${BASE_PRICE_DISPLAY}.`,
  }),
};

// Group cities by state for display
function groupByState() {
  const groups: Record<string, typeof CITIES> = {};
  for (const city of CITIES) {
    const key = city.state;
    if (!groups[key]) groups[key] = [];
    groups[key].push(city);
  }
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
}

export default function LocationsPage() {
  const stateGroups = groupByState();

  return (
    <>
      <Header />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Locations', url: `${siteConfig.url}/locations` },
        ]}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="border-b border-tp-line bg-tp-paper">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 text-center">
            <h1 className="font-display font-normal text-3xl text-tp-black sm:text-4xl lg:text-5xl">
              AI Headshots for Every City
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-muted">
              No matter where you are, TailorPic delivers studio-quality professional headshots from your phone. Find your city below.
            </p>
          </div>
        </section>

        {/* City Grid */}
        <section className="border-b border-tp-line">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <div className="space-y-12">
              {stateGroups.map(([state, cities]) => (
                <div key={state}>
                  <h2 className="mb-4 font-display font-normal text-xl text-tp-black">
                    {state}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {cities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/locations/${city.slug}`}
                        className="group flex items-start gap-3 rounded-tp-card border border-tp-line bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-tp-bronze/30"
                      >
                        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-tp-bronze-ink" />
                        <div className="min-w-0">
                          <h3 className="font-medium text-tp-ink group-hover:text-tp-bronze-ink transition-colors">
                            {city.name}
                          </h3>
                          <p className="mt-1 text-xs text-tp-muted line-clamp-2">
                            {city.industries.slice(0, 4).join(' · ')}
                          </p>
                        </div>
                        <ArrowRight className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-tp-muted opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-tp-paper">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 text-center">
            <h2 className="font-display font-normal text-2xl text-tp-black sm:text-3xl">
              Don&apos;t See Your City?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-tp-muted">
              TailorPic works everywhere — no studio visit required. Upload selfies from anywhere and get professional headshots delivered to your inbox.
            </p>
            <div className="mt-8">
              <Link
                href="/upload"
                className={buttonVariants({ size: 'lg' })}
              >
                Get Started — From {BASE_PRICE_DISPLAY}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
