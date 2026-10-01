import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { ChevronDown, Quote } from 'lucide-react';

const pageTitle = 'Customer Feedback & Representative Reviews';
const pageDescription = `See how people use ${siteConfig.name} for professional headshots, dating photos, team photos and pet portraits. Representative examples, clearly labeled, plus answers on how we handle reviews.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'AI headshot reviews',
    'AI headshot feedback',
    'professional headshot testimonials',
    `${siteConfig.name} reviews`,
    'AI dating photos feedback',
    'AI team headshots',
  ],
  alternates: { canonical: '/reviews' },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    url: `${siteConfig.url}/reviews`,
    siteName: siteConfig.name,
    type: 'website',
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    images: [siteConfig.ogImage],
  },
};

/* ------------------------------------------------------------------ */
/*  NOTE: These are representative testimonials written to illustrate  */
/*  common use cases. They are not verified reviews, and no ratings    */
/*  or review counts are shown.                                        */
/* ------------------------------------------------------------------ */

const categories = [
  {
    id: 'headshots',
    label: 'Professional headshots',
    blurb: 'LinkedIn profiles, websites and pitch decks.',
    items: [
      {
        name: 'Sarah C.',
        context: 'Marketing Director',
        quote:
          'I uploaded a handful of casual selfies and got back headshots that suit my LinkedIn profile far better than my old photo did.',
      },
      {
        name: 'David K.',
        context: 'Startup founder',
        quote:
          'I needed a consistent set of photos for our website and pitch deck without booking a studio. This covered it.',
      },
    ],
  },
  {
    id: 'dating',
    label: 'Dating photos',
    blurb: 'Natural-looking photos for dating profiles.',
    items: [
      {
        name: 'Mia R.',
        context: 'Dating profile',
        quote:
          'I wanted photos that looked like me on a good day. The results felt natural, and I could pick the ones that matched my personality.',
      },
      {
        name: 'Jordan T.',
        context: 'Dating profile',
        quote:
          'Easier than asking a friend to shoot me over a weekend. I had a few solid options to choose from within hours.',
      },
    ],
  },
  {
    id: 'teams',
    label: 'Team photos',
    blurb: 'Cohesive headshots for distributed teams.',
    items: [
      {
        name: 'Ayşe D.',
        context: 'HR lead',
        quote:
          'We needed matching headshots for a distributed team. Everyone uploaded their own photos, and the set looked cohesive on our careers page.',
      },
      {
        name: 'Thomas W.',
        context: 'Sales manager',
        quote:
          'Updated headshots for email signatures and our CRM without coordinating a photo day.',
      },
    ],
  },
  {
    id: 'pets',
    label: 'Pet portraits',
    blurb: 'Fun portraits and gifts for pet owners.',
    items: [
      {
        name: 'Lisa P.',
        context: 'Pet owner',
        quote:
          'I tried the pet portrait option with my golden retriever. The portraits were fun and captured his goofy personality.',
      },
      {
        name: 'Omar H.',
        context: 'Pet owner',
        quote:
          'Made a few portraits of our cat as a gift for my partner. They loved it.',
      },
    ],
  },
];

const faqs = [
  {
    question: 'Are the testimonials on this page from verified customers?',
    answer:
      'No. The examples on this page are representative: they illustrate common ways people use TailorPic and are not verified customer reviews. Names are abbreviated or changed, and we do not show star ratings or review counts.',
  },
  {
    question: 'Why do you show representative examples?',
    answer:
      'We would rather label illustrative feedback honestly than present unverified claims as proof. Each example reflects a real use case, such as LinkedIn headshots, dating photos, team photos or pet portraits.',
  },
  {
    question: 'Are the portraits on your site photos of real customers?',
    answer:
      'No. The portraits shown elsewhere on this site are AI-generated concepts and are not photos of customers.',
  },
  {
    question: 'How can I share my own feedback?',
    answer:
      'Send it through our contact page. Tell us which photo type you used and what worked or did not. We read every message.',
  },
  {
    question: 'Will you publish my feedback?',
    answer:
      'Only with your permission. If you would like your feedback considered for this page, say so in your message and tell us how you want your name to appear.',
  },
  {
    question: 'Do you remove negative feedback or edit reviews?',
    answer:
      'We do not edit the substance of feedback. Use the contact page to raise a problem and our team will follow up so we can fix it.',
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
      <FAQSchema items={faqs} />
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
            <p className="mx-auto mt-4 max-w-xl rounded-tp-button border border-tp-line bg-white px-4 py-3 text-sm text-tp-ink/80">
              These reviews represent typical customer experiences. Names have been changed for
              privacy.
            </p>
          </div>
        </section>

        <nav aria-label="Review categories" className="px-4 pb-8">
          <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="inline-flex h-10 items-center rounded-tp-button border border-tp-line bg-white px-4 text-sm font-medium text-tp-ink transition-colors hover:border-tp-bronze hover:bg-tp-beige/30"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section className="pb-12">
          <div className="mx-auto max-w-6xl space-y-14 px-4 sm:px-6">
            {categories.map((c) => (
              <div key={c.id} id={c.id} className="scroll-mt-28">
                <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="font-display text-2xl text-tp-ink md:text-3xl">{c.label}</h2>
                  <p className="text-sm text-tp-muted">{c.blurb}</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {c.items.map((t) => (
                    <figure
                      key={t.name + t.context}
                      className="relative flex flex-col rounded-tp-card border border-tp-line bg-white p-6"
                    >
                      <span className="mb-4 w-fit rounded-tp-button bg-tp-beige/40 px-2.5 py-1 text-xs font-medium text-tp-bronze-ink">
                        Representative example
                      </span>
                      <Quote
                        className="absolute right-5 top-5 h-7 w-7 text-tp-beige"
                        aria-hidden="true"
                      />
                      <blockquote className="flex-1 text-[15px] leading-relaxed text-tp-ink/80">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <figcaption className="mt-5 border-t border-tp-line pt-4">
                        <p className="font-semibold text-tp-ink">{t.name}</p>
                        <p className="text-sm text-tp-muted">{t.context}</p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}

            <p className="mx-auto max-w-2xl text-center text-xs text-tp-muted">
              These are representative testimonials that illustrate common use cases. They are
              not verified reviews, and the portraits used elsewhere on this site are
              AI-generated concepts, not customer photos.
            </p>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6" aria-labelledby="review-faq-heading">
          <div className="mx-auto max-w-3xl">
            <h2
              id="review-faq-heading"
              className="text-center font-display text-3xl text-tp-ink md:text-4xl"
            >
              About our reviews
            </h2>
            <div className="mt-8 space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.question}
                  className="group rounded-tp-card border border-tp-line bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 text-sm font-semibold text-tp-ink">
                    {f.question}
                    <ChevronDown
                      className="h-4 w-4 shrink-0 text-tp-muted transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="px-6 pb-5 text-sm leading-relaxed text-tp-muted">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6" aria-labelledby="leave-review-heading">
          <div className="mx-auto max-w-3xl rounded-tp-card border border-tp-line bg-white px-6 py-10 text-center sm:px-10">
            <h2 id="leave-review-heading" className="font-display text-3xl text-tp-ink md:text-4xl">
              Leave a Review
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-tp-muted">
              Used {siteConfig.name}? Tell us how it went. Send your feedback through our contact
              page and let us know if we may feature it.
            </p>
            <Link
              href="/contact"
              className={buttonVariants({ variant: 'outline', size: 'lg', className: 'mt-6' })}
            >
              Share Your Feedback
            </Link>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-3xl rounded-tp-card border border-tp-line bg-tp-beige/30 px-6 py-12 text-center sm:px-10">
            <h2 className="font-display text-3xl text-tp-ink md:text-4xl">
              Ready to see for yourself?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-tp-muted">
              Pick a photo type, upload a few selfies and see your results.
            </p>
            <Link
              href="/auth/register"
              className={buttonVariants({ variant: 'primary', size: 'lg', className: 'mt-8' })}
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
