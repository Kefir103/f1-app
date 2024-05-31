import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import { SEASON_URLS, useSeasonRacesServer } from '~entities/season/api';
import type { Race } from '~entities/race';

import { SeasonsMock, SeasonsRacesMock } from '~mocks/entities/season/Season.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

function formatRaceResponse(race: Race) {
    return {
        ...race,
        date: race.date.toString(),
    };
}

describe('useSeasonRacesServer', () => {
    it('should return races from response', async () => {
        const seasonMock = SeasonsMock[0];
        const seasonRaces = SeasonsRacesMock.filter((race) => race.year === seasonMock.year).map(
            formatRaceResponse,
        );

        MockAdapter.onGet(SEASON_URLS.races(seasonMock.year)).replyOnce(200, {
            data: seasonRaces,
            count: seasonRaces.length,
        });

        const { data, count } = await useSeasonRacesServer(seasonMock.year);

        expect({ data, count }).toEqual({
            data: seasonRaces,
            count: seasonRaces.length,
        });
    });

    it('should throw an error next from response', async () => {
        const year = -1;

        MockAdapter.onGet(SEASON_URLS.races(year)).networkErrorOnce();

        await expect(async () => {
            await useSeasonRacesServer(year);
        }).rejects.toThrow(Error);
    });
});
