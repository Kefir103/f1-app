import { Breadcrumbs } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsSeasonView } from '~app/seasons/[year]/breadcrumbs';

import { useSeasonServer } from '~entities/season/api';

import { SeasonInfo } from '~widgets/season/ui';

interface ISeasonPage {
    params: {
        year: number;
    };
}

export default async function SeasonPage({ params }: ISeasonPage) {
    const { season } = await useSeasonServer(params.year);

    return (
        <>
            <Breadcrumbs items={getBreadcrumbsItemsSeasonView({ season })} />
            <SeasonInfo season={season} />
        </>
    );
}
