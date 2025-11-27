import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'src/tests',
  fullyParallel: true,
  use: {
    // Headless on CI, headed locally
    headless: !!process.env.CI,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    viewport: { width: 1920, height: 1080 },
    launchOptions: { slowMo: 50 },
  },
  projects: [
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
