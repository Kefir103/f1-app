import { Grid } from '@mui/material';

import type { CircuitType } from '~entities/circuit';
import { CircuitListCard } from '~entities/circuit/ui';

interface ICircuitList {
    circuits: CircuitType[];
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
