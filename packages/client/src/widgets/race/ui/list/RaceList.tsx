import { Grid } from '@mui/material';

import type { Race } from '~entities/race';
import { RaceListCard } from '~entities/race/ui';

interface IRaceList {
    races: Race[];
}

export function RaceList({ races }: IRaceList) {
    return (
        <Grid container spacing={2}>
            {races.map((race) => (
                <Grid item key={`race_${race.id}`} xs={12} md={6} lg={3}>
                    <RaceListCard race={race} />
                </Grid>
            ))}
        </Grid>
    );
}
