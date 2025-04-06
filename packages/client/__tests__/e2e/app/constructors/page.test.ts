import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';

import { CONSTRUCTOR_URLS } from '~entities/constructor/api';

import { ConstructorsMock } from '~mocks/entities/constructor/Constructor.mock';

import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

const CONSTRUCTORS_REQUEST_DEFAULT_PARAMS = {
    page: 1,
    perPage: 12,
};

test('should renders correctly', async ({ page, nextContext }) => {
    await nextContext.mockApi.get(
        CONSTRUCTOR_URLS.index,
        {
            data: ConstructorsMock,
            count: ConstructorsMock.length,
        },
        {
            params: CONSTRUCTORS_REQUEST_DEFAULT_PARAMS,
        },
    );

    await page.goto('/constructors');

    await expect(page.getByRole('link', { name: ConstructorsMock[0].name })).toBeVisible();
});

test('should navigate to constructor page after name click', async ({ page, nextContext }) => {
    const constructorMock = ConstructorsMock[0];

    await nextContext.mockApi.get(
        CONSTRUCTOR_URLS.index,
        {
            data: ConstructorsMock,
            count: ConstructorsMock.length,
        },
        {
            params: CONSTRUCTORS_REQUEST_DEFAULT_PARAMS,
        },
    );

    await nextContext.mockApi.get(CONSTRUCTOR_URLS.ref(constructorMock.ref), constructorMock);

    await page.goto('/constructors');

    await page.getByRole('link', { name: constructorMock.name, exact: true }).click();

    await expect(page).toHaveURL(`/constructors/${constructorMock.ref}`);
});

test('should render breadcrumbs correctly', async ({ page, nextContext }) => {
    await nextContext.mockApi.get(
        CONSTRUCTOR_URLS.index,
        {
            data: [],
            count: 0,
        },
        {
            params: CONSTRUCTORS_REQUEST_DEFAULT_PARAMS,
        },
    );

    await page.goto('/constructors');

    const breadcrumbHome = page.getByTitle(getBreadcrumbTitle('Home'));
    const breadcrumbConstructors = page.getByTitle(getBreadcrumbTitle('Constructors'));

    await expect(breadcrumbHome).toBeVisible();
    await expect(breadcrumbHome).toHaveAttribute('href', '/');

    await expect(breadcrumbConstructors).toBeVisible();
    await expect(breadcrumbConstructors).toHaveAttribute('href', '/constructors');
});
