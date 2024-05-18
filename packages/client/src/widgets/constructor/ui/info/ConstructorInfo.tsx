import { Typography } from '@mui/material';

import type { Constructor } from '~entities/constructor';

interface IConstructorInfoProps {
    constructor_entity: Constructor;
}

export function ConstructorInfo({ constructor_entity }: IConstructorInfoProps) {
    return (
        <>
            <Typography variant={'h1'} component={'h1'} className={'mb-5 text-5xl font-bold'}>
                {constructor_entity.name}
            </Typography>
            <a
                className={'link'}
                href={constructor_entity.wiki_url}
                target={'_blank'}
                rel={'noopener'}
            >
                Wiki
            </a>
            <Typography className={'my-2'}>
                Nationality: {constructor_entity.nationality}
            </Typography>
        </>
    );
}
