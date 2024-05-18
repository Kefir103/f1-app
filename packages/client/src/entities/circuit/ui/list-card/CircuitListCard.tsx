import { Card, CardContent, CardHeader, Typography, Link } from '@mui/material';
import NextLink from 'next/link';

import type { CircuitType } from '~entities/circuit';

interface ICircuitListCard {
    circuit: CircuitType;
}

export function CircuitListCard({ circuit }: ICircuitListCard) {
    return (
        <Card className={'card'}>
            <CardContent>
                <CardHeader
                    title={
                        <NextLink
                            className={'link'}
                            href={`/circuits/${circuit.ref}`}
                            title={circuit.name}
                        >
                            {circuit.name}
                        </NextLink>
                    }
                />
                <Typography>Country: {circuit.country}</Typography>
                <Typography>Location: {circuit.location}</Typography>
                <Typography>Latitude: {circuit.latitude}</Typography>
                <Typography>Longitude: {circuit.longitude}</Typography>
                <Typography>Altitude: {circuit.altitude}m</Typography>
                <Link
                    href={circuit.wiki_url}
                    target={'_blank'}
                    rel={'noopener'}
                    className={'link'}
                    title={'Wiki'}
                >
                    Wiki
                </Link>
            </CardContent>
        </Card>
    );
}
