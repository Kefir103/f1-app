import moment from 'moment';
import NextLink from 'next/link';

import { DataGrid, DataGridColumnType } from '~shared/ui/data-grid';

import type { Race } from '~entities/race';
import type { CircuitType } from '~entities/circuit';

interface IRaceTableProps {
    races: Race[];
}

export function RaceTable({ races }: IRaceTableProps) {
    const columns: DataGridColumnType<Race>[] = [
        {
            field: 'round',
            title: 'Round',
        },
        {
            field: 'year',
            title: 'Season',
            render: (year) => (
                <NextLink href={`/seasons/${year}`} title={`Season: ${year}`} className={'link'}>
                    {year}
                </NextLink>
            ),
        },
        {
            field: 'name',
            title: 'Name',
        },
        {
            field: 'circuit',
            title: 'Circuit',
            render: (circuit: CircuitType) => (
                <NextLink
                    className={'link'}
                    href={`/circuits/${circuit.ref}`}
                    title={`Circuit: ${circuit.name}`}
                    target={'_blank'}
                >
                    {circuit.name}
                </NextLink>
            ),
        },
        {
            field: 'date',
            title: 'Race date',
            render: (date: Date) => moment(date).format('DD.MM.YYYY'),
        },
        {
            field: 'wiki_url',
            title: 'Wiki',
            render: (wikiUrl: string) => (
                <a className={'link'} href={wikiUrl} target={'_blank'}>
                    Wiki
                </a>
            ),
        },
    ];

    return <DataGrid data={races} columns={columns} rowKey={(race) => race.id} size={'small'} />;
}
