import { Typography } from '@mui/material';

import type { SeasonType } from '~entities/season';

interface ISeasonInfoProps {
    season: SeasonType;
}

export function SeasonInfo({ season }: ISeasonInfoProps) {
    return (
        <>
            <Typography variant={'h1'} component={'h1'} className={'mb-5 text-5xl font-bold'}>
                Season {season.year}
            </Typography>
            <a className={'link'} href={season.wiki_url} target={'_blank'}>
                Wiki
            </a>
        </>
    );
}
