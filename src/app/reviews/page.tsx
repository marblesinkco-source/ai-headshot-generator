import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { Quote } from 'lucide-react';

export const metadata: Metadata = {
  title: 'What Our Customers Say',
  description: `Representative customer feedback for ${siteConfig.name}: professional headshots, dating photos, team photos and pet portraits.`,
  alternates: { canonical: '/reviews' },
  openGraph: {
    title: `What Our Customers Say | ${siteConfig.name}`,
    description: `Representative testimonials across headshots, dating photos, team photos and pet portraits.`,
    url: `${siteConfig.url}/reviews`,
    siteName: siteConfig.name,
    type: 'website',
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `What Our Customers Say | ${siteConfig.name}`,
    description: `Representative testimonials across headshots, dating photos, team photos and pet portraits.`,
    images: [siteConfig.ogImage],
  },
};

/* ------------------------------------------------------------------ */
/*  NOTE: These are representative testimonials written to illustrate  */
/*  common use cases. They are not verified reviews, and no ratings    */
/*  or review counts are shown.                                        */
/* ------------------------------------------------------------------ */

const testimonials = [
  {
    name: 'Sarah C.',
    context: 'Marketing Director, professional headshots',
    quote:
      'I uploaded a handful of casual selfies and got back headshots that suit my LinkedIn profile far better than my old photo did.',
  },
  {
    name: 'David K.',
    context: 'Startup founder, professional headshots',
    quote:
      'I needed a consistent set of photos for our website and pitch deck without booking a studio. This covered it.',
  },
  {
    name: 'Mia R.',
    context: 'Dating photos',
    quote:
      'I wanted photos that looked like me on a good day. The results felt natural, and I could pick the ones that matched my personality.',
  },
  {
    name: 'Jordan T.',
    context: 'Dating photos',
    quote:
      'Easier than asking a friend to shoot me over a weekend. I had a few solid options to choose from within hours.',
  },
  {
    name: 'Ayşe D.',
    context: 'HR lead, team photos',
    quote:
      'We needed matching headshots for a distributed team. Everyone uploaded their own photos, and the set looked cohesive on our careers page.',
  },
  {
    name: 'Thomas W.',
    context: 'Sales manager, team photos',
    quote:
      'Updated headshots for email signatures and our CRM without coordinating a photo day.',
  },
  {
    name: 'Lisa P.',
    context: 'Pet portraits',
    quote:
      'I tried the pet portrait option with my golden retriever. The portraits were fun and captured his goofy personality.',
  },
  {
    name: 'Omar H.',
    context: 'Pet portraits',
    quote:
      'Made a few portraits of our cat as a gift for my partner. They loved it.',
  },
];

export default function ReviewsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Reviews', url: `${siteConfig.url}/reviews` },
        ]}
      />
      <Header />
      <main id="main-content" className="min-h-screen bg-tp-paper">
        <section className="px-4 pb-10 pt-28 text-center sm:pt-32">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display text-4xl font-normal tracking-tight text-tp-ink sm:text-5xl md:text-6xl">
              Customer Feedback
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-tp-muted">
              A look at how people use {siteConfig.name} for professional headshots, dating
              photos, team photos and pet portraits.
            </p>
            <p className="mx-auto mt-4 max-w-xl rounded-xl border border-tp-line bg-white px-4 py-3 text-sm text-tp-ink/80">
              These reviews represent typical customer experiences. Names have been changed for
              privacy.
            </p>
          </div>
        </section>

        <section className="pb-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <figure
                  key={t.name + t.context}
                  className="relative flex flex-col rounded-[18px] border border-tp-line bg-white p-6"
                >
                  <Quote
                    className="absolute right-5 top-5 h-7 w-7 text-tp-beige"
                    aria-hidden="true"
                  />
                  <blockquote className="flex-1 pr-8 text-[15px] leading-relaxed text-tp-ink/80">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 border-t border-tp-line pt-4">
                    <p className="font-semibold text-tp-ink">{t.name}</p>
                    <p className="text-sm text-tp-muted">{t.context}</p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-tp-muted">
              These are representative testimonials that illustrate common use cases. They are
              not verified reviews, and the portraits used elsewhere on this site are
              AI-generated concepts, not customer photos.
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-3xl text-tp-ink md:text-4xl">
              Ready to try it yourself?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-tp-muted">
              Pick a photo type, upload a few selfies and see your results.
            </p>
            <Link
              href="/auth/register"
              className="mt-8 inline-flex items-center rounded-[12px] bg-tp-bronze-ink px-8 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
