import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';

import { setupServer, closeServer } from '~tests-utils/e2e/server/MockFastifyServer';

import { RACE_URLS } from '~entities/race/api';
import { SEASON_URLS } from '~entities/season/api';
import { CIRCUITS_URLS } from '~entities/circuit/api';

import { RacesMock } from '~mocks/entities/race/Race.mock';
import { SeasonsMock } from '~mocks/entities/season/Season.mock';

import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

test.afterEach(async ({ server }) => {
    await closeServer(server);
});

test('render races list', async ({ page, server }) => {
    await setupServer(server, {
        url: RACE_URLS.index,
        method: 'GET',
        handler: function (_, reply) {
            reply.send({
                data: RacesMock,
                count: RacesMock.length,
            });
        },
    });

    await page.goto('/races');

    await expect(page.getByRole('link', { name: RacesMock[0].name, exact: true })).toBeVisible();
});

test("should go to race page after race's name click", async ({ page, server }) => {
    const raceMock = RacesMock[0];

    await setupServer(
        server,
        {
            url: RACE_URLS.index,
            method: 'GET',
            handler: function (_, reply) {
                reply.send({
                    data: RacesMock,
                    count: RacesMock.length,
                });
            },
        },
        {
            url: RACE_URLS.id(raceMock.id),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(raceMock);
            },
        },
    );

    await page.goto('/races');

    await page.getByRole('link', { name: raceMock.name, exact: true }).click();

    await expect(page).toHaveURL(`/races/${raceMock.id}`);
});

test('should go to season page after year click', async ({ page, server }) => {
    const seasonMock = { ...SeasonsMock[0] };
    seasonMock.year = RacesMock[0].year;

    await setupServer(
        server,
        {
            url: RACE_URLS.index,
            method: 'GET',
            handler: function (_, reply) {
                reply.send({
                    data: RacesMock,
                    count: RacesMock.length,
                });
            },
        },
        {
            url: SEASON_URLS.year(seasonMock.year),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(seasonMock);
            },
        },
    );

    await page.goto('/races');

    await page.getByTitle(`Year: ${RacesMock[0].year}`).click();

    await expect(page).toHaveURL(`/seasons/${RacesMock[0].year}`);
});

test("should go to circuit page after circuit's name click", async ({ page, server }) => {
    const circuitMock = RacesMock[0].circuit;

    await setupServer(
        server,
        {
            url: RACE_URLS.index,
            method: 'GET',
            handler: function (_, reply) {
                reply.send({
                    data: RacesMock,
                    count: RacesMock.length,
                });
            },
        },
        {
            url: CIRCUITS_URLS.ref(circuitMock.ref),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(circuitMock);
            },
        },
    );

    await page.goto('/races');

    await page.getByTitle(`Circuit: ${circuitMock.name}`).click();

    await expect(page).toHaveURL(`/circuits/${circuitMock.ref}`);
});

test('should render breadcrumbs correctly', async ({ page, server }) => {
    await setupServer(server, {
        url: RACE_URLS.index,
        method: 'GET',
        handler: function(_, reply) {
            reply.send({
                data: [],
                count: 0,
            })
        }
    });

    await page.goto('/races');

    const breadcrumbHome = page.getByTitle(getBreadcrumbTitle('Home'));
    const breadcrumbRaces = page.getByTitle(getBreadcrumbTitle('Races'));

    await expect(breadcrumbHome).toBeVisible();
    await expect(breadcrumbHome).toHaveAttribute('href', '/');

    await expect(breadcrumbRaces).toBeVisible();
    await expect(breadcrumbRaces).toHaveAttribute('href', '/races');
});
