import { IBreadcrumbItem } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsHome } from '~app/breadcrumbs';

const getBreadcrumbsItems = (): IBreadcrumbItem[] => [
    ...getBreadcrumbsItemsHome(),
    {
        path: 'seasons',
        label: 'Seasons',
    },
];

export { getBreadcrumbsItems as getBreadcrumbsItemsSeasons };