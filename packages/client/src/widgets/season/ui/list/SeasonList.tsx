import { Grid } from '@mui/material';

import type { SeasonType } from '~entities/season';
import { SeasonListCard } from '~entities/season/ui';

interface ISeasonList {
    seasons: SeasonType[];
}

export function SeasonList({ seasons }: ISeasonList) {
    return (
        <Grid container spacing={2}>
            {seasons.map((season) => (
                <Grid item xs={12} md={6} lg={3} key={`season_${season.id}`}>
                    <SeasonListCard season={season} />
                </Grid>
            ))}
        </Grid>
    );
}
