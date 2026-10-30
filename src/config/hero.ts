/**
 * "Create a Hero" — personalised hero story book.
 *
 * Every universe below is an ORIGINAL setting. Never reference a franchise,
 * studio, trademarked character, name or logo (Marvel, DC, Disney, Pixar,
 * Star Wars, Harry Potter, …) in copy, prompts or generated text.
 *
 * Prices are DISPLAY ONLY (cents). What Paddle charges is the catalog price
 * behind PADDLE_PRICE_HERO_DIGITAL; the owner sets both and they must match.
 */

export type HeroAudience = 'child' | 'adult';

export type HeroOccasion =
  | 'birthday'
  | 'promotion'
  | 'retirement'
  | 'farewell'
  | 'graduation'
  | 'anniversary';

export type HeroUniverseId = 'space-captain' | 'knight' | 'detective' | 'superhero' | 'viking' | 'fairy-tale';

export interface HeroUniverse {
  id: HeroUniverseId;
  name: string;
  tagline: string;
  /** Visual style handed to the illustration model on every page. */
  artStyle: string;
  /** Setting notes handed to the story model. */
  setting: string;
}

export const HERO_UNIVERSES: HeroUniverse[] = [
  {
    id: 'space-captain',
    name: 'Space Captain',
    tagline: 'Commands a starship at the edge of the known galaxy.',
    artStyle: 'cinematic sci-fi storybook illustration, starship bridge, nebula skies, soft rim light',
    setting: 'An original starship crew exploring uncharted planets. Invent all ship, planet and crew names.',
  },
  {
    id: 'knight',
    name: 'Knight of the Realm',
    tagline: 'Defends a kingdom of castles, dragons and quests.',
    artStyle: 'painterly medieval storybook illustration, castles, banners, warm golden light',
    setting: 'An original medieval kingdom with its own invented name, heraldry and friendly dragon.',
  },
  {
    id: 'detective',
    name: 'Master Detective',
    tagline: 'Cracks the case nobody else could.',
    artStyle: 'noir-inspired storybook illustration, rain-lit streets, warm lamplight, gentle film grain',
    setting: 'An original city of mysteries. The case is light-hearted and solved with wit, never violence.',
  },
  {
    id: 'superhero',
    name: 'Superhero',
    tagline: 'Saves the day with a power all of their own.',
    artStyle: 'bold modern comic-style storybook illustration, dynamic poses, vivid colours, original costume with no logos',
    setting: 'An original city with an invented name. The hero has an invented hero name and an original costume with no emblems borrowed from existing heroes.',
  },
  {
    id: 'viking',
    name: 'Viking Voyager',
    tagline: 'Sails icy seas in search of legendary lands.',
    artStyle: 'epic Nordic storybook illustration, longships, fjords, aurora skies',
    setting: 'An original seafaring saga with invented longship and village names. Adventure and friendship, no gore.',
  },
  {
    id: 'fairy-tale',
    name: 'Fairy Tale',
    tagline: 'Wanders an enchanted world of talking animals and magic.',
    artStyle: 'whimsical watercolour fairy-tale illustration, enchanted forest, soft pastel light',
    setting: 'An original enchanted land with invented creatures and places. Do not retell any existing fairy tale.',
  },
];

export const HERO_OCCASIONS: { id: HeroOccasion; label: string }[] = [
  { id: 'birthday', label: 'Birthday' },
  { id: 'promotion', label: 'Promotion' },
  { id: 'retirement', label: 'Retirement' },
  { id: 'farewell', label: 'Farewell' },
  { id: 'graduation', label: 'Graduation' },
  { id: 'anniversary', label: 'Anniversary' },
];

export type HeroAnswerKey =
  | 'name'
  | 'occupation'
  | 'hobbies'
  | 'funnyHabit'
  | 'superpower'
  | 'catchphrase'
  | 'favouritePlace'
  | 'teammates';

export const HERO_QUESTIONS: {
  key: HeroAnswerKey;
  label: string;
  placeholder: string;
  required: boolean;
  maxLength: number;
}[] = [
  { key: 'name', label: "Hero's first name", placeholder: 'e.g. Alex', required: true, maxLength: 40 },
  { key: 'occupation', label: 'Job or favourite school subject', placeholder: 'e.g. Product designer', required: false, maxLength: 80 },
  { key: 'hobbies', label: 'Hobbies', placeholder: 'e.g. Rock climbing, baking sourdough', required: false, maxLength: 160 },
  { key: 'funnyHabit', label: 'A funny habit', placeholder: 'e.g. Names every houseplant', required: false, maxLength: 160 },
  { key: 'superpower', label: 'Their "superpower"', placeholder: 'e.g. Calms any crisis in five minutes', required: false, maxLength: 160 },
  { key: 'catchphrase', label: 'Something they always say', placeholder: 'e.g. "Let\'s give it a go!"', required: false, maxLength: 120 },
  { key: 'favouritePlace', label: 'Favourite place', placeholder: 'e.g. The seaside in Cornwall', required: false, maxLength: 120 },
  { key: 'teammates', label: 'Sidekicks: friends, family or teammates (first names)', placeholder: 'e.g. Sam, Priya, Jordan', required: false, maxLength: 200 },
];

export const HERO_MIN_PHOTOS = 3;
export const HERO_MAX_PHOTOS = 5;
export const HERO_MAX_PHOTO_BYTES = 10 * 1024 * 1024;

/** Uploaded photos are deleted this many days after upload. */
export const HERO_PHOTO_RETENTION_DAYS = 30;

/** Shown next to the photo checkbox and stored verbatim with each book. */
export const HERO_CONSENT_TEXT =
  'I am the person in these photos, or I have their permission to use them for this book. ' +
  `Photos are deleted ${HERO_PHOTO_RETENTION_DAYS} days after upload and are never used to train AI models.`;

export const HERO_MIN_PAGES = 16;
export const HERO_MAX_PAGES = 24;

/** Pages that are illustrated and readable before purchase. */
export const HERO_PREVIEW_PAGES = 3;

/** Display price for the digital book. Must equal the Paddle price. */
export const HERO_DIGITAL_PRICE_CENTS = 1900;

/** Chip-in contributions on a group gift are sold in units of this amount. */
export const HERO_CHIPIN_UNIT_CENTS = 500;
export const HERO_CHIPIN_MAX_UNITS = 10;

/** Max memories a group-gift link accepts, and their length. */
export const HERO_MAX_CONTRIBUTIONS = 60;
export const HERO_MEMORY_MAX_LENGTH = 600;

/**
 * Franchise names that must never reach the story or illustration model.
 * Matching is case-insensitive on whole words. Terms that are also common
 * first names are left out on purpose. This is a guard rail, not the only
 * control: the system prompt also forbids existing characters.
 */
export const HERO_BLOCKED_TERMS = [
  'marvel', 'dc comics', 'disney', 'pixar', 'dreamworks', 'star wars', 'jedi', 'sith', 'darth',
  'harry potter', 'hogwarts', 'spider-man', 'spiderman', 'batman', 'superman', 'wonder woman',
  'iron man', 'captain america', 'hulk', 'avengers', 'x-men', 'wolverine',
  'pokemon', 'pokémon', 'pikachu', 'super mario', 'zelda', 'mickey mouse', 'minnie mouse',
  'barbie', 'star trek', 'starfleet', 'shrek', 'minions', 'paw patrol',
  'peppa pig', 'bluey', 'transformers', 'lord of the rings', 'hobbit', 'gandalf',
];

export function findBlockedTerm(text: string): string | null {
  const lower = text.toLowerCase();
  for (const term of HERO_BLOCKED_TERMS) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (new RegExp(`(^|[^a-z])${escaped}([^a-z]|$)`, 'i').test(lower)) return term;
  }
  return null;
}

export function getHeroUniverse(id: string): HeroUniverse | undefined {
  return HERO_UNIVERSES.find((u) => u.id === id);
}
