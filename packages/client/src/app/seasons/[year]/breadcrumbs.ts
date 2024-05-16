import { IBreadcrumbItem } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsSeasons } from '~app/seasons/breadcrumbs';

import type { SeasonType } from '~entities/season';

interface IBreadcrumbsSeason {
    season: SeasonType;
}

const getBreadcrumbsItems = ({ season }: IBreadcrumbsSeason): IBreadcrumbItem[] => [
    ...getBreadcrumbsItemsSeasons(),
    {
        path: String(season.year),
        label: String(season.year),
    },
];

export { getBreadcrumbsItems as getBreadcrumbsItemsSeasonView };
