import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';

import { URLS } from '~shared/config/urls';

import { SeasonsMock } from '~mocks/entities/season/Season.mock';

import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

test('should renders correctly', async ({ page, nextContext }) => {
    const seasonMock = SeasonsMock[0];

    await nextContext.mockApi.get(URLS.season.year(seasonMock.year), seasonMock);

    await page.goto(`/seasons/${seasonMock.year}`);

    await expect(
        page.getByRole('heading', { name: `Season ${seasonMock.year}`, exact: true }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Wiki', exact: true })).toBeVisible();
});

test('should render breadcrumbs correctly', async ({ page, nextContext }) => {
    const seasonMock = SeasonsMock[0];

    await nextContext.mockApi.get(URLS.season.year(seasonMock.year), seasonMock);

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
