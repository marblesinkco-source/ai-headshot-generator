import { NextRequest, NextResponse } from 'next/server';
import { HERO_MAX_PAGES, HERO_MIN_PAGES, HERO_MIN_PHOTOS } from '@/config/hero';
import { getOwnedBook, heroDb } from '@/lib/hero/db';
import { requireUser } from '@/lib/hero/auth';
import { StoryInputError, writeHeroStory } from '@/lib/hero/story';
import { csrfGuard } from '@/lib/security';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/** Writes the story once. Safe to call again: an existing story is kept. */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const csrf = csrfGuard(request);
  if (csrf) return csrf;
  const user = await requireUser();
  if (user instanceof NextResponse) return user;
  const book = await getOwnedBook(params.id, user.id);
  if (!book) return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  if (book.story) return NextResponse.json({ status: book.status });
  if (book.photo_paths.length < HERO_MIN_PHOTOS) {
    return NextResponse.json({ error: `Please add at least ${HERO_MIN_PHOTOS} photos first.` }, { status: 400 });
  }

  const rl = await rateLimit({ key: `hero-story:${user.id}`, limit: 12, windowMs: 24 * 60 * 60 * 1000 });
  if (!rl.success) return NextResponse.json({ error: 'Daily limit reached. Please try again tomorrow.' }, { status: 429 });

  const db = heroDb();
  // Claim: only one writer per book.
  const { data: claimed } = await db
    .from('hero_books')
    .update({ status: 'writing', error: null, updated_at: new Date().toISOString() })
    .eq('id', book.id)
    .in('status', ['draft', 'failed'])
    .is('story', null)
    .select('id');
  if (!claimed?.length) return NextResponse.json({ status: 'writing' }, { status: 202 });

  try {
    const pageCount = book.audience === 'child' ? HERO_MIN_PAGES + 4 : HERO_MAX_PAGES - 2;
    const story = await writeHeroStory({
      audience: book.audience,
      occasion: book.occasion,
      universe: book.universe,
      answers: book.answers,
      pageCount,
    });
    await db
      .from('hero_books')
      .update({ story, status: 'preview_ready', updated_at: new Date().toISOString() })
      .eq('id', book.id);
    return NextResponse.json({ status: 'preview_ready' });
  } catch (err) {
    const message = err instanceof StoryInputError ? err.message : 'We could not write the story. Please try again.';
    logger.error('[hero] story failed', err, { bookId: book.id });
    await db.from('hero_books').update({ status: 'failed', error: message, updated_at: new Date().toISOString() }).eq('id', book.id);
    return NextResponse.json({ error: message }, { status: err instanceof StoryInputError ? 400 : 502 });
  }
}
