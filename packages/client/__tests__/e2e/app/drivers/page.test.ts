import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';
import { setupServer, closeServer } from '~tests-utils/e2e/server/MockFastifyServer';

import { URLS } from '~entities/driver/api/urls';
import { CONSTRUCTOR_URLS } from '~entities/constructor/api';

import { DriversMock } from '~mocks/entities/driver/Driver.mock';

import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

test.afterEach(async ({ server }) => {
    await closeServer(server);
});

test('render drivers list', async ({ page, server }) => {
    await setupServer(server, {
        url: URLS.index,
        method: 'GET',
        handler: function (_, reply) {
            reply.send({
                data: DriversMock,
                count: DriversMock.length,
            });
        },
    });

    const driver = DriversMock[0];

    await page.goto('/drivers');

    await expect(
        page.getByRole('link', {
            name: `${driver.first_name} ${driver.last_name} (${driver.code})`,
            exact: true,
        }),
    ).toBeVisible();
});

test("should go to driver page after driver's name click", async ({ page, server }) => {
    const driver = DriversMock[0];

    await setupServer(
        server,
        {
            url: URLS.index,
            method: 'GET',
            handler: function (_, reply) {
                reply.send({
                    data: DriversMock,
                    count: DriversMock.length,
                });
            },
        },
        {
            url: URLS.ref(driver.ref),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(driver);
            },
        },
    );

    await page.goto('/drivers');

    await page
        .getByRole('link', {
            name: `${driver.first_name} ${driver.last_name} (${driver.code})`,
            exact: true,
        })
        .click();

    await expect(page).toHaveURL(`/drivers/${driver.ref}`);
});

test("should go to constructor page after constructor's name click", async ({ page, server }) => {
    const driver = DriversMock[0];
    const constructor = driver.constructor_entity;

    await setupServer(
        server,
        {
            url: URLS.index,
            method: 'GET',
            handler: function (_, reply) {
                reply.send({
                    data: [driver],
                    count: DriversMock.length,
                });
            },
        },
        {
            url: CONSTRUCTOR_URLS.ref(constructor.ref),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(constructor);
            },
        },
    );

    await page.goto('/drivers');

    await page.getByTitle(`Team: ${constructor.name}`).click();

    await expect(page).toHaveURL(`/constructors/${constructor.ref}`);
});

test('should render breadcrumbs correctly', async ({ page, server }) => {
    await setupServer(server, {
        url: URLS.index,
        method: 'GET',
        handler: function (_, reply) {
            reply.send({
                data: [],
                count: 0,
            });
        },
    });

    await page.goto('/drivers');

    const breadcrumbHome = page.getByTitle(getBreadcrumbTitle('Home'));
    const breadcrumbDrivers = page.getByTitle(getBreadcrumbTitle('Drivers'));

    await expect(breadcrumbHome).toBeVisible();
    await expect(breadcrumbHome).toHaveAttribute('href', '/');

    await expect(breadcrumbDrivers).toBeVisible();
    await expect(breadcrumbDrivers).toHaveAttribute('href', '/drivers');
});
