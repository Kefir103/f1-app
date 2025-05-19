import { axios } from '~shared/api/axios';
import { URLS } from '~shared/config/urls';

import type { Race } from '~entities/race';

interface IUseRacesServer {
    page: number;
    perPage: number;
    expandFields?: string[];
}

interface IUseRacesServerResponse {
    data: Race[];
    count: number;
}

export async function useRacesServer({ page, perPage, expandFields = [] }: IUseRacesServer) {
    try {
        const { data } = await axios.get<IUseRacesServerResponse>(URLS.race.index, {
            params: {
                page,
                perPage,
                ...(expandFields.length && {
                    expand: expandFields.join(','),
                }),
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
