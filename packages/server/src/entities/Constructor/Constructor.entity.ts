import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { ConstructorType } from '~f1-app/shared/types/Constructor/Constructor.type';

@Entity({ name: 'constructors' })
export class Constructor implements ConstructorType {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { unique: true, nullable: false, length: 255 })
    ref: string;

    @Column('varchar', { nullable: false, length: 255 })
    name: string;

    @Column('varchar', { length: 255 })
    nationality: string;

    @Column('varchar', { length: 255 })
    wiki_url: string;
}
