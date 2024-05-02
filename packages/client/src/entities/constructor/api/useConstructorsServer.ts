import { axios } from '~shared/api/axios';

import { URLS } from '~entities/constructor/api/urls';
import type { Constructor } from '~entities/constructor/type';

interface IConstructorsParams {
    page: number;
    perPage: number;
}

interface IConstructorsResponse {
    data: Constructor[];
    count: number;
}

export async function useConstructorsServer({ page, perPage }: IConstructorsParams) {
    try {
        const { data } = await axios.get<IConstructorsResponse>(URLS.index, {
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
