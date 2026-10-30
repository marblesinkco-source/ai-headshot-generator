/**
 * Create a Hero — Storybook Configuration
 * Universes, questions, occasions, and story generation settings.
 */

/* ------------------------------------------------------------------ */
/*  Universe definitions                                               */
/* ------------------------------------------------------------------ */

export interface HeroUniverse {
  id: string;
  name: string;
  description: string;
  icon: string;
  /** Scene keywords for flux-pulid illustration prompts */
  sceneKeywords: string;
  /** Color theme for the wizard UI */
  color: string;
  /** Example chapter titles for preview */
  sampleChapters: string[];
}

export const HERO_UNIVERSES: HeroUniverse[] = [
  {
    id: 'space-captain',
    name: 'Space Captain',
    description: 'Command a starship across galaxies, discover alien worlds, and save the cosmos.',
    icon: '🚀',
    sceneKeywords: 'sci-fi spaceship bridge, nebula backdrop, futuristic uniform, holographic displays, deep space',
    color: 'from-indigo-600 to-blue-900',
    sampleChapters: ['The Launch', 'Through the Asteroid Belt', 'First Contact', 'The Nebula Crisis'],
  },
  {
    id: 'knight',
    name: 'Knight of the Realm',
    description: 'Wield a legendary sword, defend the kingdom, and embark on a noble quest.',
    icon: '⚔️',
    sceneKeywords: 'medieval castle, knight in shining armor, dragon, enchanted forest, throne room, stone walls',
    color: 'from-amber-600 to-yellow-800',
    sampleChapters: ['The Squire\'s Oath', 'The Dragon\'s Lair', 'The Siege', 'Knighted at Dawn'],
  },
  {
    id: 'detective',
    name: 'Master Detective',
    description: 'Solve impossible cases, chase clues through foggy streets, and unmask the villain.',
    icon: '🔍',
    sceneKeywords: 'noir detective office, foggy city streets, magnifying glass, trench coat, dimly lit alley, mystery',
    color: 'from-tp-muted to-tp-black',
    sampleChapters: ['The Missing Letter', 'Shadows on Baker Street', 'The Final Clue', 'Case Closed'],
  },
  {
    id: 'superhero',
    name: 'Superhero',
    description: 'Discover incredible powers, build a secret identity, and protect the city.',
    icon: '💪',
    sceneKeywords: 'superhero cape flying, city skyline, dramatic pose on rooftop, energy blast, original costume design',
    color: 'from-red-600 to-orange-700',
    sampleChapters: ['The Awakening', 'First Flight', 'The Nemesis Arrives', 'Saving the City'],
  },
  {
    id: 'viking',
    name: 'Viking Explorer',
    description: 'Set sail on longships, discover new lands, and earn your place in legend.',
    icon: '🛡️',
    sceneKeywords: 'viking longship, Norse fjord, misty mountains, wooden shield, adventure, runic symbols, northern lights',
    color: 'from-teal-700 to-emerald-900',
    sampleChapters: ['Setting Sail', 'The Storm', 'Land of Ice and Fire', 'The Feast of Heroes'],
  },
  {
    id: 'fairy-tale',
    name: 'Fairy Tale',
    description: 'Enter an enchanted world of magic, talking animals, and happily-ever-afters.',
    icon: '✨',
    sceneKeywords: 'enchanted forest, fairy tale castle, magical creatures, glowing mushrooms, whimsical, storybook illustration',
    color: 'from-purple-500 to-pink-600',
    sampleChapters: ['Once Upon a Time', 'The Enchanted Garden', 'The Wise Old Owl', 'Happily Ever After'],
  },
];

/* ------------------------------------------------------------------ */
/*  Occasion (gift reason)                                             */
/* ------------------------------------------------------------------ */

export interface HeroOccasion {
  id: string;
  name: string;
  icon: string;
  /** Story tone/angle hint for generation */
  toneHint: string;
}

export const HERO_OCCASIONS: HeroOccasion[] = [
  { id: 'birthday', name: 'Birthday', icon: '🎂', toneHint: 'celebratory, fun, adventurous' },
  { id: 'promotion', name: 'Promotion', icon: '🎯', toneHint: 'empowering, achievement-focused, inspirational' },
  { id: 'retirement', name: 'Retirement', icon: '🌅', toneHint: 'reflective, honoring a legacy, grateful' },
  { id: 'farewell', name: 'Farewell / Going Away', icon: '👋', toneHint: 'heartfelt, celebrating memories, hopeful' },
  { id: 'graduation', name: 'Graduation', icon: '🎓', toneHint: 'proud, forward-looking, inspirational' },
  { id: 'anniversary', name: 'Anniversary', icon: '💫', toneHint: 'warm, nostalgic, celebratory' },
  { id: 'just-because', name: 'Just Because', icon: '🎁', toneHint: 'fun, lighthearted, surprising' },
];

/* ------------------------------------------------------------------ */
/*  Hero profile questions                                             */
/* ------------------------------------------------------------------ */

export interface HeroQuestion {
  id: string;
  label: string;
  placeholder: string;
  /** 'text' = single line, 'textarea' = multi-line, 'select' = dropdown */
  type: 'text' | 'textarea' | 'select';
  required: boolean;
  maxLength?: number;
  /** For select type */
  options?: string[];
}

export const HERO_QUESTIONS: HeroQuestion[] = [
  {
    id: 'name',
    label: 'Hero\'s Name',
    placeholder: 'e.g. Sarah, Uncle Joe, Mom',
    type: 'text',
    required: true,
    maxLength: 100,
  },
  {
    id: 'profession',
    label: 'What do they do?',
    placeholder: 'e.g. Software engineer, teacher, retired nurse',
    type: 'text',
    required: false,
    maxLength: 200,
  },
  {
    id: 'hobbies',
    label: 'Hobbies & Interests',
    placeholder: 'e.g. Cooking Italian food, hiking, chess, gardening',
    type: 'textarea',
    required: false,
    maxLength: 500,
  },
  {
    id: 'quirk',
    label: 'Funny Habit or Quirk',
    placeholder: 'e.g. Always loses their keys, talks to plants, collects rubber ducks',
    type: 'text',
    required: false,
    maxLength: 300,
  },
  {
    id: 'superpower',
    label: 'If they had a superpower, it would be...',
    placeholder: 'e.g. Making everyone laugh, fixing anything, remembering every birthday',
    type: 'text',
    required: false,
    maxLength: 300,
  },
  {
    id: 'catchphrase',
    label: 'Something they always say',
    placeholder: 'e.g. "That\'s what I\'m talking about!", "Back in my day..."',
    type: 'text',
    required: false,
    maxLength: 300,
  },
  {
    id: 'favorite_place',
    label: 'Their favorite place',
    placeholder: 'e.g. The beach, grandma\'s kitchen, their garden, the office coffee machine',
    type: 'text',
    required: false,
    maxLength: 200,
  },
  {
    id: 'teammates',
    label: 'Sidekicks & Companions',
    placeholder: 'e.g. Their dog Max, best friend Lisa, the whole accounting team',
    type: 'textarea',
    required: false,
    maxLength: 500,
  },
];

/* ------------------------------------------------------------------ */
/*  Story generation settings                                          */
/* ------------------------------------------------------------------ */

export const STORY_CONFIG = {
  /** Pages in a standard storybook */
  minPages: 16,
  maxPages: 24,
  defaultPages: 20,

  /** Free preview pages before payment */
  freePreviewPages: 3,

  /** Photo upload */
  minPhotos: 3,
  maxPhotos: 5,

  /** Image generation */
  imageWidth: 1024,
  imageHeight: 768,
  imageSteps: 20,
  guidanceScale: 4.0,
  idWeight: 0.7,

  /** Photo retention */
  photoRetentionDays: 30,
} as const;

/* ------------------------------------------------------------------ */
/*  Types for story data                                               */
/* ------------------------------------------------------------------ */

export interface StoryPage {
  pageNumber: number;
  title: string;
  text: string;
  /** Scene description for flux-pulid prompt */
  scenePrompt: string;
  /** Generated illustration URL (null until generated) */
  illustrationUrl: string | null;
}

export interface StoryData {
  heroName: string;
  universeId: string;
  occasionId: string;
  /** Answers from hero profile questions */
  profile: Record<string, string>;
  pages: StoryPage[];
  coverTitle: string;
  coverSubtitle: string;
  dedication: string;
}

export type StoryStatus =
  | 'draft'          // wizard in progress
  | 'generating'     // AI generating text + images
  | 'preview'        // 3 pages ready, awaiting payment
  | 'paid'           // payment received, full generation
  | 'completed'      // all pages generated
  | 'failed';        // generation error

export interface HeroProfile {
  name: string;
  profession?: string;
  hobbies?: string;
  quirk?: string;
  superpower?: string;
  catchphrase?: string;
  favorite_place?: string;
  teammates?: string;
}
