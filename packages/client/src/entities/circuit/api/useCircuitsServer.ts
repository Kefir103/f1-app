import { axios } from '~shared/api/axios';

import { URLS } from '~entities/circuit/api/urls';
import { Circuit } from '~entities/circuit/type';

interface IUseCircuitsServer {
    page: number;
    perPage: number;
}

interface ICircuitsResponse {
    data: Circuit[];
    count: number;
}

export async function useCircuitsServer({ page, perPage }: IUseCircuitsServer) {
    try {
        const { data } = await axios.get<ICircuitsResponse>(URLS.index, {
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
