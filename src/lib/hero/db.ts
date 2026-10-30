import { createClient as createSupabaseClient, type SupabaseClient } from '@supabase/supabase-js';
import type { HeroAnswerKey, HeroAudience, HeroOccasion, HeroUniverseId } from '@/config/hero';

/**
 * Service-role client for the hero_* tables (not in the generated Database
 * types yet). Server-side only: every route checks ownership itself.
 */
let _db: SupabaseClient | null = null;

export function heroDb(): SupabaseClient {
  if (!_db) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error('Supabase is not configured');
    _db = createSupabaseClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  }
  return _db;
}

export const HERO_PHOTO_BUCKET = 'hero-photos';
export const HERO_PAGE_BUCKET = 'hero-pages';

export interface HeroStoryPage {
  text: string;
  /** Short visual description used as the illustration prompt. */
  scene: string;
}

export interface HeroStory {
  title: string;
  dedication: string;
  heroName: string;
  pages: HeroStoryPage[];
}

export type HeroBookStatus = 'draft' | 'writing' | 'preview_ready' | 'paid' | 'illustrating' | 'ready' | 'failed';

export interface HeroBookRow {
  id: string;
  user_id: string;
  status: HeroBookStatus;
  audience: HeroAudience;
  occasion: HeroOccasion;
  universe: HeroUniverseId;
  answers: Partial<Record<HeroAnswerKey, string>>;
  photo_paths: string[];
  photos_delete_after: string;
  photos_deleted_at: string | null;
  consent_at: string;
  consent_text: string;
  story: HeroStory | null;
  page_images: Record<string, string>;
  page_predictions: Record<string, string>;
  paid_digital: boolean;
  paid_at: string | null;
  paddle_transaction_id: string | null;
  paid_amount_minor: number | null;
  gift_token: string | null;
  gift_note: string | null;
  chipin_total_cents: number;
  error: string | null;
  created_at: string;
  updated_at: string;
}

export interface HeroContributionRow {
  id: string;
  book_id: string;
  contributor_name: string;
  message: string;
  chipin_units: number;
  chipin_status: 'none' | 'pending' | 'paid';
  paddle_transaction_id: string | null;
  hidden: boolean;
  created_at: string;
}

/** Load a book only if it belongs to userId. */
export async function getOwnedBook(bookId: string, userId: string): Promise<HeroBookRow | null> {
  if (!/^[0-9a-f-]{36}$/i.test(bookId)) return null;
  const { data } = await heroDb()
    .from('hero_books')
    .select('*')
    .eq('id', bookId)
    .eq('user_id', userId)
    .maybeSingle();
  return (data as HeroBookRow | null) ?? null;
}

/** Pages the viewer may read: all once paid, otherwise the free preview. */
export function unlockedPageCount(book: HeroBookRow, previewPages: number): number {
  const total = book.story?.pages.length ?? 0;
  return book.paid_digital ? total : Math.min(previewPages, total);
}
