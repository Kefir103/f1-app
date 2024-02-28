import * as path from 'node:path';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { CSVSchema } from '~lib/csv-parse/CSVSchema.decorator';
import { CSVProp } from '~lib/csv-parse/CSVProp.decorator';

import { ConstructorType } from '~f1-app/shared/types/Constructor/Constructor.type';

export type ConstructorDocument = HydratedDocument<Constructor>;

@Schema()
@CSVSchema(path.resolve(__dirname, '../../../../..', 'f1-csv/constructors.csv'))
export class Constructor implements ConstructorType {
    @Prop({ required: true })
    @CSVProp('constructorId')
    id: number;

    @Prop({ required: true })
    @CSVProp('name')
    name: string;

    @Prop()
    @CSVProp('nationality')
    nationality: string;

    @Prop({ required: true })
    @CSVProp('url')
    wikiUrl: string;
}

export const ConstructorSchema = SchemaFactory.createForClass(Constructor);
