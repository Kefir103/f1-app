import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';
import { setupServer, closeServer } from '~tests-utils/e2e/server/MockFastifyServer';

import { URLS } from '~entities/driver/api/urls';

import { DriversMock } from '~mocks/entities/driver/Driver.mock';

test.afterEach(async ({ server }) => {
    await closeServer(server);
});

test('should render driver page', async ({ page, server }) => {
    const driver = DriversMock[0];

    await setupServer(server, {
        url: URLS.ref(driver.ref),
        method: 'GET',
        handler: function (_, reply) {
            reply.send(driver);
        },
    });

    await page.goto(`/drivers/${driver.ref}`);

    await expect(
        page.getByRole('heading', { name: `${driver.first_name} ${driver.last_name}` }),
    ).toBeVisible();
});
