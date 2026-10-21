'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  locales,
  localeNames,
  localeFlags,
  defaultLocale,
  isLocalePrefix,
  localePath,
  stripLocalePrefix,
  type Locale,
} from '@/config/i18n';

/** Detect current locale from pathname. */
function detectLocale(pathname: string): Locale {
  const seg = pathname.split('/')[1];
  if (seg && isLocalePrefix(seg) && seg !== defaultLocale) return seg;
  return defaultLocale;
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = detectLocale(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const basePath = stripLocalePrefix(pathname);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1.5 rounded-tp-button px-2.5 py-1.5 text-sm transition-colors',
          'text-tp-muted hover:text-tp-ink hover:bg-tp-beige/60',
        )}
        aria-label="Change language"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">{localeFlags[currentLocale]}</span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-full z-50 mt-1.5 min-w-[160px] overflow-hidden rounded-tp-button border border-tp-line bg-white shadow-lg"
        >
          {locales
            .filter((l) => l === 'en' || l === 'tr') // Only show languages with translations ready
            .map((locale) => {
              const isActive = locale === currentLocale;
              const href = localePath(basePath, locale);
              return (
                <a
                  key={locale}
                  href={href}
                  role="option"
                  aria-selected={isActive}
                  className={cn(
                    'flex items-center gap-2.5 px-3.5 py-2.5 text-sm transition-colors',
                    isActive
                      ? 'bg-tp-beige font-medium text-tp-ink'
                      : 'text-tp-muted hover:bg-tp-beige/40 hover:text-tp-ink',
                  )}
                  onClick={() => setOpen(false)}
                >
                  <span aria-hidden="true">{localeFlags[locale]}</span>
                  {localeNames[locale]}
                </a>
              );
            })}
        </div>
      )}
    </div>
  );
}
