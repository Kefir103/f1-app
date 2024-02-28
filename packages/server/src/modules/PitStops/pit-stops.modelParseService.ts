import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ICSVParseModelParseService } from '~lib/csv-parse/CSVParse.modelParseService';
import { CSVParser } from '~lib/csv-parse/CSVParser';

import { PitStops } from '~schemas/PitStops/PitStops.schema';

export class PitStopsModelParseService implements ICSVParseModelParseService {
    constructor(@InjectModel(PitStops.name) private pitStopsModel: Model<any>) {}
    public async insertFromCsv(): Promise<PitStops[]> {
        try {
            await this.pitStopsModel.collection?.drop();

            return await this.pitStopsModel.insertMany(await new CSVParser().parse(PitStops));
        } catch (error) {
            console.log(`Failed to parse ${PitStops.name}: `, error.message);

            return [];
        }
    }
}
