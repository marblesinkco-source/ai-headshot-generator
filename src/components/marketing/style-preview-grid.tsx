import {
  Briefcase,
  Building2,
  Palette,
  Sun,
  Sparkles,
  Camera,
  Monitor,
  User,
  Leaf,
  Crown,
  Aperture,
  Gem,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StylePreview {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

const STYLE_PREVIEWS: StylePreview[] = [
  {
    slug: 'corporate',
    name: 'Corporate',
    description: 'Formal business portraits for company websites and leadership pages.',
    icon: Briefcase,
  },
  {
    slug: 'studio-classic',
    name: 'Classic Studio',
    description: 'Traditional studio portraits with seamless backdrops and balanced lighting.',
    icon: Camera,
  },
  {
    slug: 'natural-light',
    name: 'Natural Light',
    description: 'Soft, warm portraits with a daylight aesthetic that feels authentic.',
    icon: Sun,
  },
  {
    slug: 'creative',
    name: 'Creative',
    description: 'Artistic headshots with bold backgrounds and expressive poses.',
    icon: Palette,
  },
  {
    slug: 'professional-linkedin',
    name: 'LinkedIn',
    description: 'Optimized for LinkedIn profile crops with a credible, approachable look.',
    icon: Monitor,
  },
  {
    slug: 'outdoor',
    name: 'Outdoor',
    description: 'Environmental portraits with nature and urban backgrounds.',
    icon: Leaf,
  },
  {
    slug: 'executive',
    name: 'Executive',
    description: 'Premium portraits for C-suite and senior leadership.',
    icon: Crown,
  },
  {
    slug: 'startup-founder',
    name: 'Startup Founder',
    description: 'Approachable yet professional photos for tech and startup leaders.',
    icon: Building2,
  },
  {
    slug: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, simple portraits with minimal distractions.',
    icon: Aperture,
  },
  {
    slug: 'glamour',
    name: 'Glamour',
    description: 'Polished, editorial-style portraits with dramatic lighting.',
    icon: Sparkles,
  },
  {
    slug: 'casual',
    name: 'Casual',
    description: 'Relaxed headshots for creative industries and social profiles.',
    icon: User,
  },
  {
    slug: 'old-money',
    name: 'Old Money',
    description: 'Timeless elegance with refined poses and rich, warm tones.',
    icon: Gem,
  },
];

export function StylePreviewGrid() {
  return (
    <section className="border-t border-tp-line/40 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-tp-site px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-normal text-tp-black sm:text-3xl">
          Choose Your Look
        </h2>
        <p className="mt-3 max-w-2xl text-tp-muted">
          Browse the styles available for your headshots. Each one is crafted for a different
          setting and audience.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {STYLE_PREVIEWS.map((style) => {
            const Icon = style.icon;
            return (
              <div
                key={style.slug}
                className="group flex flex-col rounded-tp-card border border-tp-line bg-tp-beige p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-tp-bronze/50 hover:shadow-md sm:p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tp-paper text-tp-bronze-ink">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-tp-ink sm:text-base">
                  {style.name}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-tp-muted sm:text-sm">
                  {style.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
