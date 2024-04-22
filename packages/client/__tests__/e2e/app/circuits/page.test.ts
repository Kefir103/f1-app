import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';
import { setupServer, closeServer } from '~tests-utils/e2e/server/MockFastifyServer';

import { URLS } from '~entities/circuit/api/urls';

import { CircuitsMock } from '~mocks/entities/circuit/Circuit.mock';

test.afterEach(async ({ server }) => {
    await closeServer(server);
});

test('render circuits list', async ({ page, server }) => {
    await setupServer(server, {
        url: URLS.index,
        method: 'GET',
        handler: function (_, reply) {
            reply.send({
                data: CircuitsMock,
                count: CircuitsMock.length,
            });
        },
    });

    await page.goto('/circuits');

    await expect(page.getByRole('link', { name: CircuitsMock[0].name, exact: true })).toBeVisible();
});

test('should open circuit page after link click', async ({ page, server }) => {
    const circuit = CircuitsMock[0];

    await setupServer(
        server,
        {
            url: URLS.index,
            method: 'GET',
            handler: function (_, reply) {
                reply.send({
                    data: CircuitsMock,
                    count: CircuitsMock.length,
                });
            },
        },
        {
            url: URLS.ref(circuit.ref),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(circuit);
            },
        },
    );

    await page.goto('/circuits');

    await page.getByRole('link', { name: circuit.name, exact: true }).click();

    await expect(page).toHaveURL(`/circuits/${circuit.ref}`);
});
