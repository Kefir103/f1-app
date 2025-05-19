import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';

import { URLS } from '~shared/config/urls';

import { CircuitsMock } from '~mocks/entities/circuit/Circuit.mock';

import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

const CIRCUITS_REQUEST_DEFAULT_PARAMS = {
    page: 1,
    perPage: 12,
};

test('render circuits list', async ({ page, nextContext }) => {
    await nextContext.mockApi.get(
        URLS.circuit.index,
        {
            data: CircuitsMock,
            count: CircuitsMock.length,
        },
        {
            params: CIRCUITS_REQUEST_DEFAULT_PARAMS,
        },
    );

    await page.goto('/circuits');

    await expect(page.getByRole('link', { name: CircuitsMock[0].name, exact: true })).toBeVisible();
});

test('should open circuit page after link click', async ({ page, nextContext }) => {
    const circuit = CircuitsMock[0];

    await nextContext.mockApi.get(
        URLS.circuit.index,
        {
            data: CircuitsMock,
            count: CircuitsMock.length,
        },
        {
            params: CIRCUITS_REQUEST_DEFAULT_PARAMS,
        },
    );

    await nextContext.mockApi.get(URLS.circuit.ref(circuit.ref), circuit);

    await page.goto('/circuits');

    await page.getByRole('link', { name: circuit.name, exact: true }).click();

    await expect(page).toHaveURL(`/circuits/${circuit.ref}`);
});

test('should render breadcrumbs correctly', async ({ page, nextContext }) => {
    await nextContext.mockApi.get(
        URLS.circuit.index,
        {
            data: [],
            count: 0,
        },
        {
            params: CIRCUITS_REQUEST_DEFAULT_PARAMS,
        },
    );

    await page.goto('/circuits');

    const breadcrumbHome = page.getByTitle(getBreadcrumbTitle('Home'));
    const breadcrumbCircuits = page.getByTitle(getBreadcrumbTitle('Circuits'));

    await expect(breadcrumbHome).toBeVisible();
    await expect(breadcrumbHome).toHaveAttribute('href', '/');

    await expect(breadcrumbHome).toBeVisible();
    await expect(breadcrumbCircuits).toHaveAttribute('href', '/circuits');
});
