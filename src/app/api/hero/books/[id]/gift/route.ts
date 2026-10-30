import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getOwnedBook, heroDb } from '@/lib/hero/db';
import { requireUser } from '@/lib/hero/auth';
import { csrfGuard } from '@/lib/security';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  note: z.string().trim().max(300).optional(),
  enabled: z.boolean().default(true),
  /** Organiser moderation: hide one message from the book. */
  hideMemoryId: z.string().uuid().optional(),
});

/** Turns the group-gift link on (creating its token) or off, or hides a message. */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const csrf = csrfGuard(request);
  if (csrf) return csrf;
  const user = await requireUser();
  if (user instanceof NextResponse) return user;
  const parsed = bodySchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  const book = await getOwnedBook(params.id, user.id);
  if (!book) return NextResponse.json({ error: 'Book not found' }, { status: 404 });

  if (parsed.data.hideMemoryId) {
    await heroDb()
      .from('hero_contributions')
      .update({ hidden: true })
      .eq('id', parsed.data.hideMemoryId)
      .eq('book_id', book.id);
    return NextResponse.json({ token: book.gift_token });
  }

  const token = parsed.data.enabled ? book.gift_token ?? randomBytes(12).toString('base64url') : null;
  const { error } = await heroDb()
    .from('hero_books')
    .update({ gift_token: token, gift_note: parsed.data.note ?? book.gift_note, updated_at: new Date().toISOString() })
    .eq('id', book.id);
  if (error) return NextResponse.json({ error: 'Could not update the link' }, { status: 500 });
  return NextResponse.json({ token });
}
