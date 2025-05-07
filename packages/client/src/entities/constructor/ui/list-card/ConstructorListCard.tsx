import NextLink from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '~shadcn/ui/card';

import { Typography } from '~shared/ui/typography/Typography';

import type { Constructor } from '~entities/constructor';

interface IConstructorListCard {
    constructorEntity: Constructor;
}

export function ConstructorListCard({ constructorEntity }: IConstructorListCard) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Typography.Title level={3}>
                        <NextLink
                            className={'link-white'}
                            href={`/constructors/${constructorEntity.ref}`}
                            title={constructorEntity.name}
                        >
                            {constructorEntity.name}
                        </NextLink>
                    </Typography.Title>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Typography>Nationality: {constructorEntity.nationality}</Typography>
                <Typography>
                    <a
                        className={'link'}
                        href={constructorEntity.wiki_url}
                        target={'_blank'}
                        rel={'noopener'}
                    >
                        Wiki
                    </a>
                </Typography>
            </CardContent>
        </Card>
    );
}
