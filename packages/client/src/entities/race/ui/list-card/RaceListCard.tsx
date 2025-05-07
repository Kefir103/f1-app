import NextLink from 'next/link';
import moment from 'moment';
import { Card, CardHeader, CardTitle, CardContent } from '~shadcn/ui/card';

import { Typography } from '~shared/ui/typography/Typography';

import type { Race } from '~entities/race';

interface IRaceListCard {
    race: Race;
}

export function RaceListCard({ race }: IRaceListCard) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Typography.Title level={3}>
                        <NextLink
                            className={'link-white'}
                            href={`/races/${race.id}`}
                            title={race.name}
                        >
                            {race.name}
                        </NextLink>
                    </Typography.Title>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Typography>
                    Circuit:{' '}
                    <NextLink
                        className={'link'}
                        href={`/circuits/${race.circuit.ref}`}
                        title={`Circuit: ${race.circuit.name}`}
                    >
                        {race.circuit.name}
                    </NextLink>
                </Typography>
                <Typography>
                    Year:{' '}
                    <NextLink
                        className={'link'}
                        href={`/seasons/${race.year}`}
                        title={`Year: ${race.year}`}
                    >
                        {race.year}
                    </NextLink>
                </Typography>
                <Typography>Round: {race.round}</Typography>
                <Typography>Date: {moment(race.date).format('DD.MM.YYYY')}</Typography>
                {race.winner && (
                    <Typography>
                        Winner:{' '}
                        <NextLink
                            className={'link'}
                            href={`/drivers/${race.winner.ref}`}
                            title={`Winner: ${race.winner.first_name} ${race.winner.last_name}`}
                            target={'_blank'}
                        >
                            {race.winner.first_name} {race.winner.last_name}
                        </NextLink>
                        {' ('}
                        <NextLink
                            className={'link'}
                            href={`/constructors/${race.winner.constructor_entity.ref}`}
                            title={`Winner Constructor: ${race.winner.constructor_entity.name}`}
                            target={'_blank'}
                        >
                            {race.winner.constructor_entity.name}
                        </NextLink>
                        )
                    </Typography>
                )}
                <a
                    className={'link'}
                    href={race.wiki_url}
                    target={'_blank'}
                    rel={'noopener'}
                    title={'Wiki'}
                >
                    Wiki
                </a>
            </CardContent>
        </Card>
    );
}
