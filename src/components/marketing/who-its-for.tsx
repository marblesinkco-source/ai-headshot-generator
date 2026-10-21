'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, Users, Palette, Linkedin, GraduationCap, Building2, ArrowRight } from 'lucide-react';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const BRAND_WEB = '/brand/tailorpic/web';

const personas = [
  {
    id: 'job-seekers',
    icon: Linkedin,
    photo: `${BRAND_WEB}/after-ozlem.jpg`,
    photoAlt: 'AI headshot — polished LinkedIn profile photo (AI-generated concept image)',
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
    photo: `${BRAND_WEB}/after-murat.jpg`,
    photoAlt: 'AI headshot — startup founder professional portrait (AI-generated concept image)',
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
    photo: `${BRAND_WEB}/after-tarkan.jpg`,
    photoAlt: 'AI headshot — consistent team photo style (AI-generated concept image)',
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
    photo: `${BRAND_WEB}/after-mert.jpg`,
    photoAlt: 'AI headshot — creative portfolio portrait (AI-generated concept image)',
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
    photo: `${BRAND_WEB}/after-ahmet.jpg`,
    photoAlt: 'AI headshot — real estate agent professional photo (AI-generated concept image)',
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
    photo: `${BRAND_WEB}/after-mustafa.jpg`,
    photoAlt: 'AI headshot — graduate career photo (AI-generated concept image)',
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
            const isActive = i === active;
            return (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className={`inline-flex items-center gap-2 rounded-tp-button px-3 py-2 text-sm font-medium transition-all sm:px-4 sm:py-2.5 ${
                  isActive
                    ? 'bg-tp-black text-tp-paper shadow-md'
                    : 'border border-tp-line bg-white text-tp-muted hover:border-tp-bronze/40 hover:text-tp-ink'
                }`}
                aria-pressed={isActive}
              >
                <div className="relative h-6 w-6 flex-shrink-0 overflow-hidden rounded-full border border-tp-line">
                  <Image
                    src={p.photo}
                    alt=""
                    fill
                    sizes="24px"
                    className="object-cover object-[50%_25%]"
                  />
                </div>
                <span className="hidden sm:inline">{p.title}</span>
                <span className="sm:hidden">{p.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active persona detail */}
        <div className="mx-auto mt-10 max-w-3xl rounded-tp-card border border-tp-line bg-tp-paper/50 p-6 sm:p-8 md:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
            {/* Photo */}
            <div className="flex-shrink-0 self-center sm:self-start">
              <div className="relative h-[140px] w-[112px] overflow-hidden rounded-tp-card border border-tp-line bg-tp-beige shadow-sm sm:h-[156px] sm:w-[120px]">
                <Image
                  src={persona.photo}
                  alt={persona.photoAlt}
                  fill
                  sizes="120px"
                  className="object-cover object-[50%_25%]"
                />
              </div>
              <p className="mt-1.5 text-center text-[10px] text-tp-muted">
                AI-generated concept
              </p>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = persona.icon;
                  return <Icon className="h-5 w-5 flex-shrink-0 text-tp-bronze-ink" aria-hidden="true" />;
                })()}
                <div>
                  <h3 className="text-xl font-semibold text-tp-ink">{persona.title}</h3>
                  <p className="text-sm text-tp-muted">{persona.tagline}</p>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
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

              <div className="mt-7">
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
        </div>
      </div>
    </section>
  );
}
