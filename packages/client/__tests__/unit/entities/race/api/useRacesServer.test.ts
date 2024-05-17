import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';
import lodash from 'lodash';

import type { Race } from '~entities/race';
import { RACE_URLS } from '~entities/race/api';

import { useRacesServer } from '~entities/race/api';

import { RacesMock } from '~mocks/entities/race/Race.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

function formatRaceResponse(race: Race) {
    return {
        ...race,
        date: race.date.toString(),
        fp1_date: race.fp1_date.toString(),
        fp2_date: race.fp2_date.toString(),
        fp3_date: race.fp3_date.toString(),
        qualifying_date: race.qualifying_date.toString(),
        sprint_date: race.sprint_date.toString(),
    };
}

describe('useRacesServer', () => {
    it('should return races', async () => {
        MockAdapter.onGet(RACE_URLS.index).replyOnce(200, {
            data: lodash.orderBy(RacesMock.map(formatRaceResponse), ['year'], ['desc']),
            count: RacesMock.length,
        });

        const page = 1;
        const perPage = 10;

        const { data, count } = await useRacesServer({ page, perPage });

        const expectedRaces = {
            data: lodash.orderBy(RacesMock.map(formatRaceResponse), ['year'], ['desc']),
            count: RacesMock.length,
        };

        expect({ data, count }).toEqual(expectedRaces);
    });
    it('should throw an error next from response', async () => {
        MockAdapter.onGet(RACE_URLS.index).networkErrorOnce();

        const page = 1;
        const perPage = 10;

        await expect(async () => {
            await useRacesServer({ page, perPage });
        }).rejects.toThrow(Error);
    });
});
