import { test, expect } from '@playwright/test';

import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

test('has project entities cards', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTitle('Circuits')).toBeVisible();
    await expect(page.getByTitle('Drivers')).toBeVisible();
    await expect(page.getByTitle('Constructors')).toBeVisible();
    await expect(page.getByTitle('Seasons')).toBeVisible();
    await expect(page.getByTitle('Races')).toBeVisible();
});

test('has header links', async ({ page }) => {
    await page.goto('/');

    const navigationHeader = page.getByRole('navigation', { name: 'Navigation Header' });

    await expect(
        navigationHeader.getByRole('link', { name: 'Circuits', exact: true }),
    ).toBeVisible();
    await expect(
        navigationHeader.getByRole('link', { name: 'Drivers', exact: true }),
    ).toBeVisible();
    await expect(
        navigationHeader.getByRole('link', { name: 'Constructors', exact: true }),
    ).toBeVisible();
    await expect(
        navigationHeader.getByRole('link', { name: 'Seasons', exact: true }),
    ).toBeVisible();
    await expect(navigationHeader.getByRole('link', { name: 'Races', exact: true })).toBeVisible();
});

test('should render breadcrumbs correctly', async ({ page }) => {
    await page.goto('/');

    const breadcrumbHome = page.getByTitle(getBreadcrumbTitle('Home'));

    await expect(breadcrumbHome).toBeVisible();
    await expect(breadcrumbHome).toHaveAttribute('href', '/');
});
