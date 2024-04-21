import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import { CircuitApi } from '~entities/circuit';

import { CircuitsMock } from '~mocks/entities/circuit/Circuit.mock';
import CircuitPage from '~app/circuits/[ref]/page';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('Circuits Page', () => {
    it('should render correctly', async () => {
        const circuitMock = CircuitsMock[0];

        MockAdapter.onGet(CircuitApi.CIRCUITS_URLS.ref(circuitMock.ref)).replyOnce(
            200,
            circuitMock,
        );

        const { getByText, getByRole } = render(
            await CircuitPage({
                params: {
                    ref: circuitMock.ref,
                },
            }),
        );

        expect(getByRole('heading', { name: CircuitsMock[0].name })).toBeInTheDocument();
        expect(getByRole('link', { name: 'Wiki' })).toHaveAttribute('href', circuitMock.wiki_url);
        expect(getByText(`Country: ${circuitMock.country}`)).toBeInTheDocument();
        expect(getByText(`Location: ${circuitMock.location}`)).toBeInTheDocument();
        expect(getByText(`Latitude: ${circuitMock.latitude}`)).toBeInTheDocument();
        expect(getByText(`Longitude: ${circuitMock.longitude}`)).toBeInTheDocument();
        expect(getByText(`Altitude: ${circuitMock.altitude}m`)).toBeInTheDocument();
    });
});
