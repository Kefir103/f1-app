import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import { URLS } from '~shared/config/urls';

import { useCircuitServer } from '~entities/circuit/api';

import { CircuitsMock } from '~mocks/entities/circuit/Circuit.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('useCircuitServer', () => {
    it('should fetch circuit correct', async () => {
        const circuitMock = CircuitsMock[0];

        MockAdapter.onGet(URLS.circuit.ref(circuitMock.ref)).replyOnce(200, circuitMock);

        const { circuit } = await useCircuitServer(circuitMock.ref);

        expect(circuit).toEqual(circuitMock);
    });
    it('should catch an error and throw next', async () => {
        MockAdapter.onGet(URLS.circuit.ref('')).networkErrorOnce();

        try {
            await useCircuitServer('');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });
});
