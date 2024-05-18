import { Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import moment from 'moment';

import type { Race } from '~entities/race';

interface IRaceInfoProps {
    race: Race;
}

export function RaceInfo({ race }: IRaceInfoProps) {
    return (
        <>
            <Typography variant={'h1'} component={'h1'} className={'mb-5 text-5xl font-bold'}>
                {race.name}
            </Typography>
            <Typography className={'mb-2'}>
                Circuit:{' '}
                <NextLink
                    className={'link'}
                    href={`/circuits/${race.circuit.ref}`}
                    title={`Circuit: ${race.circuit.name}`}
                >
                    {race.circuit.name}
                </NextLink>
            </Typography>
            <Typography className={'mb-2'}>
                Season:{' '}
                <NextLink
                    className={'link'}
                    href={`/seasons/${race.year}`}
                    title={`Season: ${race.year}`}
                >
                    {race.year}
                </NextLink>
            </Typography>
            <Typography className={'mb-2'}>Round: {race.round}</Typography>
            <Typography className={'mb-2'}>
                Race date: {moment(race.date).format('DD.MM.YYYY')}
            </Typography>
            <Link className={'link'} href={race.wiki_url} title={'Wiki'}>
                Wiki
            </Link>
            <Typography className={'my-2'}>
                FP1 Date:{' '}
                {moment(race.fp1_date).isValid()
                    ? moment(race.fp1_date).format('DD.MM.YYYY')
                    : 'Unknown'}
            </Typography>
            <Typography className={'mb-2'}>
                FP2 Date:{' '}
                {moment(race.fp2_date).isValid()
                    ? moment(race.fp2_date).format('DD.MM.YYYY')
                    : 'Unknown'}
            </Typography>
            <Typography className={'mb-2'}>
                FP3 Date:{' '}
                {moment(race.fp3_date).isValid()
                    ? moment(race.fp3_date).format('DD.MM.YYYY')
                    : 'Unknown'}
            </Typography>
            <Typography className={'mb-2'}>
                Qualifying date:{' '}
                {moment(race.qualifying_date).isValid()
                    ? moment(race.qualifying_date).format('DD.MM.YYYY')
                    : 'Unknown'}
            </Typography>
            <Typography>
                Sprint date:{' '}
                {moment(race.sprint_date).isValid()
                    ? moment(race.sprint_date).format('DD.MM.YYYY')
                    : 'Unknown'}
            </Typography>
        </>
    );
}
