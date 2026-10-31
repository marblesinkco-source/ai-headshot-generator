import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import {
  HERO_UNIVERSES,
  HERO_OCCASIONS,
  STORY_CONFIG,
  type HeroUniverse,
  type HeroOccasion,
} from '@/config/hero-storybook';
import { rateLimit } from '@/lib/rate-limit';
import { csrfGuard } from '@/lib/security';
import { logger } from '@/lib/logger';

export const maxDuration = 300; // 5 min for story generation

const generateSchema = z.object({
  storyId: z.string().uuid('Invalid story ID'),
});

/* ================================================================== */
/*  POST /api/hero/generate                                           */
/*  Generates story text + scene prompts for a hero storybook.        */
/*  Illustrations are generated separately after payment.              */
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

    // Rate limit: 5 requests per minute per user
    const rl = await rateLimit({
      key: `hero-generate:${user.id}`,
      limit: 5,
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
    const heroName = story.hero_name;

    // Generate the full story (all 20 pages)
    const pages = generateStory(heroName, universe, occasion, heroProfile);

    // Save pages to DB
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
        cover_title: pages[0]?.title || `The Adventures of ${heroName}`,
        cover_subtitle: `A ${universe.name} Adventure`,
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

/* ================================================================== */
/*  Story Generation Engine                                           */
/*  Generates a full personalized storybook from hero profile data.   */
/*                                                                    */
/*  Architecture note: This engine uses structured templates with     */
/*  deep personalization. When a text-generation API key is added     */
/*  (ANTHROPIC_API_KEY or similar), swap generateStory() for an LLM   */
/*  call using buildLLMPrompt() below. The scene prompts and story    */
/*  structure will remain the same.                                   */
/* ================================================================== */

interface GeneratedPage {
  title: string;
  text: string;
  scenePrompt: string;
}

/**
 * LLM prompt builder — ready for future integration.
 * When an LLM API key is available, call the API with this prompt
 * and parse the structured JSON response.
 */
export function buildLLMPrompt(
  heroName: string,
  universe: HeroUniverse,
  occasion: HeroOccasion,
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
    'Return a JSON array of page objects, each with: title, text (3-5 sentences), scenePrompt (for flux-pulid illustration).',
    'The story must be original — no copyrighted characters, names, or franchises.',
    'Make it deeply personal and specific to the hero\'s details.',
    'Include humor and heart. Follow a 5-act arc. End on a triumphant, celebratory note.',
  );

  return parts.join('\n');
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Pick a value from profile or return a fallback */
function prof(profile: Record<string, string>, key: string, fallback: string): string {
  return profile[key]?.trim() || fallback;
}

/** Capitalize first letter */
function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Article helper */
function aOrAn(word: string): string {
  return /^[aeiou]/i.test(word.trim()) ? 'an' : 'a';
}

/** Scene prompt helper — appends universe keywords and quality tags */
function scenePrompt(description: string, universe: HeroUniverse): string {
  return `${description}, ${universe.sceneKeywords}, storybook illustration style, warm cinematic lighting, high quality digital art, 4:3 aspect ratio`;
}

/* ================================================================== */
/*  Full story generator — 20 pages, 5-act structure                  */
/* ================================================================== */

function generateStory(
  heroName: string,
  universe: HeroUniverse,
  occasion: HeroOccasion,
  profile: Record<string, string>,
): GeneratedPage[] {
  const pages: GeneratedPage[] = [];
  const profession = prof(profile, 'profession', 'remarkable person');
  const hobbies = prof(profile, 'hobbies', '');
  const quirk = prof(profile, 'quirk', '');
  const superpower = prof(profile, 'superpower', '');
  const catchphrase = prof(profile, 'catchphrase', '');
  const favoritePlace = prof(profile, 'favorite_place', '');
  const teammates = prof(profile, 'teammates', '');
  const firstName = heroName.split(' ')[0];

  const guide = teammates
    ? teammates.split(',')[0].trim()
    : universeDefaultGuide(universe);

  /* ── Page 0: Cover ── */
  pages.push({
    title: occasionTitle(heroName, occasion, universe),
    text:
      `Every once in a rare while, the universe picks someone extraordinary — ` +
      `someone whose courage, heart, and spirit make them destined for an adventure beyond imagination. ` +
      `This is the story of ${heroName}, ${aOrAn(profession)} ${profession} who became the most unlikely ` +
      `and unforgettable ${universe.name.toLowerCase()} hero the world has ever seen. Buckle up. This one's personal.`,
    scenePrompt: scenePrompt(
      `Epic portrait of ${heroName} as a heroic ${universe.name.toLowerCase()}, centered dramatic pose, title page composition, golden light`,
      universe,
    ),
  });

  /* ── Page 1: The Ordinary World ── */
  pages.push({
    title: 'Before the Adventure',
    text:
      `${heroName} was known far and wide as ${aOrAn(profession)} ${profession}` +
      `${quirk ? `, with a charming habit of ${quirk.toLowerCase()}` : ''}. ` +
      `Life was full and good — ${hobbies ? `days spent ${hobbies.toLowerCase()}` : 'each day bringing its own small joys'}. ` +
      `But somewhere deep inside, ${firstName} felt the pull of something extraordinary waiting just around the corner. ` +
      `${catchphrase ? `"${catchphrase}," ${firstName} would always say, and today those words carried a special weight.` : 'Today, everything was about to change.'}`,
    scenePrompt: scenePrompt(
      `${heroName} in everyday life, ${favoritePlace ? `at ${favoritePlace}` : 'in a cozy familiar setting'}, warm morning light, looking toward the horizon with a hint of anticipation`,
      universe,
    ),
  });

  /* ── Page 2: The Call ── */
  pages.push({
    title: 'The Mysterious Invitation',
    text: universeCallText(heroName, firstName, universe, profession),
    scenePrompt: scenePrompt(
      `${heroName} discovering a mysterious ${callObject(universe)}, dramatic reveal moment, magical light emanating from the object, surprise and wonder on face`,
      universe,
    ),
  });

  /* ── Page 3: Reluctance & Decision ── */
  pages.push({
    title: 'A Moment of Doubt',
    text:
      `${firstName} stared at the ${callObject(universe)} for a long time. ` +
      `${superpower ? `"My greatest strength is ${superpower.toLowerCase()}," ${firstName} thought, "but is that enough for what lies ahead?"` : 'Could this really be happening?'} ` +
      `There was so much to leave behind — ${hobbies ? `the comfort of ${hobbies.toLowerCase().split(',')[0].trim()}` : 'the familiar routines'}, ` +
      `the people who mattered most. ` +
      `But ${firstName} remembered something important: the best stories belong to those brave enough to say yes.`,
    scenePrompt: scenePrompt(
      `${heroName} at a crossroads, contemplative expression, dramatic lighting with shadows and light, the path ahead glowing with possibility`,
      universe,
    ),
  });

  /* ── Page 4: Crossing the Threshold ── */
  pages.push({
    title: universeCrossingTitle(universe),
    text:
      `With a deep breath and ${quirk ? `one last ${quirk.toLowerCase()} for good luck` : 'heart pounding with excitement'}, ` +
      `${firstName} stepped into the unknown. ${universeThresholdScene(heroName, universe)} ` +
      `There was no turning back now, and honestly, ${firstName} wouldn't have it any other way. ` +
      `${catchphrase ? `"${catchphrase}!" ${firstName} declared to no one in particular, and the adventure officially began.` : 'The adventure had officially begun.'}`,
    scenePrompt: scenePrompt(
      `${heroName} stepping through ${universePortal(universe)}, dramatic wide shot, magical transformation, awe-inspiring environment reveal`,
      universe,
    ),
  });

  /* ── Page 5: Meeting the Guide ── */
  pages.push({
    title: 'An Unexpected Ally',
    text: universeGuideText(heroName, firstName, universe, guide, profession),
    scenePrompt: scenePrompt(
      `${heroName} meeting ${guide} in ${universeSetting(universe)}, warm friendly encounter, two characters facing each other`,
      universe,
    ),
  });

  /* ── Page 6: Learning the Rules ── */
  pages.push({
    title: universeTrainingTitle(universe),
    text:
      `Every hero needs to learn the ways of their new world, and ${firstName} was no exception. ` +
      `${universeTrainingText(heroName, firstName, universe, profession)} ` +
      `${superpower ? `It turned out that ${superpower.toLowerCase()} was exactly what was needed here — just applied in ways ${firstName} had never imagined.` : `Each challenge revealed new strengths ${firstName} never knew existed.`}` +
      `${quirk ? ` And yes, even here, ${firstName} managed to ${quirk.toLowerCase()}, much to everyone's amusement.` : ''}`,
    scenePrompt: scenePrompt(
      `${heroName} training and learning new skills, ${universeTrainingScene(universe)}, montage style, determination on face`,
      universe,
    ),
  });

  /* ── Page 7: First Small Victory ── */
  pages.push({
    title: 'The First Triumph',
    text:
      `Then came the moment everyone had been waiting for. ` +
      `${universeFirstVictoryText(heroName, firstName, universe)} ` +
      `${teammates ? `${guide} cheered from the sidelines, knowing they'd chosen the right hero to believe in.` : 'Everyone who witnessed it knew they were looking at someone special.'} ` +
      `${catchphrase ? `"${catchphrase}!" ${firstName} grinned, and this time it sounded like a battle cry.` : `${firstName} grinned from ear to ear. This was only the beginning.`}`,
    scenePrompt: scenePrompt(
      `${heroName} celebrating a victory, triumphant pose, cheering crowd or companions, dramatic celebratory lighting, ${universeSetting(universe)}`,
      universe,
    ),
  });

  /* ── Page 8: The Fun Chapter (hobby integration) ── */
  pages.push({
    title: hobbies ? `When ${cap(hobbies.split(',')[0].trim())} Saved the Day` : 'The Secret Weapon',
    text: hobbyIntegrationText(heroName, firstName, universe, hobbies, profession),
    scenePrompt: scenePrompt(
      `${heroName} using an unusual everyday skill in a ${universe.name.toLowerCase()} setting, creative problem solving, humorous and clever, surprised onlookers`,
      universe,
    ),
  });

  /* ── Page 9: Growing Bonds ── */
  pages.push({
    title: teammates ? 'The Team Comes Together' : 'Finding Friends in Unlikely Places',
    text: teamBondingText(heroName, firstName, universe, teammates, guide, favoritePlace),
    scenePrompt: scenePrompt(
      `${heroName} sharing a moment with companions around ${universeCampfire(universe)}, warm golden light, friendship and laughter, intimate group scene`,
      universe,
    ),
  });

  /* ── Page 10: The Twist ── */
  pages.push({
    title: 'When Everything Changed',
    text:
      `Just when ${firstName} thought the hardest part was over, the ground shifted — literally and figuratively. ` +
      `${universeTwistText(heroName, firstName, universe)} ` +
      `For a moment, everything ${firstName} had worked for seemed to hang by a thread. ` +
      `But true heroes aren't defined by the easy victories — they're forged in the moments when giving up seems like the only option.`,
    scenePrompt: scenePrompt(
      `${heroName} facing a sudden dramatic reversal, dark stormy atmosphere, dramatic tension, the hero standing alone against overwhelming odds`,
      universe,
    ),
  });

  /* ── Page 11: The Dark Moment ── */
  pages.push({
    title: 'The Longest Night',
    text:
      `In the quiet that followed, ${firstName} sat alone with doubt as a companion. ` +
      `${superpower ? `Was ${superpower.toLowerCase()} really enough? Had it ever been?` : 'Had this all been a mistake?'} ` +
      `${favoritePlace ? `${firstName} closed both eyes and imagined ${favoritePlace.toLowerCase()}, drawing strength from that familiar, beloved place.` : `${firstName} closed both eyes and thought about home, about the people who believed in this journey.`} ` +
      `And in that silence, something remarkable happened. ` +
      `${firstName} heard a voice — not from outside, but from within — saying: "You were made for this."`,
    scenePrompt: scenePrompt(
      `${heroName} alone in a dark moment, sitting quietly with head bowed, single beam of light breaking through darkness, emotional and contemplative`,
      universe,
    ),
  });

  /* ── Page 12: Rising Again ── */
  pages.push({
    title: 'Rising from the Ashes',
    text:
      `${firstName} stood up — slowly at first, then with a determination that could move mountains. ` +
      `${catchphrase ? `"${catchphrase}," ${firstName} whispered, and the words felt like an oath.` : `"Not today," ${firstName} whispered. "Not ever."`} ` +
      `${quirk ? `With one last ${quirk.toLowerCase()} (old habits die hard, even in epic moments), ` : 'With shoulders squared and jaw set, '}` +
      `${firstName} looked at what lay ahead and, for the first time, saw it clearly — not as an obstacle, but as an opportunity to become the hero this story needed.`,
    scenePrompt: scenePrompt(
      `${heroName} rising up with renewed determination, dramatic upward angle, light breaking through clouds, powerful heroic pose, transformation moment`,
      universe,
    ),
  });

  /* ── Page 13: Rallying the Allies ── */
  pages.push({
    title: teammates ? 'Rallying the Team' : 'A Call to Arms',
    text: rallyText(heroName, firstName, universe, teammates, guide, occasion),
    scenePrompt: scenePrompt(
      `${heroName} giving an inspiring speech to a group of allies, dramatic gesture, ${universeSetting(universe)}, rallying moment, united front`,
      universe,
    ),
  });

  /* ── Page 14: The Plan ── */
  pages.push({
    title: 'The Brilliant Plan',
    text:
      `What ${firstName} proposed was audacious, unexpected, and just crazy enough to work. ` +
      `${universePlanText(heroName, firstName, universe, profession)} ` +
      `"No one will see it coming," ${firstName} said with a spark in the eye that made everyone believe. ` +
      `Because the best plans don't come from textbooks — they come from people who know exactly who they are.`,
    scenePrompt: scenePrompt(
      `${heroName} explaining an elaborate plan, pointing at ${universePlanProp(universe)}, animated expression, companions listening intently, strategic planning scene`,
      universe,
    ),
  });

  /* ── Page 15: The Final Battle Begins ── */
  pages.push({
    title: universeFinalBattleTitle(universe),
    text:
      `The moment had arrived. ${firstName} stood at the front, ` +
      `${teammates ? `flanked by ${guide} and the rest of the team` : 'ready to face whatever came next'}. ` +
      `${universeFinalBattleStartText(heroName, firstName, universe)} ` +
      `${superpower ? `And when ${firstName} channeled ${superpower.toLowerCase()}, something extraordinary happened — the very ${universeElement(universe)} seemed to respond.` : `And then ${firstName} did something no one expected.`}`,
    scenePrompt: scenePrompt(
      `${heroName} leading a charge into the ${universeFinalSetting(universe)}, epic wide shot, dramatic action, companions at sides, climactic battle beginning`,
      universe,
    ),
  });

  /* ── Page 16: The Climax ── */
  pages.push({
    title: 'The Moment of Truth',
    text:
      `Everything came down to this single, breathtaking moment. ` +
      `${universeClimaxText(heroName, firstName, universe, superpower)} ` +
      `Time seemed to stand still as ${firstName} gave absolutely everything. ` +
      `${catchphrase ? `"${catchphrase}!" The words echoed through ${universeSetting(universe)} like thunder.` : `A sound like thunder rolled through ${universeSetting(universe)}.`} ` +
      `And then — light. Brilliant, overwhelming, beautiful light.`,
    scenePrompt: scenePrompt(
      `${heroName} in the climactic moment of victory, brilliant burst of light, epic dynamic pose, maximum drama, the decisive action frozen in time`,
      universe,
    ),
  });

  /* ── Page 17: Victory ── */
  pages.push({
    title: 'Victory!',
    text:
      `When the dust settled, there was silence — and then, a roar of celebration that shook the very foundations of ${universeSetting(universe)}. ` +
      `${firstName} had done it. Not alone, never alone, but as the person who refused to stop believing. ` +
      `${teammates ? `${guide} was the first to arrive, pulling ${firstName} into the kind of hug that says more than words ever could.` : `Cheers erupted from every direction as people rushed to embrace their hero.`} ` +
      `${quirk ? `And yes, even in this moment of glory, ${firstName} couldn't help but ${quirk.toLowerCase()}. Some things never change — and that's exactly the point.` : 'Some moments are too big for words. This was one of them.'}`,
    scenePrompt: scenePrompt(
      `${heroName} standing victorious, surrounded by cheering crowd, confetti and celebration, golden hour lighting, pure joy and triumph`,
      universe,
    ),
  });

  /* ── Page 18: The Celebration ── */
  pages.push({
    title: occasionCelebrationTitle(occasion),
    text: occasionCelebrationText(heroName, firstName, universe, occasion, profession, guide, teammates, favoritePlace),
    scenePrompt: scenePrompt(
      `Grand celebration scene with ${heroName} at center, ${universeCelebrationScene(universe)}, festive atmosphere, warm golden lighting, happiness and community`,
      universe,
    ),
  });

  /* ── Page 19: The Return / Looking Forward ── */
  pages.push({
    title: 'What Comes Next',
    text:
      `As the celebration wound down, ${firstName} looked out at the world that had become so much bigger and more wonderful. ` +
      `The journey had changed everything — not the world out there, but the ${profession} from ${favoritePlace || 'back home'} who now knew what was truly possible. ` +
      `${superpower ? `${cap(superpower.toLowerCase())} — that was always ${firstName}'s greatest gift. But now it was paired with something new: the knowledge that one person can make an extraordinary difference.` : `${firstName} had always been extraordinary. Now the rest of the world knew it too.`} ` +
      `${catchphrase ? `"${catchphrase}," ${firstName} said one more time, with a smile that could light up galaxies. ` : ''}` +
      `The adventure wasn't over. It was only the beginning.`,
    scenePrompt: scenePrompt(
      `${heroName} looking toward a bright horizon, hopeful and confident, ${universeSetting(universe)} stretching into the distance, sunrise, reflective heroic moment`,
      universe,
    ),
  });

  /* ── Page 20 (idx 19): Dedication Page ── */
  pages.push({
    title: 'For You, Hero',
    text: dedicationText(heroName, firstName, occasion, superpower),
    scenePrompt: scenePrompt(
      `Beautiful final illustration of ${heroName} as the hero of their story, gentle warm portrait, storybook closing page, ornate border, heartfelt and personal`,
      universe,
    ),
  });

  return pages;
}

/* ================================================================== */
/*  Universe-specific content helpers                                  */
/* ================================================================== */

function occasionTitle(name: string, occasion: HeroOccasion, universe: HeroUniverse): string {
  const titles: Record<string, string> = {
    birthday: `${name}: A Birthday Adventure`,
    promotion: `${name} Rises: A Tale of Triumph`,
    retirement: `The Legend of ${name}`,
    farewell: `${name}'s Greatest Adventure`,
    graduation: `${name} Graduates: A Hero's Journey`,
    anniversary: `The Continuing Adventures of ${name}`,
    'just-because': `${name}: The Unexpected Hero`,
  };
  return titles[occasion.id] || `The Adventures of ${name}`;
}

function callObject(universe: HeroUniverse): string {
  const objects: Record<string, string> = {
    'space-captain': 'holographic transmission',
    knight: 'sealed royal scroll',
    detective: 'cryptic letter slipped under the door',
    superhero: 'strange glowing object',
    viking: 'rune-carved message in a bottle',
    'fairy-tale': 'enchanted golden letter carried by a talking owl',
  };
  return objects[universe.id] || 'mysterious message';
}

function universeCallText(name: string, firstName: string, universe: HeroUniverse, profession: string): string {
  const calls: Record<string, string> = {
    'space-captain':
      `A holographic transmission flickered to life in ${firstName}'s living room, projecting a starmap with a single blinking distress signal. "Captain ${firstName}," a calm voice announced, "the Galactic Council has selected you for a mission of the highest importance. Your unique experience as ${aOrAn(profession)} ${profession} makes you the only candidate who can succeed." The coordinates pointed to the edge of known space — where something magnificent and terrifying was waiting.`,
    knight:
      `The messenger arrived at dawn on a horse that shimmered like moonlight. The sealed scroll bore the Royal Crest and contained just three lines: "${firstName}, the realm calls upon you. A darkness threatens the kingdom that no ordinary knight can face. We need someone extraordinary — we need you." Signed by the Queen herself.`,
    detective:
      `The letter was simple, elegant, and completely impossible. It described a mystery that had baffled every investigator in the city — a case so twisted that conventional methods had failed entirely. "Dear ${firstName}," it read, "only someone with your particular brilliance can crack this. The first clue is hidden in this very letter." ${firstName} held it up to the light and gasped.`,
    superhero:
      `It started with a strange tingling sensation during an otherwise ordinary day. Then ${firstName}'s coffee mug lifted off the desk — by itself. The news was already reporting unexplained events across the city, and a voice echoed in ${firstName}'s mind: "You've been chosen. The powers you're about to discover have been dormant your whole life, waiting for exactly this moment."`,
    viking:
      `The rune-carved message washed ashore at ${firstName}'s feet, wrapped in seaweed and mystery. Ancient Norse symbols formed a map to lands beyond the edge of every chart. The Elders gathered and spoke in hushed tones: "The saga foretold this day. Only one among us has the spirit to sail where no Viking has gone. ${firstName}, your longship awaits."`,
    'fairy-tale':
      `The talking owl arrived precisely at teatime, carrying a golden envelope sealed with stardust. Inside was an invitation written in shimmering ink: "Dear ${firstName}, the Enchanted Realm requests your presence for a quest of the most magical nature. You have been chosen by the Great Story itself — because it knows a true hero when it sees one."`,
  };
  return calls[universe.id] || `A mysterious invitation arrived, addressed to ${firstName} by name. It spoke of an adventure that only someone truly special could undertake.`;
}

function universeCrossingTitle(universe: HeroUniverse): string {
  const crossings: Record<string, string> = {
    'space-captain': 'Launch Sequence Initiated',
    knight: 'Beyond the Castle Gates',
    detective: 'Into the Fog',
    superhero: 'First Flight',
    viking: 'Setting Sail',
    'fairy-tale': 'Through the Enchanted Door',
  };
  return crossings[universe.id] || 'Into the Unknown';
}

function universeThresholdScene(name: string, universe: HeroUniverse): string {
  const scenes: Record<string, string> = {
    'space-captain': `The engines roared to life, and the stars blurred into streaks of light as ${name}'s ship punched through the atmosphere. Below, the Earth grew small. Above, infinity beckoned.`,
    knight: `The castle gates groaned open, revealing a road that wound through an ancient forest where the trees seemed to whisper encouragement. Ahead, mountains touched the clouds.`,
    detective: `The fog parted like a curtain as ${name} stepped onto the cobblestone street. Every shadow held a secret, and every corner promised a clue. The city's heart beat with mystery.`,
    superhero: `${name}'s feet left the ground — tentatively at first, then soaring, higher and higher, until the entire city spread out below like a glittering map of possibility.`,
    viking: `The longship's dragon prow cut through the waves as the shoreline disappeared behind a veil of mist. The open ocean stretched endlessly, wild and full of promise.`,
    'fairy-tale': `The enchanted door opened onto a world of impossible beauty: rivers of liquid starlight, trees with leaves of crystal, and flowers that hummed melodies.`,
  };
  return scenes[universe.id] || `The world transformed around ${name}, revealing wonders beyond imagination.`;
}

function universePortal(universe: HeroUniverse): string {
  const portals: Record<string, string> = {
    'space-captain': 'a shimmering launch portal into deep space',
    knight: 'massive castle gates into an enchanted realm',
    detective: 'a foggy mysterious doorway into the unknown city',
    superhero: 'a burst of energy launching into the sky above the city',
    viking: 'the bow of a mighty longship sailing into uncharted waters',
    'fairy-tale': 'a glowing magical doorway surrounded by enchanted flowers',
  };
  return portals[universe.id] || 'a portal to an extraordinary new world';
}

function universeDefaultGuide(universe: HeroUniverse): string {
  const guides: Record<string, string> = {
    'space-captain': 'Commander Lyra',
    knight: 'the old forest sage',
    detective: 'Inspector Chen',
    superhero: 'the veteran hero Guardian',
    viking: 'the star-reader Astrid',
    'fairy-tale': 'a mischievous fairy guide',
  };
  return guides[universe.id] || 'a mysterious mentor';
}

function universeGuideText(name: string, firstName: string, universe: HeroUniverse, guide: string, profession: string): string {
  const scenes: Record<string, string> = {
    'space-captain':
      `${firstName} was still marveling at the nebula outside the viewport when ${guide} appeared on the bridge. "I've studied your file, Captain," ${guide} said with a knowing smile. "A ${profession}. Unconventional choice for a space captain, but then again, the best captains always are." ${guide} extended a hand. "I'll be your navigator. Together, we're going to do something incredible."`,
    knight:
      `${guide} stepped out from behind an ancient oak tree as if appearing from the very wood itself. "So you're the one," ${guide} said, looking ${firstName} up and down. "${cap(aOrAn(profession))} ${profession} turned knight? I've seen stranger things — but not many." A grin spread across ${guide}'s face. "I'll teach you what you need to know. The rest, I suspect, you already carry inside."`,
    detective:
      `${guide} was waiting at a corner table in the dimly lit cafe, nursing a coffee and a stack of case files. "Took you long enough," ${guide} said without looking up. "I've been following your work, ${firstName}. ${cap(aOrAn(profession))} ${profession} with that kind of eye for detail? Exactly what this case needs." ${guide} slid a folder across the table. "Read this. Then we talk."`,
    superhero:
      `${guide} landed on the rooftop in a gust of wind, cape billowing dramatically. "Rough landing earlier," ${guide} noted, nodding at the dent in a ventilation unit. "${firstName}, right? ${cap(aOrAn(profession))} ${profession} with world-saving potential." ${guide} offered a hand up. "I've been where you are. Let me help you figure out what you can really do."`,
    viking:
      `${guide} was standing at the ship's prow, reading the stars like an open book. "You have the sea in your blood, ${firstName}," ${guide} said matter-of-factly. "I can tell from the way you stand on the deck — not fighting the waves, but moving with them." ${guide} pointed to the horizon. "What lies ahead will test every fiber of who you are. But I'll be right beside you."`,
    'fairy-tale':
      `${guide} appeared in a shower of sparkling dust, hovering at eye level with iridescent wings. "Well, well, well! ${firstName}! I've been expecting you!" ${guide} clapped tiny hands together. "The Great Story chose wisely this time. ${cap(aOrAn(profession))} ${profession} with a heart of gold? That's exactly the kind of hero we need around here."`,
  };
  return scenes[universe.id] || `${firstName} met ${guide}, who would become the most important ally in this adventure.`;
}

function universeSetting(universe: HeroUniverse): string {
  const settings: Record<string, string> = {
    'space-captain': 'the galaxy',
    knight: 'the kingdom',
    detective: 'the city',
    superhero: 'the city',
    viking: 'the northern seas',
    'fairy-tale': 'the enchanted realm',
  };
  return settings[universe.id] || 'this extraordinary world';
}

function universeTrainingTitle(universe: HeroUniverse): string {
  const titles: Record<string, string> = {
    'space-captain': 'Navigation Training',
    knight: 'Sword and Shield',
    detective: 'Reading the Evidence',
    superhero: 'Power Control 101',
    viking: 'The Ways of the Sea',
    'fairy-tale': 'Lessons in Magic',
  };
  return titles[universe.id] || 'Learning the Way';
}

function universeTrainingText(name: string, firstName: string, universe: HeroUniverse, profession: string): string {
  const training: Record<string, string> = {
    'space-captain': `${firstName} trained in zero-gravity combat, stellar navigation, and interspecies diplomacy. The skills from being ${aOrAn(profession)} ${profession} translated surprisingly well — problem-solving under pressure, thinking on your feet, reading a room.`,
    knight: `${firstName} trained with sword and shield from dawn to dusk. The clang of metal and the thud of boots on the training ground became a familiar rhythm. Being ${aOrAn(profession)} ${profession} had built a discipline that the sword masters noticed immediately.`,
    detective: `${firstName} studied the art of deduction, forensic analysis, and the subtle language of lies. Every detail mattered — a footprint's depth, a fiber's origin, the way a suspect's eyes moved. Years as ${aOrAn(profession)} ${profession} had sharpened exactly the right instincts.`,
    superhero: `${firstName} learned to control the new abilities — starting small with floating pencils and working up to redirecting rivers. Being ${aOrAn(profession)} ${profession} meant understanding systems and patterns, which turned out to be the key to mastering these powers.`,
    viking: `${firstName} learned to read the stars, predict storms, and command a crew with the kind of quiet authority that earns respect. The sea doesn't care about titles — only competence. And ${firstName}'s background as ${aOrAn(profession)} ${profession} brought exactly that.`,
    'fairy-tale': `${firstName} learned the three rules of magic: speak truthfully, act kindly, and never underestimate a talking mushroom. The enchanted realm ran on different logic than the everyday world, but ${firstName}'s experience as ${aOrAn(profession)} ${profession} provided a surprising edge.`,
  };
  return training[universe.id] || `${firstName} threw everything into learning the ways of this new world.`;
}

function universeTrainingScene(universe: HeroUniverse): string {
  const scenes: Record<string, string> = {
    'space-captain': 'zero gravity training room, holographic star charts',
    knight: 'medieval training grounds, sword practice',
    detective: 'studying clues at a desk covered in evidence',
    superhero: 'practicing new powers in a training facility',
    viking: 'navigating by stars on a longship deck',
    'fairy-tale': 'practicing magic spells in an enchanted grove',
  };
  return scenes[universe.id] || 'training montage, learning new skills';
}

function universeFirstVictoryText(name: string, firstName: string, universe: HeroUniverse): string {
  const victories: Record<string, string> = {
    'space-captain': `When the ship's navigation system went haywire near the Serpent Nebula, it was ${firstName} who spotted the pattern in the chaos and manually guided the vessel to safety. Not with brute force, but with the kind of creative thinking that can't be taught in any academy.`,
    knight: `The first skirmish came at the Bridge of Echoes, where shadow creatures blocked the path. ${firstName} didn't just fight — ${firstName} outmaneuvered them, using the bridge's own echoes to confuse the enemy. It was unorthodox, brilliant, and completely ${firstName}.`,
    detective: `${firstName} cracked the first cipher in the case — the one that had stumped everyone for months — by approaching it from a completely unexpected angle. The solution was so elegant that even seasoned investigators applauded.`,
    superhero: `The first real test came when a building's structure began to fail during a storm. ${firstName} didn't just use raw power — ${firstName} used structural knowledge and precision, saving everyone inside without bringing down a single additional wall.`,
    viking: `When a rival ship challenged them to a contest of seamanship through treacherous waters, ${firstName} navigated a route no one else had dared, reading the currents and the wind like poetry. The rival captain could only shake their head in admiration.`,
    'fairy-tale': `The Riddle Gate posed three questions that no one had answered in a hundred years. ${firstName} didn't just solve them — ${firstName} made the gate itself laugh, which turned out to be the real answer all along.`,
  };
  return victories[universe.id] || `${firstName} faced the first real challenge and overcame it in a way nobody expected.`;
}

function hobbyIntegrationText(name: string, firstName: string, universe: HeroUniverse, hobbies: string, profession: string): string {
  if (!hobbies) {
    return `${firstName}'s years as ${aOrAn(profession)} ${profession} had built a unique way of looking at problems. Where others saw dead ends, ${firstName} saw possibilities. And in the world of the ${universe.name.toLowerCase()}, that perspective was worth more than any magic or technology. Sometimes the most powerful weapons aren't swords or spells — they're the things that make you uniquely you.`;
  }
  const firstHobby = hobbies.split(',')[0].trim().toLowerCase();
  return `What made ${firstName} truly extraordinary wasn't just courage — it was the unexpected skills that came along for the ride. When the challenge seemed impossible, ${firstName} did something nobody expected: applied the principles of ${firstHobby} to solve it. "You'd be amazed," ${firstName} explained to the baffled onlookers, "how much ${firstHobby} teaches you about patience, precision, and seeing patterns others miss." The solution worked perfectly, and from that day on, everyone in ${universeSetting(universe)} had a newfound respect for ${firstHobby}. Sometimes the most powerful weapons aren't swords or spells — they're the things that make you uniquely you.`;
}

function teamBondingText(name: string, firstName: string, universe: HeroUniverse, teammates: string, guide: string, favoritePlace: string): string {
  if (teammates) {
    const teamList = teammates.split(',').map((t) => t.trim()).filter(Boolean);
    const teamStr = teamList.length > 1
      ? `${teamList.slice(0, -1).join(', ')} and ${teamList[teamList.length - 1]}`
      : teamList[0];
    return `That evening, ${firstName} gathered with ${teamStr} around ${universeCampfire(universe)}. Stories were shared, laughter echoed into the night, and bonds were forged that would outlast any adventure. ${firstName} told them about ${favoritePlace ? favoritePlace.toLowerCase() : 'home'}, and in return heard tales that made the world feel both bigger and more intimate. "We're not just a team," ${firstName} said quietly. "We're family now."`;
  }
  return `${firstName} discovered that heroism isn't a solo act. Along the way, unexpected friendships bloomed — with ${guide} and kindred spirits who saw in ${firstName} the same qualities that had started this whole adventure. Over ${universeCampfire(universe)}, they shared stories of ${favoritePlace ? favoritePlace.toLowerCase() : 'the places they called home'}, and ${firstName} realized that the greatest treasure wasn't at the end of the quest — it was the people met along the way.`;
}

function universeCampfire(universe: HeroUniverse): string {
  const campfires: Record<string, string> = {
    'space-captain': 'the observation deck, with stars wheeling outside the viewport',
    knight: 'a crackling campfire beneath ancient trees',
    detective: 'a dimly lit corner booth in a jazz-filled cafe',
    superhero: 'the rooftop of the tallest building, city lights below',
    viking: 'a roaring fire on a beach, with the aurora overhead',
    'fairy-tale': 'a circle of glowing mushrooms in the heart of the enchanted forest',
  };
  return campfires[universe.id] || 'a warm gathering place';
}

function universeTwistText(name: string, firstName: string, universe: HeroUniverse): string {
  const twists: Record<string, string> = {
    'space-captain': `The ship's AI revealed a hidden truth: the distress signal wasn't what it seemed. What they'd thought was a rescue mission was actually a test — and the real danger was something far bigger, heading straight for Earth.`,
    knight: `The darkness wasn't coming from outside the kingdom — it was coming from within. A trusted ally had been working against them all along, and the realm's defenses had been compromised from the start.`,
    detective: `The evidence ${firstName} had so carefully assembled pointed in a direction nobody wanted to accept. The case wasn't about what happened — it was about why, and the answer challenged everything ${firstName} believed about justice.`,
    superhero: `A new force appeared that could neutralize ${firstName}'s powers entirely. For the first time since gaining abilities, ${firstName} was back to being ordinary — and the city needed saving more than ever.`,
    viking: `A storm unlike any in living memory drove the ship off course, into waters where the maps showed only the word "unknown." The crew looked to ${firstName}, but ${firstName} was looking at something on the horizon that defied explanation.`,
    'fairy-tale': `The enchantment that held the realm together began to unravel. Colors faded, music went silent, and one by one, the magical creatures began to disappear. The Great Story itself was in danger of ending forever.`,
  };
  return twists[universe.id] || `Everything ${firstName} had assumed about this adventure turned out to be only half the story.`;
}

function rallyText(name: string, firstName: string, universe: HeroUniverse, teammates: string, guide: string, occasion: HeroOccasion): string {
  const allies = teammates
    ? `${guide} and every friend ${firstName} had made along the way`
    : 'every ally and friend gathered along the journey';
  return `${firstName} stood before ${allies} and spoke from the heart. Not a rehearsed speech, but real words from a real person who'd been through something extraordinary. "I'm not the strongest or the fastest," ${firstName} said. "I'm an ordinary person who said yes to something impossible. And right now, I'm asking you to say yes too. Not because we can't fail — but because what we're fighting for is worth every risk." The silence that followed wasn't uncertainty. It was the sound of courage being born.`;
}

function universePlanText(name: string, firstName: string, universe: HeroUniverse, profession: string): string {
  const plans: Record<string, string> = {
    'space-captain': `Using knowledge from both stellar physics and ${profession.toLowerCase()}, ${firstName} designed a maneuver that shouldn't have been possible. By routing the ship through a temporal fold while broadcasting on a frequency that mimicked a neutron star, they could reach the objective undetected.`,
    knight: `${firstName} proposed using the kingdom's ancient tunnel network — forgotten by everyone except the old historians. "We don't meet the darkness head-on," ${firstName} explained. "We go where it isn't looking, and we bring the light to its heart."`,
    detective: `${firstName} laid out the evidence like a chess board and showed how every piece connected to every other. "We don't chase the culprit," ${firstName} said. "We make the culprit come to us." It was an elegant trap built on pure logic and psychology.`,
    superhero: `"Powers aren't everything," ${firstName} told the team. "I've been without mine, and I know now that what makes us heroes isn't what we can do — it's what we choose to do." The plan relied on teamwork, timing, and an intimate understanding of the city's infrastructure.`,
    viking: `${firstName} combined ancient Norse navigation techniques with an insight so simple it was genius. "The old sagas aren't just stories," ${firstName} declared. "They're instructions. And I finally understand what they've been trying to tell us."`,
    'fairy-tale': `"Stories have power," ${firstName} said, eyes bright with discovery. "The Great Story chose me for a reason — not because I'm the strongest, but because I understand that every character matters. Every voice. Every choice." The plan was to do something no hero had ever tried: rewrite the story from the inside.`,
  };
  return plans[universe.id] || `${firstName} revealed a plan that combined unconventional thinking with intimate knowledge of how things really work.`;
}

function universePlanProp(universe: HeroUniverse): string {
  const props: Record<string, string> = {
    'space-captain': 'a holographic star map and tactical display',
    knight: 'an ancient map of the kingdom spread on a stone table',
    detective: 'a wall covered in connected evidence and red string',
    superhero: 'a city blueprint projected on a screen',
    viking: 'old Norse rune stones and a hand-drawn chart',
    'fairy-tale': 'a magical floating story book with moving illustrations',
  };
  return props[universe.id] || 'a map and diagrams';
}

function universeFinalBattleTitle(universe: HeroUniverse): string {
  const titles: Record<string, string> = {
    'space-captain': 'Into the Heart of the Storm',
    knight: 'The Battle for the Kingdom',
    detective: 'The Final Confrontation',
    superhero: 'Saving the City',
    viking: 'The Last Voyage',
    'fairy-tale': 'Rewriting the Story',
  };
  return titles[universe.id] || 'The Final Challenge';
}

function universeFinalBattleStartText(name: string, firstName: string, universe: HeroUniverse): string {
  const starts: Record<string, string> = {
    'space-captain': `The ship plunged into the anomaly, hull groaning under forces that defied physics. Alarms screamed, lights flickered, but ${firstName}'s hands were steady on the controls.`,
    knight: `The ground shook as ${firstName} charged forward, armor gleaming in the light of a hundred torches. The clash of steel and courage rang through the valley.`,
    detective: `${firstName} walked into the room where it would all end — calm, collected, and three steps ahead. Every piece of evidence was in place. Every exit was covered.`,
    superhero: `${firstName} flew toward the heart of the crisis, wind howling, the city's fate balanced on a razor's edge. Below, people looked up with hope.`,
    viking: `The longship surged forward through waves as tall as mountains. ${firstName} stood at the prow, facing the tempest with a warrior's grin and a navigator's wisdom.`,
    'fairy-tale': `${firstName} opened the Great Book and began to speak the words that would reshape reality itself. Each syllable carried the weight of everything learned on this journey.`,
  };
  return starts[universe.id] || `${firstName} faced the ultimate challenge with everything on the line.`;
}

function universeElement(universe: HeroUniverse): string {
  const elements: Record<string, string> = {
    'space-captain': 'fabric of space-time',
    knight: 'earth and sky',
    detective: 'truth itself',
    superhero: 'energy of the city',
    viking: 'ocean and wind',
    'fairy-tale': 'magic of the realm',
  };
  return elements[universe.id] || 'forces of nature';
}

function universeFinalSetting(universe: HeroUniverse): string {
  const settings: Record<string, string> = {
    'space-captain': 'heart of the cosmic anomaly, swirling nebula',
    knight: 'dark fortress, epic siege battle',
    detective: 'dramatic confrontation room, tension',
    superhero: 'city skyline, dramatic aerial battle',
    viking: 'massive storm at sea, epic waves',
    'fairy-tale': 'crumbling enchanted castle, magical energy everywhere',
  };
  return settings[universe.id] || 'dramatic final confrontation setting';
}

function universeClimaxText(name: string, firstName: string, universe: HeroUniverse, superpower: string): string {
  const climaxes: Record<string, string> = {
    'space-captain': `${firstName} navigated the ship through the impossible — threading a course between collapsing dimensions with the precision of a surgeon and the instinct of a poet. ${superpower ? `${cap(superpower.toLowerCase())} burned like a star in ${firstName}'s heart.` : 'Every calculation, every instinct, every lesson led to this.'}`,
    knight: `${firstName} stood alone before the source of the darkness and raised the sword — not as a weapon, but as a beacon. Light exploded outward, not from the blade, but from ${firstName}'s own unshakeable belief that good would prevail.`,
    detective: `${firstName} spoke the truth — all of it, every connection, every hidden motive, every carefully concealed lie — and watched as it dismantled the web of deception piece by piece. The truth, it turned out, was the most powerful weapon of all.`,
    superhero: `Powers or no powers, ${firstName} leapt into the impossible. ${superpower ? `And then, at the moment of greatest need, ${superpower.toLowerCase()} surged back stronger than ever — because it was never about the powers. It was about the person.` : 'And in that moment of pure courage, something awakened — because heroism was never about superpowers. It was about the will to protect what matters.'}`,
    viking: `${firstName} steered the longship into the heart of the maelstrom with a cry that echoed across the ages. It was the sound of a human being who refused to be defeated by any sea, any storm, any force of nature or legend.`,
    'fairy-tale': `${firstName} spoke the new ending — not with magic words or ancient spells, but with truth. Pure, honest, heartfelt truth about what really matters. And the Great Story listened, because it recognized the voice of a true hero.`,
  };
  return climaxes[universe.id] || `${firstName} gave everything in a moment that would be remembered forever.`;
}

function occasionCelebrationTitle(occasion: HeroOccasion): string {
  const celebrations: Record<string, string> = {
    birthday: 'The Greatest Birthday Party Ever',
    promotion: 'A Well-Earned Honor',
    retirement: 'A Toast to a Legend',
    farewell: 'Until We Meet Again',
    graduation: 'The Ceremony of Champions',
    anniversary: 'Celebrating the Journey',
    'just-because': 'The Party Nobody Expected',
  };
  return celebrations[occasion.id] || 'The Celebration';
}

function occasionCelebrationText(
  name: string,
  firstName: string,
  universe: HeroUniverse,
  occasion: HeroOccasion,
  profession: string,
  guide: string,
  teammates: string,
  favoritePlace: string,
): string {
  const organizer = teammates
    ? `${guide} and the whole team`
    : 'Friends and allies from across the journey';
  const base = `${organizer} organized the most spectacular celebration ${universeSetting(universe)} had ever seen.`;

  const occasionTexts: Record<string, string> = {
    birthday: `${base} It was, after all, ${firstName}'s birthday — and what better birthday present than saving ${universeSetting(universe)} and discovering that you're exactly the hero the universe needed? The cake was enormous, the cheers were deafening, and ${firstName} blew out the candles with a wish that had already come true.`,
    promotion: `${base} ${firstName}'s journey from ${profession} to legendary hero was the greatest promotion in history. A new title was bestowed, but ${firstName} knew the real advancement was inside — the growth, the courage, the unshakeable knowledge that greatness isn't given. It's earned.`,
    retirement: `${base} They called it a retirement party, but everyone knew that someone like ${firstName} never truly retires. This was a celebration of a lifetime of extraordinary — as a ${profession}, as a friend, and now as a legend of ${universeSetting(universe)}.`,
    farewell: `${base} This wasn't goodbye — it was a celebration of everything ${firstName} had been and everything ${firstName} was about to become. "I'm not leaving," ${firstName} said with a smile. "I'm just starting the next chapter."`,
    graduation: `${base} ${firstName} had graduated from more than any academy could teach. This was a graduation from doubt, from limitation, from the small voice that whispers "you can't." ${firstName} had proven, once and for all, that the answer is always "watch me."`,
    anniversary: `${base} This milestone deserved a celebration as extraordinary as ${firstName} — because every year, every experience, every triumph and challenge had built the remarkable person standing here today.`,
    'just-because': `${base} "Why are we celebrating?" someone asked. ${firstName} laughed. "Because we can. Because we made it. Because sometimes the best reason to celebrate is just being alive and surrounded by incredible people."`,
  };
  return occasionTexts[occasion.id] || `${base} It was a celebration worthy of a true hero.`;
}

function universeCelebrationScene(universe: HeroUniverse): string {
  const scenes: Record<string, string> = {
    'space-captain': 'grand space station banquet hall, holographic fireworks, starfield backdrop',
    knight: 'castle great hall feast, banners and torches, royal celebration',
    detective: 'elegant victory dinner, city lights through tall windows, jazz band',
    superhero: 'city-wide celebration, confetti, crowd cheering, hero on stage',
    viking: 'great mead hall feast, Viking celebration, roaring fires, northern lights',
    'fairy-tale': 'magical fairy tale ball, enchanted castle, floating candles, dancing',
  };
  return scenes[universe.id] || 'grand celebration scene';
}

function dedicationText(name: string, firstName: string, occasion: HeroOccasion, superpower: string): string {
  const occasionLine: Record<string, string> = {
    birthday: `Happy birthday, ${firstName}. May every year bring adventures as extraordinary as you are.`,
    promotion: `Congratulations, ${firstName}. This new chapter is going to be your best one yet.`,
    retirement: `${firstName}, your story is far from over. The best adventures are the ones we choose for ourselves.`,
    farewell: `Wherever you go, ${firstName}, remember: you carry a piece of every person whose life you've touched.`,
    graduation: `Congratulations, ${firstName}. The world is ready for you — but honestly, it's you who made yourself ready for the world.`,
    anniversary: `Here's to you, ${firstName}. Every year with you is an adventure worth celebrating.`,
    'just-because': `${firstName}, you don't need a reason to be celebrated. You're remarkable just as you are.`,
  };

  return (
    `This story was written for one extraordinary person: ${name}. ` +
    `Not because ${firstName} needs to be a fictional hero to be a real one — but because the world should see ` +
    `what was already obvious to everyone who knows ${firstName}: ` +
    `that courage, heart, and ${superpower ? superpower.toLowerCase() : 'an unstoppable spirit'} can change everything. ` +
    `${occasionLine[occasion.id] || `${firstName}, never stop being exactly who you are.`} ` +
    `With love and admiration, from everyone who knows that the real adventure is having you in our lives.`
  );
}
