import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import { CONSTRUCTOR_URLS } from '~entities/constructor/api';
import { useConstructorsServer } from '~entities/constructor/api';

import { ConstructorsMock } from '~mocks/entities/constructor/Constructor.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('useConstructorsServer', () => {
    it('should return constructors', async () => {
        const page = 1;
        const perPage = 10;

        MockAdapter.onGet(CONSTRUCTOR_URLS.index).replyOnce(200, {
            data: ConstructorsMock,
            count: ConstructorsMock.length,
        });

        const { data, count } = await useConstructorsServer({ page, perPage });

        expect({ data, count }).toEqual({ data: ConstructorsMock, count: ConstructorsMock.length });
    });
    it('should throw an error next from response', async () => {
        const page = 1;
        const perPage = 10;

        MockAdapter.onGet(CONSTRUCTOR_URLS.index).networkErrorOnce();

        await expect(async () => {
            await useConstructorsServer({ page, perPage });
        }).rejects.toThrow(Error);
    });
});
