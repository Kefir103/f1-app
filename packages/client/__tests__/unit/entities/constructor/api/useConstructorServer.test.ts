import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import { useConstructorServer } from '~entities/constructor/api';

import { CONSTRUCTOR_URLS } from '~entities/constructor/api';

import { ConstructorsMock } from '~mocks/entities/constructor/Constructor.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('useConstructorServer', () => {
    it('should return constructor from server correctly', async () => {
        const constructorMock = ConstructorsMock[0];

        MockAdapter.onGet(CONSTRUCTOR_URLS.ref(constructorMock.ref)).replyOnce(
            200,
            constructorMock,
        );

        const { constructor } = await useConstructorServer(constructorMock.ref);

        expect(constructor).toEqual(constructorMock);
    });
    it('should throw error if response failed', async () => {
        MockAdapter.onGet(CONSTRUCTOR_URLS.ref('')).networkErrorOnce();

        await expect(async () => {
            await useConstructorServer('');
        }).rejects.toThrow(Error);
    });
});
