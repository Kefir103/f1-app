import { Breadcrumbs } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsRaceView } from '~next/app/races/[id]/breadcrumbs';

import { useRaceResultsServer, useRaceServer } from '~entities/race';

import { RaceInfo, RaceResultsTable } from '~widgets/race';

interface IRacePage {
    params: {
        id: number;
    };
}

export default async function RacePage({ params }: IRacePage) {
    const { race } = await useRaceServer(params.id, {
        expandFields: ['winner.constructor_entity'],
    });
    const { data: results } = await useRaceResultsServer({ raceId: params.id });

    return (
        <>
            <Breadcrumbs items={getBreadcrumbsItemsRaceView({ race })} />
            <RaceInfo race={race} />
            <RaceResultsTable results={results} />
        </>
    );
}
