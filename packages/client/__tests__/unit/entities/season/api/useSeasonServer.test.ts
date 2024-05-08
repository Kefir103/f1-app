import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import { SEASON_URLS } from '~entities/season/api';

import { useSeasonServer } from '~entities/season/api';

import { SeasonsMock } from '~mocks/entities/season/Season.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('useSeasonServer', () => {
    it('should return season founded by year', async () => {
        const seasonMock = SeasonsMock[0];

        MockAdapter.onGet(SEASON_URLS.year(seasonMock.year)).replyOnce(200, seasonMock);

        const { season } = await useSeasonServer(seasonMock.year);

        expect(season).toEqual(seasonMock);
    });

    it('should throw an error next from response', async () => {
        const notExistedYear = -1;

        MockAdapter.onGet(SEASON_URLS.year(notExistedYear)).networkErrorOnce();

        await expect(async () => {
            await useSeasonServer(notExistedYear);
        }).rejects.toThrow(Error);
    });
});
