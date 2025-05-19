import { axios } from '~shared/api/axios';
import { URLS } from '~shared/config/urls';

import type { DriverType } from '~entities/driver';

interface IDriversResponse {
    data: DriverType[];
    count: number;
}

interface IUseDriverServer {
    page: number;
    perPage: number;
    expandFields?: string[];
}

export async function useDriversServer({ page, perPage, expandFields = [] }: IUseDriverServer) {
    try {
        const { data } = await axios.get<IDriversResponse>(URLS.driver.index, {
            params: {
                page,
                perPage,
                ...(expandFields.length && {
                    expand: expandFields.join(','),
                }),
            },
        });

        return { data: data.data, count: data.count };
    } catch (error: unknown) {
        throw error;
    }
}
