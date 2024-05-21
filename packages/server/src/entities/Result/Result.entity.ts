import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import type { ResultType } from '~f1-app/shared/types/Result/Result.type';

import { Race } from '~entities/Race/Race.entity';
import { Driver } from '~entities/Driver/Driver.entity';

@Entity({ name: 'results' })
export class Result implements ResultType {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('integer')
    race_id: number;

    @ManyToOne(() => Race, (race) => race.results, {
        nullable: false,
        createForeignKeyConstraints: false,
    })
    @JoinColumn({ name: 'race_id', referencedColumnName: 'id' })
    race: Race;

    @Column('integer')
    driver_id: number;

    @OneToOne(() => Driver, { nullable: false, createForeignKeyConstraints: false })
    @JoinColumn({ name: 'driver_id', referencedColumnName: 'id' })
    driver: Driver;

    @Column('integer')
    constructor_id: number;

    @Column('integer', { nullable: true })
    driver_number: number;

    @Column('integer')
    position_start_grid: number;

    @Column('integer', { nullable: true })
    position: number;

    @Column('varchar', { length: 255 })
    position_text: string;

    @Column('integer', { default: 0 })
    position_order: number;

    @Column('double precision', { default: 0 })
    points: number;

    @Column('integer', { default: 0 })
    laps: number;

    @Column('varchar', { nullable: true, length: 255 })
    time_finish: string;

    @Column('integer', { nullable: true })
    time_milliseconds: number;

    @Column('integer', { nullable: true })
    fastest_lap_number: number;

    @Column('integer', { nullable: true, default: 0 })
    fastest_lap_rank: number;

    @Column('varchar', { nullable: true, length: 255 })
    fastest_lap_time: string;

    @Column('varchar', { nullable: true, length: 255 })
    fastest_lap_speed: string;

    @Column('integer', { default: 0 })
    status_id: number;
}
