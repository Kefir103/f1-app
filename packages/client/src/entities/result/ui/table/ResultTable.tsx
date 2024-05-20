import { DataGrid, DataGridColumnType } from '~shared/ui/data-grid';

import type { ResultType } from '~entities/result';
import type { DataGridColumn } from '~shared/ui/data-grid/types/Column.type';

interface IResultTableProps {
    results: ResultType[];
    entityColumns: DataGridColumn<ResultType>[];
}

export function ResultTable({ results, entityColumns }: IResultTableProps) {
    const columns: DataGridColumnType<ResultType>[] = [
        {
            field: 'position',
            title: 'Position',
        },
        ...entityColumns,
        {
            field: 'fastest_lap_time',
            title: 'Fastest lap time',
        },
        {
            field: 'fastest_lap_rank',
            title: 'Fastest lap rank',
        },
        {
            field: 'fastest_lap_number',
            title: 'Fastest lap number',
        },
        {
            field: 'points',
            title: 'Points',
        },
        {
            field: 'laps',
            title: 'Laps',
        },
    ];

    return (
        <DataGrid rowKey={(entity) => entity.id} columns={columns} data={results} size={'small'} />
    );
}

ResultTable.defaultProps = {
    entityColumns: [],
};
