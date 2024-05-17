import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import type { RaceType } from '~f1-app/shared/types/Race/Race.type';

import { Circuit } from '~entities/Circuit/Circuit.entity';

@Entity({ name: 'races' })
export class Race implements RaceType {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('integer')
    circuit_id: number;

    @OneToOne(() => Circuit, { nullable: false, createForeignKeyConstraints: false })
    @JoinColumn({ name: 'circuit_id', referencedColumnName: 'id' })
    circuit: Circuit;

    @Column('integer')
    year: number;

    @Column('integer')
    round: number;

    @Column('varchar')
    name: string;

    @Column('date')
    date: Date;

    @Column('varchar', { nullable: true, length: 30 })
    start_time: string;

    @Column('varchar', { length: 255 })
    wiki_url: string;

    @Column('date', { nullable: true })
    fp1_date: Date;

    @Column('time', { nullable: true })
    fp1_time: string;

    @Column('date', { nullable: true })
    fp2_date: Date;

    @Column('time', { nullable: true })
    fp2_time: string;

    @Column('date', { nullable: true })
    fp3_date: Date;

    @Column('time', { nullable: true })
    fp3_time: string;

    @Column('date', { nullable: true })
    qualifying_date: Date;

    @Column('time', { nullable: true })
    qualifying_time: string;

    @Column('date', { nullable: true })
    sprint_date: Date;

    @Column('time', { nullable: true })
    sprint_time: string;
}
