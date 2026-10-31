import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/server';
import { HERO_UNIVERSES, HERO_OCCASIONS, STORY_CONFIG } from '@/config/hero-storybook';
import { rateLimit } from '@/lib/rate-limit';
import { csrfGuard } from '@/lib/security';
import { logger } from '@/lib/logger';

export const maxDuration = 300; // 5 min for story generation

/** Replicate text generation model */
const TEXT_MODEL = 'meta/meta-llama-3-70b-instruct';

const generateSchema = z.object({
  storyId: z.string().uuid('Invalid story ID'),
});

/**
 * POST /api/hero/generate
 * Generates story text + illustration prompts for a hero storybook.
 * Generates ALL pages (text + scene prompts). Illustrations come after payment.
 */
export async function POST(req: NextRequest) {
  const csrf = csrfGuard(req);
  if (csrf) return csrf;

  try {
    // Auth check
    const userClient = await createClient();
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Rate limit: 5 requests per minute per user
    const rl = await rateLimit({
      key: `hero-generate:${user.id}`,
      limit: 5,
      windowMs: 60 * 1000,
    });
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '60' } },
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const parsed = generateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { storyId } = parsed.data;
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

    // Verify story ownership
    if (story.user_id !== user.id) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    if (story.status !== 'draft') {
      return NextResponse.json({ error: 'Story already processing' }, { status: 400 });
    }

    // Update status to generating
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

    const heroProfile = story.profile as Record<string, string>;
    const pageCount = STORY_CONFIG.defaultPages;

    // Try LLM generation, fall back to template on failure
    let pages: GeneratedPage[];
    const replicateToken = process.env.REPLICATE_API_TOKEN;

    if (replicateToken) {
      try {
        await supabase
          .from('hero_stories')
          .update({ generation_progress: 10 })
          .eq('id', storyId);

        pages = await generateStoryWithLLM(
          replicateToken,
          story.hero_name,
          universe,
          occasion,
          heroProfile,
          pageCount,
        );

        logger.info(`[hero-generate] LLM generated ${pages.length} pages for story ${storyId}`);
      } catch (llmError) {
        logger.error('[hero-generate] LLM generation failed, falling back to template:', llmError);
        pages = generateTemplateStory(story.hero_name, universe, occasion, heroProfile, pageCount);
      }
    } else {
      logger.warn('[hero-generate] REPLICATE_API_TOKEN not configured, using template');
      pages = generateTemplateStory(story.hero_name, universe, occasion, heroProfile, pageCount);
    }

    await supabase
      .from('hero_stories')
      .update({ generation_progress: 70 })
      .eq('id', storyId);

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

    // Update story with cover info and status
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
    logger.error('Hero story generation error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

/* ------------------------------------------------------------------ */
/*  LLM-powered story generation via Replicate                         */
/* ------------------------------------------------------------------ */

interface GeneratedPage {
  title: string;
  text: string;
  scenePrompt: string;
}

const pageSchema = z.object({
  title: z.string().min(1).max(200),
  text: z.string().min(10).max(2000),
  scenePrompt: z.string().min(10).max(1000),
});

/**
 * Generate a story using an LLM on Replicate.
 * Retries once on failure, validates each page's structure.
 */
async function generateStoryWithLLM(
  apiToken: string,
  heroName: string,
  universe: typeof HERO_UNIVERSES[number],
  occasion: typeof HERO_OCCASIONS[number],
  profile: Record<string, string>,
  pageCount: number,
): Promise<GeneratedPage[]> {
  const prompt = buildLLMPrompt(heroName, universe, occasion, profile, pageCount);
  const maxRetries = 2;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const rawText = await callReplicateLLM(apiToken, prompt);
      const pages = parseLLMResponse(rawText, pageCount);

      if (pages.length >= STORY_CONFIG.freePreviewPages) {
        return pages;
      }

      logger.warn(`[hero-generate] LLM returned only ${pages.length} pages, retrying...`);
    } catch (err) {
      if (attempt === maxRetries - 1) throw err;
      logger.warn(`[hero-generate] LLM attempt ${attempt + 1} failed, retrying...`);
    }
  }

  throw new Error('LLM generation failed after retries');
}

/**
 * Build the prompt for structured story output.
 */
function buildLLMPrompt(
  heroName: string,
  universe: typeof HERO_UNIVERSES[number],
  occasion: typeof HERO_OCCASIONS[number],
  profile: Record<string, string>,
  pageCount: number,
): string {
  const profileLines: string[] = [];
  if (profile.profession) profileLines.push(`- Profession: ${profile.profession}`);
  if (profile.hobbies) profileLines.push(`- Hobbies & interests: ${profile.hobbies}`);
  if (profile.quirk) profileLines.push(`- Funny quirk: ${profile.quirk}`);
  if (profile.superpower) profileLines.push(`- If they had a superpower: ${profile.superpower}`);
  if (profile.catchphrase) profileLines.push(`- Catchphrase: "${profile.catchphrase}"`);
  if (profile.favorite_place) profileLines.push(`- Favorite place: ${profile.favorite_place}`);
  if (profile.teammates) profileLines.push(`- Sidekicks/companions: ${profile.teammates}`);

  return `You are a world-class children's storybook author. Write a personalized ${pageCount}-page illustrated storybook.

HERO: ${heroName}
UNIVERSE: ${universe.name} — ${universe.description}
OCCASION: ${occasion.name} (Tone: ${occasion.toneHint})
${profileLines.length > 0 ? `\nHERO DETAILS:\n${profileLines.join('\n')}` : ''}

REQUIREMENTS:
1. Write exactly ${pageCount} pages as a JSON array
2. Page 1 is the cover/opening — introduce the hero dramatically
3. Pages 2-${pageCount - 1} tell the adventure story with rising action, climax, and resolution
4. Page ${pageCount} is the triumphant conclusion celebrating the hero
5. Weave the hero's personal details (profession, hobbies, quirk, catchphrase) naturally into the story
6. Keep tone: ${occasion.toneHint}
7. NO copyrighted characters, names, or franchises (no Marvel, DC, Disney, etc.)
8. Each page's text should be 3-5 sentences, engaging and vivid
9. Scene prompts describe what the illustration should show — include ${universe.sceneKeywords}

OUTPUT FORMAT — respond with ONLY this JSON array, no other text:
[
  {"title": "Chapter Title", "text": "Story paragraph...", "scenePrompt": "Detailed illustration description: ${heroName} as ${universe.name.toLowerCase()}, [specific scene], ${universe.sceneKeywords}, storybook illustration style, warm lighting"}
]`;
}

/**
 * Call a text model on Replicate and return the generated text.
 * Uses prediction create + poll to handle longer generations.
 */
async function callReplicateLLM(apiToken: string, prompt: string): Promise<string> {
  // Create prediction
  const createRes = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
      'Prefer': 'wait=120',
    },
    body: JSON.stringify({
      model: TEXT_MODEL,
      input: {
        prompt,
        max_tokens: 8192,
        temperature: 0.8,
        top_p: 0.95,
      },
    }),
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Replicate API error ${createRes.status}: ${errText}`);
  }

  const prediction = await createRes.json() as {
    id: string;
    status: string;
    output?: unknown;
    error?: string;
    urls?: { get?: string };
  };

  // If completed synchronously (Prefer: wait), return the output
  if (prediction.status === 'succeeded' && prediction.output) {
    return extractTextOutput(prediction.output);
  }

  if (prediction.status === 'failed') {
    throw new Error(`Replicate prediction failed: ${prediction.error || 'unknown error'}`);
  }

  // Poll for completion
  const pollUrl = prediction.urls?.get || `https://api.replicate.com/v1/predictions/${prediction.id}`;
  const maxPollTime = 240_000; // 4 minutes
  const pollInterval = 3_000;
  const startTime = Date.now();

  while (Date.now() - startTime < maxPollTime) {
    await new Promise((resolve) => setTimeout(resolve, pollInterval));

    const pollRes = await fetch(pollUrl, {
      headers: { 'Authorization': `Bearer ${apiToken}` },
    });

    if (!pollRes.ok) {
      throw new Error(`Replicate poll error: ${pollRes.status}`);
    }

    const pollData = await pollRes.json() as {
      status: string;
      output?: unknown;
      error?: string;
    };

    if (pollData.status === 'succeeded' && pollData.output) {
      return extractTextOutput(pollData.output);
    }

    if (pollData.status === 'failed' || pollData.status === 'canceled') {
      throw new Error(`Replicate prediction ${pollData.status}: ${pollData.error || 'unknown'}`);
    }
  }

  throw new Error('Replicate prediction timed out');
}

/**
 * Extract text from Replicate output — handles both string and token array formats.
 */
function extractTextOutput(output: unknown): string {
  if (typeof output === 'string') return output;
  if (Array.isArray(output)) return output.join('');
  throw new Error('Unexpected output format from Replicate');
}

/**
 * Parse the LLM's JSON response into validated pages.
 * Handles markdown code fences, trailing text, and partial JSON.
 */
function parseLLMResponse(rawText: string, expectedCount: number): GeneratedPage[] {
  // Strip markdown code fences if present
  let text = rawText.trim();
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');

  // Find the JSON array in the text
  const arrayStart = text.indexOf('[');
  const arrayEnd = text.lastIndexOf(']');
  if (arrayStart === -1 || arrayEnd === -1 || arrayEnd <= arrayStart) {
    throw new Error('No JSON array found in LLM response');
  }

  const jsonStr = text.slice(arrayStart, arrayEnd + 1);
  let parsed: unknown;

  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    // Try fixing common JSON issues (trailing commas)
    const fixed = jsonStr.replace(/,\s*([}\]])/g, '$1');
    parsed = JSON.parse(fixed);
  }

  if (!Array.isArray(parsed)) {
    throw new Error('LLM response is not an array');
  }

  // Validate each page
  const pages: GeneratedPage[] = [];
  for (const item of parsed) {
    const result = pageSchema.safeParse(item);
    if (result.success) {
      pages.push({
        title: result.data.title,
        text: result.data.text,
        scenePrompt: result.data.scenePrompt,
      });
    } else {
      // Try to salvage with fallback field names
      if (item && typeof item === 'object') {
        const title = item.title || item.chapter || item.heading || `Page ${pages.length + 1}`;
        const text = item.text || item.content || item.body || item.story || '';
        const scenePrompt = item.scenePrompt || item.scene_prompt || item.scene || item.illustration || '';
        if (text.length > 5 && scenePrompt.length > 5) {
          pages.push({
            title: String(title).slice(0, 200),
            text: String(text).slice(0, 2000),
            scenePrompt: String(scenePrompt).slice(0, 1000),
          });
        }
      }
    }
  }

  return pages;
}

/* ------------------------------------------------------------------ */
/*  Template-based story generation (fallback)                         */
/* ------------------------------------------------------------------ */

function generateTemplateStory(
  heroName: string,
  universe: typeof HERO_UNIVERSES[number],
  occasion: typeof HERO_OCCASIONS[number],
  profile: Record<string, string>,
  pageCount: number,
): GeneratedPage[] {
  const pages: GeneratedPage[] = [];
  const tone = occasion.toneHint.split(',')[0].trim();

  // Page 1: Cover / Opening
  pages.push({
    title: `The Adventures of ${heroName}`,
    text: `In a world where anything is possible, one extraordinary person was about to embark on the adventure of a lifetime. This is the ${tone} story of ${heroName} — ${universe.name.toLowerCase()}, legend, and true hero. Get ready for an unforgettable journey!`,
    scenePrompt: `Epic portrait of ${heroName} as a ${universe.name.toLowerCase()}, ${universe.sceneKeywords}, cinematic lighting, heroic pose, storybook illustration style, high quality`,
  });

  // Story arc templates per universe
  const storyBeats = getStoryBeats(heroName, universe, occasion, profile);

  for (let i = 0; i < storyBeats.length && pages.length < pageCount - 1; i++) {
    pages.push(storyBeats[i]);
  }

  // Fill remaining pages with adventure continuations
  while (pages.length < pageCount - 1) {
    const idx = pages.length;
    const phase = idx < pageCount * 0.3 ? 'rising' : idx < pageCount * 0.7 ? 'climax' : 'resolution';
    pages.push(generateFillerPage(heroName, universe, profile, idx, phase));
  }

  // Final page: Triumphant conclusion
  const catchphrase = profile.catchphrase ? ` "${profile.catchphrase}" ${heroName} declared, ` : '';
  pages.push({
    title: 'The Hero Returns',
    text: `And so, the greatest adventure came to its glorious end.${catchphrase} having proven that true heroism comes from the heart. ${heroName} had not just saved the day — they had inspired everyone around them. This was only the beginning of a legendary story.${profile.teammates ? ` ${profile.teammates} cheered the loudest of all.` : ''}`,
    scenePrompt: `${heroName} triumphant, ${universe.sceneKeywords}, celebration scene, golden lighting, storybook illustration, warm and victorious mood, cheering crowd`,
  });

  return pages;
}

function getStoryBeats(
  heroName: string,
  universe: typeof HERO_UNIVERSES[number],
  occasion: typeof HERO_OCCASIONS[number],
  profile: Record<string, string>,
): GeneratedPage[] {
  const chapters = universe.sampleChapters;
  const beats: GeneratedPage[] = [];
  const quirkMention = profile.quirk ? ` Even now, ${heroName} couldn't help but ${profile.quirk.toLowerCase()}.` : '';
  const hobbyMention = profile.hobbies ? ` Skills honed through years of ${profile.hobbies.split(',')[0].trim().toLowerCase()} came in surprisingly handy.` : '';
  const professionMention = profile.profession ? ` Years of experience as a ${profile.profession.toLowerCase()} had prepared ${heroName} for exactly this moment.` : '';
  const placeMention = profile.favorite_place ? ` It reminded ${heroName} of ${profile.favorite_place.toLowerCase()} — a place of comfort and strength.` : '';

  // Chapter 1: The Call to Adventure
  beats.push({
    title: chapters[0] || 'The Call',
    text: `The day began like any other, but destiny had different plans for ${heroName}. A mysterious message arrived, one that would change everything. The adventure of a lifetime was about to begin.${professionMention} There was no turning back now.`,
    scenePrompt: `${heroName} receiving a mysterious summons, ${universe.sceneKeywords}, dramatic lighting, sense of wonder, storybook illustration style`,
  });

  // Chapter 2: Crossing the Threshold
  beats.push({
    title: chapters[1] || 'Into the Unknown',
    text: `With courage burning bright, ${heroName} took the first step into the unknown. The world around them shifted and transformed into something magical.${quirkMention} Every sense was alive with possibility, and the air crackled with adventure.`,
    scenePrompt: `${heroName} stepping into a new world, ${universe.sceneKeywords}, magical transformation, wide shot, storybook illustration, enchanting atmosphere`,
  });

  // Chapter 3: Allies and Tests
  beats.push({
    title: chapters[2] || 'New Friends',
    text: `Along the way, ${heroName} met remarkable allies who recognized a kindred spirit.${profile.teammates ? ` Together with ${profile.teammates}, they formed an unstoppable team.` : ' Together, they formed an unstoppable team.'} Challenges arose at every turn, but each one revealed new strengths.${hobbyMention}`,
    scenePrompt: `${heroName} with loyal companions, ${universe.sceneKeywords}, friendship scene, warm lighting, storybook illustration, group adventure`,
  });

  // Chapter 4: The Darkest Hour
  beats.push({
    title: chapters[3] || 'The Greatest Challenge',
    text: `Just when victory seemed within reach, the greatest challenge yet appeared. ${heroName} faced a moment of doubt — could one person really make a difference?${placeMention} But deep inside, a fire burned that no obstacle could extinguish.`,
    scenePrompt: `${heroName} facing an overwhelming challenge, ${universe.sceneKeywords}, dramatic tension, moody lighting, storybook illustration, epic scale`,
  });

  return beats;
}

function generateFillerPage(
  heroName: string,
  universe: typeof HERO_UNIVERSES[number],
  profile: Record<string, string>,
  pageIndex: number,
  phase: 'rising' | 'climax' | 'resolution',
): GeneratedPage {
  const templates = {
    rising: [
      {
        title: 'A Hidden Path',
        text: `${heroName} discovered a hidden path that no one had noticed before. It led to a place of wonder and mystery, where ancient secrets waited to be uncovered. With each step, the adventure grew more extraordinary.`,
        scene: 'discovering a hidden path, mysterious landscape',
      },
      {
        title: 'The Secret Revealed',
        text: `A startling revelation changed everything ${heroName} thought they knew. The truth was more incredible than anyone could have imagined. This new knowledge would be the key to what lay ahead.`,
        scene: 'moment of revelation, magical discovery',
      },
      {
        title: 'Training Montage',
        text: `${heroName} trained harder than ever before, pushing past every limit. ${profile.superpower ? `The power of ${profile.superpower.toLowerCase()} grew stronger with each passing day.` : 'New abilities emerged that had been dormant all along.'} The transformation was remarkable.`,
        scene: 'training and growing stronger, dynamic action',
      },
    ],
    climax: [
      {
        title: 'The Battle Begins',
        text: `The moment of truth had arrived. ${heroName} stood tall, ready to face the ultimate challenge. Everything had led to this — every lesson, every friendship, every moment of courage. The battle for everything they believed in had begun.`,
        scene: 'epic confrontation, dramatic standoff',
      },
      {
        title: 'Against All Odds',
        text: `The odds were stacked against ${heroName}, but giving up was never an option. Drawing on inner strength and the support of loyal friends, ${heroName} found a way forward that no one expected.${profile.catchphrase ? ` "${profile.catchphrase}" rang out like a battle cry.` : ''}`,
        scene: 'heroic last stand, determination against overwhelming odds',
      },
      {
        title: 'The Turning Point',
        text: `In a flash of brilliance, ${heroName} saw what no one else could see. The solution was unexpected, creative, and uniquely ${heroName}. ${profile.profession ? `All those years as a ${profile.profession.toLowerCase()} had built exactly the skills needed for this moment.` : 'The hero\'s unique perspective saved the day.'}`,
        scene: 'eureka moment, clever solution, dramatic turn',
      },
    ],
    resolution: [
      {
        title: 'Victory',
        text: `${heroName} had done it. Against all odds, through sheer determination and heart, victory was achieved. The world was changed for the better, and everyone could feel it. This was what being a hero truly meant.`,
        scene: 'victorious celebration, golden lighting, triumph',
      },
      {
        title: 'Celebration',
        text: `The celebration was unlike anything anyone had ever seen. ${heroName} was surrounded by grateful friends and allies, each one sharing in the joy of this incredible achievement.${profile.teammates ? ` ${profile.teammates} raised a toast to the greatest hero they'd ever known.` : ''}`,
        scene: 'grand celebration, joy, community gathering',
      },
      {
        title: 'A New Dawn',
        text: `As the sun rose on a new day, ${heroName} looked out at the world with fresh eyes. The adventure had changed everything — not just the world, but the hero within. And somehow, everyone knew that this was just the beginning of an even greater story.`,
        scene: 'peaceful sunrise, new beginning, hopeful horizon',
      },
    ],
  };

  const options = templates[phase];
  const template = options[pageIndex % options.length];

  return {
    title: template.title,
    text: template.text,
    scenePrompt: `${heroName} in ${template.scene}, ${universe.sceneKeywords}, storybook illustration style, cinematic lighting`,
  };
}
