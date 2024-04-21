import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';
import { setupServer, closeServer } from '~tests-utils/e2e/server/MockFastifyServer';

import { CIRCUITS_URLS } from '~entities/circuit/api';

import { CircuitsMock } from '~mocks/entities/circuit/Circuit.mock';

test.afterEach(async ({ server }) => {
    await closeServer(server);
});

test('render circuit', async ({ page, server }) => {
    const circuitMock = CircuitsMock[0];

    await setupServer(server, {
        url: CIRCUITS_URLS.ref(circuitMock.ref),
        method: 'GET',
        handler: function (_, reply) {
            reply.send(circuitMock);
        },
    });

    await page.goto(`/circuits/${circuitMock.ref}`);

    await expect(page.getByRole('heading', { name: circuitMock.name })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Wiki' })).toBeVisible();
    await expect(page.getByText(`Country: ${circuitMock.country}`, { exact: true })).toBeVisible();
    await expect(
        page.getByText(`Location: ${circuitMock.location}`, { exact: true }),
    ).toBeVisible();
    await expect(
        page.getByText(`Latitude: ${circuitMock.latitude}`, { exact: true }),
    ).toBeVisible();
    await expect(
        page.getByText(`Longitude: ${circuitMock.longitude}`, { exact: true }),
    ).toBeVisible();
    await expect(
        page.getByText(`Altitude: ${circuitMock.altitude}m`, { exact: true }),
    ).toBeVisible();
});
