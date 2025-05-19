import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';

import { URLS } from '~shared/config/urls';

import { SeasonsMock } from '~mocks/entities/season/Season.mock';

import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

const SEASONS_REQUEST_DEFAULT_PARAMS = {
    page: 1,
    perPage: 12,
};

test('render seasons list', async ({ page, nextContext }) => {
    await nextContext.mockApi.get(
        URLS.season.index,
        {
            data: SeasonsMock,
            count: SeasonsMock.length,
        },
        {
            params: SEASONS_REQUEST_DEFAULT_PARAMS,
        },
    );

    await page.goto('/seasons');

    await expect(
        page.getByRole('link', { name: `Season ${SeasonsMock[0].year}`, exact: true }),
    ).toBeVisible();
});

test('should navigate to season page after season name click', async ({ page, nextContext }) => {
    const season = SeasonsMock[0];

    await nextContext.mockApi.get(
        URLS.season.index,
        {
            data: SeasonsMock,
            count: SeasonsMock.length,
        },
        {
            params: SEASONS_REQUEST_DEFAULT_PARAMS,
        },
    );

    await nextContext.mockApi.get(URLS.season.year(season.year), season);

    await page.goto('/seasons');

    await page.getByRole('link', { name: `Season ${season.year}` }).click();

    await expect(page).toHaveURL(`/seasons/${season.year}`);
});

test('should render breadcrumbs correctly', async ({ page, nextContext }) => {
    await nextContext.mockApi.get(
        URLS.season.index,
        {
            data: [],
            count: 0,
        },
        {
            params: SEASONS_REQUEST_DEFAULT_PARAMS,
        },
    );

    await page.goto('/seasons');

    const breadcrumbHome = page.getByTitle(getBreadcrumbTitle('Home'));
    const breadcrumbSeasons = page.getByTitle(getBreadcrumbTitle('Seasons'));

    await expect(breadcrumbHome).toBeVisible();
    await expect(breadcrumbHome).toHaveAttribute('href', '/');

    await expect(breadcrumbSeasons).toBeVisible();
    await expect(breadcrumbSeasons).toHaveAttribute('href', '/seasons');
});
