'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '~shadcn/ui/pagination';

interface IPaginationSearchParams {
    totalCount: number;
    pagesCount?: number;
    perPage?: number;
}

export function PaginationSearchParams({
    totalCount,
    pagesCount = 5,
    perPage = 12,
}: IPaginationSearchParams) {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const count = Math.ceil(totalCount / Number(searchParams?.get('perPage') || perPage));

    const getCurrentPage = () => {
        return Number(searchParams?.get('page') ?? 1);
    };

    const getHref = (params: string) => {
        return `${pathname}?${params}`;
    };

    const getPreviousPageHref = () => {
        const params = new URLSearchParams(searchParams?.toString());

        params.set('page', String(getCurrentPage() - 1));

        return getHref(params.toString());
    };

    const getNextPageHref = () => {
        const params = new URLSearchParams(searchParams?.toString());

        params.set('page', String(getCurrentPage() + 1));

        return getHref(params.toString());
    };

    const renderPaginationPageLink = (page: number, params: string) => {
        const _params = new URLSearchParams(params);

        _params.set('page', String(page));

        return (
            <PaginationItem key={`pagination_${page}`}>
                <PaginationLink
                    href={getHref(_params?.toString())}
                    isActive={page === getCurrentPage()}
                >
                    {page}
                </PaginationLink>
            </PaginationItem>
        );
    };

    const renderItems = () => {
        const params = new URLSearchParams(searchParams?.toString());
        const currentPage = getCurrentPage();

        const items = [];

        let startPage =
            currentPage > Math.ceil(pagesCount / 2) ? currentPage - Math.floor(pagesCount / 2) : 1;

        for (
            let pageIndex = 0, page = startPage;
            page <= count && pageIndex < pagesCount;
            page++, pageIndex++
        ) {
            params.set('page', String(page));

            items.push(renderPaginationPageLink(page, params.toString()));
        }

        if (currentPage > Math.ceil(pagesCount / 2)) {
            items.unshift(
                renderPaginationPageLink(1, params.toString()),
                ...(currentPage - 1 > 1
                    ? [
                          <PaginationItem key={`pagination_prev_ellipsis`}>
                              <PaginationEllipsis />
                          </PaginationItem>,
                      ]
                    : []),
            );
        }

        if (currentPage < count && count - currentPage > Math.floor(pagesCount / 2)) {
            items.push(
                ...(count - currentPage > Math.floor(pagesCount / 2)
                    ? [
                          <PaginationItem key={`pagination_next_ellipsis`}>
                              <PaginationEllipsis />
                          </PaginationItem>,
                      ]
                    : []),
                renderPaginationPageLink(count, params.toString()),
            );
        }

        return items;
    };

    return (
        <Pagination className={'mt-1 justify-start'}>
            <PaginationContent>
                {getCurrentPage() > 1 && (
                    <PaginationItem>
                        <PaginationPrevious href={getPreviousPageHref()} />
                    </PaginationItem>
                )}
                {renderItems()}
                {getCurrentPage() < count && (
                    <PaginationItem>
                        <PaginationNext href={getNextPageHref()} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
