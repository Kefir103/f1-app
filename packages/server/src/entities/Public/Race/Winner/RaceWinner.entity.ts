import {
    Column,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
    RelationId,
    ViewColumn,
    ViewEntity,
} from 'typeorm';

import { ConstructorType } from '~f1-app/shared/types/Constructor/Constructor.type';
import { RaceWinnerType } from '~f1-app/shared/types/Race/Winner/RaceWinner.type';
import { DriverType } from '~f1-app/shared/types/Driver/Driver.type';
import { RaceType } from '~f1-app/shared/types/Race/Race.type';

import { Driver } from '~entities/Public/Driver/Driver.entity';
import { Constructor } from '~entities/Public/Constructor/Constructor.entity';
import { Race } from '~entities/Public/Race/Race.entity';

@ViewEntity({
    name: 'race_winner_view',
    expression: `SELECT driver.id, 
                        driver.ref, 
                        driver.code,
                        driver.number,
                        driver.nationality,
                        driver.first_name,
                        driver.last_name,
                        driver.date_of_birth,
                        driver.wiki_url,
                        result.constructor_id,
                        result.race_id
                    FROM drivers driver
                    JOIN results result ON result.driver_id = driver.id
                    WHERE result.position = 1`,
})
export class RaceWinner implements RaceWinnerType {
    @ViewColumn()
    @PrimaryColumn()
    @RelationId((raceWinner: RaceWinnerType) => raceWinner.driver)
    id: number;

    @OneToOne(() => Driver, {
        nullable: false,
    })
    @JoinColumn({ name: 'id', referencedColumnName: 'id', foreignKeyConstraintName: 'driver' })
    driver: DriverType;

    @ViewColumn()
    ref: string;

    @ViewColumn()
    @PrimaryColumn()
    @RelationId((raceWinner: RaceWinnerType) => raceWinner.constructor_entity)
    constructor_id: number;

    @OneToOne(() => Constructor, {
        nullable: false,
    })
    @JoinColumn({
        name: 'constructor_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'constructor',
    })
    constructor_entity: ConstructorType;

    @ViewColumn()
    @PrimaryColumn({
        select: false,
    })
    @RelationId((raceWinner: RaceWinnerType) => raceWinner.race)
    race_id: number;

    @OneToOne(() => Race, {
        nullable: false,
    })
    @JoinColumn({ name: 'race_id', referencedColumnName: 'id' })
    race: RaceType;

    @ViewColumn()
    number: number;

    @ViewColumn()
    code: string;

    @ViewColumn()
    first_name: string;

    @ViewColumn()
    last_name: string;

    @ViewColumn()
    @Column('date')
    date_of_birth: Date;

    @ViewColumn()
    nationality: string;

    @ViewColumn()
    wiki_url: string;
}
