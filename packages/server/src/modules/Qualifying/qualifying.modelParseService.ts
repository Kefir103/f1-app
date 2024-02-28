import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICSVParseModelParseService } from '~lib/csv-parse/CSVParse.modelParseService';
import { CSVParser } from '~lib/csv-parse/CSVParser';

import { Qualifying } from '~schemas/Qualifying/Qualifying.schema';

export class QualifyingModelParseService implements ICSVParseModelParseService {
    constructor(@InjectModel(Qualifying.name) private qualifyingModel: Model<any>) {}

    public async insertFromCsv(): Promise<Qualifying[]> {
        try {
            await this.qualifyingModel.collection?.drop();

            return await this.qualifyingModel.insertMany(await new CSVParser().parse(Qualifying));
        } catch (error) {
            console.log(`Failed to parse ${Qualifying.name}: `, error.message);

            return [];
        }
    }
}
