import NextLink from 'next/link';
import { Typography } from '@mui/material';

import type { ResultType } from '~entities/result';
import { ResultTable } from '~entities/result/ui';

import type { DriverType } from '~entities/driver';
import type { Constructor } from '~entities/constructor';

import type { DataGridColumnType } from '~shared/ui/data-grid';

export interface IResultsTableProps {
    results: ResultType[];
}

export function RaceResultsTable({ results }: IResultsTableProps) {
    const additionalColumns: DataGridColumnType<ResultType>[] = [
        {
            field: 'driver',
            title: 'Driver',
            render: (driver: DriverType) => (
                <NextLink
                    className={'link'}
                    href={`/drivers/${driver.ref}`}
                    title={`Driver: ${driver.first_name} ${driver.last_name}`}
                    target={'_blank'}
                >
                    {driver.first_name} {driver.last_name}
                </NextLink>
            ),
        },
        {
            field: 'constructor_entity',
            title: 'Constructor',
            render: (constructor: Constructor) => (
                <NextLink
                    className={'link'}
                    href={`/constructors/${constructor.ref}`}
                    title={`Constructor: ${constructor.name}`}
                    target={'_blank'}
                >
                    {constructor.name}
                </NextLink>
            ),
        },
    ];

    return (
        <>
            <Typography variant={'h2'} component={'h2'} className={'mb-2 mt-4 text-2xl font-bold'}>
                Race results
            </Typography>
            <ResultTable results={results} entityColumns={additionalColumns} />
        </>
    );
}
