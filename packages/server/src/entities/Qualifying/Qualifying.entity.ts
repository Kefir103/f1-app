import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { QualifyingType } from '~f1-app/shared/types/Qualifying/Qualifying.type';

@Entity({ name: 'qualifying' })
export class Qualifying implements QualifyingType {
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

    @Column('integer', { nullable: true })
    driver_position: number;

    @Column('varchar', { nullable: true, length: 255 })
    q1_time: string;

    @Column('varchar', { nullable: true, length: 255 })
    q2_time: string;

    @Column('varchar', { nullable: true, length: 255 })
    q3_time: string;
}
