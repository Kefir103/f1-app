import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ICSVParseModelParseService } from '~lib/csv-parse/CSVParse.modelParseService';
import { CSVParser } from '~lib/csv-parse/CSVParser';

import { Driver } from '~schemas/Driver/Driver.schema';

export class DriverModelParseService implements ICSVParseModelParseService {
    constructor(@InjectModel(Driver.name) private driverModel: Model<any>) {}

    public async insertFromCsv(): Promise<Driver[]> {
        try {
            await this.driverModel.collection?.drop();

            return await this.driverModel.insertMany(await new CSVParser().parse(Driver));
        } catch (error) {
            console.error(`Failed to parse ${Driver.name}: `, error.message);

            return [];
        }
    }
}
