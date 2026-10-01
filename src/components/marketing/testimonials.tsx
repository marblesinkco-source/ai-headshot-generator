'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    role: 'Marketing Professional',
    quote:
      'I wanted an updated LinkedIn photo without booking a photographer. A set of casual selfies was enough to get several polished options to choose from.',
  },
  {
    role: 'Startup Founder',
    quote:
      "I don't have time for photo shoots. Having a full set of professional-looking photos for my website and pitch deck without a studio visit is what I was after.",
  },
  {
    role: 'Consultant',
    quote:
      'A team use case: everyone uploads their own photos and the set looks consistent on the company website, without coordinating a photographer for the whole group.',
  },
  {
    role: 'Real Estate Agent',
    quote:
      'In real estate, your headshot is part of your marketing. I wanted photos that look polished and professional across my materials.',
  },
  {
    role: 'HR Manager',
    quote:
      'Onboarding new hires is easier when getting a professional headshot is not a logistical task. Each person can upload their own photos and get results.',
  },
  {
    role: 'Attorney',
    quote:
      "I needed a professional headshot for a firm website and wanted several options to pick from rather than a single studio shot.",
  },
  {
    role: 'Freelance Designer',
    quote:
      'As a freelancer, my profile photo is my first impression. Trying a few different categories let me find a creative shot that fits my personal brand.',
  },
  {
    role: 'Sales Leader',
    quote:
      'A consistent look across a sales team helps with email signatures and profiles. This is the kind of use case a team plan is meant for.',
  },
];

export function Testimonials() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const visible = testimonials.slice(page * perPage, page * perPage + perPage);

  return (
    <section id="results" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-tp-black sm:text-4xl">
            How Professionals Use TailorPic
          </h2>
          <p className="mt-4 text-lg text-tp-muted">
            Representative examples of how professionals use TailorPic.
          </p>
          <p className="mt-3 text-xs text-tp-muted">
            These are representative examples written to illustrate common use cases. They are
            not verified customer reviews, and no ratings or review counts are claimed.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 sm:mt-20 md:grid-cols-3">
          {visible.map((t) => (
            <Card key={t.role} className="flex flex-col hover:shadow-md transition-shadow">
              <CardContent className="flex flex-1 flex-col p-6">
                <span className="inline-flex w-fit rounded-full border border-tp-line bg-tp-paper px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-tp-muted">
                  Representative example
                </span>

                {/* Quote */}
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-tp-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3 border-t border-tp-line/50 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tp-black text-sm font-semibold text-tp-bronze">
                    {t.role[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-tp-black">{t.role}</p>
                    <p className="text-xs text-tp-muted">Illustrative use case</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-tp-line bg-white text-tp-ink transition-colors hover:bg-tp-paper disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === page
                      ? 'w-6 bg-tp-bronze-ink'
                      : 'w-2 bg-tp-line hover:bg-tp-muted/40'
                  }`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-tp-line bg-white text-tp-ink transition-colors hover:bg-tp-paper disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
