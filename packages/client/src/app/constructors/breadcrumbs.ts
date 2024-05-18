import { IBreadcrumbItem } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsHome } from '~app/breadcrumbs';

const getBreadcrumbsItems = (): IBreadcrumbItem[] => [
    ...getBreadcrumbsItemsHome(),
    {
        path: 'constructors',
        label: 'Constructors',
    },
];

export { getBreadcrumbsItems as getBreadcrumbsItemsConstructors };