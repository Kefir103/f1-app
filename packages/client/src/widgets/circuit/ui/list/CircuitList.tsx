import type { CircuitType } from '~entities/circuit';
import { CircuitListCard } from '~entities/circuit/ui';

interface ICircuitList {
    circuits: CircuitType[];
}

export function CircuitList({ circuits }: ICircuitList) {
    return (
        <div className={'grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4'}>
            {circuits.map((circuit) => (
                <CircuitListCard key={`circuit_${circuit.ref}`} circuit={circuit} />
            ))}
        </div>
    );
}
