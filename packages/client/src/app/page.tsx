import { MenuItems } from '~views/home';

import { IBreadcrumbItem, Breadcrumbs } from '~shared/ui/breadcrumbs';

export default async function Home() {
    const breadcrumbsItems: IBreadcrumbItem[] = [
        {
            path: '',
            label: 'Home',
        },
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbsItems} />
            <MenuItems />
        </>
    );
}
