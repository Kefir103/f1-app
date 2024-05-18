import { IBreadcrumbItem } from '~shared/ui/breadcrumbs';

import type { Constructor } from '~entities/constructor';

import { getBreadcrumbsItemsConstructors } from '~app/constructors/breadcrumbs';

interface IBreadcrumbs {
    constructor: Constructor;
}

const getBreadcrumbsItems = ({ constructor }: IBreadcrumbs): IBreadcrumbItem[] => [
    ...getBreadcrumbsItemsConstructors(),
    {
        path: constructor.ref,
        label: constructor.name,
    },
];

export { getBreadcrumbsItems as getBreadcrumbsItemsConstructorView };
