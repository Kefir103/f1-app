import { Typography } from '@mui/material';
import moment from 'moment';

import { useDriverServer } from '~entities/Driver/api/useDriverServer';

interface IDriverPage {
    params: {
        id: string;
    };
}

export default async function DriverPage({ params }: IDriverPage) {
    const { data: driver } = await useDriverServer({ id: params.id });

    return (
        <>
            <Typography variant={'h1'} component={'h1'} className={'mb-5 text-5xl font-bold'}>
                {driver.firstName} {driver.lastName} {driver.code ? `(${driver.code})` : ''}
            </Typography>
            <a className={'link'} href={driver.wikiUrl} target={'_blank'}>
                Wiki
            </a>
            <Typography className={'my-2'}>
                Date of birth: {moment(driver.dateOfBirth).format('DD.MM.YYYY')}
            </Typography>
            <Typography className={'my-2'}>Nationality: {driver.nationality}</Typography>
            <Typography className={'my-2'}>Wins: {driver.winsCount}</Typography>
            <Typography className={'my-2'}>Poles: {driver.polesCount}</Typography>
        </>
    );
}
