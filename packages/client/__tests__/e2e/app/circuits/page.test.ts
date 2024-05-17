import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';
import { setupServer, closeServer } from '~tests-utils/e2e/server/MockFastifyServer';

import { CIRCUIT_URLS } from '~entities/circuit/api';

import { CircuitsMock } from '~mocks/entities/circuit/Circuit.mock';

import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

test.afterEach(async ({ server }) => {
    await closeServer(server);
});

test('render circuits list', async ({ page, server }) => {
    await setupServer(server, {
        url: CIRCUIT_URLS.index,
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
            url: CIRCUIT_URLS.index,
            method: 'GET',
            handler: function (_, reply) {
                reply.send({
                    data: CircuitsMock,
                    count: CircuitsMock.length,
                });
            },
        },
        {
            url: CIRCUIT_URLS.ref(circuit.ref),
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

test('should render breadcrumbs correctly', async ({ page, server }) => {
    await setupServer(server, {
        url: CIRCUIT_URLS.index,
        method: 'GET',
        handler: function (_, reply) {
            reply.send({
                data: [],
                count: 0,
            });
        },
    });

    await page.goto('/circuits');

    const breadcrumbHome = page.getByTitle(getBreadcrumbTitle('Home'));
    const breadcrumbCircuits = page.getByTitle(getBreadcrumbTitle('Circuits'));

    await expect(breadcrumbHome).toBeVisible();
    await expect(breadcrumbHome).toHaveAttribute('href', '/');

    await expect(breadcrumbHome).toBeVisible();
    await expect(breadcrumbCircuits).toHaveAttribute('href', '/circuits');
});
