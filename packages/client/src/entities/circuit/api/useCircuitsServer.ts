import { axios } from '~shared/api/axios';

import { URLS } from '~shared/config/urls';

import type { CircuitType } from '~entities/circuit';

interface IUseCircuitsServer {
    page: number;
    perPage: number;
}

interface ICircuitsResponse {
    data: CircuitType[];
    count: number;
}

export async function useCircuitsServer({ page, perPage }: IUseCircuitsServer) {
    try {
        const { data } = await axios.get<ICircuitsResponse>(URLS.circuit.index, {
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
