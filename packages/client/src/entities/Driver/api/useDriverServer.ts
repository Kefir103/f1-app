import { axios } from '~shared/api/axios';
import { URLS } from '~entities/Driver/api/urls';
import { DriverType } from '~entities/Driver/type';

interface IUseDriverServer {
    ref: string;
}

export async function useDriverServer({ ref }: IUseDriverServer) {
    try {
        const { data } = await axios.get<DriverType>(URLS.ref(ref));

        return { data };
    } catch (error) {
        throw error;
    }
}
