import { Star } from 'lucide-react';
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
];

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32">
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
          {testimonials.map((t) => (
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
      </div>
    </section>
  );
}
