import NextLink from 'next/link';
import { Card, CardContent, CardHeader, Link, Typography } from '@mui/material';

import type { Constructor } from '~entities/constructor';

interface IConstructorListCard {
    constructorEntity: Constructor;
}

export function ConstructorListCard({ constructorEntity }: IConstructorListCard) {
    return (
        <Card className={'card'}>
            <CardContent>
                <CardHeader
                    title={
                        <NextLink
                            className={'link'}
                            href={`/constructors/${constructorEntity.ref}`}
                            title={constructorEntity.name}
                        >
                            {constructorEntity.name}
                        </NextLink>
                    }
                />
                <Typography>Nationality: {constructorEntity.nationality}</Typography>
                <Link
                    className={'text-blue-500 underline'}
                    href={constructorEntity.wiki_url}
                    target={'_blank'}
                    rel={'noopener'}
                >
                    Wiki
                </Link>
            </CardContent>
        </Card>
    );
}
