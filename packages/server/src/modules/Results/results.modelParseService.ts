import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ICSVParseModelParseService } from '~lib/csv-parse/CSVParse.modelParseService';
import { CSVParser } from '~lib/csv-parse/CSVParser';

import { Result } from '~schemas/Result/Result.schema';

export class ResultsModelParseService implements ICSVParseModelParseService {
    constructor(@InjectModel(Result.name) private resultModel: Model<any>) {}
    public async insertFromCsv(): Promise<Result[]> {
        try {
            await this.resultModel.collection?.drop();

            return await this.resultModel.insertMany(await new CSVParser().parse(Result));
        } catch (error) {
            console.log(`Failed to parse ${Result.name}: `, error.message);

            return [];
        }
    }
}
