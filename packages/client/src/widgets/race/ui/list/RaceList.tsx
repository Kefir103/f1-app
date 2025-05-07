import type { Race } from '~entities/race';
import { RaceListCard } from '~entities/race/ui';

interface IRaceList {
    races: Race[];
}

export function RaceList({ races }: IRaceList) {
    return (
        <div className={'grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4'}>
            {races.map((race) => (
                <RaceListCard key={`race_${race.id}`} race={race} />
            ))}
        </div>
    );
}
