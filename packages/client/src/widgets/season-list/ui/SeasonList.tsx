import { Grid } from '@mui/material';

import type { Season } from '~entities/season/type';
import { SeasonListCard } from '~entities/season/ui/list-card';

interface ISeasonList {
    seasons: Season[];
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
