import { getPaddlePriceId } from '@/config/paddle-prices';
import { logger } from '@/lib/logger';
import { heroDb } from './db';

export const HERO_DIGITAL_PACKAGE_ID = 'hero-digital';

interface HeroTransaction {
  id: string;
  custom_data?: Record<string, unknown> | null;
  details?: { line_items?: { price_id?: string }[] };
}

export function isHeroTransaction(customData: unknown): boolean {
  return !!customData && (customData as Record<string, unknown>).productLine === 'hero';
}

/**
 * transaction.completed for a hero book. Returns an HTTP status for the
 * webhook: 200 when handled (or a duplicate), 400 when it must not be retried.
 */
export async function fulfillHeroTransaction(txn: HeroTransaction): Promise<{ status: number; error?: string }> {
  const custom = (txn.custom_data ?? {}) as Record<string, string>;
  const { bookId, userId } = custom;
  if (!bookId || !userId) return { status: 400, error: 'Missing hero custom_data' };

  // The paid price must be the hero digital price; custom_data is user-controlled.
  const expected = getPaddlePriceId(HERO_DIGITAL_PACKAGE_ID);
  const paid = txn.details?.line_items?.[0]?.price_id;
  if (!expected || paid !== expected) {
    logger.error('[hero] Price mismatch on hero transaction', { bookId, paid, expected, transactionId: txn.id });
    return { status: 400, error: 'Price verification failed' };
  }

  const db = heroDb();
  const { data: book } = await db.from('hero_books').select('id, user_id, paid_digital').eq('id', bookId).maybeSingle();
  if (!book || book.user_id !== userId) return { status: 400, error: 'Book not found' };
  if (book.paid_digital) return { status: 200 };

  const { error } = await db
    .from('hero_books')
    .update({
      paid_digital: true,
      paid_at: new Date().toISOString(),
      paddle_transaction_id: txn.id,
      status: 'paid',
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookId);
  if (error) {
    logger.error('[hero] Failed to mark book paid', error, { bookId });
    return { status: 500, error: 'Failed to update book' };
  }
  logger.info(`[hero] Book ${bookId} unlocked by ${txn.id}`);
  return { status: 200 };
}

/** Approved refund or chargeback: back to the free preview. */
export async function relockHeroBook(transactionId: string): Promise<boolean> {
  const { data } = await heroDb()
    .from('hero_books')
    .update({ paid_digital: false, status: 'preview_ready', updated_at: new Date().toISOString() })
    .eq('paddle_transaction_id', transactionId)
    .select('id');
  return !!data && data.length > 0;
}
