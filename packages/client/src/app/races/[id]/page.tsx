import { useRaceServer } from '~entities/race/api';

import { RaceInfo } from '~widgets/race/ui';

interface IRacePage {
    params: {
        id: number;
    };
}

export default async function RacePage({ params }: IRacePage) {
    const { race } = await useRaceServer(params.id);

    return (
        <>
            <RaceInfo race={race} />
        </>
    );
}
