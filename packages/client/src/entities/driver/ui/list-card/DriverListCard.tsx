import { Card, CardContent, CardHeader, Link, Typography } from '@mui/material';
import moment from 'moment';
import NextLink from 'next/link';

import { DriverType } from '~entities/driver/type';

interface IDriverListCard {
    driver: DriverType;
}

export function DriverListCard({ driver }: IDriverListCard) {
    return (
        <Card className={'card'}>
            <CardContent>
                <CardHeader
                    title={
                        <NextLink
                            className={'link'}
                            href={`/drivers/${driver.ref}`}
                            title={`${driver.first_name} ${driver.last_name}`}
                        >
                            {driver.first_name} {driver.last_name}{' '}
                            {driver.code ? `(${driver.code})` : ''}
                        </NextLink>
                    }
                />
                <Typography>
                    Date of birth: {moment(driver.date_of_birth).format('DD.MM.YYYY')} (age{' '}
                    {moment(Date.now()).diff(driver.date_of_birth, 'years')})
                </Typography>
                <Typography>Nationality: {driver.nationality}</Typography>
                <Typography>Wins: {driver.wins_count}</Typography>
                <Typography>Pole positions: {driver.poles_count}</Typography>
                <Link
                    href={driver.wiki_url}
                    target={'_blank'}
                    rel={'noopener'}
                    className={'text-blue-500 underline'}
                >
                    Wiki
                </Link>
            </CardContent>
        </Card>
    );
}
