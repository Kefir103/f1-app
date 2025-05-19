import { IBreadcrumbItem } from '~shared/ui/breadcrumbs';

const getBreadcrumbsItems = (): IBreadcrumbItem[] => [
    {
        path: '',
        label: 'Home',
    },
];

export { getBreadcrumbsItems as getBreadcrumbsItemsHome };
