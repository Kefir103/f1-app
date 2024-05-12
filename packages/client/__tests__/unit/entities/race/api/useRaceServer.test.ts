import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import type { Race } from '~entities/race';
import { RACE_URLS } from '~entities/race/api';
import { useRaceServer } from '~entities/race/api';

import { RacesMock } from '~mocks/entities/race/Race.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

function formatRace(race: Race) {
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

describe('useRaceServer', () => {
    it('should return race', async () => {
        const raceMock = RacesMock[0];

        MockAdapter.onGet(RACE_URLS.id(raceMock.id)).replyOnce(200, formatRace(raceMock));

        const { race } = await useRaceServer(raceMock.id);

        expect(race).toEqual(formatRace(raceMock));
    });

    it('should throw an error next from response', async () => {
        const errorId = -1;

        MockAdapter.onGet(RACE_URLS.id(errorId)).networkErrorOnce();

        await expect(async () => {
            await useRaceServer(errorId);
        }).rejects.toThrow(Error);
    });
});
