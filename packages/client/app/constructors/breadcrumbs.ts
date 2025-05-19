import { IBreadcrumbItem } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsHome } from '~next/app/breadcrumbs';

const getBreadcrumbsItems = (): IBreadcrumbItem[] => [
    ...getBreadcrumbsItemsHome(),
    {
        path: 'constructors',
        label: 'Constructors',
    },
];

export { getBreadcrumbsItems as getBreadcrumbsItemsConstructors };