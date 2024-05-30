import { axios } from '~shared/api/axios';

import type { DriverType } from '~entities/driver';
import { DRIVER_URLS } from '~entities/driver/api';

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
        const { data } = await axios.get<IDriversResponse>(DRIVER_URLS.index, {
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
