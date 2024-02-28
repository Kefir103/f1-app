import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ICSVParseModelParseService } from '~lib/csv-parse/CSVParse.modelParseService';
import { CSVParser } from '~lib/csv-parse/CSVParser';

import { DriverStandings } from '~schemas/DriverStandings/DriverStandings.schema';

export class DriverStandingsModelParseService implements ICSVParseModelParseService {
    constructor(@InjectModel(DriverStandings.name) private driverStandingsModel: Model<any>) {}

    public async insertFromCsv(): Promise<DriverStandings[]> {
        try {
            await this.driverStandingsModel.collection?.drop();

            return await this.driverStandingsModel.insertMany(
                await new CSVParser().parse(DriverStandings),
            );
        } catch (error) {
            console.log(`Failed to parse ${DriverStandings.name}: `, error.message);

            return [];
        }
    }
}
