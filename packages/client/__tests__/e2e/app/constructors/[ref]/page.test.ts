import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';
import { setupServer, closeServer } from '~tests-utils/e2e/server/MockFastifyServer';

import { CONSTRUCTOR_URLS } from '~entities/constructor/api';

import { ConstructorsMock } from '~mocks/entities/constructor/Constructor.mock';

import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

test.afterEach(async ({ server }) => {
    await closeServer(server);
});

test('should renders correctly', async ({ page, server }) => {
    const constructorMock = ConstructorsMock[0];

    await setupServer(server, {
        url: CONSTRUCTOR_URLS.ref(constructorMock.ref),
        method: 'GET',
        handler: (_, reply) => {
            reply.send(constructorMock);
        },
    });

    await page.goto(`/constructors/${constructorMock.ref}`);

    await expect(page.getByRole('heading', { name: constructorMock.name })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Wiki ' })).toBeVisible();
    await expect(page.getByText(`Nationality: ${constructorMock.nationality}`)).toBeVisible();
});

test('should render breadcrumbs correctly', async ({ page, server }) => {
    const constructorMock = ConstructorsMock[0];

    await setupServer(server, {
        url: CONSTRUCTOR_URLS.ref(constructorMock.ref),
        method: 'GET',
        handler: (_, reply) => {
            reply.send(constructorMock);
        },
    });

    await page.goto(`/constructors/${constructorMock.ref}`);

    const breadcrumbHome = page.getByTitle(getBreadcrumbTitle('Home'));
    const breadcrumbConstructors = page.getByTitle(getBreadcrumbTitle('Constructors'));
    const breadcrumbConstructorView = page.getByTitle(getBreadcrumbTitle(constructorMock.name));

    await expect(breadcrumbHome).toBeVisible();
    await expect(breadcrumbHome).toHaveAttribute('href', '/');

    await expect(breadcrumbConstructors).toBeVisible();
    await expect(breadcrumbConstructors).toHaveAttribute('href', '/constructors');

    await expect(breadcrumbConstructorView).toBeVisible();
    await expect(breadcrumbConstructorView).toHaveAttribute(
        'href',
        `/constructors/${constructorMock.ref}`,
    );
});
