import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import { URLS } from '~entities/circuit/api/urls';
import { useCircuitsServer } from '~entities/circuit/api';

import { CircuitsMock } from '~mocks/entities/circuit/Circuit.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('useCircuitsServer', () => {
    it('should fetch circuits correctly with pagination', async () => {
        const circuitsFetch = [CircuitsMock[0]];
        const page = 1;
        const perPage = 1;

        MockAdapter.onGet(URLS.index).replyOnce(200, {
            data: circuitsFetch,
            count: CircuitsMock.length,
        });

        const circuitsData = await useCircuitsServer({ page, perPage });

        const circuitsDataExpected = {
            data: circuitsFetch,
            count: CircuitsMock.length,
        };

        expect(circuitsData).toEqual(circuitsDataExpected);
    });
    it('should throw an exception next correctly', async () => {
        MockAdapter.onGet(URLS.index).networkErrorOnce();

        try {
            await useCircuitsServer({ page: 1, perPage: 1 });
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });
});
