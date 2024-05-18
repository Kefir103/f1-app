import { Breadcrumbs } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsDriverView } from '~app/drivers/[ref]/breadcrumbs';

import { useDriverServer } from '~entities/driver/api';

import { DriverInfo } from '~widgets/driver/ui';

interface IDriverPage {
    params: {
        ref: string;
    };
}

export default async function DriverPage({ params }: IDriverPage) {
    const { driver } = await useDriverServer(params.ref);

    return (
        <>
            <Breadcrumbs items={getBreadcrumbsItemsDriverView({ driver })} />
            <DriverInfo driver={driver} />
        </>
    );
}
