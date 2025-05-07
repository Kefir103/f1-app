import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';
import moment from 'moment';

import { URLS } from '~shared/config/urls';

import { getRaceWinner, RacesMock, RacesResultsMock } from '~mocks/entities/race/Race.mock';
import { SeasonsMock } from '~mocks/entities/season/Season.mock';

import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

const RACE_REQUEST_DEFAULT_PARAMS = {
    expand: ['winner.constructor_entity'].join(','),
};

const getRaceResultsMocks = (raceId: number) => {
    const raceResultsMockFiltered = RacesResultsMock.filter((result) => result.race_id === raceId);

    return {
        data: raceResultsMockFiltered,
        count: raceResultsMockFiltered.length,
    };
};

test('render race page', async ({ page, nextContext }) => {
    const raceMock = structuredClone({
        ...RacesMock[0],
        winner: getRaceWinner(RacesMock[0]),
    });

    await nextContext.mockApi.get(URLS.race.id(raceMock.id), raceMock, {
        params: RACE_REQUEST_DEFAULT_PARAMS,
    });
    await nextContext.mockApi.get(URLS.race.results(raceMock.id), getRaceResultsMocks(raceMock.id));

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

    const winnerLink = page.getByTitle(
        `Winner: ${raceMock.winner?.first_name} ${raceMock.winner?.last_name}`,
    );

    await expect(winnerLink).toBeVisible();
    await expect(winnerLink).toHaveAttribute('href', `/drivers/${raceMock.winner?.ref}`);

    const winnerConstructorLink = page.getByTitle(
        `Winner Constructor: ${raceMock.winner?.constructor_entity?.name}`,
    );

    await expect(winnerConstructorLink).toBeVisible();
    await expect(winnerConstructorLink).toHaveAttribute(
        'href',
        `/constructors/${raceMock.winner?.constructor_entity?.ref}`,
    );
});

test('should go to season page after year click', async ({ page, nextContext }) => {
    const raceMock = structuredClone(RacesMock[0]);
    const seasonMock = { ...SeasonsMock[0], year: raceMock.year };

    await nextContext.mockApi.get(URLS.race.id(raceMock.id), raceMock, {
        params: RACE_REQUEST_DEFAULT_PARAMS,
    });
    await nextContext.mockApi.get(URLS.season.year(raceMock.year), seasonMock);
    await nextContext.mockApi.get(URLS.race.results(raceMock.id), getRaceResultsMocks(raceMock.id));

    await page.goto(`/races/${raceMock.id}`);

    await page.getByTitle(`Season: ${raceMock.year}`).click();

    await expect(page).toHaveURL(`/seasons/${raceMock.year}`);
});

test("should go to circuit page after circuit's name click", async ({ page, nextContext }) => {
    const raceMock = structuredClone(RacesMock[0]);
    const circuitMock = raceMock.circuit;

    await nextContext.mockApi.get(URLS.race.id(raceMock.id), raceMock, {
        params: RACE_REQUEST_DEFAULT_PARAMS,
    });
    await nextContext.mockApi.get(URLS.circuit.ref(circuitMock.ref), circuitMock);
    await nextContext.mockApi.get(URLS.race.results(raceMock.id), getRaceResultsMocks(raceMock.id));

    await page.goto(`/races/${raceMock.id}`);

    await page.getByTitle(`Circuit: ${circuitMock.name}`).click();

    await expect(page).toHaveURL(`/circuits/${circuitMock.ref}`);
});

test('should render breadcrumbs correctly', async ({ page, nextContext }) => {
    const raceMock = structuredClone(RacesMock[0]);

    await nextContext.mockApi.get(URLS.race.id(raceMock.id), raceMock, {
        params: RACE_REQUEST_DEFAULT_PARAMS,
    });
    await nextContext.mockApi.get(URLS.race.results(raceMock.id), getRaceResultsMocks(raceMock.id));

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

test('should render results table', async ({ page, nextContext }) => {
    const raceMock = structuredClone(RacesMock[0]);

    await nextContext.mockApi.get(URLS.race.id(raceMock.id), raceMock, {
        params: RACE_REQUEST_DEFAULT_PARAMS,
    });
    await nextContext.mockApi.get(URLS.race.results(raceMock.id), getRaceResultsMocks(raceMock.id));

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
    nextContext,
    context,
}) => {
    const raceMock = structuredClone(RacesMock[0]);

    const resultsMock = getRaceResultsMocks(raceMock.id);
    const driverMock = resultsMock.data[0].driver;

    await nextContext.mockApi.get(URLS.race.id(raceMock.id), raceMock, {
        params: RACE_REQUEST_DEFAULT_PARAMS,
    });
    await nextContext.mockApi.get(URLS.race.results(raceMock.id), resultsMock);
    await nextContext.mockApi.get(URLS.driver.ref(driverMock.ref), driverMock, {
        params: {
            expand: ['constructor_entity'].join(','),
        },
    });

    await page.goto(`/races/${raceMock.id}`);

    const newPagePromise = context.waitForEvent('page');

    await page.getByTitle(`Driver: ${driverMock.first_name} ${driverMock.last_name}`).click();

    const newPage = await newPagePromise;

    await expect(newPage).toHaveURL(`/drivers/${driverMock.ref}`);
});

test("should open constructor page in new tab after result's table constructor's name click", async ({
    page,
    nextContext,
    context,
}) => {
    const raceMock = structuredClone(RacesMock[0]);

    const resultsMock = getRaceResultsMocks(raceMock.id);
    const constructorMock = resultsMock.data[0].constructor_entity;

    await nextContext.mockApi.get(URLS.race.id(raceMock.id), raceMock, {
        params: RACE_REQUEST_DEFAULT_PARAMS,
    });
    await nextContext.mockApi.get(URLS.race.results(raceMock.id), resultsMock);
    await nextContext.mockApi.get(URLS.constructor.ref(constructorMock.ref), constructorMock);

    await page.goto(`/races/${raceMock.id}`);

    const newPagePromise = context.waitForEvent('page');

    await page.getByTitle(`Constructor: ${constructorMock.name}`, { exact: true }).click();

    const newPage = await newPagePromise;

    await expect(newPage).toHaveURL(`/constructors/${constructorMock.ref}`);
});

test("should open winner driver page after winner driver's name click", async ({
    page,
    nextContext,
    context,
}) => {
    const raceMock = structuredClone({
        ...RacesMock[0],
        winner: getRaceWinner(RacesMock[0]),
    });
    const raceResultsMock = getRaceResultsMocks(raceMock.id);
    const winner = raceMock.winner!;

    await nextContext.mockApi.get(URLS.race.id(raceMock.id), raceMock, {
        params: RACE_REQUEST_DEFAULT_PARAMS,
    });
    await nextContext.mockApi.get(URLS.race.results(raceMock.id), raceResultsMock);
    await nextContext.mockApi.get(URLS.driver.ref(winner.ref), winner, {
        params: {
            expand: ['constructor_entity'].join(','),
        },
    });

    await page.goto(`/races/${raceMock.id}`);

    const newPagePromise = context.waitForEvent('page');

    await page.getByTitle(`Winner: ${winner.first_name} ${winner.last_name}`).click();

    const newPage = await newPagePromise;

    await expect(newPage).toHaveURL(`/drivers/${winner.ref}`);
});

test("should open winner constructor page after winner constructor's name click", async ({
    page,
    nextContext,
    context,
}) => {
    const raceMock = structuredClone({
        ...RacesMock[0],
        winner: getRaceWinner(RacesMock[0]),
    });
    const raceResultsMock = getRaceResultsMocks(raceMock.id);
    const winnerConstructor = raceMock.winner!.constructor_entity;

    await nextContext.mockApi.get(URLS.race.id(raceMock.id), raceMock, {
        params: RACE_REQUEST_DEFAULT_PARAMS,
    });
    await nextContext.mockApi.get(URLS.race.results(raceMock.id), raceResultsMock);
    await nextContext.mockApi.get(URLS.constructor.ref(winnerConstructor.ref), winnerConstructor);

    await page.goto(`/races/${raceMock.id}`);

    const newPagePromise = context.waitForEvent('page');

    await page.getByTitle(`Winner Constructor: ${winnerConstructor.name}`).click();

    const newPage = await newPagePromise;

    await expect(newPage).toHaveURL(`/constructors/${winnerConstructor.ref}`);
});
