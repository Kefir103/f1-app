import { axios } from '~shared/api/axios';
import { DRIVER_URLS } from '~entities/driver/api';
import type { DriverType } from '~entities/driver';

export async function useDriverServer(ref: string) {
    try {
        const { data: driver } = await axios.get<DriverType>(DRIVER_URLS.ref(ref));

        return { driver };
    } catch (error) {
        throw error;
    }
}
