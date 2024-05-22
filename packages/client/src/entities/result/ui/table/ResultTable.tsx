import { DataGrid, DataGridColumnType } from '~shared/ui/data-grid';

import type { ResultType } from '~entities/result';
import type { StatusType } from '~entities/status';

import { ResultPosition } from '~entities/result/model';

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
            render: (position, resultEntity) => {
                if (resultEntity.laps === 0) {
                    return ResultPosition.DID_NOT_STARTED;
                }

                if (!position) {
                    return ResultPosition.DID_NOT_FINISHED;
                }

                return position;
            },
        },
        ...entityColumns,
        {
            field: 'fastest_lap_time',
            title: 'Fastest lap time',
            render: (fastestLapTime) => fastestLapTime || '-',
        },
        {
            field: 'fastest_lap_rank',
            title: 'Fastest lap rank',
        },
        {
            field: 'fastest_lap_number',
            title: 'Fastest lap number',
            render: (fastestLapNumber) => fastestLapNumber || '-',
        },
        {
            field: 'points',
            title: 'Points',
        },
        {
            field: 'laps',
            title: 'Laps',
        },
        {
            field: 'status',
            title: 'Status',
            render: ({ status }: StatusType) => status,
        },
    ];

    return (
        <DataGrid rowKey={(entity) => entity.id} columns={columns} data={results} size={'small'} />
    );
}

ResultTable.defaultProps = {
    entityColumns: [],
};
