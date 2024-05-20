import { TableCellProps } from '@mui/material';

export interface DataGridColumn<T> {
    field: keyof T;
    title: string;
    align?: TableCellProps['align'];
}
