import { IBreadcrumbItem } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsHome } from '~next/app/breadcrumbs';

const getBreadcrumbsItems = (): IBreadcrumbItem[] => [
    ...getBreadcrumbsItemsHome(),
    {
        path: 'drivers',
        label: 'Drivers',
    },
];

export { getBreadcrumbsItems as getBreadcrumbsItemsDrivers };
