import Icon from '@mdi/react';
import { mdiCloudOffOutline } from '@mdi/js';
import { TableCell, TableRow } from '@mui/material';

interface IDataGridEmptyProps {
    message?: string;
    colSpan: number;
}

export function DataGridEmpty({ message, colSpan }: IDataGridEmptyProps) {
    return (
        <TableRow>
            <TableCell
                className={'py-4 dark:text-slate-200 dark:text-opacity-50'}
                align={'center'}
                colSpan={colSpan}
            >
                <div className={'flex w-full justify-center align-middle'}>
                    <Icon path={mdiCloudOffOutline} size={4} />
                </div>
                <span>{message}</span>
            </TableCell>
        </TableRow>
    );
}

DataGridEmpty.defaultProps = {
    message: 'No data',
};
