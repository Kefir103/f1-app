import { ReactElement } from 'react';
import { TableCellProps } from '@mui/material';

export type DataGridColumnRowCellOptions<T> = Omit<TableCellProps, 'className'> & {
    className: (value: any, entity: T, index: number) => string;
};

export interface DataGridColumn<T> {
    field: keyof T;
    title: string;
    align?: TableCellProps['align'];
    render?: (value: any, entity: T, index: number) => ReactElement | string;
    rowOptions?: {
        cellOptions?: DataGridColumnRowCellOptions<T>;
    };
}
