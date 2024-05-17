import { Typography } from '@mui/material';

import { CircuitType } from '~entities/circuit';

interface ICircuitInfoProps {
    circuit: CircuitType;
}

export function CircuitInfo({ circuit }: ICircuitInfoProps) {
    return (
        <>
            <Typography variant={'h1'} component={'h1'} className={'mb-5 text-5xl font-bold'}>
                {circuit.name}
            </Typography>
            <a className={'link'} href={circuit.wiki_url} target={'_blank'}>
                Wiki
            </a>
            <Typography className={'my-2'}>Country: {circuit.country}</Typography>
            <Typography className={'my-2'}>Location: {circuit.location}</Typography>
            <Typography className={'my-2'}>Latitude: {circuit.latitude}</Typography>
            <Typography className={'my-2'}>Longitude: {circuit.longitude}</Typography>
            <Typography className={'my-2'}>Altitude: {circuit.altitude}m</Typography>
        </>
    );
}
