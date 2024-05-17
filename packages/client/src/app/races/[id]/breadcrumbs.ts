import { IBreadcrumbItem } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsRaces } from '~app/races/breadcrumbs';

import type { Race } from '~entities/race';

interface IBreadcrumbsRace {
    race: Race;
}

const getBreadcrumbsItems = ({ race }: IBreadcrumbsRace): IBreadcrumbItem[] => [
    ...getBreadcrumbsItemsRaces(),
    {
        path: String(race.id),
        label: race.name,
    },
];

export { getBreadcrumbsItems as getBreadcrumbsItemsRaceView };