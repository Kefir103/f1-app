import { Column, Entity, PrimaryColumn } from 'typeorm';

import { PitStopsType } from '~f1-app/shared/types/PitStops/PitStops.type';

@Entity({ name: 'pit_stops' })
export class PitStops implements PitStopsType {
    @PrimaryColumn('integer')
    race_id: number;

    @PrimaryColumn('integer')
    driver_id: number;

    @PrimaryColumn('integer')
    stop_number: number;

    @Column('integer')
    lap_number: number;

    @Column('time')
    time: string;

    @Column('varchar', { nullable: true, length: 255 })
    duration: string;

    @Column('integer')
    milliseconds: number;
}
