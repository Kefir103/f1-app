import { axios } from '~shared/api/axios';

import { Circuit } from '~entities/Circuit/type';
import { URLS } from '~entities/Circuit/api/urls';

export async function useCircuitServer(ref: string) {
    try {
        const { data: circuit } = await axios.get<Circuit>(URLS.ref(ref));

        return { circuit };
    } catch (error: unknown) {
        throw error;
    }
}
