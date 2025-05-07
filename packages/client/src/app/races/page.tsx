import { Breadcrumbs } from '~shared/ui/breadcrumbs';
import { PaginationSearchParams } from '~shared/ui/pagination';

import { getBreadcrumbsItemsRaces } from '~app/races/breadcrumbs';

import { useRacesServer } from '~entities/race/api';

import { RaceList } from '~widgets/race/ui';

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
        expandFields: ['winner.constructor_entity'],
    });

    return (
        <>
            <Breadcrumbs items={getBreadcrumbsItemsRaces()} />
            <RaceList races={data} />
            <PaginationSearchParams totalCount={count} />
        </>
    );
}
