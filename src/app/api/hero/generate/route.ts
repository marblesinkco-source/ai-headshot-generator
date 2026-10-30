import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { HERO_UNIVERSES, HERO_OCCASIONS, STORY_CONFIG } from '@/config/hero-storybook';

export const maxDuration = 300; // 5 min for story generation

/**
 * POST /api/hero/generate
 * Generates story text + illustration prompts for a hero storybook.
 * Phase 1: generates text and scene prompts (illustrations come after payment).
 */
export async function POST(req: NextRequest) {
  try {
    const { storyId } = await req.json();

    if (!storyId) {
      return NextResponse.json({ error: 'storyId is required' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Fetch the story
    const { data: story, error: fetchError } = await supabase
      .from('hero_stories')
      .select('*')
      .eq('id', storyId)
      .single();

    if (fetchError || !story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    if (story.status !== 'draft') {
      return NextResponse.json({ error: 'Story already processing' }, { status: 400 });
    }

    // Update status
    await supabase
      .from('hero_stories')
      .update({ status: 'generating', generation_progress: 5 })
      .eq('id', storyId);

    const universe = HERO_UNIVERSES.find((u) => u.id === story.universe_id);
    const occasion = HERO_OCCASIONS.find((o) => o.id === story.occasion_id);

    if (!universe || !occasion) {
      await supabase
        .from('hero_stories')
        .update({ status: 'failed', error_message: 'Invalid universe or occasion' })
        .eq('id', storyId);
      return NextResponse.json({ error: 'Invalid universe or occasion' }, { status: 400 });
    }

    // Build the story generation prompt
    const heroProfile = story.profile as Record<string, string>;
    const storyPrompt = buildStoryPrompt(story.hero_name, universe, occasion, heroProfile);

    // TODO: Call LLM API for text generation (Claude API or similar)
    // For now, generate a template-based preview story
    const pages = generateTemplateStory(
      story.hero_name,
      universe,
      occasion,
      heroProfile,
      STORY_CONFIG.freePreviewPages,
    );

    // Save pages
    const pageRecords = pages.map((page, idx) => ({
      story_id: storyId,
      page_number: idx,
      title: page.title,
      text: page.text,
      scene_prompt: page.scenePrompt,
      is_cover: idx === 0,
      status: 'pending',
    }));

    const { error: insertError } = await supabase
      .from('hero_story_pages')
      .insert(pageRecords);

    if (insertError) {
      await supabase
        .from('hero_stories')
        .update({ status: 'failed', error_message: insertError.message })
        .eq('id', storyId);
      return NextResponse.json({ error: 'Failed to save pages' }, { status: 500 });
    }

    // Update story with cover info
    await supabase
      .from('hero_stories')
      .update({
        status: 'preview',
        generation_progress: 100,
        cover_title: pages[0]?.title || `The Adventures of ${story.hero_name}`,
        cover_subtitle: `A ${universe.name} Story`,
        page_count: pages.length,
        story_data: { pages },
      })
      .eq('id', storyId);

    return NextResponse.json({
      success: true,
      storyId,
      previewPages: STORY_CONFIG.freePreviewPages,
      totalPages: pages.length,
    });
  } catch (err) {
    console.error('Hero story generation error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

/* ------------------------------------------------------------------ */
/*  Template-based story generation (Phase 1 — before LLM integration) */
/* ------------------------------------------------------------------ */

interface GeneratedPage {
  title: string;
  text: string;
  scenePrompt: string;
}

function buildStoryPrompt(
  heroName: string,
  universe: typeof HERO_UNIVERSES[number],
  occasion: typeof HERO_OCCASIONS[number],
  profile: Record<string, string>,
): string {
  const parts = [
    `Write a ${STORY_CONFIG.defaultPages}-page illustrated storybook for ${heroName}.`,
    `Universe: ${universe.name} — ${universe.description}`,
    `Occasion: ${occasion.name} (tone: ${occasion.toneHint})`,
  ];

  if (profile.profession) parts.push(`Profession: ${profile.profession}`);
  if (profile.hobbies) parts.push(`Hobbies: ${profile.hobbies}`);
  if (profile.quirk) parts.push(`Quirk: ${profile.quirk}`);
  if (profile.superpower) parts.push(`Superpower: ${profile.superpower}`);
  if (profile.catchphrase) parts.push(`Catchphrase: "${profile.catchphrase}"`);
  if (profile.favorite_place) parts.push(`Favorite place: ${profile.favorite_place}`);
  if (profile.teammates) parts.push(`Sidekicks: ${profile.teammates}`);

  parts.push(
    '',
    'Each page should have: a title, a paragraph of story text (3-5 sentences), and a scene description for illustration.',
    'The story must be original — no copyrighted characters, names, or franchises.',
    'Make it personal, warm, and specific to the hero\'s details.',
    'Include humor and heart. End on a triumphant, celebratory note.',
  );

  return parts.join('\n');
}

function generateTemplateStory(
  heroName: string,
  universe: typeof HERO_UNIVERSES[number],
  occasion: typeof HERO_OCCASIONS[number],
  profile: Record<string, string>,
  previewCount: number,
): GeneratedPage[] {
  // Template-based story for Phase 1 preview
  // This will be replaced by LLM-generated text in Phase 2
  const chapters = universe.sampleChapters;
  const pages: GeneratedPage[] = [];

  // Cover page
  pages.push({
    title: `The Adventures of ${heroName}`,
    text: `In a world where anything is possible, one extraordinary person was about to embark on the adventure of a lifetime. This is the story of ${heroName} — ${universe.name.toLowerCase()}, legend, and true hero.`,
    scenePrompt: `Epic portrait of ${heroName} as a ${universe.name.toLowerCase()}, ${universe.sceneKeywords}, cinematic lighting, heroic pose, storybook illustration style, high quality`,
  });

  // Chapter pages
  for (let i = 0; i < chapters.length && i < previewCount - 1; i++) {
    const chapterTitle = chapters[i];
    const quirkLine = profile.quirk ? ` (Though ${heroName} couldn't help but ${profile.quirk.toLowerCase()} even in moments like these.)` : '';
    const catchphraseLine = profile.catchphrase ? ` "${profile.catchphrase}" ${heroName} said with a grin.` : '';

    pages.push({
      title: chapterTitle,
      text: `Chapter ${i + 1}: ${chapterTitle}. ${heroName} stood at the threshold of something incredible. The journey ahead would test every skill, every bit of courage, and every lesson learned along the way.${quirkLine}${catchphraseLine} But heroes are made in moments like these.`,
      scenePrompt: `${heroName} in an epic scene, ${chapterTitle.toLowerCase()}, ${universe.sceneKeywords}, dynamic action, storybook illustration, warm cinematic lighting`,
    });
  }

  // Fill remaining preview pages if needed
  while (pages.length < previewCount) {
    const idx = pages.length;
    pages.push({
      title: `Chapter ${idx}`,
      text: `The story continues as ${heroName} faces new challenges and discovers hidden strengths. Every step forward reveals more about what makes a true hero.`,
      scenePrompt: `${heroName} on an adventure, ${universe.sceneKeywords}, storybook illustration, dramatic lighting`,
    });
  }

  return pages;
}
