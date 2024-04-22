import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';
import { setupServer, closeServer } from '~tests-utils/e2e/server/MockFastifyServer';

import { URLS } from '~entities/driver/api/urls';

import { DriversMock } from '~mocks/entities/driver/Driver.mock';

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
