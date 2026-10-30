/**
 * GET /api/cron/hero-cleanup — daily (vercel.json).
 *
 * Deletes "Create a Hero" source photos once their retention period ends
 * (HERO_PHOTO_RETENTION_DAYS, promised on the upload form). Illustrated pages
 * are kept so the customer keeps their book. Protected by CRON_SECRET.
 */
import { NextRequest, NextResponse } from 'next/server';
import { HERO_PHOTO_BUCKET, heroDb } from '@/lib/hero/db';
import { logger } from '@/lib/logger';
import { safeEqual } from '@/lib/security';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || !safeEqual(request.headers.get('authorization'), `Bearer ${secret}`)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = heroDb();
  const { data: due, error } = await db
    .from('hero_books')
    .select('id, photo_paths')
    .is('photos_deleted_at', null)
    .lte('photos_delete_after', new Date().toISOString())
    .limit(200);
  if (error) {
    logger.error('[hero-cleanup] query failed', error);
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }

  let deleted = 0;
  for (const book of due ?? []) {
    const paths = (book.photo_paths as string[]) ?? [];
    if (paths.length > 0) {
      const { error: rmError } = await db.storage.from(HERO_PHOTO_BUCKET).remove(paths);
      if (rmError) {
        logger.error('[hero-cleanup] remove failed', rmError, { bookId: book.id });
        continue;
      }
    }
    await db
      .from('hero_books')
      .update({ photo_paths: [], photos_deleted_at: new Date().toISOString() })
      .eq('id', book.id);
    deleted++;
  }
  logger.info(`[hero-cleanup] deleted photos for ${deleted} book(s)`);
  return NextResponse.json({ deleted });
}
