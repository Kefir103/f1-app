import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { SeasonType } from '~f1-app/shared/types/Season/Season.type';

@Entity({ name: 'seasons' })
export class Season implements SeasonType {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('integer')
    year: number;

    @Column('varchar', { length: 255 })
    wiki_url: string;
}
