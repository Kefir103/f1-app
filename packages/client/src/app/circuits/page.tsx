import { Breadcrumbs, IBreadcrumbItem } from '~shared/ui/breadcrumbs';
import { PaginationSearchParams } from '~shared/ui/pagination-search-params';

import { useCircuitsServer } from '~entities/circuit/api/useCircuitsServer';

import { CircuitList } from '~widgets/circuit-list/ui/CircuitList';

interface ICircuitsPage {
    searchParams: {
        page?: string;
        perPage?: string;
    };
}

export default async function CircuitsPage({ searchParams }: ICircuitsPage) {
    const { data, count } = await useCircuitsServer({
        page: Number(searchParams.page) || 1,
        perPage: Number(searchParams.perPage) || 12,
    });

    const breadcrumbsItems: IBreadcrumbItem[] = [
        {
            path: '',
            label: 'Home',
        },
        {
            path: 'circuits',
            label: 'Circuits',
        },
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbsItems} />
            <CircuitList circuits={data} />
            <PaginationSearchParams totalCount={count} />
        </>
    );
}
