import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { DriverStandingsType } from '~f1-app/shared/types/DriverStandings/DriverStandings.type';

@Entity({ name: 'driver_standings' })
export class DriverStandings implements DriverStandingsType {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('integer')
    race_id: number;

    @Column('integer')
    driver_id: number;

    @Column('double precision')
    points: number;

    @Column('integer', { nullable: true })
    position: number;

    @Column('varchar', { nullable: true, length: 255 })
    position_text: string;

    @Column('integer')
    wins_count: number;
}
