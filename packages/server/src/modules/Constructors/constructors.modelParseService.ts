import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ICSVParseModelParseService } from '~lib/csv-parse/CSVParse.modelParseService';
import { CSVParser } from '~lib/csv-parse/CSVParser';

import { Constructor } from '~schemas/Constructor/Constructor.schema';

export class ConstructorsModelParseService implements ICSVParseModelParseService {
    constructor(@InjectModel(Constructor.name) private constructorModel: Model<any>) {}
    public async insertFromCsv(): Promise<Constructor[]> {
        try {
            await this.constructorModel.collection?.drop();

            return await this.constructorModel.insertMany(await new CSVParser().parse(Constructor));
        } catch (error) {
            console.log(`Failed to parse ${Constructor.name}: `, error.message);

            return [];
        }
    }
}
