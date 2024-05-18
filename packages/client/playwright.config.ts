import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './__tests__/e2e',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    reporter: 'html',

    use: {
        baseURL: 'http://localhost:3010',

        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],

    webServer: [
        {
            command: 'npm run dev:test',
            url: 'http://localhost:3010',
            reuseExistingServer: !process.env.CI,
        },
    ],
});
