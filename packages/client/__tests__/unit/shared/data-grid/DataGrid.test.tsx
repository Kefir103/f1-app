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

    it('should render cell value via custom render function', () => {
        const tableData = [{ name: 'name' }];

        const tableColumns: DataGridColumnType<(typeof tableData)[0]>[] = [
            {
                field: 'name',
                title: 'Name',
                render: (name) => name.toUpperCase(),
            },
        ];

        const { getAllByRole } = render(
            <DataGrid data={tableData} columns={tableColumns} rowKey={() => 1} />,
        );

        expect(getAllByRole('row')[1].querySelector('td')).toHaveTextContent(
            tableData[0].name.toUpperCase(),
        );
    });

    it('should render cell union value via custom render function', () => {
        const tableData = [{ name: 'name', surname: 'surname' }];

        const tableColumns: DataGridColumnType<(typeof tableData)[0]>[] = [
            {
                field: 'name',
                title: 'Name + Surname',
                render: (_, entity) => `${entity.name} ${entity.surname}`,
            },
        ];

        const { getAllByRole } = render(
            <DataGrid data={tableData} columns={tableColumns} rowKey={() => 1} />,
        );

        expect(getAllByRole('row')[1].querySelector('td')).toHaveTextContent(
            `${tableData[0].name} ${tableData[0].surname}`,
        );
    });

    it('should add additional class to table body cells className via rowOptions.cellOptions without overriding default class', () => {
        const tableData = [{ name: 'name' }];
        const additionalClassName = 'some-additional-class';

        const tableColumns: DataGridColumnType<(typeof tableData)[0]>[] = [
            {
                field: 'name',
                title: 'Name',
                rowOptions: {
                    cellOptions: {
                        className: () => additionalClassName,
                    },
                },
            },
        ];

        const { getAllByRole } = render(
            <DataGrid data={tableData} columns={tableColumns} rowKey={() => 1} />,
        );

        expect(getAllByRole('row')[1].querySelector('td')).toHaveClass(additionalClassName);
    });
});
