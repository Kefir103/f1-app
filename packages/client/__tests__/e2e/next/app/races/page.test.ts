import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';

import { URLS } from '~shared/config/urls';

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

const RACES_REQUEST_DEFAULT_PARAMS = {
    page: 1,
    perPage: 12,
    expand: ['winner.constructor_entity'].join(','),
};

test('render races list', async ({ page, nextContext }) => {
    await nextContext.mockApi.get(
        URLS.race.index,
        {
            data: RacesMock,
            count: RacesMock.length,
        },
        {
            params: RACES_REQUEST_DEFAULT_PARAMS,
        },
    );

    await page.goto('/races');

    await expect(page.getByRole('link', { name: RacesMock[0].name, exact: true })).toBeVisible();
});

test("should go to race page after race's name click", async ({ page, nextContext }) => {
    const raceMock = structuredClone(RacesMock[0]);
    const raceResultsMock = getRaceResultsMocks(raceMock.id);

    await nextContext.mockApi.get(
        URLS.race.index,
        {
            data: RacesMock,
            count: RacesMock.length,
        },
        {
            params: RACES_REQUEST_DEFAULT_PARAMS,
        },
    );

    await nextContext.mockApi.get(URLS.race.id(raceMock.id), raceMock, {
        params: {
            expand: ['winner.constructor_entity'].join(','),
        },
    });
    await nextContext.mockApi.get(URLS.race.results(raceMock.id), raceResultsMock);

    await page.goto('/races');

    await page.getByRole('link', { name: raceMock.name, exact: true }).click();

    await expect(page).toHaveURL(`/races/${raceMock.id}`);
});

test('should go to season page after year click', async ({ page, nextContext }) => {
    const seasonMock = { ...SeasonsMock[0] };
    seasonMock.year = RacesMock[0].year;

    await nextContext.mockApi.get(
        URLS.race.index,
        {
            data: RacesMock,
            count: RacesMock.length,
        },
        {
            params: RACES_REQUEST_DEFAULT_PARAMS,
        },
    );
    await nextContext.mockApi.get(URLS.season.year(seasonMock.year), seasonMock);

    await page.goto('/races');

    await page.getByTitle(`Year: ${RacesMock[0].year}`).click();

    await expect(page).toHaveURL(`/seasons/${RacesMock[0].year}`);
});

test("should go to circuit page after circuit's name click", async ({ page, nextContext }) => {
    const circuitMock = RacesMock[0].circuit;

    await nextContext.mockApi.get(
        URLS.race.index,
        {
            data: RacesMock,
            count: RacesMock.length,
        },
        {
            params: RACES_REQUEST_DEFAULT_PARAMS,
        },
    );

    await nextContext.mockApi.get(URLS.circuit.ref(circuitMock.ref), circuitMock);

    await page.goto('/races');

    await page.getByTitle(`Circuit: ${circuitMock.name}`).click();

    await expect(page).toHaveURL(`/circuits/${circuitMock.ref}`);
});

test('should render breadcrumbs correctly', async ({ page, nextContext }) => {
    await nextContext.mockApi.get(
        URLS.race.index,
        {
            data: [],
            count: 0,
        },
        {
            params: RACES_REQUEST_DEFAULT_PARAMS,
        },
    );

    await page.goto('/races');

    const breadcrumbHome = page.getByTitle(getBreadcrumbTitle('Home'));
    const breadcrumbRaces = page.getByTitle(getBreadcrumbTitle('Races'));

    await expect(breadcrumbHome).toBeVisible();
    await expect(breadcrumbHome).toHaveAttribute('href', '/');

    await expect(breadcrumbRaces).toBeVisible();
    await expect(breadcrumbRaces).toHaveAttribute('href', '/races');
});
