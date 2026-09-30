'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  defaultLocale,
  localeFlags,
  localeNames,
  locales,
  type Locale,
} from '@/config/i18n';

function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/')[1];
  return (locales as readonly string[]).includes(seg) ? (seg as Locale) : defaultLocale;
}

// Mevcut yoldan locale prefix'ini çıkarıp yenisini ekler (en = prefix yok).
function buildLocalePath(pathname: string, next: Locale): string {
  const current = getLocaleFromPath(pathname);
  const hasPrefix = pathname.split('/')[1] === current && current !== defaultLocale;
  const rest = hasPrefix ? pathname.slice(current.length + 1) || '/' : pathname;
  if (next === defaultLocale) return rest;
  return `/${next}${rest === '/' ? '' : rest}`;
}

interface LanguageSwitcherProps {
  className?: string;
  /** Verilmezse locale URL'den çıkarılır. */
  currentLocale?: Locale;
}

export function LanguageSwitcher({ className = '', currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = currentLocale ?? getLocaleFromPath(pathname);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const select = (locale: Locale) => {
    setOpen(false);
    if (locale === active) return;
    router.push(buildLocalePath(pathname, locale));
  };

  return (
    <div ref={ref} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className="inline-flex min-h-[44px] items-center gap-2 rounded-tp-button border border-tp-line bg-tp-paper px-3 py-2 text-sm font-medium text-tp-ink transition-colors hover:border-tp-bronze focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
      >
        <span aria-hidden="true">{localeFlags[active]}</span>
        <span>{localeNames[active]}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`h-4 w-4 text-tp-muted transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Language"
          className="absolute right-0 z-50 mt-2 w-44 max-w-[calc(100vw-2rem)] overflow-hidden rounded-tp-button border border-tp-line bg-tp-paper py-1 shadow-lg"
        >
          {locales.map((locale) => {
            const selected = locale === active;
            return (
              <li key={locale} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => select(locale)}
                  className={`flex min-h-[44px] w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-tp-line/40 focus:outline-none focus-visible:bg-tp-line/40 ${
                    selected ? 'font-semibold text-tp-bronze-ink' : 'text-tp-ink'
                  }`}
                >
                  <span aria-hidden="true">{localeFlags[locale]}</span>
                  <span className="flex-1">{localeNames[locale]}</span>
                  {selected && (
                    <span aria-hidden="true" className="text-tp-bronze">
                      ✓
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;
