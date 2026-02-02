import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup:'./global-setup.ts',
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers:1,
  reporter: 'html',
  use: {
    headless: false,
    storageState:'./Playwright/.auth/auth.json',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

  ],
});
