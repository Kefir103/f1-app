import { axios } from '~shared/api/axios';

import { SEASON_URLS } from '~entities/season/api';

import type { Race } from '~entities/race';

interface IUseSeasonRacesServerResponse {
    data: Race[];
    count: number;
}

export async function useSeasonRacesServer(year: number) {
    try {
        const { data } = await axios.get<IUseSeasonRacesServerResponse>(SEASON_URLS.races(year));

        return {
            data: data.data,
            count: data.count,
        };
    } catch (error) {
        throw error;
    }
}
