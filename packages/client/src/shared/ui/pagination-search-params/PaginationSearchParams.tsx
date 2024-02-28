'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination, PaginationItem } from '@mui/material';
import classNames from 'classnames';

interface IPaginationSearchParams {
    totalCount: number;
}

export function PaginationSearchParams({ totalCount }: IPaginationSearchParams) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const count = Math.ceil(totalCount / Number(searchParams.get('perPage') || 12));

    const onPaginationChange = (event: any, page: number) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set('page', String(page));

        router.push(`${pathname}?${params}`);
    };

    return (
        <Pagination
            className={'mt-1'}
            page={Number(searchParams.get('page') || 1)}
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    className={classNames('mr-1 text-white dark:hover:bg-slate-800', {
                        'dark:bg-slate-700': item.selected,
                    })}
                />
            )}
            count={count}
            onChange={onPaginationChange}
            color={'primary'}
            shape={'rounded'}
            variant={'outlined'}
            size={'large'}
        />
    );
}
