import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';

import { SEASON_URLS } from '~entities/season/api';

import { SeasonsMock } from '~mocks/entities/season/Season.mock';

import { setupServer, closeServer } from '~tests-utils/e2e/server/MockFastifyServer';

test.afterEach(async ({ server }) => {
    await closeServer(server);
});

test('render seasons list', async ({ page, server }) => {
    await setupServer(server, {
        url: SEASON_URLS.index,
        method: 'GET',
        handler: function (_, reply) {
            reply.send({
                data: SeasonsMock,
                count: SeasonsMock.length,
            });
        },
    });

    await page.goto('/seasons');

    await expect(
        page.getByRole('link', { name: `Season ${SeasonsMock[0].year}`, exact: true }),
    ).toBeVisible();
});

test('should navigate to season page after season name click', async ({ page, server }) => {
    const season = SeasonsMock[0];

    await setupServer(
        server,
        {
            url: SEASON_URLS.index,
            method: 'GET',
            handler: function (_, reply) {
                reply.send({
                    data: SeasonsMock,
                    count: SeasonsMock.length,
                });
            },
        },
        {
            url: SEASON_URLS.year(season.year),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(season);
            },
        },
    );

    await page.goto('/seasons');

    await page.getByRole('link', { name: `Season ${season.year}` }).click();

    await expect(page).toHaveURL(`/seasons/${season.year}`);
});
