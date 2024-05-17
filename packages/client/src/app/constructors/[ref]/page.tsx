import { Typography } from '@mui/material';

import { Breadcrumbs } from '~shared/ui/breadcrumbs';

import { getBreadcrumbsItemsConstructorView } from '~app/constructors/[ref]/breadcrumbs';

import { useConstructorServer } from '~entities/constructor/api';

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
            <Typography variant={'h1'} component={'h1'} className={'mb-5 text-5xl font-bold'}>
                {constructor.name}
            </Typography>
            <a className={'link'} href={constructor.wiki_url} target={'_blank'} rel={'noopener'}>
                Wiki
            </a>
            <Typography className={'my-2'}>Nationality: {constructor.nationality}</Typography>
        </>
    );
}
