import { axios } from '~shared/api/axios';
import { URLS } from '~entities/Driver/api/urls';
import { DriverType } from '~entities/Driver/type';

interface IUseDriverServer {
    id: string;
}

export async function useDriverServer({ id }: IUseDriverServer) {
    try {
        const { data } = await axios.get<DriverType>(URLS.id(id));

        return { data };
    } catch (error) {
        throw error;
    }
}
