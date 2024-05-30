import { test as base } from '@playwright/test';
import { FastifyInstance } from 'fastify';

import { createServer } from '~tests-utils/e2e/server/MockFastifyServer';

export const test = base.extend<{
    server: FastifyInstance;
}>({
    server: async ({}, use) => {
        await use(createServer());
    },
});
