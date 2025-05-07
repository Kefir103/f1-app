import { axios } from '~shared/api/axios';
import { URLS } from '~shared/config/urls';

import type { SeasonType } from '~entities/season';

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
        const { data } = await axios.get<IUseSeasonsServerResponse>(URLS.season.index, {
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
