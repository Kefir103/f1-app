import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CircuitType } from '~f1-app/shared/types/Circuit/Circuit.type';

@Entity({ name: 'circuits ' })
export class Circuit implements CircuitType {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { unique: true, nullable: false, length: 255 })
    ref: string;

    @Column('varchar', { nullable: false, length: 255 })
    name: string;

    @Column('varchar', { length: 255 })
    location: string;

    @Column('varchar', { length: 255 })
    country: string;

    @Column('double precision')
    latitude: number;

    @Column('double precision')
    longitude: number;

    @Column('integer')
    altitude: number;

    @Column('varchar', { length: 255 })
    wiki_url: string;
}
