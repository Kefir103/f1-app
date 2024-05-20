import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import { RACE_URLS, useRaceResultsServer } from '~entities/race/api';

import { RacesResultsMock } from '~mocks/entities/race/Race.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('useRaceResultsServer', () => {
    it('should return results from response', async () => {
        const raceId = 1;

        const resultsMockFiltered = RacesResultsMock.filter((result) => result.race_id === raceId);

        MockAdapter.onGet(RACE_URLS.results(raceId)).replyOnce(200, {
            data: resultsMockFiltered,
            count: resultsMockFiltered.length,
        });

        const { data, count } = await useRaceResultsServer({ raceId: raceId });

        const expectedRaceResults = {
            data: resultsMockFiltered,
            count: resultsMockFiltered.length,
        };

        expect({ data, count }).toEqual(expectedRaceResults);
    });

    it('should throw an error next from response', async () => {
        const errorRaceId = -1;

        MockAdapter.onGet(RACE_URLS.results(errorRaceId)).networkErrorOnce();

        await expect(async () => {
            await useRaceResultsServer({ raceId: errorRaceId });
        }).rejects.toThrow(Error);
    });
});
