import type { SeasonType } from '~entities/season';
import { SeasonListCard } from '~entities/season/ui';

interface ISeasonList {
    seasons: SeasonType[];
}

export function SeasonList({ seasons }: ISeasonList) {
    return (
        <div className={'grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4'}>
            {seasons.map((season) => (
                <SeasonListCard key={`season_${season.id}`} season={season} />
            ))}
        </div>
    );
}
