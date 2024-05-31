import { Typography } from '@mui/material';

import type { Race } from '~entities/race';
import { RaceTable } from '~entities/race/ui';

interface ISeasonRaceTableProps {
    races: Race[];
}

export function SeasonRaceTable({ races }: ISeasonRaceTableProps) {
    return (
        <>
            <Typography variant={'h2'} component={'h2'} className={'mb-2 mt-4 text-2xl font-bold'}>
                Season races
            </Typography>
            <RaceTable races={races} />
        </>
    );
}
