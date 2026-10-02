'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Monitor, Smartphone, Mail, CreditCard, ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type TabId = 'linkedin' | 'zoom' | 'slack' | 'teams' | 'email' | 'card';

const TABS: { id: TabId; label: string; icon: typeof Monitor; size: string }[] = [
  { id: 'linkedin', label: 'LinkedIn', icon: Monitor, size: 'Upload a square photo of at least 400 x 400 px; it displays as a circle.' },
  { id: 'zoom', label: 'Zoom', icon: Monitor, size: 'Square crop works best; a 1080 x 1080 px image stays sharp on large tiles.' },
  { id: 'slack', label: 'Slack', icon: Smartphone, size: 'Square, at least 512 x 512 px; it shows small, so keep your face large in frame.' },
  { id: 'teams', label: 'Teams', icon: Monitor, size: 'Square, at least 648 x 648 px; avatars are cropped to a circle.' },
  { id: 'email', label: 'Email Sig', icon: Mail, size: 'Export small (about 300 x 300 px) so your signature loads quickly.' },
  { id: 'card', label: 'Business Card', icon: CreditCard, size: 'For print, use the highest-resolution file you have (300 DPI at final size).' },
];

const NAME = 'Jane Doe';
const TITLE = 'Product Designer at TechCorp';

function Avatar({ size, round = true, className }: { size: number; round?: boolean; className?: string }) {
  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={cn(
        'shrink-0 bg-gradient-to-br from-tp-bronze to-tp-beige flex items-end justify-center overflow-hidden',
        round ? 'rounded-full' : 'rounded-tp-button',
        className
      )}
    >
      <div className="relative w-full h-full">
        <div className="absolute left-1/2 top-[22%] h-[30%] w-[30%] -translate-x-1/2 rounded-full bg-tp-paper/70" />
        <div className="absolute left-1/2 top-[58%] h-[50%] w-[62%] -translate-x-1/2 rounded-t-full bg-tp-paper/70" />
      </div>
    </div>
  );
}

function LinkedIn() {
  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-tp-card border border-tp-line bg-white">
      <div className="h-20 bg-[#0a3a66]" />
      <div className="px-5 pb-5">
        <Avatar size={72} className="-mt-9 border-4 border-white" />
        <p className="mt-2 text-lg font-semibold text-tp-black">{NAME}</p>
        <p className="text-sm text-tp-muted">{TITLE}</p>
        <p className="mt-0.5 text-xs text-tp-muted">San Francisco Bay Area</p>
        <div className="mt-3 flex gap-2">
          <span className="rounded-full bg-[#0a66c2] px-4 py-1.5 text-xs font-semibold text-white">Connect</span>
          <span className="rounded-full border border-[#0a66c2] px-4 py-1.5 text-xs font-semibold text-[#0a66c2]">Message</span>
        </div>
      </div>
    </div>
  );
}

function CallGrid({ teams = false }: { teams?: boolean }) {
  const accent = teams ? 'border-[#6264a7]' : 'border-[#2ecc71]';
  return (
    <div className="mx-auto w-full max-w-lg overflow-hidden rounded-tp-card bg-tp-black p-3">
      <div className="grid grid-cols-3 gap-2">
        <div className={cn('relative col-span-3 flex h-40 items-center justify-center rounded-tp-button border-[3px] bg-tp-ink sm:col-span-2 sm:row-span-2 sm:h-52', accent)}>
          <Avatar size={88} />
          <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[11px] text-tp-paper">{NAME}</span>
        </div>
        {['Guest A', 'Guest B'].map((g) => (
          <div key={g} className="relative col-span-3 flex h-20 items-center justify-center rounded-tp-button bg-tp-ink/80 sm:col-span-1 sm:h-[100px]">
            <Avatar size={40} className="opacity-60" />
            <span className="absolute bottom-1 left-1.5 text-[10px] text-tp-paper/80">{g}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-3 rounded-tp-button bg-tp-ink py-2">
        {teams
          ? ['Chat', 'People', 'Camera', 'Mic', 'Share'].map((t) => (
              <span key={t} className="rounded-full bg-tp-paper/10 px-2.5 py-1 text-[10px] text-tp-paper">{t}</span>
            ))
          : ['Mute', 'Video', 'Share'].map((t) => (
              <span key={t} className="text-[10px] text-tp-paper/80">{t}</span>
            ))}
        <span className="rounded bg-red-600 px-2.5 py-1 text-[10px] font-semibold text-white">{teams ? 'Leave' : 'End'}</span>
      </div>
    </div>
  );
}

function Slack() {
  return (
    <div className="mx-auto w-full max-w-md rounded-tp-card border border-tp-line bg-white p-4">
      <p className="mb-3 text-xs font-semibold text-tp-muted"># design-team</p>
      <div className="flex items-start gap-3">
        <Avatar size={36} round={false} className="!rounded-md" />
        <div>
          <p className="text-sm">
            <span className="font-bold text-tp-black">{NAME}</span>{' '}
            <span className="text-xs text-tp-muted">10:42 AM</span>
          </p>
          <p className="text-sm text-tp-ink">Mockups are ready for review. Let me know what you think!</p>
        </div>
      </div>
    </div>
  );
}

function EmailSig() {
  return (
    <div className="mx-auto w-full max-w-md rounded-tp-card border border-tp-line bg-white p-5">
      <p className="text-sm text-tp-ink">Thanks, talk soon.</p>
      <div className="my-3 h-px bg-tp-line" />
      <div className="flex items-center gap-4">
        <Avatar size={64} />
        <div className="border-l-2 border-tp-bronze pl-4">
          <p className="text-sm font-semibold text-tp-black">{NAME}</p>
          <p className="text-xs text-tp-muted">{TITLE}</p>
          <p className="mt-1.5 text-xs text-tp-ink">jane@example.com</p>
          <p className="text-xs text-tp-ink">+1 (555) 010-0100</p>
        </div>
      </div>
    </div>
  );
}

function BusinessCard() {
  return (
    <div className="mx-auto flex aspect-[7/4] w-full max-w-sm items-center gap-5 rounded-tp-button border border-tp-line bg-tp-paper p-6 shadow-md shadow-black/10">
      <Avatar size={84} round={false} />
      <div className="min-w-0">
        <p className="font-display text-2xl font-normal text-tp-black">{NAME}</p>
        <p className="text-xs text-tp-bronze-ink">{TITLE}</p>
        <div className="my-2 h-px w-10 bg-tp-bronze" />
        <p className="text-xs text-tp-ink">jane@example.com</p>
        <p className="text-xs text-tp-ink">+1 (555) 010-0100</p>
      </div>
    </div>
  );
}

const MOCKUPS: Record<TabId, () => JSX.Element> = {
  linkedin: LinkedIn,
  zoom: () => <CallGrid />,
  slack: Slack,
  teams: () => <CallGrid teams />,
  email: EmailSig,
  card: BusinessCard,
};

export function PlatformPreview() {
  const [active, setActive] = useState<TabId>('linkedin');
  const tab = TABS.find((t) => t.id === active) ?? TABS[0];
  const Mockup = MOCKUPS[tab.id];

  return (
    <section className="bg-tp-paper py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-normal text-tp-black sm:text-4xl">See Your Headshot Everywhere</h2>
          <p className="mx-auto mt-3 max-w-xl text-tp-muted">
            One photo, sized and framed for every place professionals show up: profiles, calls, chat, email and print.
          </p>
        </div>

        <div role="tablist" aria-label="Platform" className="mt-8 flex flex-wrap justify-center gap-2">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`pp-tab-${id}`}
              aria-selected={active === id}
              aria-controls="pp-panel"
              onClick={() => setActive(id)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-tp-button border px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                active === id
                  ? 'border-tp-black bg-tp-black text-tp-bronze'
                  : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze'
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id="pp-panel"
          aria-labelledby={`pp-tab-${tab.id}`}
          className="mt-8 rounded-tp-card bg-tp-beige/30 p-4 sm:p-8"
        >
          <Mockup />
        </div>

        <p className="mt-5 text-center text-sm text-tp-ink">
          <span className="font-semibold">{tab.label}:</span> {tab.size}
        </p>

        <div className="mt-8 text-center">
          <Link href="/auth/register?redirect=/headshots" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
            Get Platform-Ready Headshots
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <p className="mt-4 text-xs text-tp-muted">Mockup — for illustration only</p>
        </div>
      </div>
    </section>
  );
}
