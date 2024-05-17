import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';
import { setupServer, closeServer } from '~tests-utils/e2e/server/MockFastifyServer';

import { CIRCUIT_URLS } from '~entities/circuit/api';

import { CircuitsMock } from '~mocks/entities/circuit/Circuit.mock';

import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

test.afterEach(async ({ server }) => {
    await closeServer(server);
});

test('render circuit', async ({ page, server }) => {
    const circuitMock = CircuitsMock[0];

    await setupServer(server, {
        url: CIRCUIT_URLS.ref(circuitMock.ref),
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

test('should render breadcrumbs correctly', async ({ page, server }) => {
    const circuitMock = CircuitsMock[0];

    await setupServer(server, {
        url: CIRCUIT_URLS.ref(circuitMock.ref),
        method: 'GET',
        handler: function (_, reply) {
            reply.send(circuitMock);
        },
    });

    await page.goto(`/circuits/${circuitMock.ref}`);

    const breadcrumbHome = page.getByTitle(getBreadcrumbTitle('Home'));
    const breadcrumbCircuits = page.getByTitle(getBreadcrumbTitle('Circuits'));
    const breadcrumbCircuitView = page.getByTitle(getBreadcrumbTitle(circuitMock.name));

    await expect(breadcrumbHome).toBeVisible();
    await expect(breadcrumbHome).toHaveAttribute('href', '/');

    await expect(breadcrumbCircuits).toBeVisible();
    await expect(breadcrumbCircuits).toHaveAttribute('href', '/circuits');

    await expect(breadcrumbCircuitView).toBeVisible();
    await expect(breadcrumbCircuitView).toHaveAttribute('href', `/circuits/${circuitMock.ref}`);
});
