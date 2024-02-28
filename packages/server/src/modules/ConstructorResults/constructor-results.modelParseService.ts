import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ICSVParseModelParseService } from '~lib/csv-parse/CSVParse.modelParseService';
import { CSVParser } from '~lib/csv-parse/CSVParser';

import { ConstructorResults } from '~schemas/ConstructorResults/ConstructorResults.schema';

export class ConstructorResultsModelParseService implements ICSVParseModelParseService {
    constructor(
        @InjectModel(ConstructorResults.name) private constructorResultsModel: Model<any>,
    ) {}
    public async insertFromCsv(): Promise<ConstructorResults[]> {
        try {
            await this.constructorResultsModel.collection?.drop();

            return await this.constructorResultsModel.insertMany(
                await new CSVParser().parse(ConstructorResults),
            );
        } catch (error) {
            console.log(`Failed to parse ${ConstructorResults.name}: `, error.message);

            return [];
        }
    }
}
