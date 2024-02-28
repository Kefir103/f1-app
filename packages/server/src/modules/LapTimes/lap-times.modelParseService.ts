import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ICSVParseModelParseService } from '~lib/csv-parse/CSVParse.modelParseService';
import { CSVParser } from '~lib/csv-parse/CSVParser';

import { LapTimes } from '~schemas/LapTimes/LapTimes.schema';

export class LapTimesModelParseService implements ICSVParseModelParseService {
    constructor(@InjectModel(LapTimes.name) private lapTimesModel: Model<any>) {}

    public async insertFromCsv(): Promise<LapTimes[]> {
        try {
            await this.lapTimesModel.collection?.drop();

            return await this.lapTimesModel.insertMany(await new CSVParser().parse(LapTimes));
        } catch (error) {
            console.log(`Failed to parse ${LapTimes.name}: `, error.message);

            return [];
        }
    }
}
