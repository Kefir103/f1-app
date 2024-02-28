import * as path from 'node:path';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { CSVSchema } from '~lib/csv-parse/CSVSchema.decorator';
import { CSVProp } from '~lib/csv-parse/CSVProp.decorator';

import { LapTimesType } from '~f1-app/shared/types/LapTimes/LapTimes.type';

export type LapTimesDocument = HydratedDocument<LapTimes>;

@Schema()
@CSVSchema(path.resolve(__dirname, '../../../../..', 'f1-csv/lap_times.csv'))
export class LapTimes implements LapTimesType {
    @Prop({ required: true })
    @CSVProp('raceId')
    raceId: number;

    @Prop({ required: true })
    @CSVProp('driverId')
    driverId: number;

    @Prop({ required: true })
    @CSVProp('lap')
    lap: number;

    @Prop()
    @CSVProp('position')
    position: number;

    @Prop()
    @CSVProp('time')
    time: string;

    @Prop()
    @CSVProp('milliseconds')
    milliseconds: number;
}

export const LapTimesSchema = SchemaFactory.createForClass(LapTimes);
