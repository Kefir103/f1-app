'use client';

import { Cell, flexRender, Row, RowData, TableOptions, useReactTable } from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHead,
    TableRow,
} from '~shadcn/ui/table';

import { DataGridEmpty } from '~shared/ui/data-grid';

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        props?: {
            cell?: (cell: Cell<TData, TValue>, row: Row<TData>) => object;
        };
    }
}

export function DataGrid<T extends RowData>(props: TableOptions<T>) {
    const table = useReactTable<T>(props);

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id} scope={'col'}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext(),
                                      )}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {props.data?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                return (
                                    <TableCell
                                        key={cell.id}
                                        {...(cell.column.columnDef.meta?.props?.cell?.(cell, row) ||
                                            {})}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))
                ) : (
                    <DataGridEmpty colSpan={props.columns?.length ?? 0} />
                )}
            </TableBody>
        </Table>
    );
}
