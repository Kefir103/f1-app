import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';
import moment from 'moment';

import { setupServer, closeServer } from '~tests-utils/e2e/server/MockFastifyServer';

import { RACE_URLS } from '~entities/race/api';
import { SEASON_URLS } from '~entities/season/api';
import { CIRCUIT_URLS } from '~entities/circuit/api';

import { RacesMock, RacesResultsMock } from '~mocks/entities/race/Race.mock';
import { SeasonsMock } from '~mocks/entities/season/Season.mock';

import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

const getRaceResultsMocks = (raceId: number) => {
    const raceResultsMockFiltered = RacesResultsMock.filter((result) => result.race_id === raceId);

    return {
        data: raceResultsMockFiltered,
        count: raceResultsMockFiltered.length,
    };
};

test.afterEach(async ({ server }) => {
    await closeServer(server);
});

test('render race page', async ({ page, server }) => {
    const raceMock = RacesMock[0];

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
            url: RACE_URLS.results(raceMock.id),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(getRaceResultsMocks(raceMock.id));
            },
        },
    );

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
        {
            url: RACE_URLS.results(raceMock.id),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(getRaceResultsMocks(raceMock.id));
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
            url: CIRCUIT_URLS.ref(circuitMock.ref),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(circuitMock);
            },
        },
        {
            url: RACE_URLS.results(raceMock.id),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(getRaceResultsMocks(raceMock.id));
            },
        },
    );

    await page.goto(`/races/${raceMock.id}`);

    await page.getByTitle(`Circuit: ${circuitMock.name}`).click();

    await expect(page).toHaveURL(`/circuits/${circuitMock.ref}`);
});

test('should render breadcrumbs correctly', async ({ page, server }) => {
    const raceMock = RacesMock[0];

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
            url: RACE_URLS.results(raceMock.id),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(getRaceResultsMocks(raceMock.id));
            },
        },
    );

    await page.goto(`/races/${raceMock.id}`);

    const breadcrumbHome = page.getByTitle(getBreadcrumbTitle('Home'));
    const breadcrumbRaces = page.getByTitle(getBreadcrumbTitle('Races'));
    const breadcrumbRaceView = page.getByTitle(getBreadcrumbTitle(raceMock.name));

    await expect(breadcrumbHome).toBeVisible();
    await expect(breadcrumbHome).toHaveAttribute('href', '/');

    await expect(breadcrumbRaces).toBeVisible();
    await expect(breadcrumbRaces).toHaveAttribute('href', '/races');

    await expect(breadcrumbRaceView).toBeVisible();
    await expect(breadcrumbRaceView).toHaveAttribute('href', `/races/${raceMock.id}`);
});

test('should render results table', async ({ page, server }) => {
    const raceMock = RacesMock[0];

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
            url: RACE_URLS.results(raceMock.id),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(getRaceResultsMocks(raceMock.id));
            },
        },
    );

    await page.goto(`/races/${raceMock.id}`);

    await expect(page.getByRole('columnheader', { name: 'Position' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Driver' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Constructor' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Fastest lap time' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Fastest lap rank' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Fastest lap number' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Points' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Laps' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible();
});

test("should open driver page in new tab after result's table driver's name click", async ({
    page,
    server,
    context,
}) => {
    const raceMock = RacesMock[0];

    const resultsMock = getRaceResultsMocks(raceMock.id);
    const driverMock = resultsMock.data[0].driver;

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
            url: RACE_URLS.results(raceMock.id),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(resultsMock);
            },
        },
    );

    await page.goto(`/races/${raceMock.id}`);

    const newPagePromise = context.waitForEvent('page');

    await page
        .getByRole('link', { name: `${driverMock.first_name} ${driverMock.last_name}` })
        .click();

    const newPage = await newPagePromise;

    await expect(newPage).toHaveURL(`/drivers/${driverMock.ref}`);
});

test("should open constructor page in new tab after result's table constructor's name click", async ({
    page,
    server,
    context,
}) => {
    const raceMock = RacesMock[0];

    const resultsMock = getRaceResultsMocks(raceMock.id);
    const constructorMock = resultsMock.data[0].constructor_entity;

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
            url: RACE_URLS.results(raceMock.id),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(resultsMock);
            },
        },
    );

    await page.goto(`/races/${raceMock.id}`);

    const newPagePromise = context.waitForEvent('page');

    await page.getByRole('link', { name: constructorMock.name }).click();

    const newPage = await newPagePromise;

    await expect(newPage).toHaveURL(`/constructors/${constructorMock.ref}`);
});
