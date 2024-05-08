import { axios } from '~shared/api/axios';

import type { Season } from '~entities/season/type';
import { URLS } from '~entities/season/api/urls';

interface IUseSeasonsServer {
    page: number;
    perPage: number;
}

interface IUseSeasonsServerResponse {
    data: Season[];
    count: number;
}

export async function useSeasonsServer({ page, perPage }: IUseSeasonsServer) {
    try {
        const { data } = await axios.get<IUseSeasonsServerResponse>(URLS.index, {
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
