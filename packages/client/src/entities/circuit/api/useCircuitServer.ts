import { axios } from '~shared/api/axios';

import { Circuit } from '~entities/circuit/type';
import { URLS } from '~entities/circuit/api/urls';

export async function useCircuitServer(ref: string) {
    try {
        const { data: circuit } = await axios.get<Circuit>(URLS.ref(ref));

        return { circuit };
    } catch (error: unknown) {
        throw error;
    }
}
