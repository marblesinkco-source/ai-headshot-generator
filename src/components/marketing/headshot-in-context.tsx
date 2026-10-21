'use client';

import { useState, useEffect, useRef, type CSSProperties } from 'react';
import Image from 'next/image';
import { Monitor, FileText, Mail, MessageSquare, Video, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const BRAND_WEB = '/brand/tailorpic/web';

interface ContextTab {
  id: string;
  label: string;
  icon: LucideIcon;
}

const TABS: ContextTab[] = [
  { id: 'linkedin', label: 'LinkedIn', icon: Monitor },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'email', label: 'Email Signature', icon: Mail },
  { id: 'slack', label: 'Slack', icon: MessageSquare },
  { id: 'zoom', label: 'Zoom', icon: Video },
  { id: 'teams', label: 'Teams', icon: Users },
];

function LinkedInMockup() {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-tp-card border border-tp-line bg-white shadow-sm">
      {/* Banner */}
      <div className="h-20 bg-gradient-to-r from-tp-bronze/20 to-tp-bronze/10" />
      {/* Profile section */}
      <div className="-mt-10 px-5 pb-5">
        <div className="flex items-end gap-3">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-4 border-white bg-tp-beige">
            <Image
              src={`${BRAND_WEB}/after-ozlem.jpg`}
              alt="AI-generated professional headshot on LinkedIn profile"
              fill
              sizes="80px"
              className="object-cover object-[50%_30%]"
            />
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm font-semibold text-tp-ink">Sarah Chen</p>
          <p className="text-xs text-tp-muted">VP of Marketing at TechCorp</p>
          <p className="text-[11px] text-tp-muted/70">San Francisco, CA · 500+ connections</p>
        </div>
        <div className="mt-3 flex gap-2">
          <span className="rounded-full bg-tp-bronze-ink px-3 py-1 text-[10px] font-medium text-white">
            Connect
          </span>
          <span className="rounded-full border border-tp-bronze-ink px-3 py-1 text-[10px] font-medium text-tp-bronze-ink">
            Message
          </span>
        </div>
      </div>
    </div>
  );
}

function ResumeMockup() {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-tp-card border border-tp-line bg-white p-6 shadow-sm">
      <div className="flex gap-4">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-tp-button bg-tp-beige">
          <Image
            src={`${BRAND_WEB}/after-murat.jpg`}
            alt="AI-generated professional headshot on resume"
            fill
            sizes="64px"
            className="object-cover object-[50%_30%]"
          />
        </div>
        <div>
          <p className="text-base font-semibold text-tp-ink">Sarah Chen</p>
          <p className="text-xs text-tp-muted">VP of Marketing</p>
          <p className="mt-1 text-[11px] text-tp-muted/70">
            sarah@email.com · (555) 123-4567
          </p>
        </div>
      </div>
      <div className="mt-4 border-t border-tp-line pt-3">
        <p className="text-xs font-semibold text-tp-ink">Experience</p>
        <div className="mt-2 space-y-1.5">
          <div className="h-2 w-3/4 rounded bg-tp-beige" />
          <div className="h-2 w-full rounded bg-tp-beige/60" />
          <div className="h-2 w-5/6 rounded bg-tp-beige/60" />
        </div>
      </div>
    </div>
  );
}

function EmailMockup() {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-tp-card border border-tp-line bg-white p-5 shadow-sm">
      <div className="space-y-2">
        <div className="h-2 w-full rounded bg-tp-beige/50" />
        <div className="h-2 w-4/5 rounded bg-tp-beige/50" />
        <div className="h-2 w-3/4 rounded bg-tp-beige/50" />
      </div>
      <div className="mt-5 border-t border-tp-line pt-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-tp-beige">
            <Image
              src={`${BRAND_WEB}/after-ahmet.jpg`}
              alt="AI-generated professional headshot in email signature"
              fill
              sizes="48px"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-tp-ink">Sarah Chen</p>
            <p className="text-[11px] text-tp-muted">VP of Marketing, TechCorp</p>
            <p className="text-[10px] text-tp-muted/70">sarah@techcorp.com · (555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlackMockup() {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-tp-card border border-tp-line bg-white p-4 shadow-sm">
      <div className="space-y-3">
        <div className="flex items-start gap-2.5">
          <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-tp-button bg-tp-beige">
            <Image
              src={`${BRAND_WEB}/after-tarkan.jpg`}
              alt="AI-generated professional headshot in Slack profile"
              fill
              sizes="36px"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <p className="text-xs font-semibold text-tp-ink">Sarah Chen</p>
              <p className="text-[10px] text-tp-muted/70">10:42 AM</p>
            </div>
            <p className="mt-0.5 text-xs text-tp-muted">
              Just sent over the Q4 campaign brief — let me know your thoughts!
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-tp-button bg-tp-beige/50">
            <Image
              src={`${BRAND_WEB}/after-mert.jpg`}
              alt="AI-generated headshot in Slack"
              fill
              sizes="36px"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <p className="text-xs font-semibold text-tp-ink">Alex Rivera</p>
              <p className="text-[10px] text-tp-muted/70">10:45 AM</p>
            </div>
            <div className="mt-0.5">
              <p className="text-xs text-tp-muted">Looks great, reviewing now!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ZoomMockup() {
  const others = [
    { initials: 'AR', tile: 'bg-tp-beige', text: 'text-tp-ink' },
    { initials: 'JM', tile: 'bg-tp-bronze/30', text: 'text-tp-ink' },
    { initials: 'TK', tile: 'bg-tp-ink', text: 'text-white' },
  ];
  const controls = [
    { label: 'Mute', danger: false, glyph: <><rect x="9" y="4" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0M12 17v3" /></> },
    { label: 'Stop video', danger: false, glyph: <><rect x="4" y="7" width="11" height="10" rx="2" /><path d="M15 11l5-3v8l-5-3z" /></> },
    { label: 'Share screen', danger: false, glyph: <><rect x="4" y="5" width="16" height="11" rx="2" /><path d="M9 20h6M12 16v4" /></> },
    { label: 'End call', danger: true, glyph: <path d="M4 14c5-4 11-4 16 0l-2 3-3-1.5v-2c-2-.7-4-.7-6 0v2L6 17z" /> },
  ];
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-tp-card border border-tp-line bg-tp-black shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-tp-black px-3 py-2">
        <span className="flex items-center gap-1.5 text-[10px] font-medium text-white">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-tp-bronze" />
          In Meeting
        </span>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-white/20" />
          <span className="h-3 w-3 rounded-full bg-white/20" />
          <span className="h-3 w-4 rounded-sm bg-white/20" />
        </div>
      </div>
      {/* Participants */}
      <div className="grid grid-cols-2 gap-1.5 p-1.5">
        <div className="relative aspect-[4/3] overflow-hidden rounded-tp-button bg-tp-ink ring-2 ring-tp-bronze">
          <Image
            src={`${BRAND_WEB}/after-mustafa.jpg`}
            alt="AI-generated professional headshot on Zoom video call"
            fill
            sizes="(min-width: 448px) 220px, 45vw"
            className="object-cover object-[50%_30%]"
          />
          <span className="absolute bottom-1.5 left-1.5 rounded bg-tp-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
            Sarah Chen
          </span>
        </div>
        {others.map((o) => (
          <div
            key={o.initials}
            className={`relative flex aspect-[4/3] items-center justify-center rounded-tp-button ${o.tile}`}
          >
            <span className={`text-lg font-semibold ${o.text}`}>{o.initials}</span>
          </div>
        ))}
      </div>
      {/* Toolbar */}
      <div className="flex items-center justify-center gap-3 border-t border-white/10 px-3 py-3">
        {controls.map((c) => (
          <span
            key={c.label}
            role="img"
            aria-label={c.label}
            className={`flex h-9 w-9 items-center justify-center rounded-full ${
              c.danger ? 'bg-tp-black' : 'bg-white/15'
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {c.glyph}
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

function TeamsMockup() {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-tp-card border border-tp-line bg-white shadow-sm">
      {/* Channel header */}
      <div className="flex items-center gap-2 bg-tp-bronze-ink px-4 py-3">
        <Users className="h-4 w-4 text-white" aria-hidden="true" />
        <p className="text-xs font-semibold text-white"># Marketing Team</p>
        <span className="ml-auto text-[10px] text-white/70">General</span>
      </div>
      {/* Thread */}
      <div className="space-y-3 bg-tp-paper p-4">
        <div className="flex items-start gap-2.5">
          <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-tp-beige">
            <Image
              src={`${BRAND_WEB}/after-alpaslan.jpg`}
              alt="AI-generated professional headshot in Microsoft Teams profile"
              fill
              sizes="36px"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <div className="rounded-tp-button bg-white px-3 py-2 shadow-sm">
            <div className="flex items-baseline gap-2">
              <p className="text-xs font-semibold text-tp-ink">Sarah Chen</p>
              <p className="text-[10px] text-tp-muted/70">9:15 AM</p>
            </div>
            <p className="mt-0.5 text-xs text-tp-muted">
              Morning team — the campaign deck is in the shared folder.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-tp-beige">
            <Image
              src={`${BRAND_WEB}/after-alpaslan.jpg`}
              alt="AI-generated professional headshot in Microsoft Teams message"
              fill
              sizes="36px"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <div className="rounded-tp-button bg-white px-3 py-2 shadow-sm">
            <div className="flex items-baseline gap-2">
              <p className="text-xs font-semibold text-tp-ink">Sarah Chen</p>
              <p className="text-[10px] text-tp-muted/70">9:17 AM</p>
            </div>
            <p className="mt-0.5 text-xs text-tp-muted">Let&apos;s sync at 2 PM to go over feedback.</p>
          </div>
        </div>
      </div>
      {/* Compose bar */}
      <div className="border-t border-tp-line bg-white p-3">
        <div className="flex items-center justify-between rounded-tp-button border border-tp-line px-3 py-2">
          <span className="text-xs text-tp-muted/70">Type a message</span>
          <span aria-hidden="true" className="h-4 w-4 rounded bg-tp-bronze" />
        </div>
      </div>
    </div>
  );
}

const MOCKUPS: Record<string, React.FC> = {
  linkedin: LinkedInMockup,
  resume: ResumeMockup,
  email: EmailMockup,
  slack: SlackMockup,
  zoom: ZoomMockup,
  teams: TeamsMockup,
};

export function HeadshotInContext() {
  const [activeTab, setActiveTab] = useState('linkedin');
  const ActiveMockup = MOCKUPS[activeTab];
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const items = Array.from(section.querySelectorAll<HTMLElement>('[data-context-reveal]'));

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="context-heading"
      className="relative overflow-hidden border-t border-tp-line/40 bg-tp-paper py-20 lg:py-24"
    >
      <style>{`
        @keyframes contextReveal {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tp-context-reveal { animation: contextReveal 0.4s ease-out; }
        @media (prefers-reduced-motion: reduce) { .tp-context-reveal { animation: none; } }
        .tp-tabs-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .tp-tabs-scroll::-webkit-scrollbar { display: none; }
      `}</style>
      {/* Decorative blobs */}
      <div aria-hidden="true" className="tp-blob tp-blob-beige w-[500px] h-[500px] -top-40 -right-40" />
      <div aria-hidden="true" className="tp-blob tp-blob-bronze w-[400px] h-[400px] -bottom-32 -left-32" />

      <div className="relative mx-auto max-w-tp-site px-4 sm:px-6 lg:px-8">
        <div className="scroll-fade-in mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tp-bronze-ink">
            See It in Action
          </p>
          <h2
            id="context-heading"
            className="font-display mt-4 text-[30px] font-normal leading-tight tracking-[-0.03em] text-tp-ink sm:text-[40px]"
          >
            Your Headshot, Everywhere
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-tp-muted">
            Your AI headshot works everywhere — from LinkedIn profiles to email signatures.
            Here&apos;s how it looks across platforms.
          </p>
        </div>

        {/* Tabs */}
        <div className="tp-tabs-scroll mt-10 flex gap-2 overflow-x-auto scrollbar-hide sm:flex-wrap sm:justify-center sm:overflow-visible" role="tablist" aria-label="Platform preview">
          {TABS.map((tab, i) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                data-context-reveal
                className={`reveal flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-tp-button px-4 py-2 text-sm transition-all ${
                  isActive
                    ? 'bg-tp-bronze text-tp-black shadow-sm'
                    : 'bg-tp-beige text-tp-muted hover:bg-tp-beige/80 hover:text-tp-ink'
                }`}
                style={{ '--reveal-i': i } as CSSProperties}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Mockup */}
        <div
          data-context-reveal
          className="reveal mx-auto mt-10"
          style={{ '--reveal-i': TABS.length } as CSSProperties}
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          <div className="tp-lift mx-auto max-w-md rounded-tp-card transition-[border-color,box-shadow] duration-300 hover:shadow-lg hover:shadow-tp-bronze/5 motion-reduce:transition-none">
            <div key={activeTab} className="tp-context-reveal">
              <ActiveMockup />
            </div>
          </div>
        </div>

        <p
          data-context-reveal
          className="reveal mt-6 text-center text-xs text-tp-muted"
          style={{ '--reveal-i': TABS.length + 1 } as CSSProperties}
        >
          AI-generated concept images — actual results may vary based on your uploaded photos.
        </p>
      </div>
    </section>
  );
}
