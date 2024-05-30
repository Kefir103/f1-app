import { axios } from '~shared/api/axios';

import type { SeasonType } from '~entities/season';
import { SEASON_URLS } from '~entities/season/api';

export async function useSeasonServer(year: number) {
    try {
        const { data: season } = await axios.get<SeasonType>(SEASON_URLS.year(year));

        return { season };
    } catch (error: unknown) {
        throw error;
    }
}
