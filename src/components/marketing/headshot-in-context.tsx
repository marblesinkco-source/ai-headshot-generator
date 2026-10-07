'use client';

import { useState } from 'react';
import { Monitor, FileText, Mail, MessageSquare } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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
];

function LinkedInMockup() {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-tp-card border border-tp-line bg-white shadow-sm">
      {/* Banner */}
      <div className="h-20 bg-gradient-to-r from-tp-bronze/20 to-tp-bronze/10" />
      {/* Profile section */}
      <div className="-mt-10 px-5 pb-5">
        <div className="flex items-end gap-3">
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-4 border-white bg-tp-beige">
            <div className="flex h-full w-full items-center justify-center text-2xl text-tp-bronze-ink">
              👤
            </div>
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
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-tp-button bg-tp-beige">
          <div className="flex h-full w-full items-center justify-center text-xl text-tp-bronze-ink">
            👤
          </div>
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
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-tp-beige">
            <div className="flex h-full w-full items-center justify-center text-lg text-tp-bronze-ink">
              👤
            </div>
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
          <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-tp-button bg-tp-beige">
            <div className="flex h-full w-full items-center justify-center text-sm text-tp-bronze-ink">
              👤
            </div>
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
          <div className="h-9 w-9 flex-shrink-0 rounded-tp-button bg-tp-beige/50" />
          <div>
            <div className="flex items-baseline gap-2">
              <div className="h-2 w-16 rounded bg-tp-beige" />
              <p className="text-[10px] text-tp-muted/70">10:45 AM</p>
            </div>
            <div className="mt-1.5 h-2 w-32 rounded bg-tp-beige/40" />
          </div>
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
};

export function HeadshotInContext() {
  const [activeTab, setActiveTab] = useState('linkedin');
  const ActiveMockup = MOCKUPS[activeTab];

  return (
    <section className="border-t border-tp-line/40 bg-tp-paper py-16 sm:py-20">
      <div className="mx-auto max-w-tp-site px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-normal text-tp-black sm:text-3xl">
          See It in Action
        </h2>
        <p className="mt-3 max-w-2xl text-tp-muted">
          Your AI headshot works everywhere — from LinkedIn profiles to email signatures.
          Here&apos;s how it looks across platforms.
        </p>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 rounded-tp-button px-4 py-2 text-sm transition-all ${
                  isActive
                    ? 'bg-tp-bronze text-white shadow-sm'
                    : 'bg-tp-beige text-tp-muted hover:bg-tp-beige/80 hover:text-tp-ink'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Mockup */}
        <div className="mt-8">
          <ActiveMockup />
        </div>

        <p className="mt-4 text-center text-xs text-tp-muted">
          Illustrative concept — actual results may vary based on your uploaded photos.
        </p>
      </div>
    </section>
  );
}
