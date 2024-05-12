import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import RacesPage from '~app/races/page';
import { RACE_URLS } from '~entities/race/api';

import { RacesMock } from '~mocks/entities/race/Race.mock';

import { RouterMock } from '~tests-utils/router/Router.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('<RacesPage />', () => {
    it('should renders correctly', async () => {
        MockAdapter.onGet(RACE_URLS.index).replyOnce(200, {
            data: RacesMock,
            count: RacesMock.length,
        });

        const { getByRole } = await render(
            await RouterMock({
                children: await RacesPage({
                    searchParams: {},
                }),
            }),
        );

        await expect(getByRole('link', { name: RacesMock[0].name })).toBeInTheDocument();
        await expect(getByRole('link', { name: RacesMock[1].name })).toBeInTheDocument();
    });
});
