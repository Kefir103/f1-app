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
        router.push(`/drivers/${driver._id}`);
    };

    return (
        <Card className={'card'} onClick={onCardClick}>
            <CardContent>
                <CardHeader
                    title={
                        <Typography variant={'h2'}>
                            {driver.firstName} {driver.lastName}{' '}
                            {driver.code ? `(${driver.code})` : ''}
                        </Typography>
                    }
                />
                <Typography>
                    Date of birth: {moment(driver.dateOfBirth).format('DD.MM.YYYY')} (age{' '}
                    {moment(Date.now()).diff(driver.dateOfBirth, 'years')})
                </Typography>
                <Typography>Nationality: {driver.nationality}</Typography>
                <Typography>Wins: {driver.winsCount}</Typography>
                <Typography>Pole positions: {driver.polesCount}</Typography>
                <Link
                    href={driver.wikiUrl}
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
