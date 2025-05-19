import { IBreadcrumbItem } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsHome } from '~next/app/breadcrumbs';

const getBreadcrumbsItems = (): IBreadcrumbItem[] => [
    ...getBreadcrumbsItemsHome(),
    {
        path: 'races',
        label: 'Races',
    },
];

export { getBreadcrumbsItems as getBreadcrumbsItemsRaces };