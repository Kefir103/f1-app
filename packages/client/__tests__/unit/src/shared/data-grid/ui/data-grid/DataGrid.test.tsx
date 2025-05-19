import { render } from '@testing-library/react';
import { ColumnDef, getCoreRowModel } from '@tanstack/react-table';

import { DataGrid } from '~shared/ui/data-grid';

describe('<DataGrid />', () => {
    it('should render column value by field name', () => {
        const tableData = [{ id: 1 }];

        const tableColumns: ColumnDef<(typeof tableData)[0]>[] = [
            {
                accessorKey: 'id',
                header: 'Id',
            },
        ];

        const { getAllByRole, getByRole } = render(
            <DataGrid
                data={tableData}
                columns={tableColumns}
                getCoreRowModel={getCoreRowModel()}
            />,
        );

        expect(getByRole('columnheader', { name: 'Id' })).toBeInTheDocument();
        expect(getAllByRole('row')[1].querySelector('td')).toHaveTextContent(`${tableData[0].id}`);
    });

    it('should render empty string if value is nullable', () => {
        const tableData = [{ someValue: null }];

        const tableColumns: ColumnDef<(typeof tableData)[0]>[] = [
            {
                accessorKey: 'someValue',
                header: 'Some nullable value',
            },
        ];

        const { getAllByRole } = render(
            <DataGrid
                data={tableData}
                columns={tableColumns}
                getCoreRowModel={getCoreRowModel()}
            />,
        );

        expect(getAllByRole('row')[1].querySelector('td')).toHaveTextContent('');
    });

    it('should add additional class to table body cells className via meta.props.cell without overriding default class', () => {
        const tableData = [{ name: 'name' }];
        const additionalClassName = 'some-additional-class';

        const tableColumns: ColumnDef<(typeof tableData)[0]>[] = [
            {
                accessorKey: 'name',
                header: 'Name',
                meta: {
                    props: {
                        cell: () => ({
                            className: additionalClassName,
                        }),
                    },
                },
            },
        ];

        const { getAllByRole } = render(
            <DataGrid
                data={tableData}
                columns={tableColumns}
                getCoreRowModel={getCoreRowModel()}
            />,
        );

        expect(getAllByRole('row')[1].querySelector('td')).toHaveClass(additionalClassName);
    });

    it('should render empty component if DataGrid data is empty', () => {
        const tableData: { some_field: any }[] = new Array(0);

        const tableColumns: ColumnDef<(typeof tableData)[0]>[] = [
            {
                accessorKey: 'some_field',
                header: 'Some title',
            },
        ];

        const { getByText } = render(
            <DataGrid
                data={tableData}
                columns={tableColumns}
                getCoreRowModel={getCoreRowModel()}
            />,
        );

        expect(getByText('No data')).toBeInTheDocument();
    });
});
