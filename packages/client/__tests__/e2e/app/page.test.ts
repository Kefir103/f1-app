import { test, expect } from '@playwright/test';

import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

test('has project entities cards', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Circuits', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Drivers', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Constructors', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Seasons', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Races', exact: true })).toBeVisible();
});

test('has header links', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: 'Circuits', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Drivers', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Constructors', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Seasons', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Races', exact: true })).toBeVisible();
});

test('should render breadcrumbs correctly', async ({ page }) => {
    await page.goto('/');

    const breadcrumbHome = page.getByTitle(getBreadcrumbTitle('Home'));

    await expect(breadcrumbHome).toBeVisible();
    await expect(breadcrumbHome).toHaveAttribute('href', '/');
})