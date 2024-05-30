import { axios } from '~shared/api/axios';

import { CONSTRUCTOR_URLS } from '~entities/constructor/api';
import type { Constructor } from '~entities/constructor';

export async function useConstructorServer(ref: string) {
    try {
        const { data: constructor } = await axios.get<Constructor>(CONSTRUCTOR_URLS.ref(ref));

        return { constructor };
    } catch (error: unknown) {
        throw error;
    }
}
