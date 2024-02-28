import * as path from 'node:path';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { CSVSchema } from '~lib/csv-parse/CSVSchema.decorator';
import { CSVProp } from '~lib/csv-parse/CSVProp.decorator';

import { SprintResultType } from '~f1-app/shared/types/SprintResult/SprintResult.type';

export type SprintResultDocument = HydratedDocument<SprintResult>;

@Schema()
@CSVSchema(path.resolve(__dirname, '../../../../..', 'f1-csv/sprint_results.csv'))
export class SprintResult implements SprintResultType {
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
    positionOrder: string;

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
    @CSVProp('fastestLapTime')
    fastestLapTime: string;

    @Prop({ required: true })
    @CSVProp('statusId')
    statusId: number;
}

export const SprintResultSchema = SchemaFactory.createForClass(SprintResult);
