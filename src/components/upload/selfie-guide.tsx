import { Camera, Check, Smartphone, Sun, User, X, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Rule {
  title: string;
  description: string;
  icon: LucideIcon;
  doText: string;
  dontText: string;
}

const RULES: Rule[] = [
  {
    title: 'Good Lighting',
    description: 'Face a window, avoid harsh shadows.',
    icon: Sun,
    doText: 'Stand facing a window so soft daylight falls evenly on your face.',
    dontText: 'Avoid overhead lights, backlighting or strong shadows across your face.',
  },
  {
    title: 'Neutral Background',
    description: 'Plain wall or simple backdrop.',
    icon: Camera,
    doText: 'Use a plain wall or a simple, uncluttered backdrop.',
    dontText: "Don't shoot in front of busy rooms, posters or other people.",
  },
  {
    title: 'Multiple Angles',
    description: 'Upload 6-12 photos from different angles.',
    icon: User,
    doText: 'Mix front, slight left and right turns, and a few different outfits.',
    dontText: "Don't upload near-identical photos or group shots.",
  },
  {
    title: 'Natural Expression',
    description: 'Slight smile, relaxed face.',
    icon: User,
    doText: 'Give a slight, genuine smile with relaxed eyes and shoulders.',
    dontText: "Don't pull exaggerated faces, squint or wear sunglasses and hats.",
  },
  {
    title: 'Sharp Focus',
    description: 'Hold steady, no blur.',
    icon: Smartphone,
    doText: 'Hold the phone steady at eye level, or use a tripod or timer.',
    dontText: "Don't upload blurry, low-resolution or heavily cropped photos.",
  },
  {
    title: 'No Filters',
    description: 'Raw photos work best, remove beauty filters.',
    icon: Camera,
    doText: 'Upload raw, unedited photos that look like you on a normal day.',
    dontText: "Don't use beauty filters, face smoothing or heavy editing.",
  },
];

interface SelfieGuideProps {
  className?: string;
}

export function SelfieGuide({ className }: SelfieGuideProps) {
  return (
    <section
      aria-labelledby="selfie-guide-heading"
      className={cn('rounded-tp-card bg-tp-paper p-5 sm:p-8', className)}
    >
      <h2
        id="selfie-guide-heading"
        className="font-display text-2xl text-tp-ink sm:text-3xl"
      >
        How to Take the Perfect Selfie for AI Headshots
      </h2>
      <p className="mt-2 text-sm text-tp-muted">
        Better input photos mean better headshots. Follow these six rules.
      </p>

      <ol className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {RULES.map((rule, i) => {
          const Icon = rule.icon;
          return (
            <li
              key={rule.title}
              className="rounded-tp-card border border-tp-line bg-white p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tp-button bg-tp-beige/40 text-tp-bronze-ink">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-tp-ink">
                    {i + 1}. {rule.title}
                  </h3>
                  <p className="text-sm text-tp-muted">{rule.description}</p>
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-start gap-2 text-tp-ink">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-semibold">Do: </span>
                    {rule.doText}
                  </span>
                </li>
                <li className="flex items-start gap-2 text-tp-muted">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-tp-ink" aria-hidden="true" />
                  <span>
                    <span className="font-semibold">Don&apos;t: </span>
                    {rule.dontText}
                  </span>
                </li>
              </ul>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default SelfieGuide;
