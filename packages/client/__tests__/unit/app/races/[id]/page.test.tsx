import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';
import moment from 'moment';

import RacePage from '~app/races/[id]/page';

import { RACE_URLS } from '~entities/race/api';

import { RacesMock } from '~mocks/entities/race/Race.mock';
import { RouterMock } from '~tests-utils/router/Router.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('<RacePage />', () => {
    it('should renders correctly', async () => {
        const raceMock = RacesMock[0];

        MockAdapter.onGet(RACE_URLS.id(raceMock.id)).replyOnce(200, raceMock);

        const { getByRole, getByText, getByTitle } = await render(
            await RouterMock({
                children: await RacePage({ params: { id: raceMock.id } }),
            }),
        );

        expect(getByRole('heading', { name: raceMock.name })).toBeInTheDocument();

        const season = getByTitle(`Season: ${raceMock.year}`);

        expect(season).toBeInTheDocument();
        expect(season).toHaveAttribute('href', `/seasons/${raceMock.year}`);

        expect(getByText(`Round: ${raceMock.round}`)).toBeInTheDocument();

        expect(
            getByText(`Race date: ${moment(raceMock.date).format('DD.MM.YYYY')}`),
        ).toBeInTheDocument();

        expect(getByRole('link', { name: 'Wiki' })).toBeInTheDocument();

        expect(
            getByText(`FP1 Date: ${moment(raceMock.fp1_date).format('DD.MM.YYYY')}`),
        ).toBeInTheDocument();
        expect(
            getByText(`FP2 Date: ${moment(raceMock.fp2_date).format('DD.MM.YYYY')}`),
        ).toBeInTheDocument();
        expect(
            getByText(`FP3 Date: ${moment(raceMock.fp3_date).format('DD.MM.YYYY')}`),
        ).toBeInTheDocument();

        expect(
            getByText(`Qualifying date: ${moment(raceMock.qualifying_date).format('DD.MM.YYYY')}`),
        ).toBeInTheDocument();

        expect(
            getByText(`Sprint date: ${moment(raceMock.sprint_date).format('DD.MM.YYYY')}`),
        ).toBeInTheDocument();
    });
    it('should render "Unknown" if dates are null', async () => {
        const raceMock = {
            ...RacesMock[0],
            fp1_date: null,
            fp2_date: null,
            fp3_date: null,
            qualifying_date: null,
            sprint_date: null,
        };

        MockAdapter.onGet(RACE_URLS.id(raceMock.id)).replyOnce(200, raceMock);

        const { getByText } = await render(
            await RouterMock({
                children: await RacePage({ params: { id: raceMock.id } }),
            }),
        );

        expect(getByText('FP1 Date: Unknown')).toBeInTheDocument();
        expect(getByText('FP2 Date: Unknown')).toBeInTheDocument();
        expect(getByText('FP3 Date: Unknown')).toBeInTheDocument();

        expect(getByText('Qualifying date: Unknown')).toBeInTheDocument();

        expect(getByText('Sprint date: Unknown')).toBeInTheDocument();
    });
});
