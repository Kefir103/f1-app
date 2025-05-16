import { Breadcrumbs } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsCircuitView } from '~next/app/circuits/[ref]/breadcrumbs';

import { useCircuitServer } from '~entities/circuit';

import { CircuitInfo } from '~widgets/circuit';

interface ICircuitPage {
    params: {
        ref: string;
    };
}

export default async function CircuitPage({ params }: ICircuitPage) {
    const { circuit } = await useCircuitServer(params.ref);

    return (
        <>
            <Breadcrumbs items={getBreadcrumbsItemsCircuitView({ circuit })} />
            <CircuitInfo circuit={circuit} />
        </>
    );
}
