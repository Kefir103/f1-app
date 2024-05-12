import { axios } from '~shared/api/axios';

import { URLS } from '~entities/constructor/api/urls';
import type { Constructor } from '~entities/constructor/type';

export async function useConstructorServer(ref: string) {
    try {
        const { data: constructor } = await axios.get<Constructor>(URLS.ref(ref));

        return { constructor };
    } catch (error: unknown) {
        throw error;
    }
}
