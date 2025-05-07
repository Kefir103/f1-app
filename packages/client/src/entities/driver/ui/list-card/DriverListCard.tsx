import moment from 'moment';
import NextLink from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '~shadcn/ui/card';

import { Typography } from '~shared/ui/typography/Typography';

import type { DriverType } from '~entities/driver';

interface IDriverListCard {
    driver: DriverType;
}

export function DriverListCard({ driver }: IDriverListCard) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Typography.Title level={3}>
                        <NextLink
                            className={'link-white'}
                            href={`/drivers/${driver.ref}`}
                            title={`${driver.first_name} ${driver.last_name}`}
                        >
                            {driver.first_name} {driver.last_name}{' '}
                            {driver.code ? `(${driver.code})` : ''}
                        </NextLink>
                    </Typography.Title>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Typography>
                    Team:{' '}
                    <NextLink
                        className={'link'}
                        href={`/constructors/${driver.constructor_entity.ref}`}
                        title={`Team: ${driver.constructor_entity.name}`}
                    >
                        {driver.constructor_entity.name}
                    </NextLink>
                </Typography>
                <Typography>
                    Date of birth: {moment(driver.date_of_birth).format('DD.MM.YYYY')} (age{' '}
                    {moment(Date.now()).diff(driver.date_of_birth, 'years')})
                </Typography>
                <Typography>Nationality: {driver.nationality}</Typography>
                <Typography>Wins: {driver.wins_count.wins_count}</Typography>
                <Typography>Pole positions: {driver.poles_count.poles_count}</Typography>
                <a
                    href={driver.wiki_url}
                    target={'_blank'}
                    rel={'noopener'}
                    className={'link'}
                >
                    Wiki
                </a>
            </CardContent>
        </Card>
    );
}
