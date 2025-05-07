import NextLink from 'next/link';
import { Card, CardHeader, CardContent, CardTitle } from '~shadcn/ui/card';

import { Typography } from '~shared/ui/typography/Typography';

import type { CircuitType } from '~entities/circuit';

interface ICircuitListCard {
    circuit: CircuitType;
}

export function CircuitListCard({ circuit }: ICircuitListCard) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Typography.Title level={3}>
                        <NextLink
                            className={'link-white'}
                            href={`/circuits/${circuit.ref}`}
                            title={circuit.name}
                        >
                            {circuit.name}
                        </NextLink>
                    </Typography.Title>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Typography>Country: {circuit.country}</Typography>
                <Typography>Location: {circuit.location}</Typography>
                <Typography>Latitude: {circuit.latitude}</Typography>
                <Typography>Longitude: {circuit.longitude}</Typography>
                <Typography>Altitude: {circuit.altitude}m</Typography>
                <a
                    href={circuit.wiki_url}
                    target={'_blank'}
                    rel={'noopener'}
                    className={'link'}
                    title={'Wiki'}
                >
                    Wiki
                </a>
            </CardContent>
        </Card>
    );
}
