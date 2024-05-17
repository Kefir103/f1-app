import { Breadcrumbs } from '~shared/ui/breadcrumbs';
import { PaginationSearchParams } from '~shared/ui/pagination-search-params';

import { getBreadcrumbsItemsConstructors } from '~app/constructors/breadcrumbs';

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
            <Breadcrumbs items={getBreadcrumbsItemsConstructors()} />
            <ConstructorList constructors={data} />
            <PaginationSearchParams totalCount={count} />
        </>
    );
}
