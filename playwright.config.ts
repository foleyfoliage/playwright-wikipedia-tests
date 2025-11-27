import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'src/tests',
  fullyParallel: true,
  use: {
    // Default: headless in all environments
    headless: process.env.HEADLESS !== 'false', // set HEADLESS=false to run headed
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    viewport: { width: 1920, height: 1080 },
    launchOptions: {
      slowMo: 50,
    },
  },
  projects: [
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // Uncomment to enable more browsers
    // { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
