'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager at Stripe',
    quote:
      'I was skeptical about AI headshots, but the results blew me away. I updated my LinkedIn and got compliments from colleagues who thought I hired a professional photographer.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Founder & CEO, Luma Labs',
    quote:
      "As a startup founder, I don't have time for photo shoots. TailorPic gave me a full set of professional photos in under two hours. The quality is indistinguishable from real studio shots.",
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Senior Consultant at Deloitte',
    quote:
      'Our entire team used this for our new website. The consistency across all our headshots is remarkable, and it cost a fraction of what a photographer would have charged for 15 people.',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Real Estate Agent, Keller Williams',
    quote:
      'In real estate, your headshot is everything. TailorPic gave me photos that look expensive and professional. My clients always comment on how polished my marketing materials look now.',
    rating: 5,
  },
  {
    name: 'Ayşe Demir',
    role: 'HR Director, SaaS Company',
    quote:
      'We onboard 20+ people per quarter. Getting everyone studio-quality headshots used to be a logistical nightmare. Now each new hire gets their photos on day one. Game changer.',
    rating: 5,
  },
  {
    name: 'James O\'Brien',
    role: 'Attorney, O\'Brien & Partners',
    quote:
      'I needed a professional headshot for our firm\'s website urgently. TailorPic delivered multiple options within 2 hours. The quality exceeded what I got from my last $400 studio session.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'UX Designer, Freelance',
    quote:
      'As a freelancer, my profile photo is my first impression. I tried three different categories and got an amazing creative shot that perfectly represents my personal brand.',
    rating: 5,
  },
  {
    name: 'Thomas Weber',
    role: 'Sales Director, Enterprise SaaS',
    quote:
      'Our sales team of 30 all have consistent, professional headshots now. The ROI was immediate — our outbound response rates went up noticeably after updating our profiles.',
    rating: 5,
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
            Loved by Professionals
          </h2>
          <p className="mt-4 text-lg text-tp-muted">
            See why thousands of professionals trust us with their image.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 sm:mt-20 md:grid-cols-3">
          {visible.map((t) => (
            <Card key={t.name} className="flex flex-col hover:shadow-md transition-shadow">
              <CardContent className="flex flex-1 flex-col p-6">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-tp-bronze text-tp-bronze"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-tp-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3 border-t border-tp-line/50 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tp-black text-sm font-semibold text-tp-bronze">
                    {t.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-tp-black">{t.name}</p>
                    <p className="text-xs text-tp-muted">{t.role}</p>
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
