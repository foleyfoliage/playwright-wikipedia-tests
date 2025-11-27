import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'src/tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'list',
  use: {
    baseURL: 'https://www.wikipedia.org',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
  ]
});
