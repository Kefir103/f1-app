import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ConstructorStandingsType } from '~f1-app/shared/types/ConstructorStandings/ConstructorStandings.type';

@Entity({ name: 'constructor_standings' })
export class ConstructorStandings implements ConstructorStandingsType {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('integer', { nullable: false })
    race_id: number;

    @Column('integer', { nullable: false })
    constructor_id: number;

    @Column('double precision', { nullable: false })
    points: number;

    @Column('integer')
    position: number;

    @Column('varchar')
    position_text: string;

    @Column('integer', { nullable: false })
    wins_count: number;
}
