'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Briefcase, Users, Palette, Linkedin, GraduationCap, Building2, ArrowRight } from 'lucide-react';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const personas = [
  {
    id: 'job-seekers',
    icon: Linkedin,
    title: 'Job Seekers',
    tagline: 'Stand out to recruiters',
    points: [
      'Polished headshots that elevate your LinkedIn profile',
      'Multiple styles to match different industries',
      'Ready within hours — no waiting for a studio appointment',
    ],
    cta: 'Get Started',
    href: '/auth/register?redirect=/dashboard/upload?category=headshots',
  },
  {
    id: 'founders',
    icon: Briefcase,
    title: 'Startup Founders',
    tagline: 'Professional photos for your pitch',
    points: [
      'Consistent headshots for your pitch deck and website',
      'Every co-founder uploads their own selfies',
      'Cohesive look without coordinating schedules',
    ],
    cta: 'Get Started',
    href: '/auth/register?redirect=/dashboard/upload?category=headshots',
  },
  {
    id: 'teams',
    icon: Users,
    title: 'HR & Teams',
    tagline: 'Consistent team headshots',
    points: [
      'Volume pricing for teams of 5 to 50 people',
      'Everyone gets the same professional style',
      'No need to fly anyone to a studio',
    ],
    cta: 'See Team Pricing',
    href: '/team-headshots',
  },
  {
    id: 'creatives',
    icon: Palette,
    title: 'Creatives & Freelancers',
    tagline: 'Show your personality',
    points: [
      'Creative styles that fit your portfolio and brand',
      'Multiple backgrounds and outfit options',
      '12 categories to choose from',
    ],
    cta: 'Get Started',
    href: '/auth/register?redirect=/dashboard/upload?category=headshots',
  },
  {
    id: 'real-estate',
    icon: Building2,
    title: 'Real Estate Agents',
    tagline: 'Look your best on every listing',
    points: [
      'Professional headshots for your listings and business cards',
      'Multiple styles from corporate to approachable',
      'Update your look anytime without another studio visit',
    ],
    cta: 'Get Started',
    href: '/auth/register?redirect=/dashboard/upload?category=headshots',
  },
  {
    id: 'students',
    icon: GraduationCap,
    title: 'Students & Graduates',
    tagline: 'Launch your career with the right photo',
    points: [
      `Affordable headshots starting at just ${BASE_PRICE_DISPLAY}`,
      'Perfect for internship and job applications',
      'No need to book — upload from your phone',
    ],
    cta: 'Get Started',
    href: '/auth/register?redirect=/dashboard/upload?category=headshots',
  },
] as const;

export function WhoItsFor() {
  const [active, setActive] = useState(0);
  const persona = personas[active];

  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="who-its-for-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-tp-bronze-ink">
            Built For You
          </p>
          <h2
            id="who-its-for-title"
            className="font-display font-normal text-3xl leading-tight text-tp-ink sm:text-4xl"
          >
            Perfect for Every Professional
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-tp-muted">
            Whether you need a single LinkedIn headshot or consistent photos for your
            entire team, TailorPic has a plan that fits — starting from {BASE_PRICE_DISPLAY}.
          </p>
        </div>

        {/* Persona tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {personas.map((p, i) => {
            const Icon = p.icon;
            const isActive = i === active;
            return (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className={`inline-flex items-center gap-2 rounded-tp-button px-4 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-tp-black text-tp-paper shadow-md'
                    : 'border border-tp-line bg-white text-tp-muted hover:border-tp-bronze/40 hover:text-tp-ink'
                }`}
                aria-pressed={isActive}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {p.title}
              </button>
            );
          })}
        </div>

        {/* Active persona detail */}
        <div className="mx-auto mt-10 max-w-2xl rounded-tp-card border border-tp-line bg-tp-paper/50 p-8 sm:p-10">
          <div className="flex items-center gap-3">
            {(() => {
              const Icon = persona.icon;
              return <Icon className="h-6 w-6 text-tp-bronze-ink" aria-hidden="true" />;
            })()}
            <div>
              <h3 className="text-xl font-semibold text-tp-ink">{persona.title}</h3>
              <p className="text-sm text-tp-muted">{persona.tagline}</p>
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {persona.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-tp-ink">
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-tp-bronze-ink"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[15px]">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link
              href={persona.href}
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-black px-6 py-3 text-sm font-semibold text-tp-paper transition-all hover:-translate-y-0.5 hover:bg-tp-ink hover:shadow-lg"
            >
              {persona.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
