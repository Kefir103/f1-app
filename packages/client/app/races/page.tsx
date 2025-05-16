import { Breadcrumbs } from '~shared/ui/breadcrumbs';
import { PaginationSearchParams } from '~shared/ui/pagination';

import { getBreadcrumbsItemsRaces } from '~next/app/races/breadcrumbs';

import { useRacesServer } from '~entities/race';

import { RaceList } from '~widgets/race';

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
