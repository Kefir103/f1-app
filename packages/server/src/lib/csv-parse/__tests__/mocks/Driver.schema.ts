import * as path from 'node:path';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { CSVProp } from '../../CSVProp.decorator';
import { CSVSchema } from '~lib/csv-parse/CSVSchema.decorator';

@Schema()
@CSVSchema(path.resolve(__dirname, '../fixtures/drivers.csv'))
export class Driver {
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
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
