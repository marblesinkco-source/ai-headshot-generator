import type { Locale } from '@/config/i18n';
import { defaultLocale } from '@/config/i18n';

// Mesajları yükle
export async function getMessages(locale: Locale) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch {
    return (await import(`@/messages/${defaultLocale}.json`)).default;
  }
}

// Nested key ile çeviri al (örn: "hero.title")
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function t(messages: Record<string, any>, key: string): string {
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = messages;
  for (const k of keys) {
    result = result?.[k];
  }
  return typeof result === 'string' ? result : key;
}
