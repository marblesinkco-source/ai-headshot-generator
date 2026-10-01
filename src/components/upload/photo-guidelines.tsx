'use client';

import { useId, useState } from 'react';
import {
  AlertTriangle,
  Camera,
  Check,
  ChevronDown,
  Image as ImageIcon,
  Sparkles,
  Sun,
  User,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GuidelineItem {
  label: string;
  hint: string;
  icon: LucideIcon;
}

export const PHOTO_DOS: GuidelineItem[] = [
  { label: 'Clear face visible', hint: 'Your whole face, eyes open and unobstructed.', icon: User },
  { label: 'Good lighting', hint: 'Soft, even daylight, such as facing a window.', icon: Sun },
  { label: 'Front-facing', hint: 'Look at the camera, with a few slight angles mixed in.', icon: Camera },
  { label: 'Neutral background', hint: 'A plain wall or simple, uncluttered backdrop.', icon: ImageIcon },
  { label: 'Recent photo', hint: 'Taken within the last year so it looks like you today.', icon: Sparkles },
];

export const PHOTO_DONTS: GuidelineItem[] = [
  { label: 'Sunglasses or hats', hint: 'Anything that hides your eyes, hair or forehead.', icon: User },
  { label: 'Group photos', hint: 'Only you should appear in the frame.', icon: Users },
  { label: 'Heavy filters', hint: 'No beauty filters, face smoothing or heavy edits.', icon: Sparkles },
  { label: 'Blurry or dark', hint: 'Avoid shaky, low-resolution or underexposed shots.', icon: AlertTriangle },
  { label: 'Very old photos', hint: 'Photos from many years ago will not match your look.', icon: ImageIcon },
];

interface PhotoGuidelinesProps {
  className?: string;
  /** Whether the guide starts expanded. Defaults to true. */
  defaultOpen?: boolean;
}

function GuidelineColumn({
  title,
  items,
  variant,
}: {
  title: string;
  items: GuidelineItem[];
  variant: 'do' | 'dont';
}) {
  const isDo = variant === 'do';
  const StatusIcon = isDo ? Check : X;
  return (
    <div className="rounded-tp-card border border-tp-line bg-white p-4 sm:p-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-tp-ink">
        <span
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-full',
            isDo ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          )}
        >
          <StatusIcon className="h-4 w-4" aria-hidden="true" />
        </span>
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label} className="flex items-start gap-3">
              <StatusIcon
                className={cn('mt-0.5 h-4 w-4 shrink-0', isDo ? 'text-green-600' : 'text-red-600')}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-sm font-medium text-tp-ink">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
                  {item.label}
                </p>
                <p className="text-xs text-tp-muted">{item.hint}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function PhotoGuidelines({ className, defaultOpen = true }: PhotoGuidelinesProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <section
      aria-labelledby={`${panelId}-heading`}
      className={cn('rounded-tp-card bg-tp-paper p-4 sm:p-6', className)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span>
          <span
            id={`${panelId}-heading`}
            className="block font-display text-xl text-tp-ink sm:text-2xl"
          >
            Photo Guidelines
          </span>
          <span className="mt-1 block text-sm text-tp-muted">
            Better photos mean better results. Here is what works best.
          </span>
        </span>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-tp-bronze-ink transition-transform',
            open && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div id={panelId} className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
          <GuidelineColumn title="Do" items={PHOTO_DOS} variant="do" />
          <GuidelineColumn title="Don't" items={PHOTO_DONTS} variant="dont" />
        </div>
      )}
    </section>
  );
}

const QUICK_TIPS: { text: string; icon: LucideIcon }[] = [
  { text: 'Face the camera in good light', icon: Sun },
  { text: 'Just you, no sunglasses or hats', icon: User },
  { text: 'Skip filters and blurry shots', icon: AlertTriangle },
];

/** Compact inline hints, meant to sit next to or below the dropzone during upload. */
export function PhotoQuickTips({ className }: { className?: string }) {
  return (
    <ul
      aria-label="Quick photo tips"
      className={cn(
        'flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-tp-button bg-tp-paper px-3 py-2 text-xs text-tp-muted',
        className
      )}
    >
      {QUICK_TIPS.map(({ text, icon: Icon }) => (
        <li key={text} className="flex items-center gap-1.5">
          <Icon className="h-3.5 w-3.5 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
          {text}
        </li>
      ))}
    </ul>
  );
}

export default PhotoGuidelines;
