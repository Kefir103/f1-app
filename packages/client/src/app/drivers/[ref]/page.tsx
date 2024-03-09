import { Typography } from '@mui/material';
import moment from 'moment';

import { useDriverServer } from '~entities/Driver/api/useDriverServer';

interface IDriverPage {
    params: {
        ref: string;
    };
}

export default async function DriverPage({ params }: IDriverPage) {
    const { data: driver } = await useDriverServer({ ref: params.ref });

    return (
        <>
            <Typography variant={'h1'} component={'h1'} className={'mb-5 text-5xl font-bold'}>
                {driver.first_name} {driver.last_name} {driver.code ? `(${driver.code})` : ''}
            </Typography>
            <a className={'link'} href={driver.wiki_url} target={'_blank'}>
                Wiki
            </a>
            <Typography className={'my-2'}>
                Date of birth: {moment(driver.date_of_birth).format('DD.MM.YYYY')}
            </Typography>
            <Typography className={'my-2'}>Nationality: {driver.nationality}</Typography>
            <Typography className={'my-2'}>Wins: {driver.wins_count}</Typography>
            <Typography className={'my-2'}>Poles: {driver.poles_count}</Typography>
        </>
    );
}
