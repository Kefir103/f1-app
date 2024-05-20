import { render } from '@testing-library/react';

import { DataGrid, DataGridColumnType } from '~shared/ui/data-grid';

describe('<DataGrid />', () => {
    it('should render column value by field name', () => {
        const tableData = [{ id: 1 }];

        const tableColumns: DataGridColumnType<(typeof tableData)[0]>[] = [
            {
                field: 'id',
                title: 'Id',
            },
        ];

        const { getAllByRole, getByRole } = render(
            <DataGrid data={tableData} columns={tableColumns} rowKey={(entity) => entity.id} />,
        );

        expect(getByRole('columnheader', { name: 'Id' })).toBeInTheDocument();
        expect(getAllByRole('row')[1].querySelector('td')).toHaveTextContent(`${tableData[0].id}`);
    });

    it('should render empty string if value is nullable', () => {
        const tableData = [{ someValue: null }];

        const tableColumns: DataGridColumnType<(typeof tableData)[0]>[] = [
            {
                field: 'someValue',
                title: 'Some nullable value',
            },
        ];

        const { getAllByRole } = render(
            <DataGrid data={tableData} columns={tableColumns} rowKey={() => 1} />,
        );

        expect(getAllByRole('row')[1].querySelector('td')).toHaveTextContent('');
    });
});
