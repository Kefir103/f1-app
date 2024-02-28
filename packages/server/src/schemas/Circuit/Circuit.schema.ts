import * as path from 'node:path';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { CSVProp } from '~lib/csv-parse/CSVProp.decorator';
import { CSVSchema } from '~lib/csv-parse/CSVSchema.decorator';

import { CircuitType } from '~f1-app/shared/types/Circuit/Circuit.type';

export type CircuitDocument = HydratedDocument<Circuit>;

@Schema()
@CSVSchema(path.resolve(__dirname, '../../../../..', 'f1-csv/circuits.csv'))
export class Circuit implements CircuitType {
    @Prop({ required: true })
    @CSVProp('circuitId')
    id: number;

    @Prop({ required: true })
    @CSVProp('name')
    name: string;

    @Prop()
    @CSVProp('location')
    location: string;

    @Prop()
    @CSVProp('country')
    country: string;

    @Prop()
    @CSVProp('lat')
    latitude: number;

    @Prop()
    @CSVProp('lng')
    longitude: number;

    @Prop()
    @CSVProp('alt')
    altitude: number;

    @Prop()
    @CSVProp('url')
    wikiUrl: string;
}

export const CircuitSchema = SchemaFactory.createForClass(Circuit);
