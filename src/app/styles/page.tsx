import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { getAllPhotoStyles } from '@/config/styles';

export const metadata: Metadata = {
  title: 'Photo Styles — Choose Your Perfect Headshot Style | TailorPic',
  description:
    'Explore TailorPic photo styles: corporate, natural light, creative, startup founder, glamour and outdoor. Find the AI headshot style that fits you.',
  alternates: { canonical: '/styles' },
};

export default function StylesPage() {
  const styles = getAllPhotoStyles();

  return (
    <main className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Photo Styles', url: `${siteConfig.url}/styles` },
        ]}
      />
      <Header />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              Photo Styles
            </p>
            <h1 className="mt-3 font-display text-4xl tracking-tight text-tp-ink sm:text-5xl">
              Choose Your Perfect Headshot Style
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
              From formal corporate portraits to bold creative looks, find the style that fits you.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {styles.map((style) => (
              <Link
                key={style.slug}
                href={`/styles/${style.slug}`}
                className="group rounded-tp-card border border-tp-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-tp-bronze hover:shadow-md"
              >
                <h2 className="text-xl font-semibold text-tp-ink">{style.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                  {style.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-tp-bronze-ink transition-all group-hover:gap-2.5">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
