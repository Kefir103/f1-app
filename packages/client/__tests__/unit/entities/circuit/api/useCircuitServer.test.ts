import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import { CIRCUIT_URLS } from '~entities/circuit/api';
import { useCircuitServer } from '~entities/circuit/api';

import { CircuitsMock } from '~mocks/entities/circuit/Circuit.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('useCircuitServer', () => {
    it('should fetch circuit correct', async () => {
        const circuitMock = CircuitsMock[0];

        MockAdapter.onGet(CIRCUIT_URLS.ref(circuitMock.ref)).replyOnce(200, circuitMock);

        const { circuit } = await useCircuitServer(circuitMock.ref);

        expect(circuit).toEqual(circuitMock);
    });
    it('should catch an error and throw next', async () => {
        MockAdapter.onGet(CIRCUIT_URLS.ref('')).networkErrorOnce();

        try {
            await useCircuitServer('');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });
});
