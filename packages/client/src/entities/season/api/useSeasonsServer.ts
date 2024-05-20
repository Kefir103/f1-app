import { axios } from '~shared/api/axios';

import type { SeasonType } from '~entities/season';
import { SEASON_URLS } from '~entities/season/api';

interface IUseSeasonsServer {
    page: number;
    perPage: number;
}

interface IUseSeasonsServerResponse {
    data: SeasonType[];
    count: number;
}

export async function useSeasonsServer({ page, perPage }: IUseSeasonsServer) {
    try {
        const { data } = await axios.get<IUseSeasonsServerResponse>(SEASON_URLS.index, {
            params: {
                page,
                perPage,
            },
        });

        return { data: data.data, count: data.count };
    } catch (error: unknown) {
        throw error;
    }
}
