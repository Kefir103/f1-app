import * as path from 'node:path';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { CSVSchema } from '~lib/csv-parse/CSVSchema.decorator';
import { CSVProp } from '~lib/csv-parse/CSVProp.decorator';

import { DriverStandingsType } from '~f1-app/shared/types/DriverStandings/DriverStandings.type';

export type DriverStandingsDocument = HydratedDocument<DriverStandings>;

@Schema()
@CSVSchema(path.resolve(__dirname, '../../../../..', 'f1-csv/driver_standings.csv'))
export class DriverStandings implements DriverStandingsType {
    @Prop({ required: true })
    @CSVProp('driverStandingsId')
    id: number;

    @Prop({ required: true })
    @CSVProp('raceId')
    raceId: number;

    @Prop({ required: true })
    @CSVProp('driverId')
    driverId: number;

    @Prop({ required: true })
    @CSVProp('points')
    points: number;

    @Prop()
    @CSVProp('position')
    position: number;

    @Prop()
    @CSVProp('positionText')
    positionText: string;

    @Prop({ required: true })
    @CSVProp('wins')
    wins: number;
}

export const DriverStandingsSchema = SchemaFactory.createForClass(DriverStandings);
