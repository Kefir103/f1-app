import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';
import { useSearchParams } from 'next/navigation';

import { URLS } from '~shared/config/urls';

import SeasonsPage from '~app/seasons/page';

import { SeasonsMock } from '~mocks/entities/season/Season.mock';
import { RouterMock } from '~tests-utils/router/Router.mock';
import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

jest.mock('next/navigation');

describe('<SeasonsPage />', () => {
    beforeEach(() => {
        (useSearchParams as jest.Mock).mockReturnValue({
            get: jest.fn(),
        });
    });

    it('should render correctly', async () => {
        MockAdapter.onGet(URLS.season.index).reply(200, {
            data: SeasonsMock,
            count: SeasonsMock.length,
        });

        const { getByRole } = await render(
            await RouterMock({
                children: await SeasonsPage({ searchParams: {} }),
            }),
        );

        expect(getByRole('link', { name: `Season ${SeasonsMock[0].year}` })).toBeInTheDocument();
    });

    it('should render breadcrumbs correctly', async () => {
        MockAdapter.onGet(URLS.season.index).reply(200, {
            data: [],
            count: 0,
        });

        const { getByTitle } = await render(
            await RouterMock({
                children: await SeasonsPage({ searchParams: {} }),
            }),
        );

        expect(getByTitle(getBreadcrumbTitle('Home'))).toBeInTheDocument();
        expect(getByTitle(getBreadcrumbTitle('Seasons'))).toBeInTheDocument();
    });
});
