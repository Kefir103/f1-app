import { axios } from '~shared/api/axios';
import { URLS } from '~shared/config/urls';

import type { Race } from '~entities/race';

export async function useRaceServer(
    id: number,
    {
        expandFields = [],
    }: {
        expandFields?: string[];
    } = {},
) {
    try {
        const { data: race } = await axios.get<Race>(URLS.race.id(id), {
            params: {
                ...(expandFields?.length && {
                    expand: expandFields.join(','),
                }),
            },
        });

        return { race };
    } catch (error: unknown) {
        throw error;
    }
}
