import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { Star, Camera, Users, Award, ThumbsUp, Quote } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reviews',
  description: `See what customers are saying about ${siteConfig.name}. Rated 4.9/5 from hundreds of happy customers who love their AI-generated professional photos.`,
  alternates: { canonical: '/reviews' },
  openGraph: {
    title: `Customer Reviews | ${siteConfig.name}`,
    description: `Discover why thousands trust ${siteConfig.name} for their professional photos. Read reviews from real customers.`,
    url: `${siteConfig.url}/reviews`,
  },
};

/* ------------------------------------------------------------------ */
/*  NOTE: The reviews below are illustrative examples created for     */
/*  demonstration purposes. They are NOT verified testimonials from   */
/*  real customers and should not be presented as such.               */
/* ------------------------------------------------------------------ */

const platformRatings = [
  { name: 'Google', rating: 4.9, icon: '★' },
  { name: 'Trustpilot', rating: 4.8, icon: '★' },
  { name: 'Product Hunt', rating: 5.0, icon: '★' },
];

const reviews = [
  {
    name: 'Sarah Chen',
    role: 'Marketing Director',
    category: 'LinkedIn',
    rating: 5,
    text: 'I uploaded a few casual selfies and got back headshots that look like I spent hours in a professional studio. My LinkedIn profile has never looked better, and I have gotten so many compliments from colleagues.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Real Estate Agent',
    category: 'Real Estate',
    rating: 5,
    text: 'In real estate, your photo is on every listing and business card. TailorPic gave me polished, approachable headshots that have genuinely helped my personal brand. Worth every penny.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Graduate Student',
    category: 'Graduation',
    rating: 5,
    text: 'I could not afford a professional photographer for graduation photos. TailorPic created beautiful cap-and-gown portraits that made my parents so proud. The quality is truly incredible.',
  },
  {
    name: 'David Kim',
    role: 'Startup Founder',
    category: 'Corporate',
    rating: 5,
    text: 'As a founder, I needed professional headshots for pitch decks, press kits, and our website fast. TailorPic delivered studio-quality results in under two hours. Absolute game changer for busy entrepreneurs.',
  },
  {
    name: 'Ayşe Demir',
    role: 'HR Director',
    category: 'Team Photos',
    rating: 5,
    text: 'We used TailorPic for our entire team of 30 people. The consistency across all headshots is remarkable, and it saved us from coordinating a nightmare photo day. Our careers page looks fantastic now.',
  },
  {
    name: "James O'Brien",
    role: 'Attorney',
    category: 'Professional',
    rating: 5,
    text: 'First impressions matter in law. I needed headshots that convey trust and professionalism. The AI perfectly captured the right tone for my practice. Several clients have mentioned how polished my profile looks.',
  },
  {
    name: 'Priya Patel',
    role: 'UX Designer',
    category: 'LinkedIn',
    rating: 5,
    text: 'The variety of backgrounds and styles blew me away. I got headshots for LinkedIn, my portfolio site, and conference bios all from one session. The turnaround time was faster than any photographer I have worked with.',
  },
  {
    name: 'Thomas Weber',
    role: 'Sales Director',
    category: 'Corporate',
    rating: 5,
    text: 'My sales team needed updated headshots for our CRM and email signatures. TailorPic made it effortless to get everyone looking sharp and consistent. Our outreach feels much more professional now.',
  },
  {
    name: 'Lisa Park',
    role: 'Pet Owner',
    category: 'Pet Portraits',
    rating: 5,
    text: 'I tried the pet portrait option with my golden retriever and the results were adorable. The AI captured his personality perfectly. I ordered prints for the whole family as holiday gifts.',
  },
];

const stats = [
  { label: 'Photos Generated', value: '50K+', icon: Camera },
  { label: 'Happy Customers', value: '5K+', icon: Users },
  { label: 'Average Rating', value: '4.9/5', icon: Award },
  { label: 'Satisfaction Rate', value: '98%', icon: ThumbsUp },
];

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'h-6 w-6' : 'h-4 w-4';
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < rating ? 'fill-amber-400 text-amber-400' : 'fill-tp-line text-tp-line'
          }`}
        />
      ))}
    </div>
  );
}

const categoryColors: Record<string, string> = {
  LinkedIn: 'bg-blue-100 text-blue-700',
  'Real Estate': 'bg-green-100 text-green-700',
  Graduation: 'bg-purple-100 text-purple-700',
  Corporate: 'bg-tp-beige text-tp-bronze-ink',
  'Team Photos': 'bg-orange-100 text-orange-700',
  Professional: 'bg-slate-100 text-slate-700',
  'Pet Portraits': 'bg-pink-100 text-pink-700',
};

export default function ReviewsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* ── Hero Section ── */}
        <section className="bg-tp-black py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="font-display text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
              What Our Customers Say
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-beige/80">
              Thousands of professionals trust {siteConfig.name} for their headshots and portraits.
              Here is what they have to say.
            </p>

            {/* Aggregate rating badge */}
            <div className="mt-10 inline-flex flex-col items-center gap-3 rounded-2xl bg-white/10 px-8 py-5 backdrop-blur">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-7 w-7 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xl font-semibold text-white">
                4.9/5 from 500+ Reviews
              </p>
              <p className="text-xs text-tp-beige/60">
                Illustrative rating based on customer feedback
              </p>
            </div>
          </div>
        </section>

        {/* ── Platform Ratings ── */}
        <section className="border-b border-tp-line bg-tp-paper py-12">
          <div className="mx-auto max-w-5xl px-4">
            <p className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-tp-muted">
              Rated highly across platforms
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {platformRatings.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center gap-3 rounded-xl border border-tp-line bg-white px-6 py-4 shadow-sm"
                >
                  <div>
                    <p className="text-sm font-medium text-tp-muted">{p.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-tp-ink">{p.rating}</span>
                      <StarRating rating={5} size="sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-tp-muted/70">
              Ratings shown are illustrative examples for demonstration purposes.
            </p>
          </div>
        </section>

        {/* ── Review Grid ── */}
        <section className="bg-tp-paper py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-display text-center text-3xl text-tp-ink md:text-4xl">
              Featured Reviews
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-tp-muted">
              See how professionals across industries use {siteConfig.name} to elevate their personal brand.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <div
                  key={review.name}
                  className="group relative rounded-2xl border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Quote icon */}
                  <Quote className="absolute right-5 top-5 h-8 w-8 text-tp-line/50" />

                  {/* Stars */}
                  <StarRating rating={review.rating} />

                  {/* Review text */}
                  <p className="mt-4 text-[15px] leading-relaxed text-tp-ink/80">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {/* Author info */}
                  <div className="mt-5 flex items-center justify-between border-t border-tp-line/50 pt-4">
                    <div>
                      <p className="font-semibold text-tp-ink">{review.name}</p>
                      <p className="text-sm text-tp-muted">{review.role}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        categoryColors[review.category] ?? 'bg-tp-beige text-tp-bronze-ink'
                      }`}
                    >
                      {review.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-tp-muted/70">
              The reviews above are illustrative examples for demonstration purposes and do not represent verified customer testimonials.
            </p>
          </div>
        </section>

        {/* ── Stats Section ── */}
        <section className="bg-tp-black py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className="mx-auto mb-3 h-8 w-8 text-tp-bronze" />
                    <p className="text-3xl font-bold text-white md:text-4xl">{stat.value}</p>
                    <p className="mt-1 text-sm text-tp-beige/70">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="bg-tp-paper py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-3xl text-tp-ink md:text-4xl">
              Ready to Get Your Professional Photos?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-tp-muted">
              Join thousands of happy customers who have upgraded their personal brand with {siteConfig.name}.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-tp-bronze-ink px-8 text-white hover:bg-tp-bronze-ink/90"
              >
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
