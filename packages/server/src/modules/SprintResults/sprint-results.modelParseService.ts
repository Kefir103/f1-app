import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ICSVParseModelParseService } from '~lib/csv-parse/CSVParse.modelParseService';
import { CSVParser } from '~lib/csv-parse/CSVParser';

import { SprintResult } from '~schemas/SprintResult/SprintResult.schema';

export class SprintResultsModelParseService implements ICSVParseModelParseService {
    constructor(@InjectModel(SprintResult.name) private sprintResultModel: Model<any>) {}
    public async insertFromCsv(): Promise<SprintResult[]> {
        try {
            await this.sprintResultModel.collection?.drop();

            return await this.sprintResultModel.insertMany(
                await new CSVParser().parse(SprintResult),
            );
        } catch (error) {
            console.log(`Failed to parse ${SprintResult.name}: `, error.message);

            return [];
        }
    }
}
