import { axios } from '~shared/api/axios';

import type { Season } from '~entities/season/type';
import { URLS } from '~entities/season/api/urls';

export async function useSeasonServer(year: number) {
    try {
        const { data: season } = await axios.get<Season>(URLS.year(year));

        return { season };
    } catch (error: unknown) {
        throw error;
    }
}
