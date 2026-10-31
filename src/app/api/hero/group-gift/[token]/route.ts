import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

/* ================================================================== */
/*  GET /api/hero/group-gift/[token]                                   */
/*  Public route — returns story info for the contribution page.       */
/*  Does NOT expose full story data or user info.                      */
/* ================================================================== */

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  try {
    const { token } = await params;

    if (!token || token.length < 10 || token.length > 64) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    // Rate limit by IP to prevent enumeration
    const ip = getClientIp(req);
    const rl = await rateLimit({
      key: `group-gift-lookup:${ip}`,
      limit: 30,
      windowMs: 60 * 1000,
    });
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again shortly.' },
        { status: 429, headers: { 'Retry-After': '60' } },
      );
    }

    const supabase = createAdminClient();

    const { data: story, error: fetchError } = await supabase
      .from('hero_stories')
      .select('id, hero_name, universe_id, occasion_id, organizer_name, cover_title, is_group_gift')
      .eq('group_gift_token', token)
      .eq('is_group_gift', true)
      .single();

    if (fetchError || !story) {
      return NextResponse.json({ error: 'Gift not found' }, { status: 404 });
    }

    // Count existing contributions
    const { count } = await supabase
      .from('hero_group_contributions')
      .select('id', { count: 'exact', head: true })
      .eq('story_id', story.id);

    return NextResponse.json({
      heroName: story.hero_name,
      universeId: story.universe_id,
      occasionId: story.occasion_id,
      organizerName: story.organizer_name,
      coverTitle: story.cover_title,
      contributionCount: count ?? 0,
    });
  } catch (err) {
    logger.error('Group gift token lookup error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
