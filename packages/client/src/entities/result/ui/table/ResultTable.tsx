'use client';

import { useMemo } from 'react';
import { ColumnDef, getCoreRowModel } from '@tanstack/react-table';

import { DataGrid } from '~shared/ui/data-grid';

import type { ResultType } from '~entities/result';
import { ResultTableFastestLapFormatter } from '~entities/result/ui';
import { ResultPosition } from '~entities/result/model';

interface IResultTableProps {
    results: ResultType[];
    entityColumns: ColumnDef<ResultType>[];
}

export function ResultTable({ results, entityColumns = [] }: IResultTableProps) {
    const columns = useMemo(
        (): ColumnDef<ResultType>[] => [
            {
                accessorKey: 'position',
                header: 'Position',
                cell: ({ row, getValue }) => {
                    if (row.original.laps === 0) {
                        return ResultPosition.DID_NOT_STARTED;
                    }

                    if (!getValue()) {
                        return ResultPosition.DID_NOT_FINISHED;
                    }

                    return getValue();
                },
            },
            ...entityColumns,
            {
                accessorKey: 'fastest_lap_time',
                header: 'Fastest lap time',
                cell: ({ getValue }) => getValue() || '-',
                meta: {
                    props: {
                        cell: (_, row) => ({
                            className: ResultTableFastestLapFormatter.getFastestLapCellClassName(
                                row.original.fastest_lap_rank,
                            ),
                        }),
                    },
                },
            },
            {
                accessorKey: 'fastest_lap_rank',
                header: 'Fastest lap rank',
                meta: {
                    props: {
                        cell: (_, row) => ({
                            className: ResultTableFastestLapFormatter.getFastestLapCellClassName(
                                row.original.fastest_lap_rank,
                            ),
                        }),
                    },
                },
            },
            {
                accessorKey: 'fastest_lap_number',
                header: 'Fastest lap number',
                cell: ({ getValue }) => getValue() || '-',
                meta: {
                    props: {
                        cell: (_, row) => ({
                            className: ResultTableFastestLapFormatter.getFastestLapCellClassName(
                                row.original.fastest_lap_rank,
                            ),
                        }),
                    },
                },
            },
            {
                accessorKey: 'points',
                header: 'Points',
            },
            {
                accessorKey: 'laps',
                header: 'Laps',
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({
                    row: {
                        original: { status },
                    },
                }) => status.status,
            },
        ],
        [],
    );

    return (
        <DataGrid<ResultType>
            columns={columns}
            data={results}
            getCoreRowModel={getCoreRowModel()}
        />
    );
}
