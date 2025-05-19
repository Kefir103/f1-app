import { Breadcrumbs } from '~shared/ui/breadcrumbs';
import { PaginationSearchParams } from '~shared/ui/pagination';

import { getBreadcrumbsItemsSeasons } from '~next/app/seasons/breadcrumbs';

import { useSeasonsServer } from '~entities/season';

import { SeasonList } from '~widgets/season';

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
            <Breadcrumbs items={getBreadcrumbsItemsSeasons()} />
            <SeasonList seasons={data} />
            <PaginationSearchParams totalCount={count} />
        </>
    );
}
