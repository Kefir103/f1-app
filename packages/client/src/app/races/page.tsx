import { Breadcrumbs, IBreadcrumbItem } from '~shared/ui/breadcrumbs';
import { PaginationSearchParams } from '~shared/ui/pagination-search-params';

import { useRacesServer } from '~entities/race/api';

import { RaceList } from '~widgets/race-list/ui';

interface IRacesPage {
    searchParams: {
        page?: string;
        perPage?: string;
    };
}

export default async function RacesPage({ searchParams }: IRacesPage) {
    const { data, count } = await useRacesServer({
        page: Number(searchParams.page) || 1,
        perPage: Number(searchParams.perPage) || 12,
    });

    const breadcrumbsItems: IBreadcrumbItem[] = [
        {
            path: '',
            label: 'Home',
        },
        {
            path: 'races',
            label: 'Races',
        },
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbsItems} />
            <RaceList races={data} />
            <PaginationSearchParams totalCount={count} />
        </>
    );
}
