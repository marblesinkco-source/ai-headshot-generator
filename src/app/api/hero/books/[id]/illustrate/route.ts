import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { HERO_PREVIEW_PAGES } from '@/config/hero';
import { getOwnedBook, heroDb, unlockedPageCount } from '@/lib/hero/db';
import { requireUser } from '@/lib/hero/auth';
import { illustratePage } from '@/lib/hero/illustrate';
import { csrfGuard } from '@/lib/security';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const bodySchema = z.object({ page: z.number().int().min(0).max(40) });

/**
 * Illustrates one page. The client calls this page by page (sequentially),
 * which keeps each request inside the function time limit; 202 means the
 * drawing is still running and the client should call again shortly. Only unlocked
 * pages can be illustrated: the preview before payment, all pages after.
 */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const csrf = csrfGuard(request);
  if (csrf) return csrf;
  const user = await requireUser();
  if (user instanceof NextResponse) return user;

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  const { page } = parsed.data;

  const book = await getOwnedBook(params.id, user.id);
  if (!book?.story) return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  if (page >= unlockedPageCount(book, HERO_PREVIEW_PAGES)) {
    return NextResponse.json({ error: 'This page unlocks after purchase' }, { status: 402 });
  }
  if (String(page) in book.page_images) return NextResponse.json({ page, done: true });

  // Bounds the Replicate spend per user (a full book is about 24 pages).
  const rl = await rateLimit({ key: `hero-illustrate:${user.id}`, limit: 80, windowMs: 24 * 60 * 60 * 1000 });
  if (!rl.success) return NextResponse.json({ error: 'Daily limit reached. Please try again tomorrow.' }, { status: 429 });

  try {
    const finished = await illustratePage(book, page);
    if (!finished) return NextResponse.json({ page, done: false }, { status: 202 });
    const db = heroDb();
    const { data: fresh } = await db.from('hero_books').select('page_images, paid_digital, story').eq('id', book.id).single();
    const done = Object.keys((fresh?.page_images as Record<string, string>) ?? {}).length;
    const total = (fresh?.story as { pages: unknown[] } | null)?.pages.length ?? 0;
    if (fresh?.paid_digital) {
      await db.from('hero_books').update({ status: done >= total ? 'ready' : 'illustrating' }).eq('id', book.id);
    }
    return NextResponse.json({ page, done: true });
  } catch (err) {
    logger.error('[hero] illustrate failed', err, { bookId: book.id, page });
    return NextResponse.json({ error: 'This illustration failed. Please try again.' }, { status: 502 });
  }
}
