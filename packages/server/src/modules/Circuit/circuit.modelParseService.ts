import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICSVParseModelParseService } from '~lib/csv-parse/CSVParse.modelParseService';
import { CSVParser } from '~lib/csv-parse/CSVParser';

import { Circuit } from '~schemas/Circuit/Circuit.schema';

export class CircuitModelParseService implements ICSVParseModelParseService {
    constructor(@InjectModel(Circuit.name) private circuitModel: Model<any>) {}

    public async insertFromCsv(): Promise<Circuit[]> {
        try {
            await this.circuitModel.collection?.drop();

            return await this.circuitModel.insertMany(await new CSVParser().parse(Circuit));
        } catch (error) {
            console.error(`Failed to parse ${Circuit.name}: `, error.message);

            return [];
        }
    }
}
