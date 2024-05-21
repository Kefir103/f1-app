import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableOwnProps,
    TableRow,
} from '@mui/material';

import type { DataGridColumnType } from '~shared/ui/data-grid';

interface IDataGridProps<T extends object = {}> {
    data: T[];
    columns: DataGridColumnType<T>[];
    rowKey: (entity: T, index: number) => string | number;
    size: TableOwnProps['size'];
}

export function DataGrid<T extends object = {}>({
    data,
    columns,
    rowKey,
    size,
}: IDataGridProps<T>) {
    const getTableCellValue = (column: DataGridColumnType<T>, entity: T, index: number): string => {
        if (column.render) {
            return column.render(entity[column.field], entity, index);
        }

        return String(entity[column.field] ?? '');
    };

    return (
        <TableContainer component={Paper} className={'dark:bg-slate-900'}>
            <Table size={size}>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={`table_col_${String(column.field)}`}
                                className={'font-bold dark:text-amber-50'}
                                align={column.align || 'inherit'}
                                scope={'col'}
                            >
                                {column.title}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((entity, entityIndex) => (
                        <TableRow key={rowKey(entity, entityIndex)}>
                            {columns.map((column) => {
                                return (
                                    <TableCell
                                        className={
                                            'dark:border-t-2 dark:border-t-slate-700 dark:text-amber-50'
                                        }
                                        key={`table_row_${rowKey(entity, entityIndex)}_${String(
                                            column.field,
                                        )}`}
                                        align={column.align || 'inherit'}
                                    >
                                        {getTableCellValue(column, entity, entityIndex)}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

DataGrid.defaultProps = {
    size: 'medium',
};
