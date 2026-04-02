import { AfterLoad, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SeasonType } from '~f1-app/shared/types/Season/Season.type';

import { isObject } from '~utils/is-object';

import { SeasonWinnerDriverView } from '~entities/Public/Season/winner/SeasonWinnerDriverView.entity';

@Entity({ name: 'seasons' })
export class Season implements SeasonType {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('integer')
    year: number;

    @Column('varchar', { length: 255 })
    wiki_url: string;

    @OneToOne(() => SeasonWinnerDriverView, {
        nullable: true,
        createForeignKeyConstraints: false,
    })
    @JoinColumn({
        name: 'year',
        referencedColumnName: 'year',
        foreignKeyConstraintName: 'season_winner',
    })
    winner_driver: SeasonWinnerDriverView;

    @AfterLoad()
    updateWinnerDriver() {
        if (
            isObject(this.winner_driver) &&
            Object.values(this.winner_driver).every((value) => !value)
        ) {
            this.winner_driver = null;
        }
    }
}
