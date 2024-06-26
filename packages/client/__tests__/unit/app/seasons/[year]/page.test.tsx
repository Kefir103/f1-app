import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import SeasonPage from '~app/seasons/[year]/page';

import { SEASON_URLS } from '~entities/season/api';

import { SeasonsMock } from '~mocks/entities/season/Season.mock';
import { RouterMock } from '~tests-utils/router/Router.mock';
import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('<SeasonPage />', () => {
    it('should render correctly', async () => {
        const seasonMock = SeasonsMock[0];

        MockAdapter.onGet(SEASON_URLS.year(seasonMock.year)).reply(200, seasonMock);

        const { getByRole } = await render(
            await RouterMock({
                children: await SeasonPage({
                    params: { year: seasonMock.year },
                }),
            }),
        );

        expect(getByRole('heading', { name: `Season ${seasonMock.year}` })).toBeInTheDocument();
    });

    it('should render breadcrumbs correctly', async () => {
        const seasonMock = SeasonsMock[0];

        MockAdapter.onGet(SEASON_URLS.year(seasonMock.year)).reply(200, seasonMock);

        const { getByTitle } = await render(
            await RouterMock({
                children: await SeasonPage({
                    params: { year: seasonMock.year },
                }),
            }),
        );

        expect(getByTitle(getBreadcrumbTitle('Home'))).toBeInTheDocument();
        expect(getByTitle(getBreadcrumbTitle('Seasons'))).toBeInTheDocument();
        expect(getByTitle(getBreadcrumbTitle(String(seasonMock.year)))).toBeInTheDocument();
    });
});
