import * as path from 'node:path';

import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { CSVSchema } from '~lib/csv-parse/CSVSchema.decorator';
import { CSVProp } from '~lib/csv-parse/CSVProp.decorator';

import { ConstructorStandingsType } from '~f1-app/shared/types/ConstructorStandings/ConstructorStandings.type';

export type ConstructorStandingsDocument = HydratedDocument<ConstructorStandings>;

@Schema()
@CSVSchema(path.resolve(__dirname, '../../../../..', 'f1-csv/constructor_standings.csv'))
export class ConstructorStandings implements ConstructorStandingsType {
    @Prop({ required: true })
    @CSVProp('constructorStandingsId')
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
    @CSVProp('position')
    position: number;

    @Prop()
    @CSVProp('positionText')
    positionText: string;

    @Prop()
    @CSVProp('wins')
    wins: number;
}

export const ConstructorStandingsSchema = SchemaFactory.createForClass(ConstructorStandings);
