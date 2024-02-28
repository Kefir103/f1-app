import * as path from 'node:path';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { CSVProp } from '~lib/csv-parse/CSVProp.decorator';
import { CSVSchema } from '~lib/csv-parse/CSVSchema.decorator';

import { DriverType } from '~f1-app/shared/types/Driver/Driver.type';
import { Result } from '~schemas/Result/Result.schema';
import { Qualifying } from '~schemas/Qualifying/Qualifying.schema';

export type DriverDocument = HydratedDocument<Driver>;

@Schema({
    toJSON: {
        virtuals: true,
    },
})
@CSVSchema(path.resolve(__dirname, '../../../../..', 'f1-csv/drivers.csv'))
export class Driver implements DriverType {
    @Prop({ required: true })
    @CSVProp('driverId')
    id: number;

    @Prop()
    @CSVProp('code')
    code: string;

    @Prop({ required: true })
    @CSVProp('forename')
    firstName: string;

    @Prop({ required: true })
    @CSVProp('surname')
    lastName: string;

    @Prop({ required: true })
    @CSVProp('dob')
    dateOfBirth: Date;

    @Prop({ required: true })
    @CSVProp('nationality')
    nationality: string;

    @Prop()
    @CSVProp('url')
    wikiUrl: string;
}

const DriverSchema = SchemaFactory.createForClass(Driver);

DriverSchema.virtual('winsCount', {
    ref: Result.name,
    localField: 'id',
    foreignField: 'driverId',
    match: {
        position: 1,
    },
    count: true,
});

DriverSchema.virtual('polesCount', {
    ref: Qualifying.name,
    localField: 'id',
    foreignField: 'driverId',
    match: {
        position: 1,
    },
    count: true,
});

export { DriverSchema };
