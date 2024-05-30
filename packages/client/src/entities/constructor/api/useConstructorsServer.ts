import { axios } from '~shared/api/axios';

import { CONSTRUCTOR_URLS } from '~entities/constructor/api';
import type { Constructor } from '~entities/constructor';

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
        const { data } = await axios.get<IConstructorsResponse>(CONSTRUCTOR_URLS.index, {
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
