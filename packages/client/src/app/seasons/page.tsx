import { PaginationSearchParams } from '~shared/ui/pagination-search-params';

import { useSeasonsServer } from '~entities/season/api';

import { SeasonList } from '~widgets/season-list/ui';

interface ISeasonsPage {
    searchParams: {
        page?: string;
        perPage?: string;
    };
}

export default async function SeasonsPage({ searchParams }: ISeasonsPage) {
    const { data, count } = await useSeasonsServer({
        page: Number(searchParams.page || 1),
        perPage: Number(searchParams.perPage || 12),
    });

    return (
        <>
            <SeasonList seasons={data} />
            <PaginationSearchParams totalCount={count} />
        </>
    );
}
