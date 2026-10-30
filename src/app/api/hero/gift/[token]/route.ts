import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { HERO_MAX_CONTRIBUTIONS, HERO_MEMORY_MAX_LENGTH, HERO_OCCASIONS, getHeroUniverse } from '@/config/hero';
import { heroDb } from '@/lib/hero/db';
import { csrfGuard } from '@/lib/security';
import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

const TOKEN_RE = /^[A-Za-z0-9_-]{16}$/;

async function loadByToken(token: string) {
  if (!TOKEN_RE.test(token)) return null;
  const { data } = await heroDb()
    .from('hero_books')
    .select('id, answers, occasion, universe, gift_note')
    .eq('gift_token', token)
    .maybeSingle();
  return data;
}

/**
 * Public group-gift page data. Only what a teammate needs: the hero's first
 * name, the occasion, the organiser's note and who has already signed.
 * Never the photos, the story or anyone's email.
 */
export async function GET(_req: Request, { params }: { params: { token: string } }) {
  const book = await loadByToken(params.token);
  if (!book) return NextResponse.json({ error: 'This gift link is not active' }, { status: 404 });
  const { data: contributions } = await heroDb()
    .from('hero_contributions')
    .select('contributor_name')
    .eq('book_id', book.id)
    .eq('hidden', false)
    .order('created_at');
  return NextResponse.json({
    heroName: (book.answers as Record<string, string>)?.name ?? '',
    occasion: HERO_OCCASIONS.find((o) => o.id === book.occasion)?.label ?? '',
    universe: getHeroUniverse(book.universe)?.name ?? '',
    note: book.gift_note,
    signedBy: (contributions ?? []).map((c) => c.contributor_name),
    full: (contributions?.length ?? 0) >= HERO_MAX_CONTRIBUTIONS,
  });
}

const memorySchema = z.object({
  name: z.string().trim().min(1).max(60),
  message: z.string().trim().min(1).max(HERO_MEMORY_MAX_LENGTH),
});

/** Adds a memory or message. No account needed; rate limited per IP. */
export async function POST(request: NextRequest, { params }: { params: { token: string } }) {
  const csrf = csrfGuard(request);
  if (csrf) return csrf;
  const rl = await rateLimit({ key: `hero-gift:${getClientIp(request)}`, limit: 5, windowMs: 60 * 60 * 1000 });
  if (!rl.success) return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });

  const parsed = memorySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Please add your name and a message.' }, { status: 400 });

  const book = await loadByToken(params.token);
  if (!book) return NextResponse.json({ error: 'This gift link is not active' }, { status: 404 });

  const db = heroDb();
  const { count } = await db.from('hero_contributions').select('id', { count: 'exact', head: true }).eq('book_id', book.id);
  if ((count ?? 0) >= HERO_MAX_CONTRIBUTIONS) {
    return NextResponse.json({ error: 'This book has reached its message limit.' }, { status: 409 });
  }

  const { error } = await db
    .from('hero_contributions')
    .insert({ book_id: book.id, contributor_name: parsed.data.name, message: parsed.data.message });
  if (error) {
    logger.error('[hero] contribution insert failed', error);
    return NextResponse.json({ error: 'Could not save your message' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
