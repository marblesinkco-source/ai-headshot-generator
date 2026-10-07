import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

type IconKey = 'camera' | 'crop' | 'sparkles' | 'layers' | 'sliders';

interface FeaturedTool {
  name: string;
  href: string;
  description: string;
  icon: IconKey;
}

const FEATURED_TOOLS: FeaturedTool[] = [
  {
    name: 'Background Remover',
    href: '/tools/background-remover',
    description: 'Remove photo backgrounds instantly',
    icon: 'layers',
  },
  {
    name: 'Profile Picture Maker',
    href: '/tools/profile-picture-maker',
    description: 'Crop for any platform',
    icon: 'crop',
  },
  {
    name: 'LinkedIn Photo Checker',
    href: '/tools/linkedin-photo-checker',
    description: 'Check if your photo meets standards',
    icon: 'camera',
  },
  {
    name: 'Photo Enhance Preview',
    href: '/tools/photo-enhance-preview',
    description: 'Auto-enhance brightness & contrast',
    icon: 'sparkles',
  },
  {
    name: 'Passport Photo Maker',
    href: '/tools/passport-photo-maker',
    description: 'Create passport-size photos',
    icon: 'crop',
  },
  {
    name: 'Background Blur',
    href: '/tools/background-blur',
    description: 'Blur backgrounds professionally',
    icon: 'layers',
  },
  {
    name: 'Image Format Converter',
    href: '/tools/image-format-converter',
    description: 'Convert between formats',
    icon: 'sliders',
  },
  {
    name: 'Photo Filters',
    href: '/tools/photo-filters',
    description: 'Apply professional filters',
    icon: 'sparkles',
  },
  {
    name: 'Batch Photo Resizer',
    href: '/tools/batch-photo-resizer',
    description: 'Resize multiple photos at once',
    icon: 'crop',
  },
  {
    name: 'Style Finder Quiz',
    href: '/tools/style-finder-quiz',
    description: 'Find your ideal headshot style',
    icon: 'camera',
  },
];

function ToolIcon({ icon }: { icon: IconKey }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  switch (icon) {
    case 'camera':
      return (
        <svg {...common}>
          <path d="M4 8a2 2 0 0 1 2-2h1.5l1.2-1.8A1 1 0 0 1 9.5 4h5a1 1 0 0 1 .8.2L16.5 6H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z" />
          <circle cx="12" cy="12.5" r="3.5" />
        </svg>
      );
    case 'crop':
      return (
        <svg {...common}>
          <path d="M6 2v14a2 2 0 0 0 2 2h14" />
          <path d="M2 6h14a2 2 0 0 1 2 2v14" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg {...common}>
          <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3z" />
          <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
        </svg>
      );
    case 'layers':
      return (
        <svg {...common}>
          <path d="M12 3l9 5-9 5-9-5 9-5z" />
          <path d="M3 13l9 5 9-5" />
        </svg>
      );
    case 'sliders':
    default:
      return (
        <svg {...common}>
          <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
          <circle cx="16" cy="7" r="2" />
          <circle cx="8" cy="17" r="2" />
        </svg>
      );
  }
}

export function FreeToolsShowcase() {
  return (
    <section
      aria-labelledby="free-tools-heading"
      className="border-t border-tp-line/40 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">
            Free Tools
          </p>
          <h2
            id="free-tools-heading"
            className="mt-3 font-display text-3xl font-normal text-tp-black sm:text-4xl"
          >
            Powerful Photo Tools — Free to Use
          </h2>
          <p className="mt-4 text-base text-tp-muted">
            Remove backgrounds, crop for any platform, check your photo against
            LinkedIn standards and more. No sign-up needed to get started.
          </p>
        </div>

        <div className="mt-10 rounded-tp-card bg-tp-paper/60 p-3 sm:p-6">
          <ul className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
            {FEATURED_TOOLS.map((tool) => (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className="group relative flex h-full flex-col gap-3 rounded-tp-button border border-tp-line bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-tp-bronze hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-beige/30 text-tp-bronze-ink">
                    <ToolIcon icon={tool.icon} />
                  </span>
                  <span className="block">
                    <span className="block text-sm font-semibold text-tp-black">
                      {tool.name}
                    </span>
                    <span className="mt-1 block text-xs text-tp-muted">
                      {tool.description}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 text-tp-bronze-ink opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <Link
            href="/tools"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            View all 39 free tools →
          </Link>
          <p className="text-sm text-tp-muted">
            Need professional AI headshots?{' '}
            <Link
              href="/headshots"
              className="font-semibold text-tp-bronze-ink underline-offset-4 hover:underline"
            >
              Start from {BASE_PRICE_DISPLAY}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
