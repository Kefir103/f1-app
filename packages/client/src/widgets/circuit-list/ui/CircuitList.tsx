import { Grid } from '@mui/material';

import { Circuit } from '~entities/Circuit/type';
import { CircuitListCard } from '~entities/Circuit/ui/list-card/CircuitListCard';

interface ICircuitList {
    circuits: Circuit[];
}

export function CircuitList({ circuits }: ICircuitList) {
    return (
        <Grid container spacing={2}>
            {circuits.map((circuit) => (
                <Grid item xs={12} md={6} lg={3} key={`circuit_${circuit.ref}`}>
                    <CircuitListCard circuit={circuit} />
                </Grid>
            ))}
        </Grid>
    );
}
