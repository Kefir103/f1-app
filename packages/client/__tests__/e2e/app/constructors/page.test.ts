import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';
import { setupServer, closeServer } from '~tests-utils/e2e/server/MockFastifyServer';

import { CONSTRUCTOR_URLS } from '~entities/constructor/api';

import { ConstructorsMock } from '~mocks/entities/constructor/Constructor.mock';

test.afterEach(async ({ server }) => {
    await closeServer(server);
});

test('should renders correctly', async ({ page, server }) => {
    await setupServer(server, {
        url: CONSTRUCTOR_URLS.index,
        method: 'GET',
        handler: (_, reply) => {
            reply.send({
                data: ConstructorsMock,
                count: ConstructorsMock.length,
            });
        },
    });

    await page.goto('/constructors');

    await expect(page.getByRole('link', { name: ConstructorsMock[0].name })).toBeVisible();
});

test('should navigate to constructor page after name click', async ({ page, server }) => {
    const constructorMock = ConstructorsMock[0];

    await setupServer(
        server,
        {
            url: CONSTRUCTOR_URLS.index,
            method: 'GET',
            handler: (_, reply) => {
                reply.send({
                    data: ConstructorsMock,
                    count: ConstructorsMock.length,
                });
            },
        },
        {
            url: CONSTRUCTOR_URLS.ref(constructorMock.ref),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(constructorMock);
            },
        },
    );

    await page.goto('/constructors');

    await page.getByRole('link', { name: constructorMock.name, exact: true }).click();

    await expect(page).toHaveURL(`/constructors/${constructorMock.ref}`);
});
