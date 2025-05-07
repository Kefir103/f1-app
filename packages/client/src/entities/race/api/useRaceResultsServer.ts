import { axios } from '~shared/api/axios';
import { URLS } from '~shared/config/urls';

import type { ResultType } from '~entities/result';

interface IUseRaceResultsServer {
    raceId: number;
}

interface IUseRaceResultsServerResponse {
    data: ResultType[];
    count: number;
}

export async function useRaceResultsServer({ raceId }: IUseRaceResultsServer) {
    try {
        const { data } = await axios.get<IUseRaceResultsServerResponse>(URLS.race.results(raceId));

        return { data: data.data, count: data.count };
    } catch (error) {
        throw error;
    }
}
