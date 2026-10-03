'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

const videoHighlights = [
  {
    role: 'For Marketing Teams',
    description:
      'Upload casual photos and get polished, professional headshots — saving hours of coordination for team pages and campaigns.',
    gradient: 'from-tp-black via-tp-ink to-tp-black',
  },
  {
    role: 'For HR & Onboarding',
    description:
      'Onboard new hires with consistent headshots across the company site — no photographer scheduling needed.',
    gradient: 'from-tp-bronze/30 via-tp-bronze/10 to-tp-beige',
  },
  {
    role: 'For Creative Professionals',
    description:
      'Get a variety of styles and backgrounds to match your personal brand across portfolios and social profiles.',
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
            Video Walkthroughs
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
            See How It Works
          </h2>
          <p className="mt-4 text-lg text-tp-muted">
            Quick walkthroughs showing how different professionals use AI-generated headshots.
          </p>
          <p className="mt-2 text-sm text-tp-muted">
            Video walkthroughs coming soon
          </p>
        </div>

        {/* Video cards */}
        <div className="mt-16 grid gap-6 sm:mt-20 md:grid-cols-3">
          {videoHighlights.map((t, i) => (
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
                <h3 className="text-base font-semibold text-tp-ink">{t.role}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-tp-muted">
                  {t.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
