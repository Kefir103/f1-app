import { Breadcrumbs } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsConstructorView } from '~app/constructors/[ref]/breadcrumbs';

import { useConstructorServer } from '~entities/constructor/api';

import { ConstructorInfo } from '~widgets/constructor/ui';

interface IConstructorPage {
    params: {
        ref: string;
    };
}

export default async function ConstructorPage({ params }: IConstructorPage) {
    const { constructor } = await useConstructorServer(params.ref);

    return (
        <>
            <Breadcrumbs items={getBreadcrumbsItemsConstructorView({ constructor })} />
            <ConstructorInfo constructor_entity={constructor} />
        </>
    );
}
