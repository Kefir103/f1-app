import { JoinColumn, OneToOne, PrimaryColumn, ViewColumn, ViewEntity } from 'typeorm';

import { SeasonWinnerDriverType } from '~f1-app/shared/types/Season/winner/SeasonWinnerDriver';

import { Driver } from '~entities/Public/Driver/Driver.entity';
import { Season } from '~entities/Public/Season/Season.entity';
import { Constructor } from '~entities/Public/Constructor/Constructor.entity';

@ViewEntity({
    name: 'season_winner_driver_view',
    expression: `
        WITH last_season_race AS (SELECT r.year, MAX(r.id) AS id
                                  FROM races r
                                  GROUP BY r.year)
        SELECT last_season_race.year, ds.driver_id, r.constructor_id
        FROM last_season_race
                 JOIN driver_standings ds ON ds.race_id = last_season_race.id AND ds.position = 1
                 JOIN results r ON r.race_id = last_season_race.id AND ds.driver_id = r.driver_id
        ORDER BY last_season_race.year DESC;
    `,
})
export class SeasonWinnerDriverView implements SeasonWinnerDriverType {
    @PrimaryColumn()
    @ViewColumn()
    driver_id: number;

    @OneToOne(() => Driver, {
        eager: true,
    })
    @JoinColumn({ name: 'driver_id', referencedColumnName: 'id' })
    driver: Driver;

    @PrimaryColumn()
    @ViewColumn()
    year: number;

    @OneToOne(() => Season)
    @JoinColumn({ name: 'year', referencedColumnName: 'year' })
    season: Season;

    @PrimaryColumn()
    @ViewColumn()
    constructor_id: number;

    @OneToOne(() => Constructor, {
        eager: true,
    })
    @JoinColumn({ name: 'constructor_id', referencedColumnName: 'id' })
    constructor_entity: Constructor;
}
