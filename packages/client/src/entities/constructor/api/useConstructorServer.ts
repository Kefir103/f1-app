import { axios } from '~shared/api/axios';
import { URLS } from '~shared/config/urls';

import type { Constructor } from '~entities/constructor';

export async function useConstructorServer(ref: string) {
    try {
        const { data: constructor } = await axios.get<Constructor>(URLS.constructor.ref(ref));

        return { constructor };
    } catch (error: unknown) {
        throw error;
    }
}
