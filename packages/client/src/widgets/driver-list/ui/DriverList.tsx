import { Grid } from '@mui/material';

import { DriverType } from '~entities/driver/type';
import { DriverListCard } from '~entities/driver/ui/list-card/DriverListCard';

interface IDriverList {
    drivers: Array<DriverType>;
}

export function DriverList({ drivers }: IDriverList) {
    return (
        <Grid container spacing={2}>
            {drivers?.map((driver) => (
                <Grid item xs={12} md={6} lg={3} key={`driver_${driver.ref}`}>
                    <DriverListCard driver={driver} />
                </Grid>
            ))}
        </Grid>
    );
}
