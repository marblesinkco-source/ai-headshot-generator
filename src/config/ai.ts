export const BACKGROUNDS = [
  { id: 'studio_white', name: 'Studio White', prompt: 'clean white studio background with soft lighting' },
  { id: 'studio_gray', name: 'Studio Gray', prompt: 'neutral gray studio background with professional lighting' },
  { id: 'office', name: 'Modern Office', prompt: 'modern office background with blurred bookshelves and warm lighting' },
  { id: 'outdoor_park', name: 'Outdoor Park', prompt: 'soft-focus outdoor park background with natural green foliage and warm sunlight' },
  { id: 'gradient_blue', name: 'Gradient Blue', prompt: 'smooth blue gradient background transitioning from navy to light blue' },
  { id: 'gradient_purple', name: 'Gradient Purple', prompt: 'smooth purple gradient background transitioning from deep violet to lavender' },
  { id: 'brick_wall', name: 'Brick Wall', prompt: 'exposed brick wall background with warm ambient lighting' },
  { id: 'cityscape', name: 'Cityscape', prompt: 'blurred city skyline background at golden hour' },
  { id: 'abstract_dark', name: 'Abstract Dark', prompt: 'dark abstract artistic background with subtle texture' },
  { id: 'bookshelf', name: 'Bookshelf', prompt: 'warm bookshelf background with soft depth-of-field blur' },
  { id: 'conference_room', name: 'Conference Room', prompt: 'professional conference room background with glass and modern furniture' },
  { id: 'nature_green', name: 'Nature Green', prompt: 'lush green nature background with soft bokeh and natural light' },
  { id: 'minimalist_beige', name: 'Minimalist Beige', prompt: 'clean minimalist beige background with subtle warm tones' },
  { id: 'window_light', name: 'Window Light', prompt: 'bright window light background with soft natural illumination' },
  { id: 'gradient_warm', name: 'Gradient Warm', prompt: 'warm gradient background from soft amber to cream' },
] as const;

export const STYLES = [
  { id: 'business_formal', name: 'Business Formal', prompt: 'wearing a professional business suit with a confident and approachable expression' },
  { id: 'smart_casual', name: 'Smart Casual', prompt: 'wearing smart casual attire with a relaxed and friendly demeanor' },
  { id: 'creative', name: 'Creative', prompt: 'wearing creative and expressive attire with a dynamic and engaging expression' },
  { id: 'minimal', name: 'Minimal', prompt: 'wearing simple clean clothing with a calm and composed expression' },
  { id: 'executive', name: 'Executive', prompt: 'wearing premium executive attire with a powerful and authoritative presence' },
  { id: 'tech_startup', name: 'Tech Startup', prompt: 'wearing modern tech-industry casual with an innovative and approachable look' },
  { id: 'academic', name: 'Academic', prompt: 'wearing academic attire with a thoughtful and scholarly expression' },
  { id: 'real_estate', name: 'Real Estate', prompt: 'wearing polished professional attire with a warm and trustworthy smile' },
  { id: 'healthcare', name: 'Healthcare', prompt: 'wearing professional medical or healthcare attire with a compassionate expression' },
  { id: 'legal', name: 'Legal', prompt: 'wearing formal legal attire with a confident and composed demeanor' },
  { id: 'finance', name: 'Finance', prompt: 'wearing a tailored pinstripe suit with a sharp and decisive expression' },
] as const;

export type BackgroundId = (typeof BACKGROUNDS)[number]['id'];
export type StyleId = (typeof STYLES)[number]['id'];

export const BASE_PROMPT_TEMPLATE = `A professional headshot portrait photograph of a person. {style_prompt}. Set against a {background_prompt}. The photograph should have sharp focus on the face, professional studio-quality lighting, and a natural skin tone. Shot with an 85mm lens at f/2.8 for a flattering perspective and pleasant background blur.`;

/**
 * Quality settings tuned for Flux-dev model:
 * - guidance_scale: 3.0-3.5 optimal (Flux-dev uses flow matching, not classifier-free guidance)
 * - max resolution: ~1440px on longest side (model limit)
 * - steps: 28-35 is optimal for Flux-dev (diminishing returns beyond 35)
 *
 * NOTE: Flux-dev does NOT support negative prompts — they are ignored by the model.
 */
export const QUALITY_SETTINGS: Record<string, { width: number; height: number; steps: number; guidanceScale: number }> = {
  standard: {
    width: 768,
    height: 1024,
    steps: 28,
    guidanceScale: 3.5,
  },
  hd: {
    width: 1024,
    height: 1344,
    steps: 30,
    guidanceScale: 3.5,
  },
  '4k': {
    width: 1088,
    height: 1440,
    steps: 35,
    guidanceScale: 3.5,
  },
};

/**
 * @deprecated Flux-dev does not support negative prompts. Kept for API compatibility
 * but should NOT be passed to prediction input. Will be removed in a future update.
 */
export const NEGATIVE_PROMPT =
  'deformed, distorted, disfigured, poorly drawn face, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, mutated hands, extra fingers, blurry, low quality, watermark, text, logo, cartoon, 3d render, anime, illustration';

export function buildGenerationPrompt(styleId: StyleId, backgroundId: BackgroundId): string {
  const style = STYLES.find((s) => s.id === styleId);
  const background = BACKGROUNDS.find((b) => b.id === backgroundId);

  if (!style || !background) {
    throw new Error(`Invalid style "${styleId}" or background "${backgroundId}"`);
  }

  return BASE_PROMPT_TEMPLATE.replace('{style_prompt}', style.prompt).replace('{background_prompt}', background.prompt);
}
