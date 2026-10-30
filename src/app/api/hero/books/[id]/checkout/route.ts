import { NextRequest, NextResponse } from 'next/server';
import { getPaddlePriceId } from '@/config/paddle-prices';
import { siteConfig } from '@/config/site';
import { getOwnedBook } from '@/lib/hero/db';
import { requireUser } from '@/lib/hero/auth';
import { HERO_DIGITAL_PACKAGE_ID } from '@/lib/hero/fulfillment';
import { csrfGuard } from '@/lib/security';

export const dynamic = 'force-dynamic';

/** Data for Paddle.Checkout.open(); the webhook unlocks the book. */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const csrf = csrfGuard(request);
  if (csrf) return csrf;
  const user = await requireUser();
  if (user instanceof NextResponse) return user;
  const book = await getOwnedBook(params.id, user.id);
  if (!book?.story) return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  if (book.paid_digital) return NextResponse.json({ error: 'This book is already unlocked' }, { status: 409 });

  const priceId = getPaddlePriceId(HERO_DIGITAL_PACKAGE_ID);
  if (!priceId) {
    return NextResponse.json({ error: 'Checkout for hero books opens soon.' }, { status: 503 });
  }

  return NextResponse.json({
    checkout: {
      items: [{ priceId, quantity: 1 }],
      customData: { productLine: 'hero', bookId: book.id, userId: user.id },
      customer: user.email ? { email: user.email } : undefined,
      settings: { successUrl: `${siteConfig.url}/dashboard/hero/${book.id}?paid=1` },
    },
  });
}
