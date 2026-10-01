import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Daniel R.',
    role: 'Startup Founder',
    company: 'Early-stage SaaS',
    quote:
      'I had no time for a studio shoot. I uploaded a few selfies and had polished headshots ready fast, in time for my pitch deck and website.',
  },
  {
    name: 'Priya S.',
    role: 'Marketing Director',
    company: 'B2B technology brand',
    quote:
      'The variety was what won me over. Different backgrounds and styles meant I had one look for LinkedIn and another for conference bios.',
  },
  {
    name: 'Marcus T.',
    role: 'Real Estate Agent',
    company: 'Independent brokerage',
    quote:
      'My headshot is on every sign and flyer. The quality looks professional and approachable, at a price far below a traditional photographer.',
  },
  {
    name: 'Elena V.',
    role: 'Financial Advisor',
    company: 'Wealth planning practice',
    quote:
      'Clients judge trust at a glance. I got clean, natural-looking portraits and several options to choose from, without scheduling a single appointment.',
  },
  {
    name: 'Jordan K.',
    role: 'HR Manager',
    company: 'Growing mid-size company',
    quote:
      'Getting headshots for new hires used to be a logistics headache. Now everyone uploads their own photos, and results arrive quickly at a budget-friendly cost.',
  },
  {
    name: 'Sofia M.',
    role: 'Freelance Designer',
    company: 'Independent studio',
    quote:
      'As a freelancer my profile photo is my first impression. The range of styles let me find a creative shot that suits my brand, and the quality held up.',
  },
];

function StarRating() {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label="5 out of 5 stars (illustrative)"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className="h-4 w-4 fill-tp-bronze text-tp-bronze"
        />
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .replace('.', '')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section id="results" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-tp-paper via-white to-tp-paper"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
            Use Cases
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-tp-black sm:text-4xl">
            How Professionals Use TailorPic
          </h2>
          <p className="mt-4 text-lg text-tp-muted">
            See how different professionals benefit from AI-generated headshots.
          </p>
        </div>

        {/* Cards: 1 col mobile, 2 tablet, 3 desktop */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="group relative flex flex-col overflow-hidden rounded-tp-card border border-tp-line bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-tp-bronze/40 hover:shadow-xl hover:shadow-tp-bronze/10"
            >
              {/* Top accent line */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-tp-bronze/0 via-tp-bronze to-tp-bronze/0 opacity-60 transition-opacity group-hover:opacity-100"
              />

              {/* Decorative quote mark */}
              <Quote
                aria-hidden="true"
                className="absolute right-5 top-6 h-12 w-12 rotate-180 fill-tp-beige/50 text-tp-beige/50"
              />

              <StarRating />

              <blockquote className="relative mt-5 flex-1 text-base leading-relaxed text-tp-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-tp-line pt-5">
                <div
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tp-black text-sm font-semibold tracking-wide text-tp-bronze ring-2 ring-tp-bronze/40 ring-offset-2 ring-offset-white"
                >
                  {initials(t.name)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-tp-black">{t.name}</p>
                  <p className="text-xs text-tp-muted">
                    {t.role}, {t.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-tp-muted/60">
          * Illustrative testimonials for demonstration purposes.
        </p>
      </div>
    </section>
  );
}
