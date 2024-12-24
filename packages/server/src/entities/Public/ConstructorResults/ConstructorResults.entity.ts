import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ConstructorResultsType } from '~f1-app/shared/types/ConstructorResults/ConstructorResults.type';

@Entity({ name: 'constructor_results' })
export class ConstructorResults implements ConstructorResultsType {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('integer', { nullable: false })
    race_id: number;

    @Column('integer', { nullable: false })
    constructor_id: number;

    @Column('double precision')
    points: number;

    @Column('integer')
    status_id: number;
}
