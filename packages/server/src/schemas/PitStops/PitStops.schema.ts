import * as path from 'node:path';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { CSVSchema } from '~lib/csv-parse/CSVSchema.decorator';
import { CSVProp } from '~lib/csv-parse/CSVProp.decorator';

import { PitStopsType } from '~f1-app/shared/types/PitStops/PitStops.type';

export type PitStopsDocument = HydratedDocument<PitStops>;

@Schema()
@CSVSchema(path.resolve(__dirname, '../../../../..', 'f1-csv/pit_stops.csv'))
export class PitStops implements PitStopsType {
    @Prop({ required: true })
    @CSVProp('raceId')
    raceId: number;

    @Prop({ required: true })
    @CSVProp('driverId')
    driverId: number;

    @Prop({ required: true })
    @CSVProp('stop')
    stop: number;

    @Prop({ required: true })
    @CSVProp('lap')
    lap: number;

    @Prop({ required: true })
    @CSVProp('time')
    time: string;

    @Prop()
    @CSVProp('duration')
    duration: string;

    @Prop()
    @CSVProp('milliseconds')
    milliseconds: number;
}

export const PitStopsSchema = SchemaFactory.createForClass(PitStops);
