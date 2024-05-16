import { IBreadcrumbItem } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsCircuits } from '~app/circuits/breadcrumbs';

import { Circuit } from '~entities/circuit/type';

interface IBreadcrumbsCircuit {
    circuit: Circuit;
}

const getBreadcrumbsItems = ({ circuit }: IBreadcrumbsCircuit): IBreadcrumbItem[] => [
    ...getBreadcrumbsItemsCircuits(),
    {
        path: circuit.ref,
        label: circuit.name,
    },
];

export { getBreadcrumbsItems as getBreadcrumbsItemsCircuitView };