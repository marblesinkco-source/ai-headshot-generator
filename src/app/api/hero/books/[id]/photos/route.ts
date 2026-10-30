import { NextRequest, NextResponse } from 'next/server';
import { HERO_MAX_PHOTOS, HERO_MAX_PHOTO_BYTES } from '@/config/hero';
import { HERO_PHOTO_BUCKET, getOwnedBook, heroDb } from '@/lib/hero/db';
import { requireUser } from '@/lib/hero/auth';
import { csrfGuard } from '@/lib/security';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

const TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };

/** Adds one reference photo (multipart field `photo`) to a draft book. */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const csrf = csrfGuard(request);
  if (csrf) return csrf;
  const user = await requireUser();
  if (user instanceof NextResponse) return user;
  const book = await getOwnedBook(params.id, user.id);
  if (!book) return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  if (book.story || book.photos_deleted_at) return NextResponse.json({ error: 'Photos can no longer be changed' }, { status: 409 });
  if (book.photo_paths.length >= HERO_MAX_PHOTOS) {
    return NextResponse.json({ error: `Up to ${HERO_MAX_PHOTOS} photos` }, { status: 400 });
  }

  const form = await request.formData().catch(() => null);
  const photo = form?.get('photo');
  if (!(photo instanceof File)) return NextResponse.json({ error: 'No photo received' }, { status: 400 });
  const ext = TYPES[photo.type];
  if (!ext) return NextResponse.json({ error: 'Photos must be JPG, PNG or WebP.' }, { status: 400 });
  if (photo.size > HERO_MAX_PHOTO_BYTES) return NextResponse.json({ error: 'Each photo must be under 10 MB.' }, { status: 400 });

  const db = heroDb();
  const path = `${user.id}/${book.id}/photo-${book.photo_paths.length}.${ext}`;
  const { error } = await db.storage
    .from(HERO_PHOTO_BUCKET)
    .upload(path, Buffer.from(await photo.arrayBuffer()), { contentType: photo.type, upsert: true });
  if (error) {
    logger.error('[hero] photo upload failed', error, { bookId: book.id });
    return NextResponse.json({ error: 'Could not upload this photo. Please try again.' }, { status: 500 });
  }
  const photoPaths = [...book.photo_paths, path];
  await db.from('hero_books').update({ photo_paths: photoPaths, updated_at: new Date().toISOString() }).eq('id', book.id);
  return NextResponse.json({ count: photoPaths.length });
}
