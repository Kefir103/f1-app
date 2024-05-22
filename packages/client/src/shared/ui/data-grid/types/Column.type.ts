import { ReactElement } from 'react';
import { TableCellProps } from '@mui/material';

export interface DataGridColumnRowCellOptions extends TableCellProps {}

export interface DataGridColumn<T> {
    field: keyof T;
    title: string;
    align?: TableCellProps['align'];
    render?: (value: any, entity: T, index: number) => ReactElement | string;
    rowOptions?: {
        cellOptions?: DataGridColumnRowCellOptions;
    }
}
