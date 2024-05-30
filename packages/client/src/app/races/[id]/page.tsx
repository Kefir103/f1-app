import { useRaceResultsServer, useRaceServer } from '~entities/race/api';

import { Breadcrumbs } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsRaceView } from '~app/races/[id]/breadcrumbs';

import { RaceInfo, RaceResultsTable } from '~widgets/race/ui';

interface IRacePage {
    params: {
        id: number;
    };
}

export default async function RacePage({ params }: IRacePage) {
    const { race } = await useRaceServer(params.id);
    const { data: results } = await useRaceResultsServer({ raceId: params.id });

    return (
        <>
            <Breadcrumbs items={getBreadcrumbsItemsRaceView({ race })} />
            <RaceInfo race={race} />
            <RaceResultsTable results={results} />
        </>
    );
}
