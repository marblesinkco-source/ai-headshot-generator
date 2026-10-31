import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { csrfGuard } from '@/lib/security';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

const contributeSchema = z.object({
  token: z.string().min(10).max(64),
  contributor_name: z.string().min(1, 'Name is required').max(100),
  contributor_email: z.string().email().max(254).optional().or(z.literal('')),
  message: z.string().min(1, 'Message is required').max(1000),
  question_answers: z.record(z.string().max(500)).optional(),
});

/* ================================================================== */
/*  POST /api/hero/group-gift/contribute                               */
/*  Public route — anyone with the link can contribute.                */
/* ================================================================== */

export async function POST(req: NextRequest) {
  const csrf = csrfGuard(req);
  if (csrf) return csrf;

  try {
    // Rate limit by IP — 20 contributions per hour
    const ip = getClientIp(req);
    const rl = await rateLimit({
      key: `group-gift-contribute:${ip}`,
      limit: 20,
      windowMs: 60 * 60 * 1000,
    });
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '300' } },
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const parsed = contributeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { token, contributor_name, contributor_email, message, question_answers } = parsed.data;
    const supabase = createAdminClient();

    // Validate token and find story
    const { data: story, error: fetchError } = await supabase
      .from('hero_stories')
      .select('id, is_group_gift')
      .eq('group_gift_token', token)
      .eq('is_group_gift', true)
      .single();

    if (fetchError || !story) {
      return NextResponse.json({ error: 'Gift not found' }, { status: 404 });
    }

    // Insert contribution
    const { error: insertError } = await supabase
      .from('hero_group_contributions')
      .insert({
        story_id: story.id,
        contributor_name,
        contributor_email: contributor_email || null,
        message,
        question_answers: question_answers || null,
      });

    if (insertError) {
      logger.error('Failed to insert contribution', insertError);
      return NextResponse.json({ error: 'Failed to save contribution' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    logger.error('Group gift contribute error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
