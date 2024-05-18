import { Typography } from '@mui/material';

import { Breadcrumbs } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsSeasonView } from '~app/seasons/[year]/breadcrumbs';

import { useSeasonServer } from '~entities/season/api';

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
            <Typography variant={'h1'} component={'h1'} className={'mb-5 text-5xl font-bold'}>
                Season {season.year}
            </Typography>
            <a className={'link'} href={season.wiki_url} target={'_blank'}>
                Wiki
            </a>
        </>
    );
}
