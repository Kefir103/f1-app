import { Card, CardContent, CardHeader, Typography, Link } from '@mui/material';
import NextLink from 'next/link';

import { Circuit } from '~entities/Circuit/type';

interface ICircuitListCard {
    circuit: Circuit;
}

export function CircuitListCard({ circuit }: ICircuitListCard) {
    return (
        <Card className={'card'}>
            <CardContent>
                <CardHeader
                    title={
                        <NextLink className={'link'} href={`/circuits/${circuit.ref}`}>
                            {circuit.name}
                        </NextLink>
                    }
                />
                <Typography>Country: {circuit.country}</Typography>
                <Typography>Location: {circuit.location}</Typography>
                <Typography>Latitude: {circuit.latitude}</Typography>
                <Typography>Longitude: {circuit.longitude}</Typography>
                <Typography>Altitude: {circuit.altitude}m</Typography>
                <Link href={circuit.wiki_url} target={'_blank'} rel={'noopener'} className={'link'}>
                    Wiki
                </Link>
            </CardContent>
        </Card>
    );
}
