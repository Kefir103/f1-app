import { Column, Entity, PrimaryGeneratedColumn, VirtualColumn } from 'typeorm';

import { DriverType } from '~f1-app/shared/types/Driver/Driver.type';

@Entity({ name: 'drivers' })
export class Driver implements DriverType {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { unique: true, length: 255 })
    ref: string;

    @Column('integer', { nullable: true })
    number: number;

    @Column('varchar', { nullable: true, length: 5 })
    code: string;

    @Column('varchar', { length: 255 })
    first_name: string;

    @Column('varchar', { length: 255 })
    last_name: string;

    @Column('date', { nullable: true })
    date_of_birth: Date;

    @Column('varchar', { nullable: true, length: 255 })
    nationality: string;

    @Column('varchar', { length: 255, unique: true })
    wiki_url: string;

    @VirtualColumn('integer', {
        query: (alias) =>
            `SELECT COUNT(id) FROM results WHERE driver_id = ${alias}.id AND position = 1`,
        type: 'integer',
    })
    wins_count: number;

    @VirtualColumn('integer', {
        query: (alias) =>
            `SELECT count(id) FROM qualifying WHERE driver_id = ${alias}.id AND driver_position = 1`,
    })
    poles_count: number;
}
