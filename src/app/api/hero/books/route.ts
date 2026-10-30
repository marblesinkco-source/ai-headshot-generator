import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  HERO_CONSENT_TEXT,
  HERO_OCCASIONS,
  HERO_PHOTO_RETENTION_DAYS,
  HERO_QUESTIONS,
  HERO_UNIVERSES,
} from '@/config/hero';
import { heroDb } from '@/lib/hero/db';
import { requireUser } from '@/lib/hero/auth';
import { assertNoBlockedTerms, StoryInputError } from '@/lib/hero/story';
import { csrfGuard } from '@/lib/security';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

const answersSchema = z.object(
  Object.fromEntries(
    HERO_QUESTIONS.map((q) => [
      q.key,
      q.required ? z.string().trim().min(1).max(q.maxLength) : z.string().trim().max(q.maxLength).optional(),
    ]),
  ) as Record<string, z.ZodTypeAny>,
);

const metaSchema = z.object({
  audience: z.enum(['child', 'adult']),
  occasion: z.enum(HERO_OCCASIONS.map((o) => o.id) as [string, ...string[]]),
  universe: z.enum(HERO_UNIVERSES.map((u) => u.id) as [string, ...string[]]),
  answers: answersSchema,
  consent: z.literal(true),
});

/** GET: the signed-in user's books. */
export async function GET() {
  const user = await requireUser();
  if (user instanceof NextResponse) return user;
  const { data, error } = await heroDb()
    .from('hero_books')
    .select('id, status, universe, occasion, answers, story, paid_digital, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50);
  if (error) return NextResponse.json({ error: 'Could not load books' }, { status: 500 });
  return NextResponse.json({
    books: (data ?? []).map((b) => ({
      id: b.id,
      status: b.status,
      universe: b.universe,
      occasion: b.occasion,
      heroName: (b.answers as Record<string, string>)?.name ?? '',
      title: (b.story as { title?: string } | null)?.title ?? null,
      paid: b.paid_digital,
      createdAt: b.created_at,
    })),
  });
}

/**
 * POST (JSON): creates the book with the wizard answers and the photo
 * consent. Photos follow one per request to /api/hero/books/[id]/photos
 * (Vercel caps request bodies at 4.5 MB).
 */
export async function POST(request: NextRequest) {
  const csrf = csrfGuard(request);
  if (csrf) return csrf;
  const user = await requireUser();
  if (user instanceof NextResponse) return user;

  const rl = await rateLimit({ key: `hero-create:${user.id}`, limit: 10, windowMs: 24 * 60 * 60 * 1000 });
  if (!rl.success) return NextResponse.json({ error: 'Daily limit reached. Please try again tomorrow.' }, { status: 429 });

  try {
    const parsed = metaSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
      const consentMissing = parsed.error.issues.some((i) => i.path[0] === 'consent');
      return NextResponse.json(
        { error: consentMissing ? 'Please confirm you have permission to use these photos.' : 'Please check the form and try again.' },
        { status: 400 },
      );
    }
    const meta = parsed.data;
    assertNoBlockedTerms(meta.answers as Record<string, string>);

    const now = new Date();
    const { data: book, error: insertError } = await heroDb()
      .from('hero_books')
      .insert({
        user_id: user.id,
        audience: meta.audience,
        occasion: meta.occasion,
        universe: meta.universe,
        answers: meta.answers,
        consent_at: now.toISOString(),
        consent_text: HERO_CONSENT_TEXT,
        photos_delete_after: new Date(now.getTime() + HERO_PHOTO_RETENTION_DAYS * 86_400_000).toISOString(),
      })
      .select('id')
      .single();
    if (insertError || !book) {
      logger.error('[hero] create failed', insertError);
      return NextResponse.json({ error: 'Could not create the book' }, { status: 500 });
    }
    return NextResponse.json({ id: book.id });
  } catch (err) {
    if (err instanceof StoryInputError) return NextResponse.json({ error: err.message }, { status: 400 });
    logger.error('[hero] create error', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
