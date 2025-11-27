import { chromium } from '@playwright/test';
import fs from 'fs';

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to the Wikipedia page
  await page.goto('https://en.wikipedia.org/wiki/Quality_assurance', { waitUntil: 'networkidle' });

  // Wait for main content to load
  const mainContent = await page.locator('#mw-content-text').innerHTML();

  // Optional: Save it to a file
  fs.writeFileSync('quality_assurance_content.html', mainContent);

  console.log('Scraped main content HTML saved to quality_assurance_content.html');

  // Close browser
  await browser.close();
})();
