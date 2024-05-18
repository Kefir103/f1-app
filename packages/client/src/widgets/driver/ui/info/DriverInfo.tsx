import NextLink from 'next/link';
import moment from 'moment';
import { Typography } from '@mui/material';

import { DriverType } from '~entities/driver';

interface IDriverInfoProps {
    driver: DriverType;
}

export function DriverInfo({ driver }: IDriverInfoProps) {
    return (
        <>
            <Typography variant={'h1'} component={'h1'} className={'mb-5 text-5xl font-bold'}>
                {driver.first_name} {driver.last_name} {driver.code ? `(${driver.code})` : ''}
            </Typography>
            <a className={'link'} href={driver.wiki_url} target={'_blank'}>
                Wiki
            </a>
            <Typography className={'my-2'}>
                Team:{' '}
                <NextLink
                    className={'link'}
                    href={`/constructors/${driver.constructor_entity.ref}`}
                    title={`Team: ${driver.constructor_entity.name}`}
                >
                    {driver.constructor_entity.name}
                </NextLink>
            </Typography>
            <Typography className={'my-2'}>
                Date of birth: {moment(driver.date_of_birth).format('DD.MM.YYYY')}
            </Typography>
            <Typography className={'my-2'}>Nationality: {driver.nationality}</Typography>
            <Typography className={'my-2'}>Wins: {driver.wins_count}</Typography>
            <Typography className={'my-2'}>Poles: {driver.poles_count}</Typography>
        </>
    );
}
