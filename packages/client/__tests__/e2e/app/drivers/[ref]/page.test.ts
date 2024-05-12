import moment from 'moment';
import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';
import { setupServer, closeServer } from '~tests-utils/e2e/server/MockFastifyServer';

import { URLS } from '~entities/driver/api/urls';
import { CONSTRUCTOR_URLS } from '~entities/constructor/api';

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

    // Driver full name with code
    await expect(
        page.getByRole('heading', {
            name: `${driver.first_name} ${driver.last_name} (${driver.code})`,
        }),
    ).toBeVisible();

    // Driver wiki link
    await expect(page.getByRole('link', { name: 'Wiki' })).toBeVisible();

    // Driver's constructor
    const driverConstructor = page.getByTitle(`Team: ${driver.constructor_entity.name}`);

    await expect(driverConstructor).toBeVisible();
    await expect(driverConstructor).toHaveAttribute(
        'href',
        `/constructors/${driver.constructor_entity.ref}`,
    );

    // Driver date of birth
    await expect(
        page.getByText(`Date of birth: ${moment(driver.date_of_birth).format('DD.MM.YYYY')}`),
    ).toBeVisible();

    // Driver nationality
    await expect(page.getByText(`Nationality: ${driver.nationality}`)).toBeVisible();

    // Driver wins count
    await expect(page.getByText(`Wins: ${driver.wins_count}`)).toBeVisible();

    // Driver poles count
    await expect(page.getByText(`Poles: ${driver.poles_count}`)).toBeVisible();
});

test("should go to constructor page after constructor's name click", async ({ page, server }) => {
    const driver = DriversMock[0];
    const constructor = driver.constructor_entity;

    await setupServer(
        server,
        {
            url: URLS.ref(driver.ref),
            method: 'GET',
            handler: function (_, reply) {
                reply.send(driver);
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

    await page.goto(`/drivers/${driver.ref}`);

    await page.getByTitle(`Team: ${constructor.name}`).click();

    await expect(page).toHaveURL(`/constructors/${constructor.ref}`);
});
