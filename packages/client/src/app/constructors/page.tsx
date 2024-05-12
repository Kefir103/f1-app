import { PaginationSearchParams } from '~shared/ui/pagination-search-params';

import { ConstructorList } from '~widgets/constructor-list/ui';

import { useConstructorsServer } from '~entities/constructor/api';

interface IConstructorsPage {
    searchParams: {
        page?: string;
        perPage?: string;
    };
}

export default async function ConstructorsPage({ searchParams }: IConstructorsPage) {
    const { data, count } = await useConstructorsServer({
        page: Number(searchParams.page) || 1,
        perPage: Number(searchParams.perPage) || 12,
    });

    return (
        <>
            <ConstructorList constructors={data} />
            <PaginationSearchParams totalCount={count} />
        </>
    );
}
