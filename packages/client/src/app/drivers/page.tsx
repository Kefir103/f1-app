import { PaginationSearchParams } from '~shared/ui/pagination-search-params';
import { Breadcrumbs, IBreadcrumbItem } from '~shared/ui/breadcrumbs';

import { useDriversServer } from '~entities/driver/api';
import { DriverList } from '~widgets/driver-list/ui';

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
    });

    const breadcrumbsItems: IBreadcrumbItem[] = [
        {
            path: '',
            label: 'Home',
        },
        {
            path: 'drivers',
            label: 'Drivers',
        },
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbsItems} />
            <DriverList drivers={data} />
            <PaginationSearchParams totalCount={count} />
        </>
    );
}
