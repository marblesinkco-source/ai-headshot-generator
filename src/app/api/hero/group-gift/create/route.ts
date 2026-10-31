import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { csrfGuard } from '@/lib/security';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';
import { randomBytes } from 'crypto';

const createSchema = z.object({
  storyId: z.string().uuid('Invalid story ID'),
  organizerName: z.string().min(1).max(100).optional(),
});

/* ================================================================== */
/*  POST /api/hero/group-gift/create                                   */
/*  Converts an existing story into a group gift and generates a       */
/*  shareable token.                                                   */
/* ================================================================== */

export async function POST(req: NextRequest) {
  const csrf = csrfGuard(req);
  if (csrf) return csrf;

  try {
    // Auth check
    const userClient = await createClient();
    const {
      data: { user },
    } = await userClient.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Rate limit: 10 per minute per user
    const rl = await rateLimit({
      key: `group-gift-create:${user.id}`,
      limit: 10,
      windowMs: 60 * 1000,
    });
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again shortly.' },
        { status: 429, headers: { 'Retry-After': '60' } },
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { storyId, organizerName } = parsed.data;
    const supabase = createAdminClient();

    // Fetch the story and verify ownership
    const { data: story, error: fetchError } = await supabase
      .from('hero_stories')
      .select('id, user_id, is_group_gift, group_gift_token, hero_name')
      .eq('id', storyId)
      .single();

    if (fetchError || !story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    if (story.user_id !== user.id) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    // If already a group gift, return the existing token
    if (story.is_group_gift && story.group_gift_token) {
      return NextResponse.json({
        success: true,
        token: story.group_gift_token,
        shareUrl: `/create-a-hero/gift/${story.group_gift_token}`,
        alreadyCreated: true,
      });
    }

    // Generate a URL-safe token
    const token = randomBytes(16).toString('base64url');

    // Update the story
    const { error: updateError } = await supabase
      .from('hero_stories')
      .update({
        is_group_gift: true,
        group_gift_token: token,
        organizer_name: organizerName || null,
      })
      .eq('id', storyId);

    if (updateError) {
      logger.error('Failed to create group gift', updateError);
      return NextResponse.json({ error: 'Failed to create group gift' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      token,
      shareUrl: `/create-a-hero/gift/${token}`,
    });
  } catch (err) {
    logger.error('Group gift create error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
