import { Typography } from '@mui/material';

import type { ResultType } from '~entities/result';
import { ResultTable } from '~entities/result/ui';

import type { DataGridColumnType } from '~shared/ui/data-grid';

export interface IResultsTableProps {
    results: ResultType[];
}

export function RaceResultsTable({ results }: IResultsTableProps) {
    const additionalColumns: DataGridColumnType<ResultType>[] = [
        {
            field: 'driver_number',
            title: 'Driver number',
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
