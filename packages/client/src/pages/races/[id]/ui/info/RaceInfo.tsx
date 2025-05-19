import NextLink from 'next/link';
import moment from 'moment';

import { Typography } from '~shared/ui/typography/Typography';

import type { Race } from '~entities/race';

interface IRaceInfoProps {
    race: Race;
}

export function RaceInfo({ race }: IRaceInfoProps) {
    return (
        <>
            <Typography.Title level={1}>{race.name}</Typography.Title>
            <Typography.Paragraph>
                Circuit:{' '}
                <NextLink
                    className={'link'}
                    href={`/circuits/${race.circuit.ref}`}
                    title={`Circuit: ${race.circuit.name}`}
                >
                    {race.circuit.name}
                </NextLink>
            </Typography.Paragraph>
            <Typography.Paragraph>
                Season:{' '}
                <NextLink
                    className={'link'}
                    href={`/seasons/${race.year}`}
                    title={`Season: ${race.year}`}
                >
                    {race.year}
                </NextLink>
            </Typography.Paragraph>
            <Typography.Paragraph>Round: {race.round}</Typography.Paragraph>
            <Typography.Paragraph>
                Race date: {moment(race.date).format('DD.MM.YYYY')}
            </Typography.Paragraph>
            <Typography.Paragraph>
                <a className={'link'} href={race.wiki_url} title={'Wiki'}>
                    Wiki
                </a>
            </Typography.Paragraph>
            {race.winner && (
                <Typography.Paragraph>
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
                </Typography.Paragraph>
            )}
            <Typography.Paragraph>
                FP1 Date:{' '}
                {moment(race.fp1_date).isValid()
                    ? moment(race.fp1_date).format('DD.MM.YYYY')
                    : 'Unknown'}
            </Typography.Paragraph>
            <Typography.Paragraph>
                FP2 Date:{' '}
                {moment(race.fp2_date).isValid()
                    ? moment(race.fp2_date).format('DD.MM.YYYY')
                    : 'Unknown'}
            </Typography.Paragraph>
            <Typography.Paragraph>
                FP3 Date:{' '}
                {moment(race.fp3_date).isValid()
                    ? moment(race.fp3_date).format('DD.MM.YYYY')
                    : 'Unknown'}
            </Typography.Paragraph>
            <Typography.Paragraph>
                Qualifying date:{' '}
                {moment(race.qualifying_date).isValid()
                    ? moment(race.qualifying_date).format('DD.MM.YYYY')
                    : 'Unknown'}
            </Typography.Paragraph>
            <Typography.Paragraph>
                Sprint date:{' '}
                {moment(race.sprint_date).isValid()
                    ? moment(race.sprint_date).format('DD.MM.YYYY')
                    : 'Unknown'}
            </Typography.Paragraph>
        </>
    );
}
