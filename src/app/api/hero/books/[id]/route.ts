import { NextResponse } from 'next/server';
import { HERO_PREVIEW_PAGES, HERO_DIGITAL_PRICE_CENTS } from '@/config/hero';
import { getOwnedBook, heroDb, unlockedPageCount } from '@/lib/hero/db';
import { requireUser } from '@/lib/hero/auth';
import { signedPageUrls } from '@/lib/hero/illustrate';
import { getPaddlePriceId } from '@/config/paddle-prices';
import { HERO_DIGITAL_PACKAGE_ID } from '@/lib/hero/fulfillment';

export const dynamic = 'force-dynamic';

/**
 * The owner's view of a book. Locked pages come back without text or image,
 * so nothing beyond the free preview leaves the server before payment.
 */
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const user = await requireUser();
  if (user instanceof NextResponse) return user;
  const book = await getOwnedBook(params.id, user.id);
  if (!book) return NextResponse.json({ error: 'Book not found' }, { status: 404 });

  const unlocked = unlockedPageCount(book, HERO_PREVIEW_PAGES);
  const images = await signedPageUrls(book, unlocked);
  const pages = (book.story?.pages ?? []).map((p, i) =>
    i < unlocked
      ? { index: i, locked: false, text: p.text, imageUrl: images[String(i)] ?? null, illustrated: String(i) in book.page_images }
      : { index: i, locked: true, text: null, imageUrl: null, illustrated: String(i) in book.page_images },
  );

  const { data: contributions } = await heroDb()
    .from('hero_contributions')
    .select('id, contributor_name, message, created_at')
    .eq('book_id', book.id)
    .eq('hidden', false)
    .neq('message', '')
    .order('created_at');

  return NextResponse.json({
    id: book.id,
    status: book.status,
    error: book.error,
    audience: book.audience,
    occasion: book.occasion,
    universe: book.universe,
    heroName: book.answers.name ?? '',
    title: book.story?.title ?? null,
    dedication: book.story?.dedication ?? null,
    pageCount: book.story?.pages.length ?? 0,
    previewPages: HERO_PREVIEW_PAGES,
    paid: book.paid_digital,
    pages,
    photosAvailable: book.photo_paths.length > 0,
    photosDeleteAfter: book.photos_delete_after,
    gift: book.gift_token ? { token: book.gift_token, note: book.gift_note } : null,
    memories: (contributions ?? []).map((c) => ({ id: c.id, name: c.contributor_name, message: c.message })),
    checkoutAvailable: !!getPaddlePriceId(HERO_DIGITAL_PACKAGE_ID) && !!process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
    priceCents: HERO_DIGITAL_PRICE_CENTS,
  });
}
