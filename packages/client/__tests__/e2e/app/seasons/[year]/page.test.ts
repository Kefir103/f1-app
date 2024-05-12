import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';

import { SEASON_URLS } from '~entities/season/api';

import { SeasonsMock } from '~mocks/entities/season/Season.mock';

import { setupServer, closeServer } from '~tests-utils/e2e/server/MockFastifyServer';

test.afterEach(async ({ server }) => {
    await closeServer(server);
});

test('should renders correctly', async ({ page, server }) => {
    const seasonMock = SeasonsMock[0];

    await setupServer(server, {
        url: SEASON_URLS.year(seasonMock.year),
        method: 'GET',
        handler: function (_, reply) {
            reply.send(seasonMock);
        },
    });

    await page.goto(`/seasons/${seasonMock.year}`);

    await expect(
        page.getByRole('heading', { name: `Season ${seasonMock.year}`, exact: true }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Wiki', exact: true })).toBeVisible();
});
