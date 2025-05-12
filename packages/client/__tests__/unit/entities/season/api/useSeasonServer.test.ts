import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';
import { URLS } from '~shared/config/urls';

import { useSeasonServer } from '~entities/season';

import { SeasonsMock } from '~mocks/entities/season/Season.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('useSeasonServer', () => {
    it('should return season founded by year', async () => {
        const seasonMock = SeasonsMock[0];

        MockAdapter.onGet(URLS.season.year(seasonMock.year)).replyOnce(200, seasonMock);

        const { season } = await useSeasonServer(seasonMock.year);

        expect(season).toEqual(seasonMock);
    });

    it('should throw an error next from response', async () => {
        const notExistedYear = -1;

        MockAdapter.onGet(URLS.season.year(notExistedYear)).networkErrorOnce();

        await expect(async () => {
            await useSeasonServer(notExistedYear);
        }).rejects.toThrow(Error);
    });
});
