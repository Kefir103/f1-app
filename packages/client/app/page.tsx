import { Breadcrumbs } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsHome } from '~next/app/breadcrumbs';

import { MenuItems } from '~views/home';

export default async function Home() {
    return (
        <>
            <Breadcrumbs items={getBreadcrumbsItemsHome()} />
            <MenuItems />
        </>
    );
}
