import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';
import moment from 'moment';

import { setupServer, closeServer } from '~tests-utils/e2e/server/MockFastifyServer';

import { RACE_URLS } from '~entities/race/api';
import { SEASON_URLS } from '~entities/season/api';
import { CIRCUITS_URLS } from '~entities/circuit/api';

import { RacesMock } from '~mocks/entities/race/Race.mock';
import { SeasonsMock } from '~mocks/entities/season/Season.mock';

test.afterEach(async ({ server }) => {
    await closeServer(server);
});

test('render race page', async ({ page, server }) => {
    const raceMock = RacesMock[0];

    await setupServer(server, {
        url: RACE_URLS.id(raceMock.id),
        method: 'GET',
        handler: function (_, reply) {
            reply.send(raceMock);
        },
    });

    await page.goto(`/races/${raceMock.id}`);

    await expect(page.getByRole('heading', { name: raceMock.name })).toBeVisible();

    const circuit = page.getByTitle(`Circuit: ${raceMock.circuit.name}`);

    await expect(circuit).toBeVisible();
    await expect(circuit).toHaveAttribute('href', `/circuits/${raceMock.circuit.ref}`);

    const season = page.getByTitle(`Season: ${raceMock.year}`);

    await expect(season).toBeVisible();
    await expect(season).toHaveAttribute('href', `/seasons/${raceMock.year}`);

    await expect(page.getByText(`Round: ${raceMock.round}`)).toBeVisible();

    await expect(
        page.getByText(`Race date: ${moment(raceMock.date).format('DD.MM.YYYY')}`),
    ).toBeVisible();

    await expect(page.getByRole('link', { name: 'Wiki' })).toBeVisible();

    await expect(
        page.getByText(`FP1 Date: ${moment(raceMock.fp1_date).format('DD.MM.YYYY')}`),
    ).toBeVisible();
    await expect(
        page.getByText(`FP2 Date: ${moment(raceMock.fp2_date).format('DD.MM.YYYY')}`),
    ).toBeVisible();
    await expect(
        page.getByText(`FP3 Date: ${moment(raceMock.fp3_date).format('DD.MM.YYYY')}`),
    ).toBeVisible();

    await expect(
        page.getByText(`Qualifying date: ${moment(raceMock.qualifying_date).format('DD.MM.YYYY')}`),
    ).toBeVisible();

    await expect(
        page.getByText(`Sprint date: ${moment(raceMock.sprint_date).format('DD.MM.YYYY')}`),
    ).toBeVisible();
});

test('should go to season page after year click', async ({ page, server }) => {
    const raceMock = RacesMock[0];
    const seasonMock = { ...SeasonsMock[0], year: raceMock.year };

    await setupServer(
        server,
        {
            url: RACE_URLS.id(raceMock.id),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(raceMock);
            },
        },
        {
            url: SEASON_URLS.year(raceMock.year),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(seasonMock);
            },
        },
    );

    await page.goto(`/races/${raceMock.id}`);

    await page.getByTitle(`Season: ${raceMock.year}`).click();

    await expect(page).toHaveURL(`/seasons/${raceMock.year}`);
});

test("should go to circuit page after circuit's name click", async ({ page, server }) => {
    const raceMock = RacesMock[0];
    const circuitMock = raceMock.circuit;

    await setupServer(
        server,
        {
            url: RACE_URLS.id(raceMock.id),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(raceMock);
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

    await page.goto(`/races/${raceMock.id}`);

    await page.getByTitle(`Circuit: ${circuitMock.name}`).click();

    await expect(page).toHaveURL(`/circuits/${circuitMock.ref}`);
});
