#!/usr/bin/env npx tsx
/**
 * TailorPic — AI Visual Asset Generator
 * ======================================
 * Generates all marketing visuals for the website using Replicate Flux-dev.
 * Run via GitHub Actions workflow (generate-visuals.yml) or locally with:
 *
 *   REPLICATE_API_TOKEN=xxx npx tsx scripts/generate-site-visuals.ts
 *
 * Options:
 *   --category <name>   Generate only visuals in a specific category
 *   --id <id>           Generate a single visual by ID
 *   --dry-run           Print what would be generated without calling API
 *   --concurrency <n>   Max concurrent API calls (default: 3)
 *   --output-dir <dir>  Override output directory (default: public/images/generated)
 */

import Replicate from 'replicate';
import * as fs from 'fs';
import * as path from 'path';
import { BACKGROUNDS, STYLES, BASE_PROMPT_TEMPLATE, QUALITY_SETTINGS } from '../src/config/ai';
import { VISUAL_MANIFEST, type VisualSpec, type VisualCategory, TOTAL_VISUALS } from '../src/config/visual-manifest';

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const FLUX_MODEL = 'black-forest-labs/flux-dev' as const;
const MAX_RETRIES = 2;
const POLL_INTERVAL_MS = 5000;
const DEFAULT_CONCURRENCY = 3;

/* ------------------------------------------------------------------ */
/*  CLI args                                                           */
/* ------------------------------------------------------------------ */

const args = process.argv.slice(2);

function getArg(name: string): string | undefined {
  const idx = args.indexOf(`--${name}`);
  return idx >= 0 && idx + 1 < args.length ? args[idx + 1] : undefined;
}

const isDryRun = args.includes('--dry-run');
const filterCategory = getArg('category') as VisualCategory | undefined;
const filterId = getArg('id');
const concurrency = parseInt(getArg('concurrency') || `${DEFAULT_CONCURRENCY}`, 10);
const outputDir = getArg('output-dir') || path.resolve(__dirname, '..', 'public', 'images', 'generated');

/* ------------------------------------------------------------------ */
/*  Prompt builder                                                     */
/* ------------------------------------------------------------------ */

function buildPrompt(spec: VisualSpec): string {
  const style = STYLES.find((s) => s.id === spec.styleId);
  const background = BACKGROUNDS.find((b) => b.id === spec.backgroundId);

  if (!style || !background) {
    throw new Error(`Invalid style "${spec.styleId}" or background "${spec.backgroundId}"`);
  }

  const { gender, ageRange, ethnicity, details } = spec.subject;

  // Build a detailed subject description
  const ageMap: Record<string, string> = {
    young: 'in their late 20s',
    mid: 'in their late 30s',
    mature: 'in their early 50s',
  };

  const subjectDesc = [
    `a ${ethnicity.replace('-', ' ')} ${gender}`,
    ageMap[ageRange],
    details,
  ]
    .filter(Boolean)
    .join(', ');

  // Use the base template but replace "a person" with our specific subject
  let prompt = BASE_PROMPT_TEMPLATE
    .replace('{style_prompt}', style.prompt)
    .replace('{background_prompt}', background.prompt)
    .replace('a person', subjectDesc);

  // For before/after "before" images, make them look more casual/amateur
  if (spec.id.startsWith('before-')) {
    prompt = `A casual selfie photograph of ${subjectDesc}. Natural ambient indoor lighting, slightly off-center composition, smartphone camera perspective. The photo looks like a regular everyday photo, not professionally shot. Warm natural tones.`;
  }

  // For wide/landscape images (blog covers, OG), adjust framing
  if (spec.width > spec.height) {
    prompt += ' Framed as a landscape composition with the subject positioned to one side, allowing negative space for text overlay.';
  }

  return prompt;
}

/* ------------------------------------------------------------------ */
/*  Replicate API                                                      */
/* ------------------------------------------------------------------ */

async function generateImage(
  replicate: Replicate,
  spec: VisualSpec,
  attempt: number = 0,
): Promise<Buffer | null> {
  const prompt = buildPrompt(spec);

  console.log(`  🎨 [${spec.id}] Generating (${spec.width}x${spec.height})...`);
  if (isDryRun) {
    console.log(`     Prompt: ${prompt.slice(0, 120)}...`);
    return null;
  }

  try {
    // Determine quality settings based on dimensions
    const quality =
      spec.width >= 1088 || spec.height >= 1440
        ? QUALITY_SETTINGS['4k']
        : spec.width >= 1024 || spec.height >= 1344
          ? QUALITY_SETTINGS.hd
          : QUALITY_SETTINGS.standard;

    const prediction = await replicate.predictions.create({
      model: FLUX_MODEL,
      input: {
        prompt,
        width: spec.width,
        height: spec.height,
        num_inference_steps: quality.steps,
        guidance_scale: quality.guidanceScale,
        num_outputs: 1,
      },
    });

    // Poll for completion
    let result = prediction;
    while (result.status !== 'succeeded' && result.status !== 'failed' && result.status !== 'canceled') {
      await sleep(POLL_INTERVAL_MS);
      result = await replicate.predictions.get(result.id);
    }

    if (result.status !== 'succeeded') {
      throw new Error(`Prediction ${result.id} ${result.status}: ${result.error || 'unknown error'}`);
    }

    // Download the generated image
    const outputUrl = Array.isArray(result.output) ? result.output[0] : result.output;
    if (!outputUrl || typeof outputUrl !== 'string') {
      throw new Error(`No output URL for prediction ${result.id}`);
    }

    const response = await fetch(outputUrl);
    if (!response.ok) {
      throw new Error(`Failed to download image: HTTP ${response.status}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    console.log(`  ✅ [${spec.id}] Generated (${(buffer.length / 1024).toFixed(0)} KB)`);
    return buffer;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error(`  ❌ [${spec.id}] Attempt ${attempt + 1} failed: ${errMsg}`);

    if (attempt < MAX_RETRIES) {
      console.log(`  🔄 [${spec.id}] Retrying...`);
      await sleep(2000 * (attempt + 1));
      return generateImage(replicate, spec, attempt + 1);
    }

    return null;
  }
}

/* ------------------------------------------------------------------ */
/*  File I/O                                                           */
/* ------------------------------------------------------------------ */

function ensureDir(filePath: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function saveImage(buffer: Buffer, relativePath: string): string {
  const fullPath = path.join(outputDir, relativePath);
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, buffer);
  return fullPath;
}

/* ------------------------------------------------------------------ */
/*  Concurrency control                                                */
/* ------------------------------------------------------------------ */

async function runWithConcurrency<T>(
  tasks: Array<() => Promise<T>>,
  maxConcurrent: number,
): Promise<T[]> {
  const results: T[] = [];
  const executing = new Set<Promise<void>>();

  for (const task of tasks) {
    const p = task().then((result) => {
      results.push(result);
    });
    const e = p.then(() => executing.delete(e));
    executing.add(e);

    if (executing.size >= maxConcurrent) {
      await Promise.race(executing);
    }
  }

  await Promise.all(executing);
  return results;
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║  TailorPic — AI Visual Asset Generator                ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log();

  // Filter visuals based on CLI args
  let visuals = VISUAL_MANIFEST;
  if (filterId) {
    visuals = visuals.filter((v) => v.id === filterId);
    if (visuals.length === 0) {
      console.error(`No visual found with ID "${filterId}"`);
      process.exit(1);
    }
  } else if (filterCategory) {
    visuals = visuals.filter((v) => v.category === filterCategory);
    if (visuals.length === 0) {
      console.error(`No visuals found for category "${filterCategory}"`);
      process.exit(1);
    }
  }

  // Skip already-generated visuals (unless re-generating by ID)
  if (!filterId) {
    const existing = visuals.filter((v) => {
      const fullPath = path.join(outputDir, v.outputPath);
      return fs.existsSync(fullPath);
    });
    if (existing.length > 0) {
      console.log(`⏭  Skipping ${existing.length} already-generated visuals`);
      visuals = visuals.filter((v) => {
        const fullPath = path.join(outputDir, v.outputPath);
        return !fs.existsSync(fullPath);
      });
    }
  }

  console.log(`📋 Generating ${visuals.length}/${TOTAL_VISUALS} visuals`);
  console.log(`   Output: ${outputDir}`);
  console.log(`   Concurrency: ${concurrency}`);
  console.log(`   Dry run: ${isDryRun}`);
  console.log();

  if (visuals.length === 0) {
    console.log('✅ All visuals already generated!');
    return;
  }

  if (isDryRun) {
    // Print all prompts and exit
    for (const spec of visuals) {
      console.log(`[${spec.id}] ${spec.category} → ${spec.outputPath}`);
      console.log(`  Style: ${spec.styleId}, Background: ${spec.backgroundId}`);
      console.log(`  Subject: ${spec.subject.gender} ${spec.subject.ethnicity} ${spec.subject.ageRange}`);
      console.log(`  Size: ${spec.width}x${spec.height}`);
      console.log(`  Prompt: ${buildPrompt(spec)}`);
      console.log();
    }
    console.log(`Dry run complete. ${visuals.length} images would be generated.`);
    return;
  }

  // Initialize Replicate client
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    console.error('❌ REPLICATE_API_TOKEN environment variable required');
    process.exit(1);
  }

  const replicate = new Replicate({ auth: token });

  // Generate images with controlled concurrency
  let successCount = 0;
  let failCount = 0;

  const tasks = visuals.map((spec) => async () => {
    const buffer = await generateImage(replicate, spec);
    if (buffer) {
      const saved = saveImage(buffer, spec.outputPath);
      console.log(`  💾 Saved: ${saved}`);
      successCount++;
    } else {
      failCount++;
    }
  });

  const startTime = Date.now();
  await runWithConcurrency(tasks, concurrency);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log();
  console.log('════════════════════════════════════════════════════════');
  console.log(`✅ Generated: ${successCount}  ❌ Failed: ${failCount}  ⏱ ${elapsed}s`);
  console.log('════════════════════════════════════════════════════════');

  // Generate a manifest JSON for tracking
  const manifestPath = path.join(outputDir, 'manifest.json');
  const manifestData = {
    generatedAt: new Date().toISOString(),
    model: FLUX_MODEL,
    totalGenerated: successCount,
    totalFailed: failCount,
    elapsedSeconds: parseFloat(elapsed),
    files: visuals
      .filter((v) => fs.existsSync(path.join(outputDir, v.outputPath)))
      .map((v) => ({
        id: v.id,
        category: v.category,
        path: v.outputPath,
        style: v.styleId,
        background: v.backgroundId,
        size: `${v.width}x${v.height}`,
      })),
  };
  ensureDir(manifestPath);
  fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2));
  console.log(`📄 Manifest: ${manifestPath}`);

  if (failCount > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
