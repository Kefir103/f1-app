import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import SeasonsPage from '~app/seasons/page';

import { SEASON_URLS } from '~entities/season/api';

import { SeasonsMock } from '~mocks/entities/season/Season.mock';
import { RouterMock } from '~tests-utils/router/Router.mock';
import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('<SeasonsPage />', () => {
    it('should render correctly', async () => {
        MockAdapter.onGet(SEASON_URLS.index).reply(200, {
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
        MockAdapter.onGet(SEASON_URLS.index).reply(200, {
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
