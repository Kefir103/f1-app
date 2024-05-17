import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    VirtualColumn,
} from 'typeorm';

import type { DriverType } from '~f1-app/shared/types/Driver/Driver.type';
import type { ConstructorType } from '~f1-app/shared/types/Constructor/Constructor.type';

import { Constructor } from '~entities/Constructor/Constructor.entity';

@Entity({ name: 'drivers' })
export class Driver implements DriverType {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { unique: true, length: 255 })
    ref: string;

    @Column('integer')
    constructor_id: number;

    @OneToOne(() => Constructor, { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'constructor_id', referencedColumnName: 'id' })
    constructor_entity: ConstructorType;

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
