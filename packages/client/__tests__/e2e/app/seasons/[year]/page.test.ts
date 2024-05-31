import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';
import { setupServer, closeServer } from '~tests-utils/e2e/server/MockFastifyServer';

import { SEASON_URLS } from '~entities/season/api';
import { CIRCUIT_URLS } from '~entities/circuit/api';

import { SeasonsMock, SeasonsRacesMock } from '~mocks/entities/season/Season.mock';

import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

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

test('should render breadcrumbs correctly', async ({ page, server }) => {
    const seasonMock = SeasonsMock[0];

    await setupServer(server, {
        url: SEASON_URLS.year(seasonMock.year),
        method: 'GET',
        handler: function (_, reply) {
            reply.send(seasonMock);
        },
    });

    await page.goto(`/seasons/${seasonMock.year}`);

    const breadcrumbHome = page.getByTitle(getBreadcrumbTitle('Home'));
    const breadcrumbSeasons = page.getByTitle(getBreadcrumbTitle('Seasons'));
    const breadcrumbSeasonYear = page.getByTitle(getBreadcrumbTitle(String(seasonMock.year)));

    await expect(breadcrumbHome).toBeVisible();
    await expect(breadcrumbHome).toHaveAttribute('href', '/');

    await expect(breadcrumbSeasons).toBeVisible();
    await expect(breadcrumbSeasons).toHaveAttribute('href', '/seasons');

    await expect(breadcrumbSeasonYear).toBeVisible();
    await expect(breadcrumbSeasonYear).toHaveAttribute('href', `/seasons/${seasonMock.year}`);
});

test('should render season races table', async ({ page, server }) => {
    const seasonMock = SeasonsMock[0];
    const seasonRacesMock = SeasonsRacesMock.filter((race) => race.year === seasonMock.year);

    await setupServer(
        server,
        {
            url: SEASON_URLS.year(seasonMock.year),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(seasonMock);
            },
        },
        {
            url: SEASON_URLS.races(seasonMock.year),
            method: 'GET',
            handler: function (_, reply) {
                reply.send({
                    data: seasonRacesMock,
                    count: seasonRacesMock.length,
                });
            },
        },
    );

    await page.goto(`/seasons/${seasonMock.year}`);

    await expect(page.getByRole('columnheader', { name: 'Round' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Season' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Circuit' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Race date' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Wiki' })).toBeVisible();
});

test("should open circuit page after circuit's name click in season races table", async ({
    page,
    server,
    context,
}) => {
    const seasonMock = SeasonsMock[0];
    const seasonRacesMock = SeasonsRacesMock.filter((race) => race.year === seasonMock.year);
    const seasonRaceCircuitMock = seasonRacesMock[0].circuit;

    await setupServer(
        server,
        {
            url: SEASON_URLS.year(seasonMock.year),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(seasonMock);
            },
        },
        {
            url: SEASON_URLS.races(seasonMock.year),
            method: 'GET',
            handler: function (_, reply) {
                reply.send({
                    data: seasonRacesMock,
                    count: seasonRacesMock.length,
                });
            },
        },
        {
            url: CIRCUIT_URLS.ref(seasonRaceCircuitMock.ref),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(seasonRaceCircuitMock);
            },
        },
    );

    await page.goto(`/seasons/${seasonMock.year}`);

    const newPagePromise = context.waitForEvent('page');

    await page.getByRole('link', { name: seasonRaceCircuitMock.name }).click();

    const newPage = await newPagePromise;

    await expect(newPage).toHaveURL(`/circuits/${seasonRaceCircuitMock.ref}`);
});
