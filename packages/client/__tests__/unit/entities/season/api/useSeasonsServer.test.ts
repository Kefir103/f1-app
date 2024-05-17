import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';
import * as lodash from 'lodash';

import { SEASON_URLS } from '~entities/season/api';

import { useSeasonsServer } from '~entities/season/api';

import { SeasonsMock } from '~mocks/entities/season/Season.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('useSeasonsServer', () => {
    it('should return seasons', async () => {
        const page = 1;
        const perPage = 10;

        const seasonsMock = lodash.orderBy(SeasonsMock, ['year'], ['desc']);

        MockAdapter.onGet(SEASON_URLS.index).replyOnce(200, {
            data: seasonsMock,
            count: seasonsMock.length,
        });

        const { data, count } = await useSeasonsServer({ page, perPage });

        expect({ data, count }).toEqual({ data: seasonsMock, count: seasonsMock.length });
    });
    it('should throw an error next from response', async () => {
        const page = 1;
        const perPage = 10;

        MockAdapter.onGet(SEASON_URLS.index).networkErrorOnce();

        await expect(async () => {
            await useSeasonsServer({ page, perPage });
        }).rejects.toThrow(Error);
    });
});
