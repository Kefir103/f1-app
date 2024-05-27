import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import type { SeasonType } from '~f1-app/shared/types/Season/Season.type';

import { Race } from '~entities/Race/Race.entity';

@Entity({ name: 'seasons' })
export class Season implements Required<SeasonType> {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('integer')
    year: number;

    @Column('varchar', { length: 255 })
    wiki_url: string;

    @OneToMany(() => Race, (race) => race.season, {
        nullable: true,
        createForeignKeyConstraints: false,
    })
    @JoinColumn({ name: 'year', referencedColumnName: 'year' })
    races: Race[];
}
