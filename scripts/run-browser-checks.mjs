// Optional browser regression checks. Playwright is not an application dependency.
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import journey from './browser-journey.mjs';
import recovery from './browser-recovery.mjs';
import access from './browser-access.mjs';

await mkdir('.cache/browser', { recursive: true });
await mkdir('.cache', { recursive: true });
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'msedge' });
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  const warnings = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
    if (message.type() === 'warning') warnings.push(message.text());
  });
  const desktop = await journey(page);
  const recovered = await recovery(page);
  await page.setViewportSize({ width: 390, height: 844 });
  // Keep mobile evidence alongside desktop figures.
  await page.route('**/*', route => route.continue());
  const originalScreenshot = page.screenshot.bind(page);
  page.screenshot = options => originalScreenshot({
    ...options, path: options.path.replace('browser/', 'browser/mobile-'),
  });
  const mobile = await journey(page);
  page.screenshot = originalScreenshot;
  await page.unroute('**/*');
  const accessibility = await access(page);
  await page.goto('http://127.0.0.1:4173/shop');
  await page.waitForTimeout(650);
  await page.screenshot({ path: '.cache/browser/desktop-shop-viewport.png' });
  await page.locator('.product-card').first().screenshot({ path: '.cache/browser/card-comparison.png' });
  const results = {
    date: new Date().toISOString(), target: 'http://127.0.0.1:4173',
    build: 'Vite production preview', desktop, recovery: recovered, mobile,
    accessibility, console: { errors, warnings },
  };
  const count = desktop.length + recovered.length + mobile.length + accessibility.results.length;
  await writeFile('.cache/browser-summary.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify({ assertions: count, pass: count, errors, warnings, browser: accessibility.browser }, null, 2));
  if (errors.length || warnings.length) process.exitCode = 1;
} finally { await browser.close(); }
