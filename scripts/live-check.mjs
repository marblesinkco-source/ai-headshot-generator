// Live-site smoke check, run by .github/workflows/live-check.yml.
import { createRequire } from 'node:module';
const require = createRequire(process.env.NODE_PATH + '/');
const { chromium } = require('playwright');

const BASE = (process.env.BASE || 'https://www.tailorpic.com').replace(/\/$/, '');
const PAGES = [
  '/', '/pricing', '/headshots', '/about', '/blog', '/faq', '/team-headshots',
  '/pricing-comparison', '/auth/login', '/auth/register', '/dashboard',
  '/this-page-does-not-exist-check',
];

const browser = await chromium.launch();
const out = ['## Live check: ' + BASE, ''];

const health = await fetch(BASE + '/api/health').then(async (r) => `${r.status} ${await r.text()}`).catch((e) => 'ERROR ' + e.message);
out.push('**/api/health:** `' + health + '`', '');
out.push('| Page | HTTP | Final URL | Console errors | Page errors | Failed requests |', '|---|---|---|---|---|---|');

const details = [];
for (const path of PAGES) {
  const page = await browser.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failed = [];
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text().slice(0, 300)));
  page.on('pageerror', (e) => pageErrors.push(String(e.message).slice(0, 300)));
  page.on('requestfailed', (r) => failed.push(`${r.failure()?.errorText} ${r.url().slice(0, 150)}`));
  page.on('response', (r) => r.status() >= 400 && failed.push(`${r.status()} ${r.url().slice(0, 150)}`));
  let status = 'ERR';
  try {
    const res = await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 45000 });
    status = res ? res.status() : 'none';
    await page.waitForTimeout(2000);
  } catch (e) {
    pageErrors.push('navigation: ' + e.message.slice(0, 200));
  }
  const finalUrl = page.url().replace(BASE, '') || '/';
  out.push(`| ${path} | ${status} | ${finalUrl} | ${consoleErrors.length} | ${pageErrors.length} | ${failed.length} |`);
  if (consoleErrors.length || pageErrors.length || failed.length) {
    details.push(`### ${path}`, ...consoleErrors.map((t) => '- console: ' + t), ...pageErrors.map((t) => '- pageerror: ' + t), ...failed.map((t) => '- request: ' + t), '');
  }
  await page.close();
}
await browser.close();
console.log([...out, '', ...details].join('\n'));
