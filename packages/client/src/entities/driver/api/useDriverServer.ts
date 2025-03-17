import { axios } from '~shared/api/axios';
import { DRIVER_URLS } from '~entities/driver/api';
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
        const { data: driver } = await axios.get<DriverType>(DRIVER_URLS.ref(ref), {
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
