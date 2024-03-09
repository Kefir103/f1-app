'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, Link, Typography } from '@mui/material';
import moment from 'moment';

import { DriverType } from '~entities/Driver/type';

interface IDriverListCard {
    driver: DriverType;
}

export function DriverListCard({ driver }: IDriverListCard) {
    const router = useRouter();

    const onCardClick = () => {
        router.push(`/drivers/${driver.ref}`);
    };

    return (
        <Card className={'card'} onClick={onCardClick}>
            <CardContent>
                <CardHeader
                    title={
                        <Typography variant={'h2'}>
                            {driver.first_name} {driver.last_name}{' '}
                            {driver.code ? `(${driver.code})` : ''}
                        </Typography>
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
