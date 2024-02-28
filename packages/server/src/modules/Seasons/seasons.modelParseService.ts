import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ICSVParseModelParseService } from '~lib/csv-parse/CSVParse.modelParseService';
import { CSVParser } from '~lib/csv-parse/CSVParser';

import { Season } from '~schemas/Season/Season.schema';

export class SeasonsModelParseService implements ICSVParseModelParseService {
    constructor(@InjectModel(Season.name) private seasonsModel: Model<any>) {}

    public async insertFromCsv(): Promise<Season[]> {
        try {
            await this.seasonsModel.collection?.drop();

            return await this.seasonsModel.insertMany(await new CSVParser().parse(Season));
        } catch (error) {
            console.log(`Failed to parse ${Season.name}: `, error.message);

            return [];
        }
    }
}
