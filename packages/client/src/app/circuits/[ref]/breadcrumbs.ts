import { IBreadcrumbItem } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsCircuits } from '~app/circuits/breadcrumbs';

import type { CircuitType } from '~entities/circuit';

interface IBreadcrumbsCircuit {
    circuit: CircuitType;
}

const getBreadcrumbsItems = ({ circuit }: IBreadcrumbsCircuit): IBreadcrumbItem[] => [
    ...getBreadcrumbsItemsCircuits(),
    {
        path: circuit.ref,
        label: circuit.name,
    },
];

export { getBreadcrumbsItems as getBreadcrumbsItemsCircuitView };