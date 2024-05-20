import { axios } from '~shared/api/axios';

import type { ResultType } from '~entities/result';
import { RACE_URLS } from '~entities/race/api';

interface IUseRaceResultsServer {
    raceId: number;
}

interface IUseRaceResultsServerResponse {
    data: ResultType[];
    count: number;
}

export async function useRaceResultsServer({ raceId }: IUseRaceResultsServer) {
    try {
        const { data } = await axios.get<IUseRaceResultsServerResponse>(RACE_URLS.results(raceId));

        return { data: data.data, count: data.count };
    } catch (error) {
        throw error;
    }
}
