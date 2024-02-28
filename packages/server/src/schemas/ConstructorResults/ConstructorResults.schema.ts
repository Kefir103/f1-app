import * as path from 'node:path';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { CSVSchema } from '~lib/csv-parse/CSVSchema.decorator';
import { CSVProp } from '~lib/csv-parse/CSVProp.decorator';

import { ConstructorResultsType } from '~f1-app/shared/types/ConstructorResults/ConstructorResults.type';

export type ConstructorResultsDocument = HydratedDocument<any>;

@Schema()
@CSVSchema(path.resolve(__dirname, '../../../../..', 'f1-csv/constructor_results.csv'))
export class ConstructorResults implements ConstructorResultsType {
    @Prop({ required: true })
    @CSVProp('constructorResultsId')
    id: number;

    @Prop({ required: true })
    @CSVProp('raceId')
    raceId: number;

    @Prop({ required: true })
    @CSVProp('constructorId')
    constructorId: number;

    @Prop()
    @CSVProp('points')
    points: number;

    @Prop()
    @CSVProp('status')
    status: string;
}

export const ConstructorResultsSchema = SchemaFactory.createForClass(ConstructorResults);
