'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Users, ArrowRight, Check, Shield, Clock, CreditCard } from 'lucide-react';

const TEAM_BENEFITS = [
  {
    icon: Users,
    title: 'Consistent Team Look',
    description: 'Every team member gets the same quality, lighting, and style — no mismatched photos.',
  },
  {
    icon: Clock,
    title: 'Done in Hours, Not Weeks',
    description: 'No scheduling logistics. Everyone uploads on their own time, results in under 2 hours.',
  },
  {
    icon: CreditCard,
    title: 'Volume Pricing',
    description: '$39/person for 5–15 people, $29/person for 16–50. One invoice, one admin.',
  },
  {
    icon: Shield,
    title: 'Enterprise Privacy',
    description: 'Photos auto-deleted after 30 days. No data used for training. Full GDPR compliance.',
  },
] as const;

const TEAM_FEATURES = [
  'Admin dashboard for team management',
  'Bulk ordering with single invoice',
  'Consistent style across all team members',
  'Multiple background and outfit options',
  'High-resolution downloads for all uses',
  'Dedicated email support',
] as const;

export function TeamShowcase() {
  return (
    <section
      className="bg-tp-ink py-20 sm:py-28"
      aria-labelledby="team-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: content */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tp-bronze">
              For Teams & Companies
            </p>
            <h2
              id="team-heading"
              className="mt-3 font-display text-3xl font-normal tracking-tight text-tp-paper sm:text-5xl"
            >
              Professional headshots for your entire team
            </h2>
            <p className="mt-4 text-base text-tp-beige/70">
              Stop coordinating studio sessions. Let each team member upload
              selfies on their own schedule and get consistent, polished
              headshots delivered in under 2 hours.
            </p>

            <ul className="mt-8 space-y-3">
              {TEAM_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-tp-beige">
                  <Check className="h-4 w-4 shrink-0 text-tp-bronze" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/team-headshots"
                className={buttonVariants({ variant: 'primary', size: 'lg' })}
              >
                Get Team Pricing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/enterprise"
                className="inline-flex items-center justify-center rounded-tp-button border border-tp-beige/30 px-6 py-3 text-sm font-semibold text-tp-beige transition-colors hover:bg-tp-beige/10"
              >
                Enterprise Solutions
              </Link>
            </div>
          </div>

          {/* Right: visual grid */}
          <div className="relative">
            {/* Simulated team portrait grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { bg: 'from-[#E8E6E0] to-[#D5D3CD]', outfit: '#1B2A4A' },
                { bg: 'from-[#DDE5EE] to-[#C2D0E0]', outfit: '#2C3E50' },
                { bg: 'from-[#F5F5F0] to-[#EFEDE8]', outfit: '#16161A' },
                { bg: 'from-[#E8EFDD] to-[#C8D8B0]', outfit: '#3F6B8C' },
                { bg: 'from-[#F0EDEA] to-[#D8D4D0]', outfit: '#1B2A4A' },
                { bg: 'from-[#1F3A5F] to-[#0F2240]', outfit: '#F5F5F0' },
                { bg: 'from-[#FCF0DB] to-[#EADCC6]', outfit: '#6B5A48' },
                { bg: 'from-[#D5D6D8] to-[#A9ABAF]', outfit: '#2C3E50' },
                { bg: 'from-[#E8D5F0] to-[#C8A8D8]', outfit: '#4A1B6B' },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`relative aspect-square overflow-hidden rounded-tp-button bg-gradient-to-br ${card.bg}`}
                >
                  {/* Shoulders */}
                  <div
                    className="absolute bottom-0 left-1/2 h-[35%] w-[75%] -translate-x-1/2 rounded-t-[45%]"
                    style={{ backgroundColor: card.outfit }}
                  />
                  {/* Neck */}
                  <div className="absolute bottom-[32%] left-1/2 h-[8%] w-[14%] -translate-x-1/2 rounded-md bg-tp-beige/70" />
                  {/* Head */}
                  <div className="absolute bottom-[37%] left-1/2 aspect-square w-[30%] -translate-x-1/2 rounded-full bg-tp-beige/70 shadow-inner" />
                </div>
              ))}
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-2 rounded-tp-card bg-tp-paper px-4 py-3 shadow-lg sm:-right-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3].map((n) => (
                    <div
                      key={n}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-tp-paper bg-tp-bronze/20 text-[10px] font-bold text-tp-bronze-ink"
                    >
                      {['JD', 'SK', 'AM', 'TL'][n]}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-medium text-tp-ink">
                  Team photos ready
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits grid */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_BENEFITS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-tp-card border border-tp-beige/10 bg-tp-beige/5 p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tp-bronze/20">
                <Icon className="h-5 w-5 text-tp-bronze" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-tp-paper">
                {title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-tp-beige/60">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamShowcase;
