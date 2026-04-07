import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  webServer: {
    command: 'npx astro preview --port 4322',
    port: 4322,
    reuseExistingServer: false,
  },
  use: {
    baseURL: 'http://localhost:4322',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
