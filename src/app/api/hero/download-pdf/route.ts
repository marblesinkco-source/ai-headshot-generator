import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { csrfGuard } from '@/lib/security';
import { generateStoryPdf, type StoryBookData, type StoryBookPage } from '@/lib/pdf-generator';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // allow time for image fetching

const downloadSchema = z.object({
  storyId: z.string().uuid('Invalid story ID'),
});

/* ================================================================== */
/*  POST /api/hero/download-pdf                                        */
/*  Generates and returns a PDF of a completed hero storybook.         */
/* ================================================================== */

export async function POST(req: NextRequest) {
  const csrf = csrfGuard(req);
  if (csrf) return csrf;

  try {
    // Auth check
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 },
      );
    }

    // Parse body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const parsed = downloadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Invalid input' },
        { status: 400 },
      );
    }

    const { storyId } = parsed.data;

    // Fetch story — RLS ensures user owns it
    const { data: story, error: storyError } = await supabase
      .from('hero_stories')
      .select('id, hero_name, universe_id, cover_title, cover_subtitle, dedication, status, user_id')
      .eq('id', storyId)
      .single();

    if (storyError || !story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    // Verify ownership
    if (story.user_id !== user.id) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    // Only completed stories can be downloaded
    if (story.status !== 'completed') {
      return NextResponse.json(
        { error: 'Story must be completed before downloading' },
        { status: 400 },
      );
    }

    // Fetch pages
    const { data: pagesData, error: pagesError } = await supabase
      .from('hero_story_pages')
      .select('page_number, title, text, illustration_url, is_cover')
      .eq('story_id', storyId)
      .order('page_number', { ascending: true });

    if (pagesError || !pagesData || pagesData.length === 0) {
      return NextResponse.json(
        { error: 'No story pages found' },
        { status: 404 },
      );
    }

    // Build the data for the PDF generator
    const storyBookPages: StoryBookPage[] = pagesData
      .filter((p) => !p.is_cover) // cover page content is handled separately
      .map((p) => ({
        pageNumber: p.page_number,
        title: p.title || '',
        text: p.text || '',
        illustrationUrl: p.illustration_url,
      }));

    const storyBookData: StoryBookData = {
      heroName: story.hero_name,
      coverTitle: story.cover_title || `The Adventures of ${story.hero_name}`,
      coverSubtitle: story.cover_subtitle || '',
      dedication: story.dedication || null,
      universeId: story.universe_id,
      pages: storyBookPages,
    };

    // Generate PDF
    const pdfBuffer = await generateStoryPdf(storyBookData);

    // Sanitize filename
    const safeName = story.hero_name
      .replace(/[^a-zA-Z0-9 _-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 50);
    const filename = `${safeName}-storybook.pdf`;

    // Return as downloadable PDF
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(pdfBuffer.length),
        'Cache-Control': 'private, no-cache',
      },
    });
  } catch (err) {
    logger.error('PDF generation failed', { error: err });
    return NextResponse.json(
      { error: 'Failed to generate PDF. Please try again.' },
      { status: 500 },
    );
  }
}
