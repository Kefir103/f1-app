import * as path from 'node:path';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { CSVProp } from '~lib/csv-parse/CSVProp.decorator';
import { CSVSchema } from '~lib/csv-parse/CSVSchema.decorator';

import { QualifyingType } from '~f1-app/shared/types/Qualifying/Qualifying.type';

export type QualifyingDocument = HydratedDocument<Qualifying>;

@Schema()
@CSVSchema(path.resolve(__dirname, '../../../../..', 'f1-csv/qualifying.csv'))
export class Qualifying implements QualifyingType {
    @Prop({ required: true })
    @CSVProp('qualifyId')
    id: number;

    @Prop({ required: true })
    @CSVProp('raceId')
    raceId: number;

    @Prop({ required: true })
    @CSVProp('driverId')
    driverId: number;

    @Prop({ required: true })
    @CSVProp('constructorId')
    constructorId: number;

    @Prop({ required: true })
    @CSVProp('number')
    number: number;

    @Prop()
    @CSVProp('position')
    position: number;

    @Prop()
    @CSVProp('q1')
    q1: string;

    @Prop()
    @CSVProp('q2')
    q2: string;

    @Prop()
    @CSVProp('q3')
    q3: string;
}

export const QualifyingSchema = SchemaFactory.createForClass(Qualifying);
