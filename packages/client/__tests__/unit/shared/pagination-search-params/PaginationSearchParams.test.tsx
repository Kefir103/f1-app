import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { RouterMock } from '~tests-utils/router/Router.mock';

import { PaginationSearchParams } from '~shared/ui/pagination-search-params';

jest.mock('next/navigation');

describe('<PaginationSearchParams />', () => {
    it('should render pagination search params', () => {
        render(
            <RouterMock>
                <PaginationSearchParams totalCount={1} />
            </RouterMock>,
        );
    });
    it('should change url on pagination click', () => {
        const pushMock = jest.fn();

        (usePathname as jest.Mock).mockReturnValue('pathname');

        (useRouter as jest.Mock).mockReturnValue({
            push: pushMock,
        });

        render(
            <RouterMock push={pushMock}>
                <PaginationSearchParams totalCount={24} />
            </RouterMock>,
        );

        const secondPageButton = screen.getByRole('button', { name: 'Go to page 2' });

        fireEvent.click(secondPageButton);

        expect(useSearchParams).toHaveBeenCalled();
        expect(usePathname).toHaveBeenCalled();
        expect(pushMock).toHaveBeenCalledWith('pathname?page=2');
    });
});
