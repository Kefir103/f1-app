import { Typography } from '~shared/ui/typography/Typography';

import { CircuitType } from '~entities/circuit';

interface ICircuitInfoProps {
    circuit: CircuitType;
}

export function CircuitInfo({ circuit }: ICircuitInfoProps) {
    return (
        <>
            <Typography.Title level={1}>{circuit.name}</Typography.Title>
            <Typography.Paragraph>
                <a className={'link'} href={circuit.wiki_url} target={'_blank'}>
                    Wiki
                </a>
            </Typography.Paragraph>
            <Typography.Paragraph>Country: {circuit.country}</Typography.Paragraph>
            <Typography.Paragraph>Location: {circuit.location}</Typography.Paragraph>
            <Typography.Paragraph>Latitude: {circuit.latitude}</Typography.Paragraph>
            <Typography.Paragraph>Longitude: {circuit.longitude}</Typography.Paragraph>
            <Typography.Paragraph>Altitude: {circuit.altitude}m</Typography.Paragraph>
        </>
    );
}
