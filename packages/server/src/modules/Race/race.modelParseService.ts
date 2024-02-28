import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICSVParseModelParseService } from '~lib/csv-parse/CSVParse.modelParseService';
import { CSVParser } from '~lib/csv-parse/CSVParser';

import { Race } from '~schemas/Race/Race.schema';

export class RaceModelParseService implements ICSVParseModelParseService {
    constructor(@InjectModel(Race.name) private raceModel: Model<any>) {}
    public async insertFromCsv(): Promise<Race[]> {
        try {
            await this.raceModel.collection?.drop();

            await this.raceModel.insertMany(await new CSVParser().parse(Race));
        } catch (error) {
            console.log(`Failed to parse ${Race.name}: `, error.message);

            return [];
        }
    }
}
