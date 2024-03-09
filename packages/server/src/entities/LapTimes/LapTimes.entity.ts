import { LapTimesType } from '~f1-app/shared/types/LapTimes/LapTimes.type';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'lap_times' })
export class LapTimes implements LapTimesType {
    @PrimaryColumn('integer')
    race_id: number;

    @PrimaryColumn('integer')
    driver_id: number;

    @PrimaryColumn('integer')
    lap: number;

    @Column('integer', { nullable: true })
    position: number;

    @Column('varchar', { nullable: true, length: 255 })
    time: string;

    @Column('integer', { nullable: true })
    milliseconds: number;
}
