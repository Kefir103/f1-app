import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';

import { URLS } from '~shared/config/urls';

import { DriversMock } from '~mocks/entities/driver/Driver.mock';

import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

const DRIVERS_REQUEST_DEFAULT_PARAMS = {
    page: 1,
    perPage: 12,
    expand: ['constructor_entity'].join(','),
};

test('render drivers list', async ({ page, nextContext }) => {
    await nextContext.mockApi.get(
        URLS.driver.index,
        {
            data: DriversMock,
            count: DriversMock.length,
        },
        {
            params: DRIVERS_REQUEST_DEFAULT_PARAMS,
        },
    );

    const driver = DriversMock[0];

    await page.goto('/drivers');

    await expect(
        page.getByRole('link', {
            name: `${driver.first_name} ${driver.last_name} (${driver.code})`,
            exact: true,
        }),
    ).toBeVisible();
});

test("should go to driver page after driver's name click", async ({ page, nextContext }) => {
    const driver = DriversMock[0];

    await nextContext.mockApi.get(
        URLS.driver.index,
        {
            data: DriversMock,
            count: DriversMock.length,
        },
        {
            params: DRIVERS_REQUEST_DEFAULT_PARAMS,
        },
    );

    await nextContext.mockApi.get(URLS.driver.ref(driver.ref), driver, {
        params: {
            expand: ['constructor_entity'].join(','),
        },
    });

    await page.goto('/drivers');

    await page
        .getByRole('link', {
            name: `${driver.first_name} ${driver.last_name} (${driver.code})`,
            exact: true,
        })
        .click();

    await expect(page).toHaveURL(`/drivers/${driver.ref}`);
});

test("should go to constructor page after constructor's name click", async ({
    page,
    nextContext,
}) => {
    const driver = DriversMock[0];
    const constructor = driver.constructor_entity;

    await nextContext.mockApi.get(
        URLS.driver.index,
        {
            data: [driver],
            count: DriversMock.length,
        },
        {
            params: DRIVERS_REQUEST_DEFAULT_PARAMS,
        },
    );

    await nextContext.mockApi.get(URLS.constructor.ref(constructor.ref), constructor);

    await page.goto('/drivers');

    await page.getByTitle(`Team: ${constructor.name}`).click();

    await expect(page).toHaveURL(`/constructors/${constructor.ref}`);
});

test('should render breadcrumbs correctly', async ({ page, nextContext }) => {
    await nextContext.mockApi.get(
        URLS.driver.index,
        {
            data: [],
            count: 0,
        },
        {
            params: DRIVERS_REQUEST_DEFAULT_PARAMS,
        },
    );

    await page.goto('/drivers');

    const breadcrumbHome = page.getByTitle(getBreadcrumbTitle('Home'));
    const breadcrumbDrivers = page.getByTitle(getBreadcrumbTitle('Drivers'));

    await expect(breadcrumbHome).toBeVisible();
    await expect(breadcrumbHome).toHaveAttribute('href', '/');

    await expect(breadcrumbDrivers).toBeVisible();
    await expect(breadcrumbDrivers).toHaveAttribute('href', '/drivers');
});
