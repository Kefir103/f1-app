import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import RacePage from '~app/races/[id]/page';

import { RACE_URLS } from '~entities/race/api';

import { RacesMock } from '~mocks/entities/race/Race.mock';
import { RouterMock } from '~tests-utils/router/Router.mock';
import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('<RacePage />', () => {
    it('should renders correctly', async () => {
        const raceMock = RacesMock[0];

        MockAdapter.onGet(RACE_URLS.id(raceMock.id)).replyOnce(200, raceMock);

        const { getByRole } = await render(
            await RouterMock({
                children: await RacePage({ params: { id: raceMock.id } }),
            }),
        );

        expect(getByRole('heading', { name: raceMock.name })).toBeInTheDocument();
    });

    it('should render breadcrumbs correctly', async () => {
        const raceMock = RacesMock[0];

        MockAdapter.onGet(RACE_URLS.id(raceMock.id)).replyOnce(200, raceMock);

        const { getByTitle } = await render(
            await RouterMock({
                children: await RacePage({ params: { id: raceMock.id } }),
            }),
        );

        expect(getByTitle(getBreadcrumbTitle('Home'))).toBeInTheDocument();
        expect(getByTitle(getBreadcrumbTitle('Races'))).toBeInTheDocument();
        expect(getByTitle(getBreadcrumbTitle(raceMock.name))).toBeInTheDocument();
    });
});
