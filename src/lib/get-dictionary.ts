import type { Locale } from '@/config/i18n';

// Static imports — keeps bundle predictable, no dynamic fs reads.
import en from '@/dictionaries/en.json';
import tr from '@/dictionaries/tr.json';

const dictionaries: Record<Locale, typeof en> = { en, tr, de: en, es: en, fr: en };

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}
