import * as path from 'node:path';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { CSVSchema } from '~lib/csv-parse/CSVSchema.decorator';
import { CSVProp } from '~lib/csv-parse/CSVProp.decorator';

import { StatusType } from '~f1-app/shared/types/Status/Status.type';

export type StatusDocument = HydratedDocument<Status>;

@Schema()
@CSVSchema(path.resolve(__dirname, '../../../../..', 'f1-csv/status.csv'))
export class Status implements StatusType {
    @Prop({ required: true })
    @CSVProp('statusId')
    id: number;

    @Prop({ required: true })
    @CSVProp('status')
    status: string;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
