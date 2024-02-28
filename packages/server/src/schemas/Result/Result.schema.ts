import * as path from 'node:path';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { CSVSchema } from '~lib/csv-parse/CSVSchema.decorator';
import { CSVProp } from '~lib/csv-parse/CSVProp.decorator';

import { ResultType } from '~f1-app/shared/types/Result/Result.type';

export type ResultDocument = HydratedDocument<Result>;

@Schema()
@CSVSchema(path.resolve(__dirname, '../../../../..', 'f1-csv/results.csv'))
export class Result implements ResultType {
    @Prop({ required: true })
    @CSVProp('resultId')
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

    @Prop()
    @CSVProp('number')
    number: number;

    @Prop({ required: true })
    @CSVProp('grid')
    grid: number;

    @Prop()
    @CSVProp('position')
    position: number;

    @Prop({ required: true })
    @CSVProp('positionText')
    positionText: string;

    @Prop({ required: true })
    @CSVProp('positionOrder')
    positionOrder: number;

    @Prop({ required: true })
    @CSVProp('points')
    points: number;

    @Prop({ required: true })
    @CSVProp('laps')
    laps: number;

    @Prop()
    @CSVProp('time')
    time: string;

    @Prop()
    @CSVProp('milliseconds')
    milliseconds: number;

    @Prop()
    @CSVProp('fastestLap')
    fastestLap: number;

    @Prop()
    @CSVProp('rank')
    rank: number;

    @Prop()
    @CSVProp('fastestLapTime')
    fastestLapTime: string;

    @Prop()
    @CSVProp('fastestLapSpeed')
    fastestLapSpeed: string;

    @Prop({ required: true })
    @CSVProp('statusId')
    statusId: number;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
