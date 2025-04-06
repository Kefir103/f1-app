import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    globalSetup: './global.e2e.setup',
    globalTeardown: './global.e2e.teardown',

    testDir: './__tests__/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
