import { IBreadcrumbItem } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsHome } from '~app/breadcrumbs';

const getBreadcrumbsItems = (): IBreadcrumbItem[] => [
    ...getBreadcrumbsItemsHome(),
    {
        path: 'circuits',
        label: 'Circuits',
    },
];

export { getBreadcrumbsItems as getBreadcrumbsItemsCircuits };
