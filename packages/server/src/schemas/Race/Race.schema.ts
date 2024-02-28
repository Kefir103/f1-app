import * as path from 'node:path';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { CSVSchema } from '~lib/csv-parse/CSVSchema.decorator';
import { CSVProp } from '~lib/csv-parse/CSVProp.decorator';

import { RaceType } from '~f1-app/shared/types/Race/Race.type';

export type RaceDocument = HydratedDocument<Race>;

@Schema()
@CSVSchema(path.resolve(__dirname, '../../../../..', 'f1-csv/races.csv'))
export class Race implements RaceType {
    @Prop({ required: true })
    @CSVProp('raceId')
    id: number;

    @Prop({ required: true })
    @CSVProp('year')
    year: number;

    @Prop({ required: true })
    @CSVProp('round')
    round: number;

    @Prop({ required: true })
    @CSVProp('circuitId')
    circuitId: number;

    @Prop({ required: true })
    @CSVProp('name')
    name: string;

    @Prop({ required: true })
    @CSVProp('date')
    date: Date;

    @Prop()
    @CSVProp('time')
    time: string;

    @Prop()
    @CSVProp('url')
    wikiUrl: string;

    @Prop()
    @CSVProp('fp1_date')
    fp1_date: Date;

    @Prop()
    @CSVProp('fp1_time')
    fp1_time: string;

    @Prop()
    @CSVProp('fp2_date')
    fp2_date: Date;

    @Prop()
    @CSVProp('fp2_time')
    fp2_time: string;

    @Prop()
    @CSVProp('fp3_date')
    fp3_date: Date;

    @Prop()
    @CSVProp('fp3_time')
    fp3_time: string;

    @Prop()
    @CSVProp('quali_date')
    qualifying_date: Date;

    @Prop()
    @CSVProp('quali_time')
    qualifying_time: string;

    @Prop()
    @CSVProp('sprint_date')
    sprint_date: Date;

    @Prop()
    @CSVProp('sprint_time')
    sprint_time: string;
}

export const RaceSchema = SchemaFactory.createForClass(Race);
