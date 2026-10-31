import { NextRequest, NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { rateLimit } from '@/lib/rate-limit';

/* ================================================================== */
/*  GET /api/hero/group-gift/contributions/[storyId]                   */
/*  Auth required — organizer only, returns all contributions.         */
/* ================================================================== */

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ storyId: string }> },
) {
  try {
    const { storyId } = await params;

    // Auth check
    const userClient = await createClient();
    const {
      data: { user },
    } = await userClient.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Rate limit
    const rl = await rateLimit({
      key: `group-gift-list:${user.id}`,
      limit: 30,
      windowMs: 60 * 1000,
    });
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many requests.' },
        { status: 429, headers: { 'Retry-After': '60' } },
      );
    }

    const supabase = createAdminClient();

    // Verify story ownership
    const { data: story, error: storyError } = await supabase
      .from('hero_stories')
      .select('id, user_id')
      .eq('id', storyId)
      .single();

    if (storyError || !story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    if (story.user_id !== user.id) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    // Fetch contributions
    const { data: contributions, error: contribError } = await supabase
      .from('hero_group_contributions')
      .select('id, contributor_name, contributor_email, message, question_answers, created_at')
      .eq('story_id', storyId)
      .order('created_at', { ascending: true });

    if (contribError) {
      logger.error('Failed to fetch contributions', contribError);
      return NextResponse.json({ error: 'Failed to load contributions' }, { status: 500 });
    }

    return NextResponse.json({ contributions: contributions || [] });
  } catch (err) {
    logger.error('Contributions list error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
