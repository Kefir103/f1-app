import { axios } from '~shared/api/axios';
import { URLS } from '~shared/config/urls';

import type { DriverType } from '~entities/driver';

export async function useDriverServer(
    ref: string,
    {
        expandFields = [],
    }: {
        expandFields?: string[];
    } = {},
) {
    try {
        const { data: driver } = await axios.get<DriverType>(URLS.driver.ref(ref), {
            params: {
                ...(expandFields.length && {
                    expand: expandFields.join(','),
                }),
            },
        });

        return { driver };
    } catch (error) {
        throw error;
    }
}
