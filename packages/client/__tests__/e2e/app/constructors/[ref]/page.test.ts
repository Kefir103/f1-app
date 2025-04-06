import { expect } from '@playwright/test';
import { test } from '~tests-utils/e2e/server/MockApiTest';

import { CONSTRUCTOR_URLS } from '~entities/constructor/api';

import { ConstructorsMock } from '~mocks/entities/constructor/Constructor.mock';

import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

test('should renders correctly', async ({ page, nextContext }) => {
    const constructorMock = ConstructorsMock[0];

    await nextContext.mockApi.get(CONSTRUCTOR_URLS.ref(constructorMock.ref), constructorMock);

    await page.goto(`/constructors/${constructorMock.ref}`);

    await expect(page.getByRole('heading', { name: constructorMock.name })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Wiki ' })).toBeVisible();
    await expect(page.getByText(`Nationality: ${constructorMock.nationality}`)).toBeVisible();
});

test('should render breadcrumbs correctly', async ({ page, nextContext }) => {
    const constructorMock = ConstructorsMock[0];

    await nextContext.mockApi.get(CONSTRUCTOR_URLS.ref(constructorMock.ref), constructorMock);

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
