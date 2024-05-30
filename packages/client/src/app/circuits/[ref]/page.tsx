
import { Breadcrumbs } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsCircuitView } from '~app/circuits/[ref]/breadcrumbs';

import { useCircuitServer } from '~entities/circuit/api';

import { CircuitInfo } from '~widgets/circuit/ui';

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
