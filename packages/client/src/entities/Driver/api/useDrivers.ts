import { useQuery } from '@tanstack/react-query';

import { axios } from '~shared/api/axios';

import { DriverType } from '~entities/Driver/type';
import { URLS } from '~entities/Driver/api/urls';

export function useDrivers({ page = 1, perPage = 10 }) {
    return useQuery({
        queryKey: ['drivers', page],
        queryFn: (): Promise<DriverType[]> =>
            axios
                .get(URLS.index, {
                    params: {
                        page,
                        perPage,
                    },
                })
                .then((response) => response.data),
    });
}
