import { Grid } from '@mui/material';

import { DriverType } from '~entities/Driver/type';
import { DriverListCard } from '~entities/Driver/ui/list-card/DriverListCard';

interface IDriverList {
    drivers: Array<DriverType>;
}

export async function DriverList({ drivers }: IDriverList) {
    return (
        <Grid container spacing={2}>
            {drivers?.map((driver) => (
                <Grid item xs={12} md={6} lg={3} key={driver._id}>
                    <DriverListCard driver={driver} />
                </Grid>
            ))}
        </Grid>
    );
}
