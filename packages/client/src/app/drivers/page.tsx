import { PaginationSearchParams } from '~shared/ui/pagination';
import { Breadcrumbs } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsDrivers } from '~app/drivers/breadcrumbs';

import { useDriversServer } from '~entities/driver';

import { DriverList } from '~widgets/driver';

interface IDriversPage {
    searchParams: {
        page?: string;
        perPage?: string;
    };
}

export default async function DriversPage({ searchParams }: IDriversPage) {
    const { data, count } = await useDriversServer({
        page: Number(searchParams.page) || 1,
        perPage: Number(searchParams.perPage) || 12,
        expandFields: ['constructor_entity'],
    });

    return (
        <>
            <Breadcrumbs items={getBreadcrumbsItemsDrivers()} />
            <DriverList drivers={data} />
            <PaginationSearchParams totalCount={count} />
        </>
    );
}
