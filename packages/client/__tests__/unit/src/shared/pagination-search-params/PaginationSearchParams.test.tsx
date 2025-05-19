import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePathname, useSearchParams } from 'next/navigation';

import { RouterMock } from '~tests-utils/router/Router.mock';

import { PaginationSearchParams } from '~shared/ui/pagination';

jest.mock('next/navigation');

describe('<PaginationSearchParams />', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'location', {
            value: new URL('http://localhost:3000'),
            writable: true,
        });

        (useSearchParams as jest.Mock).mockReturnValue({
            get: jest
                .fn()
                .mockImplementation((name) =>
                    new URLSearchParams(window.location.search).get(name),
                ),
            toString: jest
                .fn()
                .mockImplementation(() => new URLSearchParams(window.location.search).toString()),
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should render pagination search params', () => {
        render(
            <RouterMock>
                <PaginationSearchParams totalCount={1} />
            </RouterMock>,
        );
    });
    it('pagination item should have page search param', () => {
        const page = 2;

        (usePathname as jest.Mock).mockReturnValue('pathname');

        const { getByRole } = render(
            <RouterMock>
                <PaginationSearchParams totalCount={24} />
            </RouterMock>,
        );

        const secondPageButton = getByRole('link', { name: String(page) });

        expect(secondPageButton).toHaveAttribute('href', `pathname?page=${page}`);
    });
    it('should render correct pagination buttons when current page is between first page and last page', () => {
        const page = 10;
        const pagesCount = 5;
        const perPage = 12;

        const totalCount = page * pagesCount * perPage;

        const expectedPages = [1, 8, 9, 10, 11, 12, page * pagesCount];

        (usePathname as jest.Mock).mockReturnValue('pathname');
        window.location.search = `?page=${page}`;

        const { getByRole } = render(
            <RouterMock>
                <PaginationSearchParams
                    totalCount={totalCount}
                    pagesCount={pagesCount}
                    perPage={perPage}
                />
            </RouterMock>,
        );

        expectedPages.forEach((page) => {
            expect(getByRole('link', { name: String(page) })).toBeVisible();
        });
    });
    it('should show only one button to navigate to the first page', () => {
        const page = 2;
        const pagesCount = 5;
        const perPage = 12;

        const totalCount = page * pagesCount * perPage;

        (usePathname as jest.Mock).mockReturnValue('pathname');
        window.location.search = `?page=${page}`;

        const { getAllByRole } = render(
            <RouterMock>
                <PaginationSearchParams
                    totalCount={totalCount}
                    pagesCount={pagesCount}
                    perPage={perPage}
                />
            </RouterMock>,
        );

        const firstPageButtons = getAllByRole('link', { name: String(page) });

        expect(firstPageButtons.length).toBe(1);
    });
    it('should render last page button if pagination is close to the end and difference between current page and last page is less than pagesCount', () => {
        const page = 5;
        const pagesCount = 5;
        const perPage = 12;

        const totalCount = page * pagesCount * perPage;
        const lastPage = page * pagesCount;

        (usePathname as jest.Mock).mockReturnValue('pathname');
        window.location.search = `?page=${lastPage - pagesCount}`;

        const { getByRole } = render(
            <RouterMock>
                <PaginationSearchParams
                    totalCount={totalCount}
                    pagesCount={pagesCount}
                    perPage={perPage}
                />
            </RouterMock>,
        );

        const lastPageButton = getByRole('link', { name: String(lastPage) });

        expect(lastPageButton).toBeVisible();
    });
});
