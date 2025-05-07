import NextLink from 'next/link';
import moment from 'moment';

import { Typography } from '~shared/ui/typography/Typography';

import { DriverType } from '~entities/driver';

interface IDriverInfoProps {
    driver: DriverType;
}

export function DriverInfo({ driver }: IDriverInfoProps) {
    return (
        <>
            <Typography.Title level={1}>
                {driver.first_name} {driver.last_name} {driver.code ? `(${driver.code})` : ''}
            </Typography.Title>
            <Typography.Paragraph>
                <a className={'link'} href={driver.wiki_url} target={'_blank'}>
                    Wiki
                </a>
            </Typography.Paragraph>
            <Typography.Paragraph>
                Team:{' '}
                <NextLink
                    className={'link'}
                    href={`/constructors/${driver.constructor_entity.ref}`}
                    title={`Team: ${driver.constructor_entity.name}`}
                >
                    {driver.constructor_entity.name}
                </NextLink>
            </Typography.Paragraph>
            <Typography.Paragraph>
                Date of birth: {moment(driver.date_of_birth).format('DD.MM.YYYY')}
            </Typography.Paragraph>
            <Typography.Paragraph>Nationality: {driver.nationality}</Typography.Paragraph>
            <Typography.Paragraph>Wins: {driver.wins_count.wins_count}</Typography.Paragraph>
            <Typography.Paragraph>Poles: {driver.poles_count.poles_count}</Typography.Paragraph>
        </>
    );
}
