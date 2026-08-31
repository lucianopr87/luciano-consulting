import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run build && npx serve dist -l 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      PUBLIC_GA_ID: 'G-TESTONLY0000',
      PUBLIC_GSC_VERIFICATION: 'test-verification-token',
      PUBLIC_WEB3FORMS_ACCESS_KEY: 'test-access-key',
    },
  },
  projects: [
    { name: 'Desktop Chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Mobile Chromium', use: { ...devices['Pixel 5'] } },
  ],
});
