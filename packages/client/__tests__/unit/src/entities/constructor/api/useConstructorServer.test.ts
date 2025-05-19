import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import { URLS } from '~shared/config/urls';

import { useConstructorServer } from '~entities/constructor';

import { ConstructorsMock } from '~mocks/entities/constructor/Constructor.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('useConstructorServer', () => {
    it('should return constructor from server correctly', async () => {
        const constructorMock = ConstructorsMock[0];

        MockAdapter.onGet(URLS.constructor.ref(constructorMock.ref)).replyOnce(
            200,
            constructorMock,
        );

        const { constructor } = await useConstructorServer(constructorMock.ref);

        expect(constructor).toEqual(constructorMock);
    });
    it('should throw error if response failed', async () => {
        MockAdapter.onGet(URLS.constructor.ref('')).networkErrorOnce();

        await expect(async () => {
            await useConstructorServer('');
        }).rejects.toThrow(Error);
    });
});
