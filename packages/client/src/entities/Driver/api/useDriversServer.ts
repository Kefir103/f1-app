import { axios } from '~shared/api/axios';

import { URLS } from '~entities/Driver/api/urls';
import { DriverType } from '~entities/Driver/type';

interface IDriversResponse {
    data: DriverType[];
    count: number;
}

interface IUseDriverServer {
    page: number;
    perPage: number;
}

export async function useDriversServer({ page, perPage }: IUseDriverServer) {
    try {
        const { data } = await axios.get<IDriversResponse>(URLS.index, {
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
