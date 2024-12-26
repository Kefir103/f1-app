import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { SprintResultType } from '~f1-app/shared/types/SprintResult/SprintResult.type';

@Entity({ name: 'sprint_results' })
export class SprintResult implements SprintResultType {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('integer')
    race_id: number;

    @Column('integer')
    driver_id: number;

    @Column('integer')
    constructor_id: number;

    @Column('integer', { nullable: true })
    driver_number: number;

    @Column('integer', { default: 0 })
    position_start_grid: number;

    @Column('integer', { nullable: true })
    position: number;

    @Column('varchar')
    position_text: string;

    @Column('integer', { default: 0 })
    position_order: string;

    @Column('double precision', { default: 0 })
    points: number;

    @Column('integer', { default: 0 })
    laps: number;

    @Column('varchar', { nullable: true, length: 255 })
    finish_time: string;

    @Column('integer', { nullable: true })
    finish_milliseconds: number;

    @Column('integer', { nullable: true })
    fastest_lap_number: number;

    @Column('varchar', { nullable: true, length: 255 })
    fastest_lap_time: string;

    @Column('integer', { nullable: true })
    status_id: number;
}
