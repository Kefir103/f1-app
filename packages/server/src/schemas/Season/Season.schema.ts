import * as path from 'node:path';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { CSVSchema } from '~lib/csv-parse/CSVSchema.decorator';
import { CSVProp } from '~lib/csv-parse/CSVProp.decorator';

import { SeasonType } from '~f1-app/shared/types/Season/Season.type';

export type SeasonDocument = HydratedDocument<Season>;

@Schema()
@CSVSchema(path.resolve(__dirname, '../../../../..', 'f1-csv/seasons.csv'))
export class Season implements SeasonType {
    @Prop({ required: true })
    @CSVProp('year')
    year: number;

    @Prop({ required: true })
    @CSVProp('url')
    wikiUrl: string;
}

export const SeasonSchema = SchemaFactory.createForClass(Season);
