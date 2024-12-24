import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { StatusType } from '~f1-app/shared/types/Status/Status.type';

@Entity({ schema: 'directory', name: 'status' })
export class Status implements StatusType {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { unique: true, length: 255 })
    status: string;
}
