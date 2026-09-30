/**
 * Build-time script: Downloads category images from Unsplash
 * and saves them to public/images/categories/ for local serving.
 *
 * Runs automatically before `next build` via the package.json build script.
 * Skips images that already exist locally (for faster rebuilds).
 *
 * All photos are free for commercial use under the Unsplash License.
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import https from 'https';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'public', 'images', 'categories');

// Premium Unsplash photos — each category has a unique, high-impact image
// Every photo uses a completely different subject/model
const CATEGORY_IMAGES = {
  headshots: {
    url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop&crop=face&q=80',
    file: 'headshots.jpg',
  },
  dating: {
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=600&fit=crop&crop=face&q=80',
    file: 'dating.jpg',
  },
  'pet-portraits': {
    url: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?w=800&h=600&fit=crop&crop=entropy&q=80',
    file: 'pet-portraits.jpg',
  },
  'family-portraits': {
    url: 'https://images.unsplash.com/photo-1598887048474-3e0be05bd11f?w=800&h=600&fit=crop&crop=faces&q=80',
    file: 'family-portraits.jpg',
  },
  'ecommerce-product': {
    url: 'https://images.unsplash.com/photo-1611149974482-764b0c2a211a?w=800&h=600&fit=crop&crop=entropy&q=80',
    file: 'ecommerce-product.jpg',
  },
  'linkedin-team': {
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&crop=faces&q=80',
    file: 'linkedin-team.jpg',
  },
  'couple-engagement': {
    url: 'https://images.unsplash.com/photo-1556229868-7b2d4b56b909?w=800&h=600&fit=crop&crop=faces&q=80',
    file: 'couple-engagement.jpg',
  },
  graduation: {
    url: 'https://images.unsplash.com/photo-1618355776464-8666794d2520?w=800&h=600&fit=crop&crop=face&q=80',
    file: 'graduation.jpg',
  },
  'baby-shower': {
    url: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=800&h=600&fit=crop&crop=entropy&q=80',
    file: 'baby-shower.jpg',
  },
  'holiday-cards': {
    url: 'https://images.unsplash.com/photo-1544546491-1ecfecfcc75a?w=800&h=600&fit=crop&crop=faces&q=80',
    file: 'holiday-cards.jpg',
  },
  'real-estate': {
    url: 'https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=800&h=600&fit=crop&crop=entropy&q=80',
    file: 'real-estate.jpg',
  },
};

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const request = (currentUrl, redirects = 0) => {
      if (redirects > 5) return reject(new Error('Too many redirects'));

      https
        .get(currentUrl, (res) => {
          // Follow redirects
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            return request(res.headers.location, redirects + 1);
          }

          if (res.statusCode !== 200) {
            return reject(new Error(`HTTP ${res.statusCode} for ${currentUrl}`));
          }

          const chunks = [];
          res.on('data', (chunk) => chunks.push(chunk));
          res.on('end', () => {
            const buffer = Buffer.concat(chunks);
            writeFileSync(dest, buffer);
            resolve(buffer.length);
          });
          res.on('error', reject);
        })
        .on('error', reject);
    };

    request(url);
  });
}

async function main() {
  console.log('📸 Downloading category images...');
  mkdirSync(OUT_DIR, { recursive: true });

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const [id, img] of Object.entries(CATEGORY_IMAGES)) {
    const dest = path.join(OUT_DIR, img.file);

    if (existsSync(dest)) {
      skipped++;
      continue;
    }

    try {
      const size = await downloadImage(img.url, dest);
      downloaded++;
      console.log(`  ✓ ${id} (${(size / 1024).toFixed(0)} KB)`);
    } catch (err) {
      failed++;
      console.error(`  ✗ ${id}: ${err.message}`);
    }
  }

  console.log(
    `📸 Done: ${downloaded} downloaded, ${skipped} cached, ${failed} failed`
  );

  // Don't fail the build if some images fail — the component has a fallback
  if (failed > 0) {
    console.warn('⚠️  Some images failed to download. The site will use fallback styling for those categories.');
  }
}

main().catch((err) => {
  console.error('Image download script error:', err);
  // Don't fail the build
});
