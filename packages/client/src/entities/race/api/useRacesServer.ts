import { axios } from '~shared/api/axios';

import type { Race } from '~entities/race';
import { URLS } from '~entities/race/api/urls';

interface IUseRacesServer {
    page: number;
    perPage: number;
}

interface IUseRacesServerResponse {
    data: Race[];
    count: number;
}

export async function useRacesServer({ page, perPage }: IUseRacesServer) {
    try {
        const { data } = await axios.get<IUseRacesServerResponse>(URLS.index, {
            params: {
                page,
                perPage,
            },
        });

        return {
            data: data.data,
            count: data.count,
        };
    } catch (error: unknown) {
        throw error;
    }
}
