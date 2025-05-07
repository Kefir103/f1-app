import { axios } from '~shared/api/axios';
import { URLS } from '~shared/config/urls';

import type { SeasonType } from '~entities/season';

export async function useSeasonServer(year: number) {
    try {
        const { data: season } = await axios.get<SeasonType>(URLS.season.year(year));

        return { season };
    } catch (error: unknown) {
        throw error;
    }
}
