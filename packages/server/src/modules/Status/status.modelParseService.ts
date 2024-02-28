import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ICSVParseModelParseService } from '~lib/csv-parse/CSVParse.modelParseService';
import { CSVParser } from '~lib/csv-parse/CSVParser';

import { Status } from '~schemas/Status/Status.schema';

export class StatusModelParseService implements ICSVParseModelParseService {
    constructor(@InjectModel(Status.name) private statusModel: Model<any>) {}

    public async insertFromCsv(): Promise<Status[]> {
        try {
            await this.statusModel.collection?.drop();

            return await this.statusModel.insertMany(await new CSVParser().parse(Status));
        } catch (error) {
            console.log(`Failed to parse ${Status.name}: `, error.message);

            return [];
        }
    }
}
