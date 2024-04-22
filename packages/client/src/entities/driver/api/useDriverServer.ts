import { axios } from '~shared/api/axios';
import { URLS } from '~entities/driver/api/urls';
import { DriverType } from '~entities/driver/type';

export async function useDriverServer(ref: string) {
    try {
        const { data: driver } = await axios.get<DriverType>(URLS.ref(ref));

        return { driver };
    } catch (error) {
        throw error;
    }
}
