import { DataGrid, DataGridColumnType } from '~shared/ui/data-grid';

import type { ResultType } from '~entities/result';
import type { StatusType } from '~entities/status';

import { ResultPosition } from '~entities/result/model';
import { ResultTableFastestLapFormatter } from '~entities/result/ui';

interface IResultTableProps {
    results: ResultType[];
    entityColumns: DataGridColumnType<ResultType>[];
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
            rowOptions: {
                cellOptions: {
                    className: (_: any, { fastest_lap_rank }: ResultType) =>
                        ResultTableFastestLapFormatter.getFastestLapCellClassName(fastest_lap_rank),
                },
            },
        },
        {
            field: 'fastest_lap_rank',
            title: 'Fastest lap rank',
            rowOptions: {
                cellOptions: {
                    className: (fastestLapRank: number) =>
                        ResultTableFastestLapFormatter.getFastestLapCellClassName(fastestLapRank),
                },
            },
        },
        {
            field: 'fastest_lap_number',
            title: 'Fastest lap number',
            render: (fastestLapNumber) => fastestLapNumber || '-',
            rowOptions: {
                cellOptions: {
                    className: (_: any, { fastest_lap_rank }: ResultType) =>
                        ResultTableFastestLapFormatter.getFastestLapCellClassName(fastest_lap_rank),
                },
            },
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
