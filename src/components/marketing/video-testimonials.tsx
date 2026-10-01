'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

const videoTestimonials = [
  {
    role: 'Marketing Director',
    quote:
      'Uploading a few casual photos and getting back polished, professional headshots saved our team hours of coordination.',
    gradient: 'from-tp-black via-tp-ink to-tp-black',
  },
  {
    role: 'HR Manager',
    quote:
      'Onboarding new hires with consistent headshots across the company site has never been simpler.',
    gradient: 'from-tp-bronze/30 via-tp-bronze/10 to-tp-beige',
  },
  {
    role: 'Photographer',
    quote:
      'As a photographer, I was skeptical — but the quality and variety of outputs genuinely impressed me.',
    gradient: 'from-tp-ink via-tp-black to-tp-ink',
  },
];

export function VideoTestimonials() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 sm:py-32 bg-tp-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
            Video Reviews
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
            Hear It Directly
          </h2>
          <p className="mt-4 text-lg text-tp-muted">
            See how professionals can benefit from AI-generated headshots.
          </p>
          <p className="mt-2 text-sm text-tp-muted">
            Video testimonials coming soon
          </p>
        </div>

        {/* Video cards */}
        <div className="mt-16 grid gap-6 sm:mt-20 md:grid-cols-3">
          {videoTestimonials.map((t, i) => (
            <div
              key={t.role}
              className="group relative flex flex-col rounded-tp-card border border-tp-line bg-white transition-all hover:border-tp-bronze/30 hover:shadow-lg hover:shadow-tp-bronze/5"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Video placeholder */}
              <div
                className={`relative flex aspect-video items-center justify-center rounded-t-tp-card bg-gradient-to-br ${t.gradient} overflow-hidden`}
              >
                {/* Play button */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm transition-transform ${
                    hoveredIndex === i ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <Play aria-hidden="true" className="h-6 w-6 text-white fill-white/80 ml-0.5" />
                </div>

                {/* Coming soon badge */}
                <span className="absolute bottom-3 right-3 rounded-full bg-tp-black/60 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm">
                  Coming soon
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <span className="inline-flex w-fit rounded-full border border-tp-line bg-tp-paper px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-tp-muted">
                  Representative example
                </span>

                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-tp-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="mt-5 flex items-center gap-3 border-t border-tp-line/50 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-tp-bronze/20 to-tp-beige">
                    <Play aria-hidden="true" className="h-4 w-4 text-tp-bronze-ink" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-tp-ink">{t.role}</p>
                    <p className="text-xs text-tp-muted">Marketing Professional</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-10 text-center text-xs text-tp-muted">
          * Illustrative testimonial for demonstration purposes.
          These are not verified customer reviews.
        </p>
      </div>
    </section>
  );
}
