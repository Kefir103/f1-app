import { Breadcrumbs } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsDriverView } from '~next/app/drivers/[ref]/breadcrumbs';

import { useDriverServer } from '~entities/driver';

import { DriverInfo } from '~pages/drivers/[ref]';

interface IDriverPage {
    params: {
        ref: string;
    };
}

export default async function DriverPage({ params }: IDriverPage) {
    const { driver } = await useDriverServer(params.ref, {
        expandFields: ['constructor_entity'],
    });

    return (
        <>
            <Breadcrumbs items={getBreadcrumbsItemsDriverView({ driver })} />
            <DriverInfo driver={driver} />
        </>
    );
}
