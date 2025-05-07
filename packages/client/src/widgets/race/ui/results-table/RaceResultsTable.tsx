'use client'

import NextLink from 'next/link';

import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { Typography } from '~shared/ui/typography/Typography';

import type { ResultType } from '~entities/result';
import { ResultTable } from '~entities/result/ui';

export interface IResultsTableProps {
    results: ResultType[];
}

export function RaceResultsTable({ results }: IResultsTableProps) {
    const additionalColumns = useMemo(
        (): ColumnDef<ResultType>[] => [
            {
                accessorKey: 'driver',
                header: 'Driver',
                cell: ({
                    row: {
                        original: { driver },
                    },
                }) => (
                    <NextLink
                        className={'link'}
                        href={`/drivers/${driver.ref}`}
                        title={`Driver: ${driver.first_name} ${driver.last_name}`}
                        target={'_blank'}
                    >
                        {driver.first_name} {driver.last_name}
                    </NextLink>
                ),
            },
            {
                accessorKey: 'constructor_entity',
                header: 'Constructor',
                cell: ({
                    row: {
                        original: { constructor_entity },
                    },
                }) => (
                    <NextLink
                        className={'link'}
                        href={`/constructors/${constructor_entity.ref}`}
                        title={`Constructor: ${constructor_entity.name}`}
                        target={'_blank'}
                    >
                        {constructor_entity.name}
                    </NextLink>
                ),
            },
        ],
        [],
    );

    return (
        <>
            <Typography.Title level={2}>Race results</Typography.Title>
            <ResultTable results={results} entityColumns={additionalColumns} />
        </>
    );
}
