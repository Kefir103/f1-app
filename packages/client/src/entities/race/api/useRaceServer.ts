import { axios } from '~shared/api/axios';

import type { Race } from '~entities/race';
import { URLS } from '~entities/race/api/urls';

export async function useRaceServer(id: number) {
    try {
        const { data: race } = await axios.get<Race>(URLS.id(id));

        return { race };
    } catch (error: unknown) {
        throw error;
    }
}
