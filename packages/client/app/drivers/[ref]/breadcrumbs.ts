import { IBreadcrumbItem } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsDrivers } from '~next/app/drivers/breadcrumbs';

import type { DriverType } from '~entities/driver';

interface IBreadcrumbs {
    driver: DriverType;
}

const getBreadcrumbsItems = ({ driver }: IBreadcrumbs): IBreadcrumbItem[] => [
    ...getBreadcrumbsItemsDrivers(),
    {
        path: driver.ref,
        label: `${driver.first_name} ${driver.last_name}`,
    },
];

export { getBreadcrumbsItems as getBreadcrumbsItemsDriverView };