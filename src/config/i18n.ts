/**
 * Internationalization (i18n) configuration.
 *
 * English stays at the root (/pricing, /headshots).
 * Other locales live under a prefix (/tr/pricing, /de/pricing).
 */

export const defaultLocale = 'en';

/** Supported locales — order determines the language-switcher dropdown. */
export const locales = ['en', 'tr', 'de', 'es', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  tr: 'Türkçe',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  tr: '🇹🇷',
  de: '🇩🇪',
  es: '🇪🇸',
  fr: '🇫🇷',
};

/** BCP-47 / OpenGraph locale tags */
export const localeOG: Record<Locale, string> = {
  en: 'en_US',
  tr: 'tr_TR',
  de: 'de_DE',
  es: 'es_ES',
  fr: 'fr_FR',
};

/** HTML dir attribute (all current locales are LTR) */
export const localeDir: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  tr: 'ltr',
  de: 'ltr',
  es: 'ltr',
  fr: 'ltr',
};

/** Check if a path segment is a known locale prefix. */
export function isLocalePrefix(segment: string): segment is Locale {
  return locales.includes(segment as Locale);
}

/** Strip the locale prefix from a pathname (e.g. /tr/pricing → /pricing). */
export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split('/');
  if (segments.length > 1 && isLocalePrefix(segments[1])) {
    return '/' + segments.slice(2).join('/') || '/';
  }
  return pathname;
}

/** Add locale prefix to a path (skip for default locale). */
export function localePath(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path === '/' ? '' : path}`;
}
