import { Typography } from '@mui/material';

import { IBreadcrumbItem, Breadcrumbs } from '~shared/ui/breadcrumbs';

import { useConstructorServer } from '~entities/constructor/api';

interface IConstructorPage {
    params: {
        ref: string;
    };
}

export default async function ConstructorPage({ params }: IConstructorPage) {
    const { constructor } = await useConstructorServer(params.ref);

    const breadcrumbsItems: IBreadcrumbItem[] = [
        {
            path: '',
            label: 'Home',
        },
        {
            path: 'constructors',
            label: 'Constructors',
        },
        {
            path: constructor.ref,
            label: constructor.name,
        },
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbsItems} />
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
