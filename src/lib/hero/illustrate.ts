import { getHeroUniverse, type HeroAudience } from '@/config/hero';
import { HERO_PAGE_BUCKET, HERO_PHOTO_BUCKET, heroDb, type HeroBookRow } from './db';

/**
 * Face-preserving page illustrations with PuLID-Flux on Replicate (the same
 * model as /api/ai/instant-preview). The version is resolved once per
 * instance from the model's latest version, so community-model predictions
 * use the documented `version` field.
 */
const PULID_MODEL = 'bytedance/flux-pulid';
let cachedVersion: string | null = process.env.HERO_PULID_VERSION || null;

async function resolveVersion(token: string): Promise<string> {
  if (cachedVersion) return cachedVersion;
  const res = await fetch(`https://api.replicate.com/v1/models/${PULID_MODEL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Replicate model lookup failed: ${res.status}`);
  const model = (await res.json()) as { latest_version?: { id?: string } };
  if (!model.latest_version?.id) throw new Error('Replicate model has no version');
  cachedVersion = model.latest_version.id;
  return cachedVersion;
}

function buildPrompt(book: HeroBookRow, scene: string): string {
  const universe = getHeroUniverse(book.universe);
  const age = (book.audience as HeroAudience) === 'child' ? 'a child' : 'an adult';
  return [
    `Storybook page illustration of ${age} as the hero.`,
    scene.replace(/\bthe hero\b/gi, 'this person'),
    universe?.artStyle ?? 'storybook illustration',
    'full scene, expressive, family friendly, no text, no letters, no logos, no watermark',
  ].join(', ');
}

/** Pick a reference photo per page so the book uses all uploaded angles. */
function referencePath(book: HeroBookRow, pageIndex: number): string {
  if (book.photo_paths.length === 0) throw new Error('Photos are no longer available for this book');
  return book.photo_paths[pageIndex % book.photo_paths.length];
}

type Prediction = { id: string; status: string; output?: unknown; error?: string };

async function setPage(bookId: string, pageIndex: number, image: string | null, prediction: string | null) {
  const { error } = await heroDb().rpc('hero_set_page', {
    p_book: bookId,
    p_page: String(pageIndex),
    p_image: image,
    p_prediction: prediction,
  });
  if (error) throw new Error(`Could not save page state: ${error.message}`);
}

/**
 * Advances one page illustration. A started prediction is stored on the book
 * and polled on later calls, so a slow run or a retry never pays twice.
 * Returns true once the page image is stored in the private hero-pages bucket.
 */
export async function illustratePage(book: HeroBookRow, pageIndex: number): Promise<boolean> {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) throw new Error('REPLICATE_API_TOKEN is not configured');
  const page = book.story?.pages[pageIndex];
  if (!page) throw new Error('Page does not exist');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  let prediction: Prediction;
  const pendingId = book.page_predictions?.[String(pageIndex)];
  if (pendingId) {
    const res = await fetch(`https://api.replicate.com/v1/predictions/${encodeURIComponent(pendingId)}`, { headers });
    if (!res.ok) throw new Error(`Replicate status check failed: ${res.status}`);
    prediction = (await res.json()) as Prediction;
  } else {
    const { data: signed } = await heroDb()
      .storage.from(HERO_PHOTO_BUCKET)
      .createSignedUrl(referencePath(book, pageIndex), 600);
    if (!signed?.signedUrl) throw new Error('Could not read the reference photo');
    const version = await resolveVersion(token);
    const res = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: { ...headers, Prefer: 'wait=30' },
      body: JSON.stringify({
        version,
        input: {
          main_face_image: signed.signedUrl,
          prompt: buildPrompt(book, page.scene),
          negative_prompt: 'text, letters, words, watermark, logo, signature, deformed, extra limbs',
          num_steps: 20,
          guidance_scale: 4,
          id_weight: 0.8,
          width: 1024,
          height: 1024,
          num_outputs: 1,
          output_format: 'jpg',
        },
      }),
    });
    if (!res.ok) throw new Error(`Replicate prediction failed: ${res.status}`);
    prediction = (await res.json()) as Prediction;
    await setPage(book.id, pageIndex, null, prediction.id);
  }

  if (prediction.status === 'failed' || prediction.status === 'canceled') {
    await setPage(book.id, pageIndex, null, null);
    throw new Error(prediction.error || `Illustration ${prediction.status}`);
  }
  if (prediction.status !== 'succeeded') return false;

  const url = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
  if (typeof url !== 'string') throw new Error('Illustration has no output');

  // Replicate output URLs expire after an hour, so keep our own copy.
  const img = await fetch(url);
  if (!img.ok) throw new Error('Could not download the illustration');
  const path = `${book.id}/page-${pageIndex}.jpg`;
  const { error } = await heroDb()
    .storage.from(HERO_PAGE_BUCKET)
    .upload(path, Buffer.from(await img.arrayBuffer()), { contentType: 'image/jpeg', upsert: true });
  if (error) throw new Error(`Could not store the illustration: ${error.message}`);
  await setPage(book.id, pageIndex, path, null);
  return true;
}

/** Short-lived signed URLs for the pages a viewer may see. */
export async function signedPageUrls(book: HeroBookRow, upTo: number): Promise<Record<string, string>> {
  const entries = Object.entries(book.page_images).filter(([idx]) => Number(idx) < upTo);
  if (entries.length === 0) return {};
  const { data } = await heroDb()
    .storage.from(HERO_PAGE_BUCKET)
    .createSignedUrls(entries.map(([, p]) => p), 60 * 60);
  const out: Record<string, string> = {};
  entries.forEach(([idx], i) => {
    const u = data?.[i]?.signedUrl;
    if (u) out[idx] = u;
  });
  return out;
}
