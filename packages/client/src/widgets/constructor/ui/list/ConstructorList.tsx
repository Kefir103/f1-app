import { Grid } from '@mui/material';

import type { Constructor } from '~entities/constructor';
import { ConstructorListCard } from '~entities/constructor/ui';

interface IConstructorList {
    constructors: Constructor[];
}

export function ConstructorList({ constructors }: IConstructorList) {
    return (
        <Grid container spacing={2}>
            {constructors.map((constructor) => (
                <Grid item xs={12} md={6} lg={3} key={`constructor_${constructor.id}`}>
                    <ConstructorListCard constructorEntity={constructor} />
                </Grid>
            ))}
        </Grid>
    );
}
