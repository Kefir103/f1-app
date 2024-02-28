import { PaginationSearchParams } from '~shared/ui/pagination-search-params';
import { useDriversServer } from '~entities/Driver/api';
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

    return (
        <>
            <DriverList drivers={data} />
            <PaginationSearchParams totalCount={count} />
        </>
    );
}
